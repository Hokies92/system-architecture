import React, { ReactNode } from 'react';
import { motion, AnimatePresence, MotionProps } from 'framer-motion';
import { fadeIn, scaleUp, staggerContainer, staggerItem } from '@/lib/animations';

// Types for animation components
type AnimatedElementProps = {
  children: ReactNode;
  animation?: 'fadeIn' | 'scaleUp' | 'staggerItem';
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  delay?: number;
  duration?: number;
  className?: string;
  onClick?: () => void;
  as?: React.ElementType;
} & MotionProps;

type AnimatedContainerProps = {
  children: ReactNode;
  className?: string;
  animation?: 'stagger';
  delay?: number;
  delayChildren?: number;
  staggerChildren?: number;
} & MotionProps;

// Animated wrapper component
export const AnimatedElement = ({
  children,
  animation = 'fadeIn',
  direction = 'up',
  delay = 0,
  duration = 0.3,
  className = '',
  onClick,
  as = 'div',
  ...motionProps
}: AnimatedElementProps) => {
  const getAnimationVariants = () => {
    if (animation === 'fadeIn') {
      return fadeIn(direction, duration, delay);
    } else if (animation === 'scaleUp') {
      return scaleUp;
    } else if (animation === 'staggerItem') {
      return staggerItem;
    }
    return fadeIn(direction, duration, delay);
  };

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={getAnimationVariants()}
      className={className}
      onClick={onClick}
      {...motionProps}
    >
      {children}
    </motion.div>
  );
};

// Animated container for staggered children animations
export const AnimatedContainer = ({
  children,
  className = '',
  animation = 'stagger',
  delay = 0,
  delayChildren = 0.1,
  staggerChildren = 0.05,
  ...motionProps
}: AnimatedContainerProps) => {
  const variants = {
    ...staggerContainer,
    animate: {
      ...staggerContainer.animate,
      transition: {
        ...(staggerContainer.animate as any)?.transition,
        delayChildren,
        staggerChildren,
        delay
      }
    }
  };

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={variants}
      className={className}
      {...motionProps}
    >
      {children}
    </motion.div>
  );
};

// For animating components when they appear/disappear (useful for modals, dialogs, etc.)
export const AnimatePresenceComponent = ({
  children,
  show = true,
  mode = 'wait'
}: {
  children: ReactNode;
  show?: boolean;
  mode?: 'sync' | 'wait' | 'popLayout';
}) => (
  <AnimatePresence mode={mode}>
    {show && children}
  </AnimatePresence>
);

// Animated List component for lists with staggered items
export const AnimatedList = ({
  items,
  renderItem,
  className = '',
  itemClassName = '',
  staggerDelay = 0.05,
  containerDelay = 0
}: {
  items: any[];
  renderItem: (item: any, index: number) => ReactNode;
  className?: string;
  itemClassName?: string;
  staggerDelay?: number;
  containerDelay?: number;
}) => (
  <AnimatedContainer 
    className={className}
    staggerChildren={staggerDelay}
    delay={containerDelay}
  >
    {items.map((item, index) => (
      <AnimatedElement
        key={index}
        animation="staggerItem"
        className={itemClassName}
      >
        {renderItem(item, index)}
      </AnimatedElement>
    ))}
  </AnimatedContainer>
);

// Animated Button component with hover effects
export const AnimatedButton = ({
  children,
  onClick,
  className = '',
  disabled = false,
  type = 'button',
  scaleFactor = 1.05,
  ...props
}: {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  scaleFactor?: number;
} & MotionProps) => (
  <motion.button
    type={type}
    onClick={onClick}
    className={className}
    disabled={disabled}
    whileHover={{ scale: disabled ? 1 : scaleFactor }}
    whileTap={{ scale: disabled ? 1 : 0.98 }}
    transition={{ duration: 0.2 }}
    {...props}
  >
    {children}
  </motion.button>
);

// Animated Card component with hover effects
export const AnimatedCard = ({
  children,
  className = '',
  hoverEffect = true,
  onClick,
  ...props
}: {
  children: ReactNode;
  className?: string;
  hoverEffect?: boolean;
  onClick?: () => void;
} & MotionProps) => (
  <motion.div
    className={className}
    initial="initial"
    animate="animate"
    whileHover={hoverEffect ? { y: -5, boxShadow: "0 10px 20px rgba(0, 0, 0, 0.1)" } : {}}
    whileTap={hoverEffect ? { y: -2 } : {}}
    transition={{ duration: 0.2 }}
    onClick={onClick}
    variants={fadeIn('up', 0.3)}
    {...props}
  >
    {children}
  </motion.div>
);

// Section animation that triggers on scroll
export const AnimatedSection = ({
  children,
  className = '',
  threshold = 0.1,
  ...props
}: {
  children: ReactNode;
  className?: string;
  threshold?: number;
} & MotionProps) => (
  <motion.section
    className={className}
    initial="offscreen"
    whileInView="onscreen"
    viewport={{ once: true, amount: threshold }}
    variants={{
      offscreen: {
        opacity: 0,
        y: 20
      },
      onscreen: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.6,
          ease: [0.22, 1, 0.36, 1]
        }
      }
    }}
    {...props}
  >
    {children}
  </motion.section>
);

// Text animation for headings and important text
export const AnimatedText = ({
  text,
  className = '',
  type = 'heading',
  staggerChildren = 0.02,
  ...props
}: {
  text: string;
  className?: string;
  type?: 'heading' | 'paragraph';
  staggerChildren?: number;
} & MotionProps) => {
  // For paragraph, animate whole lines
  if (type === 'paragraph') {
    const lines = text.split('. ').filter(line => line.trim() !== '');
    
    return (
      <motion.p
        className={className}
        initial="initial"
        animate="animate"
        variants={{
          initial: {},
          animate: {
            transition: {
              staggerChildren
            }
          }
        }}
        {...props}
      >
        {lines.map((line, i) => (
          <motion.span
            key={i}
            style={{ display: 'inline-block' }}
            variants={{
              initial: { opacity: 0, y: 10 },
              animate: { 
                opacity: 1, 
                y: 0,
                transition: {
                  duration: 0.5
                }
              }
            }}
          >
            {line}{i < lines.length - 1 ? '. ' : ''}
          </motion.span>
        ))}
      </motion.p>
    );
  }
  
  // For headings, animate each word
  const words = text.split(' ');
  
  return (
    <motion.h2
      className={className}
      initial="initial"
      animate="animate"
      variants={{
        initial: {},
        animate: {
          transition: {
            staggerChildren
          }
        }
      }}
      {...props}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          style={{ display: 'inline-block' }}
          variants={{
            initial: { opacity: 0, y: 20 },
            animate: { 
              opacity: 1, 
              y: 0,
              transition: {
                duration: 0.4
              }
            }
          }}
        >
          {word}{' '}
        </motion.span>
      ))}
    </motion.h2>
  );
};

// Animated Icons with various effects
export const AnimatedIcon = ({
  children,
  animation = 'pulse',
  className = '',
  size = 'md',
  ...props
}: {
  children: ReactNode;
  animation?: 'pulse' | 'rotate' | 'bounce' | 'none';
  className?: string;
  size?: 'sm' | 'md' | 'lg';
} & MotionProps) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  };

  const animationVariants = {
    pulse: {
      animate: {
        scale: [1, 1.1, 1],
        opacity: [0.8, 1, 0.8],
        transition: {
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }
      }
    },
    rotate: {
      animate: {
        rotate: 360,
        transition: {
          duration: 4,
          repeat: Infinity,
          ease: "linear"
        }
      }
    },
    bounce: {
      animate: {
        y: ["0%", "-15%", "0%"],
        transition: {
          duration: 1,
          repeat: Infinity,
          ease: "easeInOut"
        }
      }
    },
    none: {}
  };

  return (
    <motion.div
      className={`${sizeClasses[size]} ${className}`}
      animate={animation !== 'none' ? 'animate' : undefined}
      variants={animationVariants[animation]}
      {...props}
    >
      {children}
    </motion.div>
  );
};

// Tab transition component for smooth tab switching
export const AnimatedTabContent = ({
  children,
  isActive,
  className = ''
}: {
  children: ReactNode;
  isActive: boolean;
  className?: string;
}) => (
  <AnimatePresence mode="wait">
    {isActive && (
      <motion.div
        key="tab-content"
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -10 }}
        transition={{ duration: 0.3 }}
        className={className}
      >
        {children}
      </motion.div>
    )}
  </AnimatePresence>
);

// Toast notification with slide-in animation
export const AnimatedToast = ({
  children,
  show,
  position = 'top-right',
  className = ''
}: {
  children: ReactNode;
  show: boolean;
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
  className?: string;
}) => {
  const positionStyles = {
    'top-right': { top: 20, right: 20 },
    'top-left': { top: 20, left: 20 },
    'bottom-right': { bottom: 20, right: 20 },
    'bottom-left': { bottom: 20, left: 20 }
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className={`fixed z-50 ${className}`}
          style={positionStyles[position]}
          initial={{ opacity: 0, x: position.includes('right') ? 50 : -50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: position.includes('right') ? 50 : -50 }}
          transition={{ duration: 0.3 }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Loading spinner with animation
export const AnimatedSpinner = ({
  size = 'md',
  color = 'primary',
  className = ''
}: {
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'secondary' | 'success' | 'error';
  className?: string;
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  const colorClasses = {
    primary: 'border-blue-500',
    secondary: 'border-gray-500',
    success: 'border-green-500',
    error: 'border-red-500'
  };

  return (
    <motion.div
      className={`rounded-full border-t-transparent ${sizeClasses[size]} ${colorClasses[color]} border-4 ${className}`}
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
    />
  );
};

// Progress bar with animation
export const AnimatedProgressBar = ({
  progress,
  className = '',
  height = 'h-2',
  color = 'bg-blue-500',
  backgroundColor = 'bg-gray-200'
}: {
  progress: number;
  className?: string;
  height?: string;
  color?: string;
  backgroundColor?: string;
}) => (
  <div className={`w-full ${backgroundColor} rounded-full overflow-hidden ${height} ${className}`}>
    <motion.div
      className={`${color} h-full`}
      initial={{ width: 0 }}
      animate={{ width: `${progress}%` }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    />
  </div>
);