import { motion } from 'motion/react';
import { Globe, Zap, ShoppingBag, Layers, Code2, MessageCircle } from 'lucide-react';
import TypingText from './TypingText';

export default function WebsiteDemo() {
  const services = [
    {
      title: 'Landing Pages',
      titleAr: 'صفحات الهبوط',
      titleFr: 'Pages d\'atterrissage',
      description: 'High-converting pages designed to capture leads',
      icon: Zap,
      color: '#8B5CF6',
    },
    {
      title: 'Static Websites',
      titleAr: 'مواقع ثابتة',
      titleFr: 'Sites web statiques',
      description: 'Fast, secure, and SEO-optimized websites',
      icon: Globe,
      color: '#3B82F6',
    },
    {
      title: 'Dynamic Web Apps',
      titleAr: 'تطبيقات ويب ديناميكية',
      titleFr: 'Applications web dynamiques',
      description: 'Interactive applications with real-time features',
      icon: Layers,
      color: '#10B981',
    },
    {
      title: 'E-Commerce Websites',
      titleAr: 'مواقع التجارة الإلكترونية',
      titleFr: 'Sites e-commerce',
      description: 'Complete online stores with payment integration',
      icon: ShoppingBag,
      color: '#EC4899',
    },
    {
      title: 'Custom Web Solutions',
      titleAr: 'حلول ويب مخصصة',
      titleFr: 'Solutions web personnalisées',
      description: 'Tailored solutions for your unique business needs',
      icon: Code2,
      color: '#F59E0B',
    },
  ];

  return (
    <motion.div
      key="website"
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
            className="inline-flex items-center justify-center w-16 h-16 md:w-24 md:h-24 mb-6 md:mb-8 bg-gradient-to-br from-purple-600 to-purple-400 rounded-3xl"
          >
            <Globe size={32} className="text-white md:size-48" />
          </motion.div>

          <TypingText
            text="أقوم ببناء مواقع ويب احترافية تلبي احتياجاتك"
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
            I build professional websites tailored to your needs
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5 }}
          className="mb-8 md:mb-12"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 md:mb-8 text-center">Services Offered</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50, rotateX: -20 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{ delay: 2.7 + index * 0.1 }}
                  whileHover={{
                    y: -5,
                    scale: 1.02,
                    boxShadow: `0 0 20px ${service.color}40`,
                    transition: { duration: 0.3 },
                  }}
                  className="p-4 md:p-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl"
                >
                  <div
                    className="w-12 h-12 md:w-14 md:h-14 rounded-xl flex items-center justify-center mb-3 md:mb-4"
                    style={{ backgroundColor: `${service.color}30` }}
                  >
                    <Icon size={24} className="md:size-28" style={{ color: service.color }} />
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-white mb-1 md:mb-2">{service.title}</h3>
                  <p className="text-purple-200 text-xs md:text-sm mb-2 md:mb-3">{service.description}</p>
                  <p className="text-purple-300 text-xs md:text-sm font-semibold mb-1" dir="rtl">
                    {service.titleAr}
                  </p>
                  <p className="text-purple-300 text-xs md:text-sm font-semibold mb-2">
                    {service.titleFr}
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
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6"
        >
          <motion.div
            whileHover={{ scale: 1.05, y: -5 }}
            transition={{ duration: 0.3 }}
            className="p-4 md:p-6 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl text-center cursor-pointer"
          >
            <div className="text-3xl md:text-4xl font-bold text-white mb-1 md:mb-2">20+</div>
            <p className="text-purple-200 text-xs md:text-base">Projects Completed</p>
            <p className="text-purple-300 text-xs md:text-sm mt-1" dir="rtl">مشروع مكتمل</p>
            <p className="text-purple-300 text-xs md:text-sm">Projets réalisés</p>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05, y: -5 }}
            transition={{ duration: 0.3 }}
            className="p-4 md:p-6 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl text-center cursor-pointer"
          >
            <div className="text-3xl md:text-4xl font-bold text-white mb-1 md:mb-2">20+</div>
            <p className="text-purple-200 text-xs md:text-base">Happy Clients</p>
            <p className="text-purple-300 text-xs md:text-sm mt-1" dir="rtl">عميل راضٍ</p>
            <p className="text-purple-300 text-xs md:text-sm">Clients satisfaits</p>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05, y: -5 }}
            transition={{ duration: 0.3 }}
            className="p-4 md:p-6 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl text-center cursor-pointer"
          >
            <div className="text-3xl md:text-4xl font-bold text-white mb-1 md:mb-2">3+</div>
            <p className="text-purple-200 text-xs md:text-base">Years Experience</p>
            <p className="text-purple-300 text-xs md:text-sm mt-1" dir="rtl">سنوات خبرة</p>
            <p className="text-purple-300 text-xs md:text-sm">Années d'expérience</p>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}
