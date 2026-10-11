import { Variants } from 'framer-motion';

// Page transitions
export const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.3, ease: "easeInOut" }
};

// Animation variants for components

// Fade in variants with customizable direction
export const fadeIn = (
  direction: 'up' | 'down' | 'left' | 'right' | 'none' = 'none', 
  duration: number = 0.3,
  delay: number = 0
): Variants => {
  const directions = {
    up: { y: 20 },
    down: { y: -20 },
    left: { x: 20 },
    right: { x: -20 },
    none: { x: 0, y: 0 }
  };
  
  return {
    initial: {
      opacity: 0,
      ...directions[direction]
    },
    animate: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration,
        ease: [0.22, 1, 0.36, 1], // Custom cubic-bezier for smooth feeling
        delay
      }
    },
    exit: {
      opacity: 0,
      ...directions[direction],
      transition: {
        duration: duration * 0.8,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };
};

// Scale up with fade
export const scaleUp: Variants = {
  initial: {
    opacity: 0,
    scale: 0.95
  },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.3,
      ease: [0.22, 1, 0.36, 1]
    }
  },
  exit: {
    opacity: 0,
    scale: 0.98,
    transition: {
      duration: 0.2,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

// Staggered children animation
export const staggerContainer: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1
    }
  },
  exit: {
    transition: {
      staggerChildren: 0.03,
      staggerDirection: -1
    }
  }
};

// Child item for staggered animations
export const staggerItem: Variants = {
  initial: {
    opacity: 0,
    y: 10
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  },
  exit: {
    opacity: 0,
    y: 5,
    transition: {
      duration: 0.2,
      ease: "easeIn"
    }
  }
};

// List item hover animation
export const listItemHover = {
  whileHover: {
    scale: 1.02,
    backgroundColor: "rgba(243, 244, 246, 1)",
    transition: { duration: 0.2 }
  },
  whileTap: {
    scale: 0.98
  }
};

// Button hover effects
export const buttonHoverEffect = {
  whileHover: { 
    scale: 1.05,
    transition: { duration: 0.2 }
  },
  whileTap: { 
    scale: 0.95,
    transition: { duration: 0.1 }
  }
};

// Card hover effects
export const cardHoverEffect = {
  whileHover: { 
    y: -5,
    boxShadow: "0 10px 20px rgba(0, 0, 0, 0.1)",
    transition: { duration: 0.3 }
  },
  whileTap: { 
    y: -2,
    boxShadow: "0 5px 10px rgba(0, 0, 0, 0.05)",
    transition: { duration: 0.1 }
  }
};

// Step transition animations
export const stepTransition: Variants = {
  initial: {
    opacity: 0,
    y: -10,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1]
    }
  },
  exit: {
    opacity: 0,
    y: 10,
    transition: {
      duration: 0.3,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

// Component highlight animation
export const highlightAnimation = {
  initial: {
    boxShadow: "0 0 0 0 rgba(59, 130, 246, 0)",
  },
  animate: {
    boxShadow: [
      "0 0 0 0 rgba(59, 130, 246, 0)",
      "0 0 0 3px rgba(59, 130, 246, 0.3)",
      "0 0 0 6px rgba(59, 130, 246, 0)",
    ],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      repeatType: "loop"
    }
  }
};

// Section entry animations
export const sectionEntryVariants: Variants = {
  offscreen: {
    opacity: 0,
    y: 30
  },
  onscreen: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

// Rotating gear animation
export const rotateGear = {
  animate: {
    rotate: 360,
    transition: {
      duration: 10,
      ease: "linear",
      repeat: Infinity
    }
  }
};

// Pulse animation
export const pulseAnimation = {
  animate: {
    scale: [1, 1.05, 1],
    opacity: [0.7, 0.9, 0.7],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

// Path drawing animation for SVG paths
export const drawPath = {
  initial: {
    pathLength: 0,
    opacity: 0
  },
  animate: {
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { duration: 1.5, ease: "easeInOut" },
      opacity: { duration: 0.3 }
    }
  }
};

// Slide in notification
export const slideInNotification: Variants = {
  initial: {
    opacity: 0,
    x: 40,
    y: 0
  },
  animate: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1]
    }
  },
  exit: {
    opacity: 0,
    x: 40,
    transition: {
      duration: 0.3,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

// Connection line animation for architecture diagram
export const connectionLineAnimation = {
  initial: {
    pathLength: 0,
    opacity: 0
  },
  animate: {
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { duration: 0.8, ease: "easeOut" },
      opacity: { duration: 0.3 }
    }
  },
  exit: {
    pathLength: 0,
    opacity: 0,
    transition: {
      pathLength: { duration: 0.4, ease: "easeIn" },
      opacity: { duration: 0.2 }
    }
  }
};

// Menu and accordion animations
export const accordionAnimation = {
  open: {
    height: "auto",
    opacity: 1,
    transition: {
      height: {
        duration: 0.3,
        ease: [0.22, 1, 0.36, 1]
      },
      opacity: {
        duration: 0.25,
        delay: 0.05
      }
    }
  },
  closed: {
    height: 0,
    opacity: 0,
    transition: {
      height: {
        duration: 0.3,
        ease: [0.22, 1, 0.36, 1]
      },
      opacity: {
        duration: 0.2
      }
    }
  }
};

// Tab change animation
export const tabChangeAnimation: Variants = {
  initial: {
    opacity: 0,
    x: 10
  },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  },
  exit: {
    opacity: 0,
    x: -10,
    transition: {
      duration: 0.2,
      ease: "easeIn"
    }
  }
};

// Loading/Progress animations
export const loadingContainerAnimation: Variants = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export const loadingDotAnimation: Variants = {
  initial: {
    y: 0,
    opacity: 0.5
  },
  animate: {
    y: [0, -10, 0],
    opacity: [0.5, 1, 0.5],
    transition: {
      y: {
        repeat: Infinity,
        duration: 0.6,
        ease: "easeInOut"
      },
      opacity: {
        repeat: Infinity,
        duration: 0.6,
        ease: "easeInOut"
      }
    }
  }
};

// Micro-interaction animations for UI elements
export const microInteractions = {
  // For checkboxes
  checkbox: {
    checked: {
      scale: [1, 1.2, 1],
      transition: { duration: 0.3 }
    }
  },
  
  // For radio buttons
  radio: {
    checked: {
      scale: [1, 1.1, 1],
      transition: { duration: 0.3 }
    }
  },
  
  // For input focus
  input: {
    focus: {
      boxShadow: "0 0 0 2px rgba(59, 130, 246, 0.3)",
      transition: { duration: 0.2 }
    }
  }
};

// Animation variants for modal dialogs
export const modalVariants: Variants = {
  initial: {
    opacity: 0,
    scale: 0.95,
    y: 20
  },
  animate: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: [0.22, 1, 0.36, 1]
    }
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: 10,
    transition: {
      duration: 0.2,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

// Backdrop animation for modals/dialogs
export const backdropVariants: Variants = {
  initial: {
    opacity: 0
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.3
    }
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.2,
      delay: 0.1
    }
  }
};