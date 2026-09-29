import { useEffect, useRef, useState, type FC } from 'react';
import { motion, useInView, useSpring, useTransform } from 'framer-motion';

interface ImpactCounterProps {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  duration?: number;
  className?: string;
}

export const ImpactCounter: FC<ImpactCounterProps> = ({
  value,
  suffix = '',
  prefix = '',
  label,
  duration = 2,
  className = '',
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [hasAnimated, setHasAnimated] = useState(false);

  const spring = useSpring(0, {
    mass: 1,
    stiffness: 75,
    damping: 15,
    duration: duration * 1000,
  });

  const display = useTransform(spring, (current) =>
    Math.floor(current).toLocaleString()
  );

  const [displayValue, setDisplayValue] = useState('0');

  useEffect(() => {
    if (isInView && !hasAnimated) {
      spring.set(value);
      setHasAnimated(true);
    }
  }, [isInView, hasAnimated, spring, value]);

  useEffect(() => {
    const unsubscribe = display.on('change', (latest) => {
      setDisplayValue(latest);
    });
    return () => unsubscribe();
  }, [display]);

  return (
    <motion.div
      ref={ref}
      className={`text-center ${className}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="relative inline-block">
        {/* Background glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-teal-200/30 to-coral-200/30 blur-3xl rounded-full scale-150" />
        
        <motion.div
          className="relative text-6xl md:text-8xl lg:text-9xl font-display font-bold text-gradient"
          initial={{ scale: 0.5, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {prefix}
          {displayValue}
          {suffix}
        </motion.div>
      </div>
      
      <motion.p 
        className="mt-4 text-lg md:text-xl text-charcoal-600 font-medium uppercase tracking-wider"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
      >
        {label}
      </motion.p>
    </motion.div>
  );
};

interface ImpactStatsProps {
  stats: Array<{
    value: number;
    suffix?: string;
    prefix?: string;
    label: string;
  }>;
  className?: string;
}

export const ImpactStats: FC<ImpactStatsProps> = ({
  stats,
  className = '',
}) => {
  return (
    <div className={`grid grid-cols-2 gap-8 md:gap-16 max-w-4xl mx-auto ${className}`}>
      {stats.map((stat, index) => (
        <ImpactCounter
          key={index}
          value={stat.value}
          suffix={stat.suffix}
          prefix={stat.prefix}
          label={stat.label}
          duration={2 + index * 0.2}
        />
      ))}
    </div>
  );
};

export default ImpactCounter;
