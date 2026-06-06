import { motion } from 'motion/react';
import { Smartphone, Apple, PlayCircle, Bell, ShoppingCart, Heart, MessageCircle } from 'lucide-react';
import TypingText from './TypingText';

export default function MobileAppDemo() {
  const features = [
    {
      title: 'iOS Development',
      titleAr: 'تطوير iOS',
      titleFr: 'Développement iOS',
      description: 'Native apps for iPhone and iPad',
      icon: Apple,
      color: '#000000',
    },
    {
      title: 'Android Development',
      titleAr: 'تطوير Android',
      titleFr: 'Développement Android',
      description: 'Native apps for Android devices',
      icon: PlayCircle,
      color: '#3DDC84',
    },
    {
      title: 'Cross-Platform',
      titleAr: 'متعدد المنصات',
      titleFr: 'Multiplateforme',
      description: 'React Native & Flutter apps',
      icon: Smartphone,
      color: '#61DAFB',
    },
    {
      title: 'Push Notifications',
      titleAr: 'الإشعارات الفورية',
      titleFr: 'Notifications push',
      description: 'Keep users engaged',
      icon: Bell,
      color: '#F59E0B',
    },
    {
      title: 'E-Commerce Apps',
      titleAr: 'تطبيقات التسوق',
      titleFr: 'Applications e-commerce',
      description: 'Shopping apps with payments',
      icon: ShoppingCart,
      color: '#EC4899',
    },
    {
      title: 'Social Features',
      titleAr: 'ميزات اجتماعية',
      titleFr: 'Fonctionnalités sociales',
      description: 'Chat, likes, and sharing',
      icon: Heart,
      color: '#EF4444',
    },
  ];

  return (
    <motion.div
      key="mobileapp"
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
            className="inline-flex items-center justify-center w-16 h-16 md:w-24 md:h-24 mb-6 md:mb-8 bg-gradient-to-br from-pink-600 to-pink-400 rounded-3xl"
          >
            <Smartphone size={32} className="text-white md:size-48" />
          </motion.div>

          <TypingText
            text="أطور تطبيقات موبايل متقدمة لجميع المنصات"
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
            I develop advanced mobile apps for all platforms
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5 }}
          className="mb-8 md:mb-12"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 md:mb-8 text-center">Mobile Solutions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {features.map((feature, index) => {
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
          className="p-6 md:p-8 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl"
        >
          <h3 className="text-xl md:text-2xl font-bold text-white mb-4 md:mb-6 text-center">App Development Process</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
            {[
              { step: '1', title: 'Design', titleAr: 'التصميم', titleFr: 'Conception' },
              { step: '2', title: 'Develop', titleAr: 'التطوير', titleFr: 'Développement' },
              { step: '3', title: 'Test', titleAr: 'الاختبار', titleFr: 'Test' },
              { step: '4', title: 'Deploy', titleAr: 'النشر', titleFr: 'Déploiement' },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 3.7 + index * 0.1 }}
                className="text-center"
              >
                <div className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-2 md:mb-4 bg-gradient-to-br from-pink-600 to-purple-600 rounded-full flex items-center justify-center text-white text-lg md:text-2xl font-bold">
                  {item.step}
                </div>
                <p className="text-white font-semibold text-xs md:text-base mb-1">{item.title}</p>
                <p className="text-purple-300 text-xs md:text-sm" dir="rtl">{item.titleAr}</p>
                <p className="text-purple-300 text-xs md:text-sm">{item.titleFr}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
