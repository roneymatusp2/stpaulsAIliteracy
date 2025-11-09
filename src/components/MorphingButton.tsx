import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface MorphingButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
  className?: string;
  href?: string;
}

const MorphingButton: React.FC<MorphingButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  className = '',
  href
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  const baseClasses = `
    relative overflow-hidden rounded-2xl font-semibold
    transform-gpu transition-all duration-300
    focus:outline-none focus:ring-4 focus:ring-white/25
  `;

  const variants = {
    primary: 'bg-gradient-to-r from-sps-ruby to-sps-indigo text-white',
    secondary: 'bg-white/15 backdrop-blur-sm border border-white/40 text-white'
  };

  const buttonVariants = {
    initial: { 
      scale: 1,
      rotateX: 0,
      rotateY: 0,
    },
    hover: { 
      scale: 1.05,
      rotateX: 5,
      rotateY: 5,
      transition: { 
        type: "spring", 
        stiffness: 400, 
        damping: 25 
      }
    },
    tap: { 
      scale: 0.95,
      rotateX: -5,
      rotateY: -5,
      transition: { 
        type: "spring", 
        stiffness: 600, 
        damping: 30 
      }
    }
  };

  const shimmerVariants = {
    initial: { x: '-100%', opacity: 0 },
    hover: { 
      x: '100%', 
      opacity: [0, 1, 0],
      transition: { 
        duration: 0.6,
        ease: "easeInOut"
      }
    }
  };

  const glowVariants = {
    initial: { opacity: 0, scale: 0.8 },
    hover: { 
      opacity: 0.6, 
      scale: 1.2,
      transition: { 
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  const rippleVariants = {
    initial: { scale: 0, opacity: 0.5 },
    animate: { 
      scale: 1.5, 
      opacity: 0,
      transition: { 
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const ButtonContent = () => (
    <motion.button
      variants={buttonVariants}
      initial="initial"
      whileHover="hover"
      whileTap="tap"
      className={`${baseClasses} ${variants[variant]} ${className} px-8 py-4 perspective-1000`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onClick={onClick}
      style={{
        transformStyle: 'preserve-3d',
        perspective: '1000px'
      }}
    >
      {/* Glow effect */}
      <motion.div
        variants={glowVariants}
        initial="initial"
        animate={isHovered ? "hover" : "initial"}
        className="absolute inset-0 bg-gradient-to-r from-sps-ruby to-sps-indigo rounded-2xl blur-lg"
        style={{ zIndex: -1 }}
      />

      {/* Shimmer effect */}
      <motion.div
        variants={shimmerVariants}
        initial="initial"
        animate={isHovered ? "hover" : "initial"}
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-2xl"
        style={{ transform: 'skewX(-20deg)' }}
      />

      {/* Ripple effect */}
      <AnimatePresence>
        {isPressed && (
          <motion.div
            variants={rippleVariants}
            initial="initial"
            animate="animate"
            exit="initial"
            className="absolute inset-0 bg-white/20 rounded-2xl"
          />
        )}
      </AnimatePresence>

      {/* Content */}
      <motion.span
        className="relative z-10 flex items-center justify-center"
        animate={{
          y: isPressed ? 1 : 0,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      >
        {children}
      </motion.span>

      {/* Particles on hover */}
      <AnimatePresence>
        {isHovered && (
          <>
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ 
                  scale: 0, 
                  x: 0, 
                  y: 0, 
                  opacity: 1 
                }}
                animate={{ 
                  scale: [0, 1, 0], 
                  x: (Math.random() - 0.5) * 100,
                  y: (Math.random() - 0.5) * 100,
                  opacity: [1, 0.5, 0]
                }}
                exit={{ opacity: 0 }}
                transition={{ 
                  duration: 1,
                  delay: i * 0.1,
                  ease: "easeOut"
                }}
                className="absolute w-1 h-1 bg-white rounded-full"
                style={{
                  left: '50%',
                  top: '50%',
                }}
              />
            ))}
          </>
        )}
      </AnimatePresence>
    </motion.button>
  );

  if (href) {
    return (
      <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        variants={buttonVariants}
        initial="initial"
        whileHover="hover"
        whileTap="tap"
        className={`${baseClasses} ${variants[variant]} ${className} px-8 py-4 perspective-1000 inline-flex items-center justify-center overflow-hidden rounded-2xl`}
        onClick={onClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onMouseDown={() => setIsPressed(true)}
        onMouseUp={() => setIsPressed(false)}
        style={{
          transformStyle: 'preserve-3d',
          perspective: '1000px'
        }}
      >
        {/* Glow effect */}
      <motion.div
        variants={glowVariants}
        initial="initial"
        animate={isHovered ? "hover" : "initial"}
        className="absolute inset-0 bg-gradient-to-r from-sps-ruby to-sps-indigo rounded-2xl blur-lg"
        style={{ zIndex: -1 }}
      />

        {/* Shimmer effect */}
        <motion.div
          variants={shimmerVariants}
          initial="initial"
          animate={isHovered ? "hover" : "initial"}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-2xl"
          style={{ transform: 'skewX(-20deg)' }}
        />

        {/* Ripple effect */}
        <AnimatePresence>
          {isPressed && (
            <motion.div
              variants={rippleVariants}
              initial="initial"
              animate="animate"
              exit="initial"
              className="absolute inset-0 bg-white/20 rounded-2xl"
            />
          )}
        </AnimatePresence>

        {/* Content */}
        <motion.span
          className="relative z-10 flex items-center justify-center"
          animate={{
            y: isPressed ? 1 : 0,
          }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        >
          {children}
        </motion.span>
      </motion.a>
    );
  }

  return <ButtonContent />;
};

export default MorphingButton;
