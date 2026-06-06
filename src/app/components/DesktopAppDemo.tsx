import { motion } from 'motion/react';
import { Monitor, Cpu, Database, Workflow, Settings, Lock, MessageCircle } from 'lucide-react';
import TypingText from './TypingText';

export default function DesktopAppDemo() {
  const capabilities = [
    {
      title: 'Cross-Platform Desktop',
      titleAr: 'تطبيقات سطح المكتب متعددة المنصات',
      titleFr: 'Bureautique multiplateforme',
      description: 'Windows, macOS, and Linux support',
      icon: Monitor,
      color: '#3B82F6',
    },
    {
      title: 'High Performance',
      titleAr: 'أداء عالي',
      titleFr: 'Hautes performances',
      description: 'Optimized for speed and efficiency',
      icon: Cpu,
      color: '#10B981',
    },
    {
      title: 'Local Database',
      titleAr: 'قاعدة بيانات محلية',
      titleFr: 'Base de données locale',
      description: 'Secure offline data storage',
      icon: Database,
      color: '#8B5CF6',
    },
    {
      title: 'Automation Tools',
      titleAr: 'أدوات الأتمتة',
      titleFr: 'Outils d\'automatisation',
      description: 'Workflow automation solutions',
      icon: Workflow,
      color: '#F59E0B',
    },
    {
      title: 'System Integration',
      titleAr: 'تكامل النظام',
      titleFr: 'Intégration système',
      description: 'Deep OS-level integration',
      icon: Settings,
      color: '#EC4899',
    },
    {
      title: 'Enterprise Security',
      titleAr: 'أمان المؤسسات',
      titleFr: 'Sécurité entreprise',
      description: 'Advanced security features',
      icon: Lock,
      color: '#EF4444',
    },
  ];

  return (
    <motion.div
      key="desktopapp"
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
            className="inline-flex items-center justify-center w-16 h-16 md:w-24 md:h-24 mb-6 md:mb-8 bg-gradient-to-br from-blue-600 to-blue-400 rounded-3xl"
          >
            <Monitor size={32} className="text-white md:size-48" />
          </motion.div>

          <TypingText
            text="أبني تطبيقات سطح مكتب قوية ومتعددة المنصات"
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
            I build powerful cross-platform desktop applications
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5 }}
          className="mb-8 md:mb-12"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 md:mb-8 text-center">Desktop Capabilities</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {capabilities.map((capability, index) => {
              const Icon = capability.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50, rotateX: -20 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{ delay: 2.7 + index * 0.1 }}
                  whileHover={{
                    y: -5,
                    scale: 1.02,
                    boxShadow: `0 0 20px ${capability.color}40`,
                    transition: { duration: 0.3 },
                  }}
                  className="p-4 md:p-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl"
                >
                  <div
                    className="w-12 h-12 md:w-14 md:h-14 rounded-xl flex items-center justify-center mb-3 md:mb-4"
                    style={{ backgroundColor: `${capability.color}30` }}
                  >
                    <Icon size={24} className="md:size-28" style={{ color: capability.color }} />
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-white mb-1 md:mb-2">{capability.title}</h3>
                  <p className="text-purple-200 text-xs md:text-sm mb-2 md:mb-3">{capability.description}</p>
                  <p className="text-purple-300 text-xs md:text-sm font-semibold mb-1" dir="rtl">
                    {capability.titleAr}
                  </p>
                  <p className="text-purple-300 text-xs md:text-sm font-semibold mb-2">
                    {capability.titleFr}
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
          className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6"
        >
          <div className="p-4 md:p-8 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl">
            <h3 className="text-lg md:text-2xl font-bold text-white mb-4 md:mb-6">Technologies Used</h3>
            <div className="space-y-4">
              {[
                { tech: 'Electron', desc: 'Cross-platform framework', descAr: 'إطار عمل متعدد المنصات', descFr: 'Framework multiplateforme' },
                { tech: 'Tauri', desc: 'Lightweight alternative', descAr: 'بديل خفيف الوزن', descFr: 'Alternative légère' },
                { tech: 'Qt', desc: 'Native performance', descAr: 'أداء أصلي', descFr: 'Performance native' },
                { tech: '.NET', desc: 'Enterprise solutions', descAr: 'حلول المؤسسات', descFr: 'Solutions entreprise' },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 3.7 + index * 0.1 }}
                  className="flex items-center justify-between p-3 md:p-4 bg-white/5 rounded-xl"
                >
                  <div>
                    <p className="text-white font-semibold text-sm md:text-base">{item.tech}</p>
                    <p className="text-purple-200 text-xs md:text-sm">{item.desc}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-purple-300 text-xs md:text-sm" dir="rtl">{item.descAr}</p>
                    <p className="text-purple-300 text-xs md:text-sm">{item.descFr}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="p-4 md:p-8 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl">
            <h3 className="text-lg md:text-2xl font-bold text-white mb-4 md:mb-6">Use Cases</h3>
            <div className="space-y-4">
              {[
                'Business Management Systems',
                'Data Analysis Tools',
                'Media Editing Software',
                'Productivity Applications',
              ].map((useCase, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 3.7 + index * 0.1 }}
                  className="flex items-center gap-2 md:gap-3 p-3 md:p-4 bg-white/5 rounded-xl"
                >
                  <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-blue-500 rounded-full" />
                  <p className="text-purple-200 text-xs md:text-sm">{useCase}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
