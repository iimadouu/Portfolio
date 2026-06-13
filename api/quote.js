import https from 'https';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load pricing model
let pricingModel;
try {
  const pricingModelPath = join(__dirname, '..', 'pricing-model.json');
  pricingModel = JSON.parse(readFileSync(pricingModelPath, 'utf-8'));
} catch (error) {
  console.error('Failed to load pricing model:', error);
  pricingModel = null;
}

// Fallback quote calculation function
function calculateFallbackQuote(formData, pricingModel) {
  const { serviceType, pages, screens, endpoints, features = [], designComplexity, platform, os, budgetMin, budgetMax } = formData;
  
  if (!pricingModel || !pricingModel[serviceType]) {
    throw new Error('Pricing model not available');
  }
  
  const serviceConfig = pricingModel[serviceType];
  let totalCost = serviceConfig.basePrice || 0;
  let breakdown = [];
  
  breakdown.push(`Base ${serviceType} price: $${totalCost}`);
  
  // Calculate based on service type
  if (serviceType === 'website' && pages) {
    const websiteType = formData.websiteType || 'static';
    const pageRate = serviceConfig.pages?.[websiteType]?.min || 10;
    const pageCost = pages * pageRate;
    totalCost += pageCost;
    breakdown.push(`${pages} pages × $${pageRate}: $${pageCost}`);
    
    // Design complexity multiplier
    if (designComplexity && serviceConfig.designComplexity?.[designComplexity]) {
      const multiplier = serviceConfig.designComplexity[designComplexity].multiplier;
      totalCost *= multiplier;
      breakdown.push(`Design complexity (${designComplexity}): ×${multiplier}`);
    }
  }
  
  if (serviceType === 'mobileapp' && screens) {
    const screenRate = serviceConfig.screens?.min || 10;
    const screenCost = screens * screenRate;
    totalCost += screenCost;
    breakdown.push(`${screens} screens × $${screenRate}: $${screenCost}`);
    
    // Platform multiplier
    if (platform && serviceConfig.platform) {
      const multiplier = platform === 'both' ? serviceConfig.platform.both.multiplier : serviceConfig.platform.single.multiplier;
      totalCost *= multiplier;
      breakdown.push(`Platform (${platform}): ×${multiplier}`);
    }
  }
  
  if (serviceType === 'desktopapp') {
    // OS multiplier
    if (os && serviceConfig.platform) {
      const multiplier = os === 'cross-platform' ? serviceConfig.platform['cross-platform'].multiplier : serviceConfig.platform.single.multiplier;
      totalCost *= multiplier;
      breakdown.push(`OS (${os}): ×${multiplier}`);
    }
  }
  
  if (serviceType === 'api' && endpoints) {
    const endpointRate = serviceConfig.endpoints?.min || 5;
    const endpointCost = endpoints * endpointRate;
    totalCost += endpointCost;
    breakdown.push(`${endpoints} endpoints × $${endpointRate}: $${endpointCost}`);
  }
  
  // Add feature costs
  let featureCost = 0;
  if (features.length > 0 && serviceConfig.features) {
    features.forEach(featureKey => {
      const featurePrice = serviceConfig.features[featureKey];
      if (featurePrice) {
        const cost = featurePrice.min || 10;
        featureCost += cost;
      }
    });
    if (featureCost > 0) {
      totalCost += featureCost;
      breakdown.push(`${features.length} features: $${featureCost}`);
    }
  }
  
  // Apply business multiplier based on client description
  const clientDescription = (formData.clientDescription || '').toLowerCase();
  let businessMultiplier = 1.0;
  
  if (pricingModel.businessMultipliers) {
    for (const [key, value] of Object.entries(pricingModel.businessMultipliers)) {
      if (value.keywords && Array.isArray(value.keywords)) {
        const hasKeyword = value.keywords.some(keyword => clientDescription.includes(keyword.toLowerCase()));
        if (hasKeyword) {
          businessMultiplier = value.multiplier;
          breakdown.push(`Business type (${key}): ×${businessMultiplier}`);
          break;
        }
      }
    }
  }
  
  totalCost *= businessMultiplier;
  
  // Adjust to budget if provided
  if (budgetMax && totalCost > budgetMax * 1.2) {
    const adjustedCost = budgetMax * 0.95;
    breakdown.push(`Adjusted to fit budget: $${Math.round(adjustedCost)}`);
    totalCost = adjustedCost;
  }
  
  // Estimate timeline
  const hoursEstimate = totalCost / (pricingModel.baseRates?.hourlyRate?.average || 4.5);
  const daysEstimate = Math.ceil(hoursEstimate / 8);
  let timeline;
  
  if (daysEstimate <= 7) {
    timeline = '1 week';
  } else if (daysEstimate <= 14) {
    timeline = '2 weeks';
  } else if (daysEstimate <= 30) {
    timeline = '3-4 weeks';
  } else if (daysEstimate <= 60) {
    timeline = '1-2 months';
  } else {
    timeline = `${Math.ceil(daysEstimate / 30)} months`;
  }
  
  return {
    estimatedPrice: Math.round(totalCost),
    timeline,
    breakdown: breakdown.join('\n'),
    currency: 'USD',
    source: 'fallback'
  };
}

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, serviceType, clientDescription, budgetMin, budgetMax, ...preferences } = req.body;

    if (!name || !email || !serviceType) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Keep complete formData for fallback calculation
    const formData = req.body;

    // Construct prompt for Groq AI
    const pricingContext = pricingModel ? `
PRICING MODEL (use as baseline reference):
Base Hourly Rate: $${pricingModel.baseRates.hourlyRate.min}-${pricingModel.baseRates.hourlyRate.max} USD/hour
Exchange Rate: ${pricingModel.baseRates.exchangeRate} DZD per USD

${serviceType.toUpperCase()} PRICING:
${JSON.stringify(pricingModel[serviceType] || {}, null, 2)}

BUSINESS MULTIPLIERS:
${JSON.stringify(pricingModel.businessMultipliers || {}, null, 2)}

Use this pricing model as your baseline. Calculate the total cost based on:
1. Base price for the service type
2. Add costs for pages/screens/endpoints using the per-unit pricing
3. Add costs for each selected feature (using the min-max ranges as guidance)
4. Apply design complexity multiplier if specified
5. Apply platform multiplier if applicable (mobile/desktop)
6. Apply appropriate business multiplier based on client description
7. Convert to DZD using the exchange rate
8. DO NOT apply arbitrary adjustment factors - stick to the calculated price

CRITICAL: For simple projects with minimal features, keep pricing low and competitive. A simple 5-page static website should cost around $500-$700 USD total (67,500-94,500 DZD).

` : '';

    const prompt = `You are a professional web development cost estimator for the Algerian market. Based on the following project requirements, provide an estimated price range and timeline.

Client: ${name}
Email: ${email}
Service Type: ${serviceType}
Preferences: ${JSON.stringify(preferences, null, 2)}

${pricingContext}
IMPORTANT: Respond ONLY with a valid JSON object in this exact format:
{
  "estimatedPrice": number (total estimated price in USD),
  "timeline": string (estimated completion time IN ENGLISH),
  "breakdown": string (detailed breakdown of costs and what's included IN ENGLISH)
}

CRITICAL: Use ONLY ENGLISH in your response. No Arabic text. All timeline and breakdown descriptions must be in English.

Do not include any other text, markdown, or formatting. Just the JSON object.

PRICING INSTRUCTIONS:
- Use the pricing model above as your baseline reference
- Calculate total cost by summing: base price + pages/screens/endpoints cost + selected features cost
- Apply design complexity multiplier if specified
- Apply platform multiplier if applicable (mobile/desktop)
- Apply business multiplier based on client description keywords
- Convert final USD price to DZD (${pricingModel?.baseRates.exchangeRate || 135} DZD per USD)
- The client's budget is ${preferences.budgetMin || 'not specified'}-${preferences.budgetMax || 'not specified'} DZD
- Try to stay within or close to the client's budget when possible, but NOT below minimum viable pricing
- DO NOT apply arbitrary adjustment factors or multipliers beyond what's in the pricing model
- MINIMUM PRICES (DO NOT GO BELOW):
  * Simple 5-page static website: minimum $500 USD (67,500 DZD)
  * Dynamic website with database: minimum $800 USD (108,000 DZD)
  * E-commerce website: minimum $1,200 USD (162,000 DZD)
  * Simple mobile app: minimum $1,000 USD (135,000 DZD)
  * Desktop app: minimum $800 USD (108,000 DZD)
  * API with 10-20 endpoints: minimum $600 USD (81,000 DZD)
- Each additional page/screen/endpoint adds significant value
- Professional work deserves professional pricing
- Consider the real development time and expertise required

Consider factors like:
- Complexity of the project
- Number of features
- Development time required (minimum 2-3 days for simplest projects)
- Current market rates in Algeria
- Your expertise as a professional full-stack developer
- Hosting, deployment, and maintenance considerations

Be realistic and professional with your pricing. Quality work requires fair compensation.`;

    // Call Groq AI API with improved error handling and custom DNS
    let result;
    
    try {
      console.log('Attempting to connect to Groq API...');
      
      // Use native https module for better DNS handling
      const postData = JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
        max_tokens: 1000,
      });

      const groqData = await new Promise((resolve, reject) => {
        const options = {
          hostname: 'api.groq.com',
          port: 443,
          path: '/openai/v1/chat/completions',
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(postData)
          },
          timeout: 45000,
          family: 4
        };

        const apiReq = https.request(options, (apiRes) => {
          let data = '';
          
          apiRes.on('data', (chunk) => {
            data += chunk;
          });
          
          apiRes.on('end', () => {
            if (apiRes.statusCode === 200) {
              try {
                resolve(JSON.parse(data));
              } catch (e) {
                reject(new Error('Failed to parse response'));
              }
            } else {
              reject(new Error(`HTTP ${apiRes.statusCode}: ${data}`));
            }
          });
        });

        apiReq.on('error', (e) => {
          reject(e);
        });

        apiReq.on('timeout', () => {
          apiReq.destroy();
          reject(new Error('Request timeout'));
        });

        apiReq.write(postData);
        apiReq.end();
      });

      console.log('Groq API response received successfully');
      const content = groqData.choices[0].message.content;

      // Parse the JSON response
      try {
        const cleanedContent = content.replace(/```json\n?|\n?```/g, '').trim();
        result = JSON.parse(cleanedContent);
        console.log('Successfully parsed AI response');
      } catch (parseError) {
        console.error('Failed to parse Groq response:', content);
        throw new Error('Failed to parse AI response');
      }
    } catch (fetchError) {
      console.error('Groq API fetch error:', fetchError.message);
      console.error('Error details:', fetchError);
      
      // Use fallback calculation based on pricing model
      console.log('Falling back to pricing model calculation...');
      result = calculateFallbackQuote(formData, pricingModel);
    }

    // Add budget comparison (only if not already converted in fallback)
    if (result.currency !== 'DZD') {
      const exchangeRate = pricingModel?.baseRates.exchangeRate || 135;
      result.estimatedPrice = Math.round(result.estimatedPrice * exchangeRate);
      result.currency = 'DZD';
    }

    // Add budget comparison
    const minBudget = budgetMin || 0;
    const maxBudget = budgetMax || 0;
    let budgetStatus = '';
    if (maxBudget > 0) {
      if (result.estimatedPrice >= minBudget && result.estimatedPrice <= maxBudget) {
        budgetStatus = 'within_budget';
      } else if (result.estimatedPrice > maxBudget) {
        budgetStatus = 'over_budget';
      } else {
        budgetStatus = 'under_budget';
      }
    }

    result.budgetComparison = {
      min: minBudget,
      max: maxBudget,
      status: budgetStatus
    };

    // Log if fallback was used
    if (result.source === 'fallback') {
      console.log('Quote generated using fallback calculation method');
    }

    res.json(result);
  } catch (error) {
    console.error('Error generating quote:', error);
    res.status(500).json({ 
      error: 'Failed to generate quote. Please try again.',
      details: error.message 
    });
  }
}
