import { useEffect, useRef, useState } from 'react';
import { animate, useInView } from 'framer-motion';

interface CountUpProps {
    value: number;
    suffix?: string;
    prefix?: string;
    duration?: number;
    className?: string;
}

/** Inline number that counts up once when scrolled into view. */
export default function CountUp({ value, suffix = '', prefix = '', duration = 1.4, className }: CountUpProps) {
    const ref = useRef<HTMLSpanElement>(null);
    const inView = useInView(ref, { once: true, margin: '-40px' });
    const [display, setDisplay] = useState(0);

    useEffect(() => {
        if (!inView) return;
        const controls = animate(0, value, {
            duration,
            ease: [0.33, 1, 0.68, 1],
            onUpdate: (v) => setDisplay(Math.round(v)),
        });
        return () => controls.stop();
    }, [inView, value, duration]);

    return (
        <span ref={ref} className={className}>
            {prefix}{display.toLocaleString()}{suffix}
        </span>
    );
}
