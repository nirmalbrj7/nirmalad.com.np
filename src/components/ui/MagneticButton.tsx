import { useRef, useState, type ReactNode, type MouseEvent, type FC } from 'react';
import { motion } from 'framer-motion';

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'coral' | 'ghost';
}

export const MagneticButton: FC<MagneticButtonProps> = ({
  children,
  className = '',
  onClick,
  variant = 'primary',
}) => {
  const ref = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: MouseEvent<HTMLButtonElement>) => {
    if (!ref.current) return;
    
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    
    const distanceX = clientX - centerX;
    const distanceY = clientY - centerY;
    
    // Magnetic effect strength (closer to center = stronger pull)
    const strength = 0.3;
    setPosition({
      x: distanceX * strength,
      y: distanceY * strength,
    });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const baseStyles = 'relative inline-flex items-center justify-center px-8 py-4 rounded-full font-semibold transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2';
  
  const variantStyles = {
    primary: 'bg-teal-600 text-white shadow-lg hover:shadow-xl hover:bg-teal-700',
    secondary: 'bg-white text-teal-700 border-2 border-teal-600 hover:bg-teal-50',
    coral: 'bg-coral-500 text-white shadow-lg hover:shadow-xl hover:bg-coral-600',
    ghost: 'bg-transparent text-charcoal-700 hover:text-teal-600 hover:bg-teal-50/50',
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 350, damping: 15, mass: 0.5 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
    >
      <motion.span
        animate={{ x: position.x * 0.3, y: position.y * 0.3 }}
        transition={{ type: 'spring', stiffness: 350, damping: 15, mass: 0.5 }}
      >
        {children}
      </motion.span>
    </motion.button>
  );
};

export default MagneticButton;
