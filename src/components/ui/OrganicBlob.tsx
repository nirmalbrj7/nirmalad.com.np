import type { FC } from 'react';
import { motion } from 'framer-motion';

interface BlobProps {
  className?: string;
  color?: 'teal' | 'coral' | 'sand';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  delay?: number;
}

const colorMap = {
  teal: 'bg-teal-400/30',
  coral: 'bg-coral-400/25',
  sand: 'bg-sand-300/30',
};

const sizeMap = {
  sm: 'w-64 h-64',
  md: 'w-96 h-96',
  lg: 'w-[500px] h-[500px]',
  xl: 'w-[700px] h-[700px]',
};

export const OrganicBlob: FC<BlobProps> = ({
  className = '',
  color = 'teal',
  size = 'lg',
  delay = 0,
}) => {
  return (
    <motion.div
      className={`absolute rounded-full blur-3xl ${colorMap[color]} ${sizeMap[size]} ${className}`}
      style={{ filter: 'blur(80px)' }}
      animate={{
        x: [0, 30, -20, 10, 0],
        y: [0, -30, 20, -10, 0],
        scale: [1, 1.1, 0.95, 1.05, 1],
        borderRadius: [
          '60% 40% 30% 70% / 60% 30% 70% 40%',
          '30% 60% 70% 40% / 50% 60% 30% 60%',
          '50% 60% 30% 60% / 30% 60% 70% 40%',
          '60% 40% 60% 40% / 60% 30% 60% 40%',
          '60% 40% 30% 70% / 60% 30% 70% 40%',
        ],
      }}
      transition={{
        duration: 15,
        repeat: Infinity,
        ease: 'easeInOut',
        delay,
      }}
    />
  );
};

export const BlobGroup: FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      <OrganicBlob
        color="teal"
        size="xl"
        className="top-0 left-0 -translate-x-1/4 -translate-y-1/4"
        delay={0}
      />
      <OrganicBlob
        color="coral"
        size="lg"
        className="top-1/3 right-0 translate-x-1/4"
        delay={2}
      />
      <OrganicBlob
        color="sand"
        size="md"
        className="bottom-0 left-1/3 translate-y-1/4"
        delay={4}
      />
      <OrganicBlob
        color="teal"
        size="sm"
        className="top-1/2 right-1/4"
        delay={1}
      />
    </div>
  );
};

export default OrganicBlob;
