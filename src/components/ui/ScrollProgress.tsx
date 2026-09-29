import { useRef, type ReactNode, type FC } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

interface ScrollProgressProps {
  className?: string;
  color?: string;
}

export const ScrollProgress: FC<ScrollProgressProps> = ({
  className = '',
  color = 'bg-gradient-to-r from-teal-500 to-coral-500',
}) => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className={`fixed top-0 left-0 right-0 h-1 ${color} origin-left z-[100] ${className}`}
      style={{ scaleX }}
    />
  );
};

interface SectionProgressProps {
  children: ReactNode;
  className?: string;
}

export const SectionProgress: FC<SectionProgressProps> = ({
  children,
  className = '',
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const opacity = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
  });

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ opacity }}
    >
      {children}
    </motion.div>
  );
};

export default ScrollProgress;
