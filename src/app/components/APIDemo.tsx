import { motion } from 'motion/react';
import { Code, Zap, Shield, CloudCog, Database, FileJson, MessageCircle } from 'lucide-react';
import TypingText from './TypingText';

export default function APIDemo() {
  const apiFeatures = [
    {
      title: 'RESTful APIs',
      titleAr: 'واجهات REST',
      titleFr: 'API RESTful',
      description: 'Standard HTTP-based APIs',
      icon: Code,
      color: '#10B981',
    },
    {
      title: 'GraphQL',
      titleAr: 'GraphQL',
      titleFr: 'GraphQL',
      description: 'Flexible query language',
      icon: FileJson,
      color: '#E10098',
    },
    {
      title: 'Real-time APIs',
      titleAr: 'واجهات فورية',
      titleFr: 'API en temps réel',
      description: 'WebSocket & Server-Sent Events',
      icon: Zap,
      color: '#F59E0B',
    },
    {
      title: 'Authentication',
      titleAr: 'المصادقة',
      titleFr: 'Authentification',
      description: 'JWT, OAuth, API Keys',
      icon: Shield,
      color: '#EF4444',
    },
    {
      title: 'Cloud Integration',
      titleAr: 'التكامل السحابي',
      titleFr: 'Intégration cloud',
      description: 'AWS, Azure, Google Cloud',
      icon: CloudCog,
      color: '#3B82F6',
    },
    {
      title: 'Database APIs',
      titleAr: 'قواعد البيانات',
      titleFr: 'API de base de données',
      description: 'SQL & NoSQL backends',
      icon: Database,
      color: '#8B5CF6',
    },
  ];

  const endpoints = [
    { method: 'GET', path: '/api/users', description: 'Fetch all users' },
    { method: 'POST', path: '/api/users', description: 'Create new user' },
    { method: 'PUT', path: '/api/users/:id', description: 'Update user' },
    { method: 'DELETE', path: '/api/users/:id', description: 'Delete user' },
  ];

  const getMethodColor = (method: string) => {
    switch (method) {
      case 'GET':
        return '#10B981';
      case 'POST':
        return '#3B82F6';
      case 'PUT':
        return '#F59E0B';
      case 'DELETE':
        return '#EF4444';
      default:
        return '#8B5CF6';
    }
  };

  return (
    <motion.div
      key="api"
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
      className="min-h-screen p-8 md:p-16 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-8 md:mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="inline-flex items-center justify-center w-16 h-16 md:w-24 md:h-24 mb-6 md:mb-8 bg-gradient-to-br from-green-600 to-green-400 rounded-3xl"
          >
            <Code size={32} className="text-white md:size-48" />
          </motion.div>

          <TypingText
            text="أطور واجهات برمجية قوية وآمنة"
            delay={500}
            speed={80}
            className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-4 md:mb-6 text-center"
            dir="rtl"
          />

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            className="text-base md:text-xl text-purple-200"
          >
            I develop powerful and secure APIs
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5 }}
          className="mb-8 md:mb-12"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 md:mb-8 text-center">API Solutions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {apiFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50, rotateX: -20 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{ delay: 2.7 + index * 0.1 }}
                  whileHover={{
                    y: -5,
                    scale: 1.02,
                    boxShadow: `0 0 20px ${feature.color}40`,
                    transition: { duration: 0.3 },
                  }}
                  className="p-4 md:p-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl"
                >
                  <div
                    className="w-12 h-12 md:w-14 md:h-14 rounded-xl flex items-center justify-center mb-3 md:mb-4"
                    style={{ backgroundColor: `${feature.color}30` }}
                  >
                    <Icon size={24} className="md:size-28" style={{ color: feature.color }} />
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-white mb-1 md:mb-2">{feature.title}</h3>
                  <p className="text-purple-200 text-xs md:text-sm mb-2 md:mb-3">{feature.description}</p>
                  <p className="text-purple-300 text-xs md:text-sm font-semibold mb-1" dir="rtl">
                    {feature.titleAr}
                  </p>
                  <p className="text-purple-300 text-xs md:text-sm font-semibold mb-2">
                    {feature.titleFr}
                  </p>
                  <motion.a
                    href="https://wa.me/0657496125"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center justify-center gap-2 w-full py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors text-xs md:text-sm font-semibold"
                  >
                    <MessageCircle size={16} />
                    Learn More
                  </motion.a>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.5 }}
          className="p-6 md:p-8 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl mb-8 md:mb-12"
        >
          <h3 className="text-xl md:text-2xl font-bold text-white mb-4 md:mb-6">Example API Endpoints</h3>
          <div className="space-y-2 md:space-y-3">
            {endpoints.map((endpoint, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 3.7 + index * 0.1 }}
                className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 p-3 md:p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors"
              >
                <span
                  className="px-2 py-1 md:px-3 md:py-1 rounded-lg font-mono font-bold text-xs md:text-sm"
                  style={{
                    backgroundColor: `${getMethodColor(endpoint.method)}30`,
                    color: getMethodColor(endpoint.method),
                  }}
                >
                  {endpoint.method}
                </span>
                <code className="flex-1 text-purple-200 font-mono text-xs md:text-sm break-all sm:break-normal">{endpoint.path}</code>
                <span className="text-purple-300 text-xs md:text-sm">{endpoint.description}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 4.5 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6"
          >
            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ duration: 0.3 }}
              className="p-4 md:p-6 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl text-center cursor-pointer"
            >
              <div className="text-3xl md:text-4xl font-bold text-white mb-1 md:mb-2">99.9%</div>
              <p className="text-purple-200 text-xs md:text-base">Uptime</p>
              <p className="text-purple-300 text-xs md:text-sm mt-1" dir="rtl">وقت التشغيل</p>
              <p className="text-purple-300 text-xs md:text-sm">Disponibilité</p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ duration: 0.3 }}
              className="p-4 md:p-6 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl text-center cursor-pointer"
            >
              <div className="text-3xl md:text-4xl font-bold text-white mb-1 md:mb-2">&lt;50ms</div>
              <p className="text-purple-200 text-xs md:text-base">Response Time</p>
              <p className="text-purple-300 text-xs md:text-sm mt-1" dir="rtl">زمن الاستجابة</p>
              <p className="text-purple-300 text-xs md:text-sm">Temps de réponse</p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ duration: 0.3 }}
              className="p-4 md:p-6 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl text-center cursor-pointer"
            >
              <div className="text-3xl md:text-4xl font-bold text-white mb-1 md:mb-2">100%</div>
              <p className="text-purple-200 text-xs md:text-base">Secure</p>
              <p className="text-purple-300 text-xs md:text-sm mt-1" dir="rtl">آمن</p>
              <p className="text-purple-300 text-xs md:text-sm">Sécurisé</p>
            </motion.div>
          </motion.div>
      </div>
    </motion.div>
  );
}
