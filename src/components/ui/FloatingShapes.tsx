
import { motion } from 'framer-motion';

import type { FC } from 'react';

interface FloatingShapesProps {
  className?: string;
}

export const FloatingShapes: FC<FloatingShapesProps> = ({ className = '' }) => {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {/* Cube */}
      <motion.div
        className="absolute top-[20%] left-[15%]"
        animate={{
          y: [0, -30, 0],
          rotateX: [0, 360],
          rotateY: [0, 360],
        }}
        transition={{
          y: { duration: 6, repeat: Infinity, ease: 'easeInOut' },
          rotateX: { duration: 20, repeat: Infinity, ease: 'linear' },
          rotateY: { duration: 15, repeat: Infinity, ease: 'linear' },
        }}
        style={{ perspective: 1000 }}
      >
        <div className="w-16 h-16 md:w-24 md:h-24 relative" style={{ transformStyle: 'preserve-3d' }}>
          {/* Cube faces */}
          <div className="absolute inset-0 bg-teal-500/20 backdrop-blur-sm border border-teal-400/30" style={{ transform: 'translateZ(48px)' }} />
          <div className="absolute inset-0 bg-teal-500/10 backdrop-blur-sm border border-teal-400/30" style={{ transform: 'rotateY(180deg) translateZ(48px)' }} />
          <div className="absolute inset-0 bg-teal-400/20 backdrop-blur-sm border border-teal-400/30" style={{ transform: 'rotateY(90deg) translateZ(48px)' }} />
          <div className="absolute inset-0 bg-teal-400/10 backdrop-blur-sm border border-teal-400/30" style={{ transform: 'rotateY(-90deg) translateZ(48px)' }} />
          <div className="absolute inset-0 bg-coral-500/20 backdrop-blur-sm border border-coral-400/30" style={{ transform: 'rotateX(90deg) translateZ(48px)' }} />
          <div className="absolute inset-0 bg-coral-500/10 backdrop-blur-sm border border-coral-400/30" style={{ transform: 'rotateX(-90deg) translateZ(48px)' }} />
        </div>
      </motion.div>

      {/* Sphere */}
      <motion.div
        className="absolute top-[60%] right-[20%]"
        animate={{
          y: [0, 40, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1,
        }}
      >
        <div className="w-20 h-20 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-coral-400/30 to-coral-600/20 backdrop-blur-sm border border-coral-400/30 shadow-lg shadow-coral-500/10" />
      </motion.div>

      {/* Pyramid/Tetrahedron */}
      <motion.div
        className="absolute bottom-[25%] left-[25%]"
        animate={{
          y: [0, -20, 0],
          rotateZ: [0, 10, -10, 0],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2,
        }}
      >
        <svg
          width="80"
          height="80"
          viewBox="0 0 100 100"
          className="w-16 h-16 md:w-20 md:h-20 opacity-60"
        >
          <defs>
            <linearGradient id="pyramidGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0d7377" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#e07a5f" stopOpacity="0.3" />
            </linearGradient>
          </defs>
          <polygon
            points="50,10 90,90 10,90"
            fill="url(#pyramidGradient)"
            stroke="#0d7377"
            strokeWidth="1"
            strokeOpacity="0.5"
          />
          <line x1="50" y1="10" x2="50" y2="90" stroke="#0d7377" strokeWidth="1" strokeOpacity="0.3" />
        </svg>
      </motion.div>

      {/* Ring/Torus */}
      <motion.div
        className="absolute top-[35%] right-[35%]"
        animate={{
          rotate: [0, 360],
          scale: [1, 1.05, 1],
        }}
        transition={{
          rotate: { duration: 30, repeat: Infinity, ease: 'linear' },
          scale: { duration: 5, repeat: Infinity, ease: 'easeInOut' },
        }}
      >
        <svg
          width="100"
          height="100"
          viewBox="0 0 100 100"
          className="w-20 h-20 md:w-28 md:h-28 opacity-50"
        >
          <defs>
            <linearGradient id="ringGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0d7377" />
              <stop offset="50%" stopColor="#e07a5f" />
              <stop offset="100%" stopColor="#0d7377" />
            </linearGradient>
          </defs>
          <circle
            cx="50"
            cy="50"
            r="35"
            fill="none"
            stroke="url(#ringGradient)"
            strokeWidth="3"
            strokeOpacity="0.6"
          />
          <circle
            cx="50"
            cy="50"
            r="25"
            fill="none"
            stroke="url(#ringGradient)"
            strokeWidth="1"
            strokeOpacity="0.3"
          />
        </svg>
      </motion.div>

      {/* Small floating particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full bg-teal-400/40"
          style={{
            left: `${15 + i * 15}%`,
            top: `${20 + (i % 3) * 25}%`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 3 + i * 0.5,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.3,
          }}
        />
      ))}

      {/* Connection lines */}
      <svg className="absolute inset-0 w-full h-full opacity-20">
        <defs>
          <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0d7377" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#e07a5f" stopOpacity="0.5" />
          </linearGradient>
        </defs>
        <motion.path
          d="M 200 150 Q 400 100 600 200"
          fill="none"
          stroke="url(#lineGrad)"
          strokeWidth="1"
          strokeDasharray="5 5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
        />
        <motion.path
          d="M 700 400 Q 500 350 300 450"
          fill="none"
          stroke="url(#lineGrad)"
          strokeWidth="1"
          strokeDasharray="5 5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 4, repeat: Infinity, ease: 'linear', delay: 1 }}
        />
      </svg>
    </div>
  );
};

export default FloatingShapes;
