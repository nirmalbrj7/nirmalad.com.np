import { lazy, Suspense } from 'react';
import { motion } from 'framer-motion';

// Three.js is heavy; load the particle scene after the hero text has painted.
const Scene3D = lazy(() => import('./Scene3D'));
import OrganicBlob from './OrganicBlob';

const Hero3D = () => {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden bg-gradient-to-br from-sand-50 via-white to-sand-100">
      {/* Interactive 3D Particle Cloud Background */}
      <Suspense fallback={null}>
        <Scene3D />
      </Suspense>

      {/* Organic blob backgrounds */}
      <OrganicBlob color="teal" size="xl" className="top-0 left-0 -translate-x-1/4 -translate-y-1/4" delay={0} />
      <OrganicBlob color="coral" size="lg" className="top-1/3 right-0 translate-x-1/4" delay={2} />
      <OrganicBlob color="sand" size="md" className="bottom-0 left-1/3 translate-y-1/4" delay={4} />

      {/* Animated gradient mesh */}
      <motion.div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          background: `
            radial-gradient(at 40% 20%, hsla(175,60%,35%,0.1) 0px, transparent 50%),
            radial-gradient(at 80% 0%, hsla(12,70%,62%,0.1) 0px, transparent 50%),
            radial-gradient(at 0% 50%, hsla(175,60%,35%,0.1) 0px, transparent 50%),
            radial-gradient(at 80% 50%, hsla(175,60%,35%,0.08) 0px, transparent 50%),
            radial-gradient(at 0% 100%, hsla(12,70%,62%,0.08) 0px, transparent 50%)
          `,
        }}
        animate={{
          background: [
            `radial-gradient(at 40% 20%, hsla(175,60%,35%,0.1) 0px, transparent 50%),
             radial-gradient(at 80% 0%, hsla(12,70%,62%,0.1) 0px, transparent 50%),
             radial-gradient(at 0% 50%, hsla(175,60%,35%,0.1) 0px, transparent 50%),
             radial-gradient(at 80% 50%, hsla(175,60%,35%,0.08) 0px, transparent 50%),
             radial-gradient(at 0% 100%, hsla(12,70%,62%,0.08) 0px, transparent 50%)`,
            `radial-gradient(at 20% 40%, hsla(175,60%,35%,0.1) 0px, transparent 50%),
             radial-gradient(at 60% 20%, hsla(12,70%,62%,0.1) 0px, transparent 50%),
             radial-gradient(at 40% 60%, hsla(175,60%,35%,0.1) 0px, transparent 50%),
             radial-gradient(at 20% 80%, hsla(175,60%,35%,0.08) 0px, transparent 50%),
             radial-gradient(at 80% 60%, hsla(12,70%,62%,0.08) 0px, transparent 50%)`,
            `radial-gradient(at 40% 20%, hsla(175,60%,35%,0.1) 0px, transparent 50%),
             radial-gradient(at 80% 0%, hsla(12,70%,62%,0.1) 0px, transparent 50%),
             radial-gradient(at 0% 50%, hsla(175,60%,35%,0.1) 0px, transparent 50%),
             radial-gradient(at 80% 50%, hsla(175,60%,35%,0.08) 0px, transparent 50%),
             radial-gradient(at 0% 100%, hsla(12,70%,62%,0.08) 0px, transparent 50%)`,
          ],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{
        backgroundImage: `
          linear-gradient(to right, #0d7377 1px, transparent 1px),
          linear-gradient(to bottom, #0d7377 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px',
      }} />

      {/* Subtle radial gradient center glow */}
      <div className="absolute inset-0 bg-radial-gradient from-teal-100/10 via-transparent to-transparent pointer-events-none" />
    </div>
  );
};

export default Hero3D;
