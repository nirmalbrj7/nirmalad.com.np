import type { FC } from 'react';
import { motion } from 'framer-motion';

interface AnimatedTextProps {
  text: string;
  className?: string;
  delay?: number;
  type?: 'words' | 'chars' | 'lines';
  staggerDelay?: number;
}

export const AnimatedText: FC<AnimatedTextProps> = ({
  text,
  className = '',
  delay = 0,
  type = 'words',
  staggerDelay = 0.05,
}) => {
  const items = type === 'chars'
    ? text.split('')
    : type === 'lines'
      ? text.split('\n')
      : text.split(' ');

  const container = {
    hidden: { opacity: 0 },
    visible: (_i = 1) => ({
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: delay,
      },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <motion.span
      className={`inline-flex flex-wrap ${className}`}
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {items.map((item, index) => (
        <motion.span
          key={index}
          variants={child}
          className="inline-block"
          style={{ marginRight: type === 'words' ? '0.25em' : type === 'chars' ? '0' : '0' }}
        >
          {item === ' ' ? '\u00A0' : item}
          {type === 'lines' && index < items.length - 1 && <br />}
        </motion.span>
      ))}
    </motion.span>
  );
};

interface WordRevealProps {
  children: string;
  className?: string;
  delay?: number;
}

export const WordReveal: FC<WordRevealProps> = ({
  children,
  className = '',
  delay = 0,
}) => {
  const words = children.split(' ');

  return (
    <motion.span
      className={`inline-flex flex-wrap ${className}`}
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.08,
            delayChildren: delay,
          },
        },
      }}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block mr-[0.25em] overflow-hidden"
          variants={{
            hidden: { opacity: 0, y: '100%' },
            visible: {
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.5,
                ease: [0.33, 1, 0.68, 1],
              },
            },
          }}
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
};

export default AnimatedText;
