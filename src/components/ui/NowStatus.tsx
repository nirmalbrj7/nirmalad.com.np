import type { FC } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Sparkles, GraduationCap, CalendarCheck } from 'lucide-react';

interface NowStatusProps {
  location: string;
  focus: string;
  role: string;
  currentProject?: string;
  /** Courses being taught this term */
  teaching?: string;
  /** When this card was last updated, e.g. "Sep 2026" */
  updated?: string;
  availability?: 'available' | 'busy' | 'open';
  className?: string;
}

export const NowStatus: FC<NowStatusProps> = ({
  location,
  focus,
  role,
  currentProject,
  teaching,
  updated,
  availability = 'open',
  className = '',
}) => {
  const availabilityConfig = {
    available: { color: 'bg-emerald-500', text: 'Available for collaboration' },
    busy: { color: 'bg-amber-500', text: 'Focused on current project' },
    open: { color: 'bg-teal-500', text: 'Open to new opportunities' },
  };

  const status = availabilityConfig[availability];

  return (
    <motion.div
      className={`relative ${className}`}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.3 }}
    >
      {/* Pulsing glow background */}
      <div className="absolute -inset-4 bg-gradient-to-br from-teal-200/40 via-sand-100/60 to-coral-200/40 rounded-[2.5rem] blur-2xl animate-pulse-slow" />
      
      <div className="relative glass rounded-[2rem] p-6 md:p-8 border border-white/60 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <motion.div
              className="relative"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <div className={`w-3 h-3 rounded-full ${status.color}`} />
              <div className={`absolute inset-0 w-3 h-3 rounded-full ${status.color} animate-ping opacity-75`} />
            </motion.div>
            <span className="text-xs font-semibold uppercase tracking-widest text-charcoal-500">
              Now
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-medium text-charcoal-500">
            <MapPin size={14} className="text-coral-500" />
            {location}
          </div>
        </div>

        {/* Focus Area */}
        <div className="mb-6">
          <p className="text-xs uppercase tracking-widest text-charcoal-400 mb-2">Current Focus</p>
          <p className="text-xl md:text-2xl font-display font-bold text-charcoal-900 leading-tight">
            {focus}
          </p>
        </div>

        {/* Grid Info */}
        <div className="grid grid-cols-2 gap-3">
          <div className="p-4 rounded-2xl bg-white/70 border border-white/70 hover:border-teal-200/50 transition-colors">
            <p className="text-xs uppercase tracking-widest text-charcoal-400 mb-1">Role</p>
            <p className="text-base font-semibold text-charcoal-900">{role}</p>
          </div>
          
          <div className="p-4 rounded-2xl bg-white/70 border border-white/70 hover:border-teal-200/50 transition-colors">
            <p className="text-xs uppercase tracking-widest text-charcoal-400 mb-1">Status</p>
            <p className="text-sm font-medium text-teal-600">{status.text}</p>
          </div>

          {teaching && (
            <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-100/70 col-span-2">
              <div className="flex items-start gap-3">
                <GraduationCap size={18} className="text-indigo-500 mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs uppercase tracking-widest text-indigo-600 mb-1">Teaching now</p>
                  <p className="text-sm font-semibold text-charcoal-900">{teaching}</p>
                </div>
              </div>
            </div>
          )}

          {currentProject && (
            <div className="p-4 rounded-2xl bg-teal-50/70 border border-teal-100/70 col-span-2">
              <div className="flex items-start gap-3">
                <Sparkles size={18} className="text-teal-500 mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs uppercase tracking-widest text-teal-600 mb-1">Featured Work</p>
                  <p className="text-base font-semibold text-charcoal-900">{currentProject}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Bottom status bar */}
        <div className="mt-6 pt-4 border-t border-charcoal-100 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-charcoal-500">
            <CalendarCheck size={14} className="text-coral-500" />
            <span>Updated</span>
          </div>
          <span className="text-xs text-charcoal-400">{updated}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default NowStatus;
