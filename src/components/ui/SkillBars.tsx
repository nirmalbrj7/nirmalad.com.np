import { useRef, type FC } from 'react';
import { motion, useInView } from 'framer-motion';

interface Skill {
  name: string;
  level: number;
  color?: string;
}

interface SkillBarsProps {
  skills: Skill[];
  className?: string;
  showPercentage?: boolean;
}

export const SkillBars: FC<SkillBarsProps> = ({
  skills,
  className = '',
  showPercentage = true,
}) => {
  return (
    <div className={`space-y-6 ${className}`}>
      {skills.map((skill, index) => (
        <SkillBar
          key={skill.name}
          skill={skill}
          index={index}
          showPercentage={showPercentage}
        />
      ))}
    </div>
  );
};

interface SkillBarProps {
  skill: Skill;
  index: number;
  showPercentage: boolean;
}

const SkillBar: FC<SkillBarProps> = ({ skill, index, showPercentage }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  const getColorClass = (level: number) => {
    if (level >= 90) return 'bg-gradient-to-r from-teal-500 to-teal-400';
    if (level >= 75) return 'bg-gradient-to-r from-teal-500 to-coral-400';
    return 'bg-gradient-to-r from-coral-400 to-coral-500';
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className="flex justify-between items-center mb-2">
        <span className="font-medium text-charcoal-800">{skill.name}</span>
        {showPercentage && (
          <motion.span
            className="text-sm font-semibold text-teal-600"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.5 + index * 0.1 }}
          >
            {skill.level}%
          </motion.span>
        )}
      </div>
      
      <div className="h-2 bg-charcoal-100 rounded-full overflow-hidden">
        <motion.div
          className={`h-full rounded-full ${getColorClass(skill.level)}`}
          initial={{ width: 0 }}
          animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
          transition={{
            duration: 1.2,
            delay: 0.2 + index * 0.1,
            ease: [0.33, 1, 0.68, 1],
          }}
        />
      </div>
    </motion.div>
  );
};

interface CircularSkillProps {
  skill: Skill;
  size?: number;
  className?: string;
}

export const CircularSkill: FC<CircularSkillProps> = ({
  skill,
  size = 120,
  className = '',
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  
  const strokeWidth = 8;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (skill.level / 100) * circumference;

  return (
    <motion.div
      ref={ref}
      className={`flex flex-col items-center ${className}`}
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative" style={{ width: size, height: size }}>
        <svg
          width={size}
          height={size}
          className="transform -rotate-90"
        >
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="#e5e7eb"
            strokeWidth={strokeWidth}
          />
          {/* Progress circle */}
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="url(#gradient)"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={isInView ? { strokeDashoffset: offset } : { strokeDashoffset: circumference }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0d7377" />
              <stop offset="100%" stopColor="#e07a5f" />
            </linearGradient>
          </defs>
        </svg>
        
        {/* Percentage text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.span
            className="text-2xl font-bold text-charcoal-800"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.8 }}
          >
            {skill.level}%
          </motion.span>
        </div>
      </div>
      
      <span className="mt-3 text-sm font-medium text-charcoal-600 text-center">
        {skill.name}
      </span>
    </motion.div>
  );
};

export default SkillBars;
