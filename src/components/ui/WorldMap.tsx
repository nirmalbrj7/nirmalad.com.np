import { useState, type FC } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Location {
  id: string;
  name: string;
  country: string;
  coordinates: { x: number; y: number };
  projects: string[];
}

interface WorldMapProps {
  locations?: Location[];
  className?: string;
}

const defaultLocations: Location[] = [
  {
    id: 'nepal',
    name: 'Nepal',
    country: 'Nepal',
    coordinates: { x: 70, y: 45 },
    projects: ['PD3R', 'Socio-Technical Facilitation', 'Competency Training'],
  },
  {
    id: 'philippines',
    name: 'Philippines',
    country: 'Philippines',
    coordinates: { x: 78, y: 50 },
    projects: ['Construction Guidelines', 'Tibay Balay App'],
  },
  {
    id: 'colombia',
    name: 'Colombia',
    country: 'Colombia',
    coordinates: { x: 28, y: 55 },
    projects: ['National Housing Program'],
  },
  {
    id: 'dominica',
    name: 'Dominica',
    country: 'Dominica',
    coordinates: { x: 32, y: 48 },
    projects: ['Housing Recovery MIS'],
  },
  {
    id: 'indonesia',
    name: 'Indonesia',
    country: 'Indonesia',
    coordinates: { x: 75, y: 58 },
    projects: ['Rumah Aman App', 'Microfinance'],
  },
  {
    id: 'halifax',
    name: 'Halifax',
    country: 'Canada',
    coordinates: { x: 28, y: 32 },
    projects: ['PhD Research', 'Immersive Computing'],
  },
];

export const WorldMap: FC<WorldMapProps> = ({
  locations = defaultLocations,
  className = '',
}) => {
  return (
    <div className={`relative w-full ${className}`}>
      <div className="relative aspect-[16/9] bg-gradient-to-b from-sand-50 via-white to-sand-50 rounded-3xl overflow-hidden border border-sand-200 shadow-inner">
        {/* World Map SVG - Clean and Simple */}
        <svg
          viewBox="0 0 100 56"
          className="absolute inset-0 w-full h-full"
          preserveAspectRatio="xMidYMid slice"
        >
          {/* Subtle grid background */}
          <defs>
            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#e5e5e5" strokeWidth="0.3" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" opacity="0.5" />
          
          {/* Continents - muted color */}
          <g opacity="0.15" fill="#0d7377">
            {/* North America */}
            <path d="M15,12 Q20,8 28,10 T35,16 T30,24 T20,22 Z" />
            {/* South America */}
            <path d="M28,28 Q32,26 36,30 T33,42 T25,40 T26,32 Z" />
            {/* Europe */}
            <path d="M45,10 Q50,6 56,10 T59,18 T52,22 T46,18 Z" />
            {/* Africa */}
            <path d="M46,22 Q52,20 57,26 T55,40 T48,38 T44,30 Z" />
            {/* Asia */}
            <path d="M58,10 Q70,6 82,10 T88,24 T76,30 T65,26 T58,16 Z" />
            {/* Australia */}
            <path d="M78,38 Q84,36 88,40 T85,50 T78,48 T76,42 Z" />
          </g>

          {/* Connection lines - subtle */}
          {locations.map((location, index) => 
            locations.slice(index + 1).map((otherLoc) => (
              <motion.line
                key={`${location.id}-${otherLoc.id}`}
                x1={location.coordinates.x}
                y1={location.coordinates.y}
                x2={otherLoc.coordinates.x}
                y2={otherLoc.coordinates.y}
                stroke="#0d7377"
                strokeWidth="0.3"
                strokeDasharray="2 2"
                opacity="0.3"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, delay: index * 0.1 }}
              />
            ))
          )}
        </svg>

        {/* Location markers */}
        {locations.map((location, index) => (
          <MapMarker
            key={location.id}
            location={location}
            delay={index * 0.15}
          />
        ))}
      </div>
    </div>
  );
};

interface MapMarkerProps {
  location: Location;
  delay: number;
}

const MapMarker: FC<MapMarkerProps> = ({ location, delay }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="absolute"
      style={{
        left: `${location.coordinates.x}%`,
        top: `${location.coordinates.y}%`,
        transform: 'translate(-50%, -50%)',
      }}
      initial={{ scale: 0, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay, type: 'spring' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Pulse ring */}
      <motion.div
        className="absolute inset-0 rounded-full bg-teal-400/20"
        style={{ width: 40, height: 40, margin: -8 }}
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.5, 0, 0.5],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Center dot */}
      <motion.div
        className="relative w-4 h-4 rounded-full bg-teal-600 shadow-lg border-2 border-white"
        whileHover={{ scale: 1.3 }}
        transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      />

      {/* Label - always visible */}
      <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 whitespace-nowrap">
        <span className="text-xs font-semibold text-charcoal-700 bg-white/90 px-2 py-1 rounded-full shadow-sm">
          {location.name}
        </span>
      </div>

      {/* Tooltip on hover */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 w-56 z-20"
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <div className="bg-white rounded-2xl shadow-xl border border-sand-100 p-4">
              <p className="font-bold text-charcoal-900 mb-1">
                {location.name}, {location.country}
              </p>
              <div className="space-y-1">
                {location.projects.map((project, idx) => (
                  <p key={idx} className="text-xs text-charcoal-600 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-500" />
                    {project}
                  </p>
                ))}
              </div>
            </div>
            {/* Arrow */}
            <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-white" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default WorldMap;
