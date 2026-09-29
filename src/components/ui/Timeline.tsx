import { useRef, type FC } from 'react';
import { motion, useInView } from 'framer-motion';

interface TimelineItem {
  year: string;
  title: string;
  organization?: string;
  location?: string;
  description: string;
  tags?: string[];
  highlight?: boolean;
}

interface TimelineProps {
  items: TimelineItem[];
  className?: string;
}

export const Timeline: FC<TimelineProps> = ({
  items,
  className = '',
}) => {
  return (
    <div className={`relative ${className}`}>
      {/* Vertical line */}
      <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-teal-300 via-coral-300 to-teal-300 md:-translate-x-1/2" />

      <div className="space-y-12 md:space-y-0">
        {items.map((item, index) => (
          <TimelineEntry
            key={index}
            item={item}
            index={index}
            isLeft={index % 2 === 0}
          />
        ))}
      </div>
    </div>
  );
};

interface TimelineEntryProps {
  item: TimelineItem;
  index: number;
  isLeft: boolean;
}

const TimelineEntry: FC<TimelineEntryProps> = ({ item, index, isLeft }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.div
      ref={ref}
      className={`relative md:grid md:grid-cols-2 md:gap-8 ${
        isLeft ? '' : 'md:direction-rtl'
      }`}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      {/* Center dot */}
      <motion.div
        className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-gradient-to-br from-teal-500 to-coral-500 border-4 border-white shadow-lg z-10 md:-translate-x-1/2"
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : { scale: 0 }}
        transition={{ duration: 0.4, delay: index * 0.1 + 0.2, type: 'spring' }}
      />

      {/* Content */}
      <div
        className={`pl-12 md:pl-0 ${
          isLeft
            ? 'md:pr-12 md:text-right'
            : 'md:col-start-2 md:pl-12'
        }`}
      >
        <div
          className={`p-6 rounded-2xl transition-all duration-300 ${
            item.highlight
              ? 'bg-gradient-to-br from-teal-50 to-coral-50 border border-teal-100 shadow-lg'
              : 'bg-white/80 border border-sand-200 hover:border-teal-200 hover:shadow-md'
          }`}
        >
          {/* Year badge */}
          <span className="inline-block px-3 py-1 rounded-full bg-teal-100 text-teal-700 text-sm font-semibold mb-3">
            {item.year}
          </span>

          {/* Title */}
          <h3 className="text-xl font-display font-bold text-charcoal-900 mb-2">
            {item.title}
          </h3>

          {/* Organization & Location */}
          {(item.organization || item.location) && (
            <div className="flex flex-wrap items-center gap-2 mb-3 text-sm text-charcoal-500">
              {item.organization && (
                <span className="font-medium text-teal-600">{item.organization}</span>
              )}
              {item.organization && item.location && (
                <span className="text-charcoal-300">•</span>
              )}
              {item.location && <span>{item.location}</span>}
            </div>
          )}

          {/* Description */}
          <p className="text-charcoal-600 leading-relaxed mb-4">
            {item.description}
          </p>

          {/* Tags */}
          {item.tags && item.tags.length > 0 && (
            <div className={`flex flex-wrap gap-2 ${isLeft ? 'md:justify-end' : ''}`}>
              {item.tags.map((tag, tagIndex) => (
                <span
                  key={tagIndex}
                  className="text-xs px-2 py-1 rounded-full bg-sand-100 text-charcoal-600"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Empty space for alternating layout */}
      {isLeft && <div className="hidden md:block" />}
    </motion.div>
  );
};

export default Timeline;
