import { useState, useEffect } from 'react';
import { motion } from 'motion/react';

interface TypingTextProps {
  text: string;
  delay?: number;
  speed?: number;
  className?: string;
  dir?: 'ltr' | 'rtl';
  cursorColor?: string;
}

export default function TypingText({ text, delay = 0, speed = 50, className = '', dir = 'ltr', cursorColor = 'currentColor' }: TypingTextProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const startTimer = setTimeout(() => {
      setStarted(true);
    }, delay);

    return () => clearTimeout(startTimer);
  }, [delay]);

  useEffect(() => {
    if (!started) return;

    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);

      return () => clearTimeout(timer);
    }
  }, [currentIndex, text, speed, started]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={className}
      dir={dir}
    >
      {displayedText}
      {currentIndex < text.length && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
          className="inline-block w-0.5 h-6 ml-1"
          style={{ backgroundColor: cursorColor }}
        />
      )}
    </motion.div>
  );
}
