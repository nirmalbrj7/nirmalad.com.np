import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ScrollRailProps {
    children: ReactNode;
    className?: string;
    /** Accessible name for the scrolling region */
    label: string;
}

/**
 * Horizontal scroller that makes overflow obvious and usable with a mouse: arrow buttons,
 * edge fades, a draggable progress bar, drag-to-scroll and arrow keys. Touch uses native swipe.
 */
export default function ScrollRail({ children, className, label }: ScrollRailProps) {
    const ref = useRef<HTMLDivElement>(null);
    const [state, setState] = useState({ start: true, end: true, progress: 0, visible: 1 });
    const drag = useRef<{ x: number; left: number; moved: boolean } | null>(null);

    const update = useCallback(() => {
        const el = ref.current;
        if (!el) return;
        const max = el.scrollWidth - el.clientWidth;
        setState({
            start: el.scrollLeft <= 2,
            end: el.scrollLeft >= max - 2,
            progress: max > 0 ? el.scrollLeft / max : 0,
            visible: el.scrollWidth > 0 ? el.clientWidth / el.scrollWidth : 1,
        });
    }, []);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        update();
        el.addEventListener('scroll', update, { passive: true });
        const ro = new ResizeObserver(update);
        ro.observe(el);
        return () => { el.removeEventListener('scroll', update); ro.disconnect(); };
    }, [update]);

    const page = (dir: 1 | -1) => {
        const el = ref.current;
        if (el) el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: 'smooth' });
    };

    // Mouse drag-to-scroll; clicks still reach buttons unless the pointer actually moved.
    const onPointerDown = (e: React.PointerEvent) => {
        if (e.pointerType !== 'mouse' || !ref.current) return;
        drag.current = { x: e.clientX, left: ref.current.scrollLeft, moved: false };
    };
    const onPointerMove = (e: React.PointerEvent) => {
        const d = drag.current;
        if (!d || !ref.current) return;
        const dx = e.clientX - d.x;
        if (Math.abs(dx) > 4) d.moved = true;
        if (d.moved) ref.current.scrollLeft = d.left - dx;
    };
    const endDrag = () => { setTimeout(() => { drag.current = null; }, 0); };
    const onClickCapture = (e: React.MouseEvent) => {
        if (drag.current?.moved) { e.preventDefault(); e.stopPropagation(); }
    };

    const onTrackClick = (e: React.MouseEvent<HTMLDivElement>) => {
        const el = ref.current;
        if (!el) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const ratio = (e.clientX - rect.left) / rect.width;
        el.scrollTo({ left: ratio * (el.scrollWidth - el.clientWidth), behavior: 'smooth' });
    };

    const scrollable = !(state.start && state.end);

    return (
        <div className={cn('relative', className)}>
            <div
                ref={ref}
                role="region"
                aria-label={label}
                tabIndex={0}
                onKeyDown={(e) => {
                    if (e.key === 'ArrowRight') { e.preventDefault(); page(1); }
                    if (e.key === 'ArrowLeft') { e.preventDefault(); page(-1); }
                }}
                onPointerDown={onPointerDown}
                onPointerMove={onPointerMove}
                onPointerUp={endDrag}
                onPointerLeave={endDrag}
                onClickCapture={onClickCapture}
                className={cn(
                    'flex gap-4 overflow-x-auto no-scrollbar pt-3 pb-5 -mx-4 px-4 sm:mx-0 sm:px-1 snap-x scroll-px-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500/40 rounded-xl',
                    scrollable && 'cursor-grab active:cursor-grabbing select-none',
                )}
            >
                {children}
            </div>

            {/* Edge fades */}
            <div className={cn('pointer-events-none absolute left-0 top-0 bottom-8 w-12 bg-gradient-to-r from-sand-50 to-transparent transition-opacity', state.start ? 'opacity-0' : 'opacity-100')} />
            <div className={cn('pointer-events-none absolute right-0 top-0 bottom-8 w-12 bg-gradient-to-l from-sand-50 to-transparent transition-opacity', state.end ? 'opacity-0' : 'opacity-100')} />

            {scrollable && (
                <div className="flex items-center gap-3 mt-1">
                    <button
                        onClick={() => page(-1)}
                        disabled={state.start}
                        className="p-2 rounded-full bg-white border border-sand-200 text-charcoal-700 hover:border-teal-300 hover:text-teal-700 disabled:opacity-30 disabled:hover:border-sand-200 transition-colors"
                        aria-label="Scroll left"
                    >
                        <ChevronLeft size={18} />
                    </button>
                    <div className="relative flex-1 h-1.5 rounded-full bg-sand-200 cursor-pointer" onClick={onTrackClick} aria-hidden="true">
                        <div
                            className="absolute top-0 h-full rounded-full bg-teal-500 transition-[left] duration-150"
                            style={{ width: `${Math.max(state.visible * 100, 8)}%`, left: `${state.progress * (100 - Math.max(state.visible * 100, 8))}%` }}
                        />
                    </div>
                    <button
                        onClick={() => page(1)}
                        disabled={state.end}
                        className="p-2 rounded-full bg-white border border-sand-200 text-charcoal-700 hover:border-teal-300 hover:text-teal-700 disabled:opacity-30 disabled:hover:border-sand-200 transition-colors"
                        aria-label="Scroll right"
                    >
                        <ChevronRight size={18} />
                    </button>
                </div>
            )}
        </div>
    );
}
