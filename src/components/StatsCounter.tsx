import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView, useSpring, useTransform } from 'framer-motion';

interface StatsCounterProps {
  end: number;
  suffix?: string;
  prefix?: string;
  label: string;
  icon?: React.ReactNode;
  className?: string;
}

const StatsCounter: React.FC<StatsCounterProps> = ({
  end,
  suffix = '',
  prefix = '',
  label,
  icon,
  className = ''
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hasAnimated, setHasAnimated] = useState(false);

  const springValue = useSpring(0, {
    stiffness: 100,
    damping: 30,
  });

  const displayValue = useTransform(springValue, (value) => {
    if (end >= 1000000) {
      return (value / 1000000).toFixed(1) + 'M';
    } else if (end >= 1000) {
      return (value / 1000).toFixed(1) + 'K';
    }
    return Math.round(value).toString();
  });

  useEffect(() => {
    if (isInView && !hasAnimated) {
      springValue.set(end);
      setHasAnimated(true);
    }
  }, [isInView, end, springValue, hasAnimated]);

  return (
    <motion.div
      ref={ref}
      className={`text-center ${className}`}
      initial={{ opacity: 0, y: 50, scale: 0.8 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
    >
      {icon && (
        <motion.div
          className="mb-4 flex justify-center"
          animate={isInView ? {
            scale: [1, 1.2, 1],
            rotate: [0, 10, -10, 0],
          } : {}}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div className="w-16 h-16 bg-gradient-to-r from-sps-ruby to-sps-indigo rounded-2xl flex items-center justify-center text-white text-2xl shadow-lg">
            {icon}
          </div>
        </motion.div>
      )}

      <motion.div
        className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-2"
        animate={isInView ? {
          textShadow: [
            "0 0 0 transparent",
            "0 0 20px rgba(130, 0, 33, 0.5)",
            "0 0 0 transparent",
          ]
        } : {}}
        transition={{ duration: 3, repeat: Infinity }}
      >
        {prefix}
        <motion.span>{displayValue}</motion.span>
        {suffix}
      </motion.div>

      <motion.p
        className="text-lg text-gray-600 dark:text-gray-400 font-medium"
        animate={isInView ? { opacity: [0.7, 1, 0.7] } : {}}
        transition={{ duration: 2, repeat: Infinity }}
      >
        {label}
      </motion.p>

      <motion.div
        className="h-1 bg-gradient-to-r from-sps-ruby to-sps-indigo rounded-full mt-3 mx-auto"
        initial={{ width: 0 }}
        animate={isInView ? { width: '60%' } : {}}
        transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
      />
    </motion.div>
  );
};

export default StatsCounter;
