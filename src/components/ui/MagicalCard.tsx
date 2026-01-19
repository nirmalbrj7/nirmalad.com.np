import React, { useRef } from 'react';
import { motion, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion';

interface MagicalCardProps {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
}

export const MagicalCard: React.FC<MagicalCardProps> = ({ children, className = '', onClick }) => {
    const ref = useRef<HTMLDivElement>(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseX = useSpring(x, { stiffness: 500, damping: 100 });
    const mouseY = useSpring(y, { stiffness: 500, damping: 100 });

    function onMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    const maskImage = useMotionTemplate`radial-gradient(240px at ${mouseX}px ${mouseY}px, white, transparent)`;
    const style = { maskImage, WebkitMaskImage: maskImage };

    return (
        <div
            ref={ref}
            onMouseMove={onMouseMove}
            onClick={onClick}
            className={`relative group rounded-3xl border border-cream-200 bg-white hover:bg-cream-50 transition-colors duration-500 overflow-hidden ${className}`}
        >
            {/* Hover Glow Effect */}
            <div className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-300 group-hover:opacity-100 z-10">
                <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-royal-500/10 to-purple-500/10 rounded-3xl"
                    style={style}
                />
            </div>

            {/* Border Glow */}
            <div className="absolute inset-0 rounded-3xl ring-1 ring-inset ring-black/5 group-hover:ring-royal-200/50 transition-all duration-300 z-20" />

            <div className="relative z-30 h-full">
                {children}
            </div>
        </div>
    );
};
