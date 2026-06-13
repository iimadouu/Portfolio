import { useState, useEffect } from 'react';
import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Globe, Smartphone, Monitor, Code, ArrowLeft, Github, Facebook, Instagram, Youtube, Mail } from 'lucide-react';
import WebsiteDemo from './components/WebsiteDemo';
import MobileAppDemo from './components/MobileAppDemo';
import DesktopAppDemo from './components/DesktopAppDemo';
import APIDemo from './components/APIDemo';
import QuoteDemo from './components/QuoteDemo';

interface Service {
  id: string;
  title: string;
  icon: React.ReactNode;
  color: string;
}

export default function App() {
  const [hoveredService, setHoveredService] = useState<string | null>(null);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [logoAnimation, setLogoAnimation] = useState({ rotate: 0, scale: 1, color: '#ffffff' });
  const [showContact, setShowContact] = useState(false);
  const [showComingSoon, setShowComingSoon] = useState(false);
  const [comingSoonPlatform, setComingSoonPlatform] = useState('');
  const [currentLanguage, setCurrentLanguage] = useState(0);

  const translations = [
    {
      title: "What Can I Build For You?",
      subtitle: "Click a service to explore",
      quote: "Get Quote",
      services: {
        website: "Website",
        mobileapp: "Mobile App",
        desktopapp: "Desktop App",
        api: "API"
      }
    },
    {
      title: "ماذا يمكنني أن أبني لك؟",
      subtitle: "انقر على خدمة للاستكشاف",
      quote: "احصل على عرض سعر",
      services: {
        website: "موقع ويب",
        mobileapp: "تطبيق جوال",
        desktopapp: "تطبيق سطح مكتب",
        api: "واجهة برمجة"
      }
    },
    {
      title: "Je vous construis quoi ?",
      subtitle: "Cliquez sur un service pour explorer",
      quote: "Obtenir un devis",
      services: {
        website: "Site Web",
        mobileapp: "Application Mobile",
        desktopapp: "Application de Bureau",
        api: "API"
      }
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentLanguage((prev) => (prev + 1) % translations.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (selectedService && hoveredService) {
      const service = services.find(s => s.id === hoveredService);
      // Generate random values on each hover
      setLogoAnimation({
        rotate: Math.random() * 30 - 15,
        scale: 1 + Math.random() * 0.3,
        color: service?.color || '#ffffff'
      });
    } else {
      setLogoAnimation({ rotate: 0, scale: 1, color: '#ffffff' });
    }
  }, [hoveredService, selectedService]);

  const services: Service[] = [
    {
      id: 'website',
      title: 'Website',
      icon: <Globe size={64} />,
      color: '#8B5CF6',
    },
    {
      id: 'mobileapp',
      title: 'Mobile App',
      icon: <Smartphone size={64} />,
      color: '#EC4899',
    },
    {
      id: 'desktopapp',
      title: 'Desktop App',
      icon: <Monitor size={64} />,
      color: '#3B82F6',
    },
    {
      id: 'api',
      title: 'API',
      icon: <Code size={64} />,
      color: '#10B981',
    },
  ];

  const handleServiceHover = (serviceId: string) => {
    if (selectedService && selectedService !== serviceId) {
      // If already in details view, switch immediately with animation
      setSelectedService(serviceId);
    } else {
      setHoveredService(serviceId);
      setTimeout(() => {
        setSelectedService(serviceId);
      }, 800);
    }
  };

  const handleServiceLeave = () => {
    if (!selectedService) {
      setHoveredService(null);
    }
  };

  const handleBackToServices = () => {
    setSelectedService(null);
    setHoveredService(null);
  };

  const renderDemo = () => {
    switch (selectedService) {
      case 'website':
        return <WebsiteDemo />;
      case 'mobileapp':
        return <MobileAppDemo />;
      case 'desktopapp':
        return <DesktopAppDemo />;
      case 'api':
        return <APIDemo />;
      case 'quote':
        return <QuoteDemo />;
      default:
        return null;
    }
  };

  const getSelectedServiceData = () => {
    return services.find(s => s.id === selectedService);
  };

  return (
    <div className="size-full bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden relative" style={{ scrollBehavior: 'smooth' }}>
      {/* Animated background gradient */}
      <motion.div
        className="absolute inset-0 opacity-30"
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'linear',
        }}
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(139, 92, 246, 0.3) 0%, transparent 50%)',
          backgroundSize: '200% 200%',
        }}
      />

      {/* Header with Logo */}
      <header>
        <motion.div
          initial={{ opacity: 0, x: 0 }}
          animate={{
            opacity: 1,
            x: selectedService ? 'calc(100vw - 100px)' : 0,
          }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          className="fixed top-4 left-4 md:top-6 md:left-6 z-[70]"
        >
          <motion.div
            className="text-2xl md:text-3xl font-bold text-white cursor-pointer"
            whileHover={{ scale: 1.1 }}
            animate={{
              rotate: logoAnimation.rotate,
              scale: logoAnimation.scale,
              color: logoAnimation.color,
            }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            style={{ color: logoAnimation.color }}
          >
            {selectedService ? (
              <span style={{ color: '#FFA500' }}>DZ</span>
            ) : (
              <>
                <span style={{ color: '#FFA500' }}>D</span>ev<span style={{ color: '#FFA500' }}>Z</span>one<span style={{ color: '#FFA500' }}>DZ</span>
              </>
            )}
          </motion.div>
        </motion.div>
      </header>

      {/* Navigation for service details */}
      {selectedService && (
        <nav
          aria-label="Service navigation"
        >
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="fixed top-4 left-1/2 -translate-x-1/2 z-[100] flex gap-2 md:gap-6"
          >
            {services.map((service) => (
              <motion.button
                key={service.id}
                onClick={() => setSelectedService(service.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`w-9 h-9 md:w-16 md:h-16 rounded-xl flex items-center justify-center cursor-pointer border-2 border-white/20 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-white/50 transition-all ${selectedService === service.id ? 'opacity-100 scale-100' : 'opacity-60 scale-90'}`}
                style={{
                  background: `linear-gradient(135deg, ${service.color}40, ${service.color}20)`,
                }}
                aria-label={`View ${service.title} services`}
              >
                <div style={{ color: service.color }} className="md:hidden flex items-center justify-center w-4 h-4">
                  {React.cloneElement(service.icon as React.ReactElement, {})}
                </div>
                <div style={{ color: service.color }} className="hidden md:block flex items-center justify-center w-6 h-6">
                  {React.cloneElement(service.icon as React.ReactElement, {})}
                </div>
              </motion.button>
            ))}
          </motion.div>
        </nav>
      )}

      {/* Main content */}
      <main>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="min-h-screen flex flex-col items-center justify-center p-8"
        >
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{
              opacity: selectedService ? 0 : 1,
              y: selectedService ? -100 : 0
            }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
            className="text-center mb-8 md:mb-16 px-4"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 min-h-[3.5rem] md:min-h-[5rem]">
              <AnimatePresence mode="wait">
                <motion.span
                  key={currentLanguage}
                  initial={{ opacity: 0, y: 20, rotateX: -90 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  exit={{ opacity: 0, y: -20, rotateX: 90 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="inline-block"
                >
                  {translations[currentLanguage].title}
                </motion.span>
              </AnimatePresence>
            </h1>
            <p className="text-lg md:text-xl text-purple-200 min-h-[1.75rem] md:min-h-[2.5rem]">
              <AnimatePresence mode="wait">
                <motion.span
                  key={currentLanguage}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="inline-block"
                >
                  {translations[currentLanguage].subtitle}
                </motion.span>
              </AnimatePresence>
            </p>
          </motion.div>

          <section aria-label="Services">
            <div className={`grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-12 max-w-6xl relative px-4 ${selectedService ? 'hidden' : 'z-10'}`}>
              {services.map((service, index) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="relative"
                  style={{ perspective: '1000px' }}
                >
                  <motion.button
                    onClick={() => setSelectedService(service.id)}
                    whileHover={{ scale: 1.1, y: -10 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative w-20 h-20 sm:w-28 sm:h-28 md:w-48 md:h-48 rounded-2xl flex flex-col items-center justify-center gap-1 md:gap-4 cursor-pointer border-2 border-white/20 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-white/50"
                    style={{
                      background: `linear-gradient(135deg, ${service.color}40, ${service.color}20)`,
                    }}
                    aria-label={`View ${service.title} services`}
                    animate={
                      selectedService === service.id
                        ? {
                            scale: 1,
                            opacity: 1,
                            transition: {
                              duration: 0.8,
                              ease: [0.4, 0, 0.2, 1],
                            },
                          }
                        : selectedService
                        ? {
                            scale: 0.9,
                            opacity: 0.7,
                            transition: {
                              duration: 0.8,
                              ease: [0.4, 0, 0.2, 1],
                            },
                          }
                        : {}
                    }
                  >
                    <motion.div
                      style={{ color: service.color }}
                      className="md:hidden"
                    >
                      {React.cloneElement(service.icon as React.ReactElement, {})}
                    </motion.div>
                    <motion.div
                      style={{ color: service.color }}
                      className="hidden md:block"
                    >
                      {React.cloneElement(service.icon as React.ReactElement, {})}
                    </motion.div>
                    <span className="text-white font-semibold text-xs sm:text-sm md:text-lg">
                      <AnimatePresence mode="wait">
                        <motion.span
                          key={`${currentLanguage}-${service.id}`}
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -5 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="inline-block"
                        >
                          {translations[currentLanguage].services[service.id as 'website' | 'mobileapp' | 'desktopapp' | 'api']}
                        </motion.span>
                      </AnimatePresence>
                    </span>
                  </motion.button>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Get Quote Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: selectedService ? 0 : 1,
              y: selectedService ? -20 : 0
            }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="mt-8"
          >
            <motion.button
              onClick={() => setSelectedService('quote')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="min-w-[140px] md:min-w-[180px] px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-full border-2 border-white/20 backdrop-blur-sm hover:from-purple-500 hover:to-pink-500 transition-all shadow-lg shadow-purple-500/30"
            >
              <AnimatePresence mode="wait">
                <motion.span
                  key={currentLanguage}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="inline-block"
                >
                  {translations[currentLanguage].quote}
                </motion.span>
              </AnimatePresence>
            </motion.button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{
              opacity: selectedService ? 0 : 1,
            }}
            transition={{ delay: 0.6, ease: [0.4, 0, 0.2, 1] }}
            className="mt-6 md:mt-16 text-center text-purple-300 px-4"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex justify-center gap-3 md:gap-6"
            >
              <motion.a
                href="https://github.com/iimadouu/"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 md:p-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full hover:bg-white/20 transition-colors"
                aria-label="GitHub Profile"
              >
                <Github size={16} className="text-white md:size-20" />
              </motion.a>
              <motion.a
                href="https://facebook.com/DevZoneDz/"
                //onClick={() => { setComingSoonPlatform('Facebook'); setShowComingSoon(true); }}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 md:p-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full hover:bg-white/20 transition-colors"
                aria-label="Facebook Profile"
              >
                <Facebook size={16} className="text-white md:size-20" />
              </motion.a>
              <motion.button
                onClick={() => { setComingSoonPlatform('Instagram'); setShowComingSoon(true); }}
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 md:p-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full hover:bg-white/20 transition-colors"
                aria-label="Instagram Profile"
              >
                <Instagram size={16} className="text-white md:size-20" />
              </motion.button>
              <motion.button
                onClick={() => { setComingSoonPlatform('YouTube'); setShowComingSoon(true); }}
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 md:p-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full hover:bg-white/20 transition-colors"
                aria-label="YouTube Channel"
              >
                <Youtube size={16} className="text-white md:size-20" />
              </motion.button>
              <motion.button
                onClick={() => setShowContact(true)}
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 md:p-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full hover:bg-white/20 transition-colors"
                aria-label="Contact Information"
              >
                <Mail size={16} className="text-white md:size-20" />
              </motion.button>
            </motion.div>
          </motion.div>
        </motion.div>
      </main>

      {/* Service Details Page */}
      <AnimatePresence>
        {selectedService && (
          <>
            <motion.div
              key="demo-page"
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: '100%', opacity: 0 }}
              transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
              className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-auto overflow-x-hidden z-50"
            >
              <motion.button
                onClick={handleBackToServices}
                className="absolute top-4 left-4 md:top-6 md:left-6 z-50 flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white hover:bg-white/20 transition-colors text-xs md:text-sm"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                aria-label="Back to services"
              >
                <ArrowLeft size={14} className="md:size-16" />
                <span className="hidden sm:inline">Back</span>
              </motion.button>

              <div className="pt-24 md:pt-32">
                <AnimatePresence mode="wait">
                  {renderDemo()}
                </AnimatePresence>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Contact Modal */}
      <AnimatePresence>
        {showContact && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-xl z-[100] flex items-center justify-center p-4"
            onClick={() => setShowContact(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-gradient-to-br from-slate-900/80 to-purple-900/80 border border-white/20 rounded-3xl p-6 md:p-10 w-full max-w-4xl h-full max-h-[90vh] overflow-auto relative"
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-labelledby="contact-title"
            >
              <button
                onClick={() => setShowContact(false)}
                className="absolute top-4 right-4 text-white hover:text-purple-300 transition-colors"
                aria-label="Close contact modal"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>

              <h2 id="contact-title" className="text-2xl md:text-3xl font-bold text-white mb-6 text-center">Contact Me</h2>

              <section aria-label="Contact information">
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 bg-white/10 rounded-xl">
                    <Mail size={24} className="text-purple-400" aria-hidden="true" />
                    <div>
                      <p className="text-purple-300 text-sm">Email</p>
                      <p className="text-white font-semibold">imadedar98@gmail.com</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-4 bg-white/10 rounded-xl">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-purple-400" aria-hidden="true">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                    <div>
                      <p className="text-purple-300 text-sm">WhatsApp</p>
                      <p className="text-white font-semibold">+213 657 496 125</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-4 bg-white/10 rounded-xl">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-purple-400" aria-hidden="true">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                    <div>
                      <p className="text-purple-300 text-sm">Address</p>
                      <p className="text-white font-semibold">Chebli, Blida, Algeria</p>
                    </div>
                  </div>
                </div>
              </section>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Coming Soon Modal */}
      <AnimatePresence>
        {showComingSoon && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-xl z-[100] flex items-center justify-center p-4"
            onClick={() => setShowComingSoon(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, rotate: -10 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              exit={{ scale: 0.8, opacity: 0, rotate: 10 }}
              transition={{ duration: 0.4, type: 'spring' }}
              className="bg-gradient-to-br from-purple-600/90 to-pink-600/90 border border-white/30 rounded-3xl p-8 md:p-12 max-w-md w-full relative overflow-hidden"
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-labelledby="coming-soon-title"
            >
              {/* Animated background particles */}
              <div className="absolute inset-0 overflow-hidden">
                {[...Array(20)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-white/30 rounded-full"
                    initial={{
                      x: Math.random() * 100 + '%',
                      y: Math.random() * 100 + '%',
                      scale: 0,
                    }}
                    animate={{
                      scale: [0, 1, 0],
                      opacity: [0, 1, 0],
                    }}
                    transition={{
                      duration: 2 + Math.random() * 2,
                      repeat: Infinity,
                      delay: Math.random() * 2,
                    }}
                  />
                ))}
              </div>

              <button
                onClick={() => setShowComingSoon(false)}
                className="absolute top-4 right-4 text-white hover:text-white/80 transition-colors z-10"
                aria-label="Close modal"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>

              <div className="relative z-10 text-center">
                <motion.div
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="mb-6"
                >
                  {comingSoonPlatform === 'Facebook' && <Facebook size={64} className="text-white mx-auto" />}
                  {comingSoonPlatform === 'Instagram' && <Instagram size={64} className="text-white mx-auto" />}
                  {comingSoonPlatform === 'YouTube' && <Youtube size={64} className="text-white mx-auto" />}
                </motion.div>

                <motion.h2
                  id="coming-soon-title"
                  className="text-3xl md:text-4xl font-bold text-white mb-4"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  Coming Soon!
                </motion.h2>

                <motion.p
                  className="text-white/90 text-lg mb-6"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  {comingSoonPlatform} page is under construction. Stay tuned for amazing content!
                </motion.p>

                <motion.button
                  onClick={() => setShowComingSoon(false)}
                  className="px-8 py-3 bg-white text-purple-600 font-semibold rounded-full hover:bg-white/90 transition-colors"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Got it!
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}