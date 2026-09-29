import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, X, ZoomIn, ZoomOut } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LightboxContext, type LightboxItem } from './lightboxContext';

export function LightboxProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useState<LightboxItem[]>([]);
    const [index, setIndex] = useState(0);
    const [zoomed, setZoomed] = useState(false);
    const returnFocus = useRef<HTMLElement | null>(null);
    const closeRef = useRef<HTMLButtonElement>(null);
    const isOpen = items.length > 0;

    const open = useCallback((next: LightboxItem[], start = 0) => {
        returnFocus.current = document.activeElement as HTMLElement | null;
        setItems(next);
        setIndex(start);
        setZoomed(false);
    }, []);

    const close = useCallback(() => {
        setItems([]);
        returnFocus.current?.focus?.();
    }, []);

    const step = useCallback((delta: number) => {
        setZoomed(false);
        setIndex((i) => (i + delta + items.length) % items.length);
    }, [items.length]);

    useEffect(() => {
        if (!isOpen) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') close();
            else if (e.key === 'ArrowRight') step(1);
            else if (e.key === 'ArrowLeft') step(-1);
            else if (e.key.toLowerCase() === 'z') setZoomed((z) => !z);
        };
        const prevOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        window.addEventListener('keydown', onKey);
        closeRef.current?.focus();
        return () => {
            document.body.style.overflow = prevOverflow;
            window.removeEventListener('keydown', onKey);
        };
    }, [isOpen, close, step]);

    const current = items[index];

    return (
        <LightboxContext.Provider value={{ open }}>
            {children}
            {createPortal(
                <AnimatePresence>
                    {isOpen && current && (
                        <motion.div
                            key="lightbox"
                            role="dialog"
                            aria-modal="true"
                            aria-label={current.alt}
                            className="fixed inset-0 z-[100] flex flex-col bg-charcoal-950/95 backdrop-blur-md text-white"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            <div className="flex items-center gap-4 px-4 sm:px-6 py-3 border-b border-white/10">
                                <p className="min-w-0 flex-1 text-xs uppercase tracking-widest text-teal-300 font-semibold truncate">
                                    {current.eyebrow}
                                </p>
                                {items.length > 1 && (
                                    <span className="text-xs text-white/50 font-mono">{index + 1} / {items.length}</span>
                                )}
                                <button
                                    onClick={() => setZoomed((z) => !z)}
                                    className="p-2 rounded-full hover:bg-white/10 transition-colors"
                                    aria-label={zoomed ? 'Fit to screen' : 'Zoom to full size'}
                                    title="Zoom (Z)"
                                >
                                    {zoomed ? <ZoomOut size={20} /> : <ZoomIn size={20} />}
                                </button>
                                <button ref={closeRef} onClick={close} className="p-2 rounded-full hover:bg-white/10 transition-colors" aria-label="Close (Esc)">
                                    <X size={22} />
                                </button>
                            </div>

                            <div
                                className={cn('relative flex-1 min-h-0', zoomed ? 'overflow-auto' : 'overflow-hidden flex items-center justify-center p-4 sm:p-8')}
                                onClick={(e) => { if (e.target === e.currentTarget) close(); }}
                            >
                                <AnimatePresence mode="wait">
                                    <motion.img
                                        key={current.src}
                                        src={current.src}
                                        alt={current.alt}
                                        onClick={() => setZoomed((z) => !z)}
                                        className={cn(
                                            'rounded-lg shadow-2xl select-none',
                                            zoomed ? 'max-w-none w-[1600px] mx-auto my-6 cursor-zoom-out' : 'max-h-full max-w-full object-contain cursor-zoom-in',
                                        )}
                                        initial={{ opacity: 0, scale: 0.97 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.97 }}
                                        transition={{ duration: 0.2 }}
                                        draggable={false}
                                    />
                                </AnimatePresence>

                                {items.length > 1 && (
                                    <>
                                        <button onClick={() => step(-1)} className="fixed left-2 sm:left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur transition-colors" aria-label="Previous">
                                            <ChevronLeft size={24} />
                                        </button>
                                        <button onClick={() => step(1)} className="fixed right-2 sm:right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur transition-colors" aria-label="Next">
                                            <ChevronRight size={24} />
                                        </button>
                                    </>
                                )}
                            </div>

                            <div className="px-4 sm:px-6 py-3 border-t border-white/10 space-y-2">
                                {current.caption && <p className="text-sm text-white/85 max-w-3xl">{current.caption}</p>}
                                {current.credit && (
                                    <p className="text-[11px] text-white/45">
                                        Photo:{' '}
                                        {current.credit.href ? (
                                            <a href={current.credit.href} target="_blank" rel="noopener noreferrer" className="underline decoration-white/30 hover:text-white">{current.credit.text}</a>
                                        ) : current.credit.text}
                                    </p>
                                )}
                                {items.length > 1 && (
                                    <div className="flex gap-2 overflow-x-auto no-scrollbar pt-1">
                                        {items.map((item, i) => (
                                            <button
                                                key={item.src}
                                                onClick={() => { setIndex(i); setZoomed(false); }}
                                                className={cn('shrink-0 w-20 h-14 rounded-md overflow-hidden border-2 transition-all', i === index ? 'border-teal-400' : 'border-transparent opacity-50 hover:opacity-90')}
                                                aria-label={`Show image ${i + 1}`}
                                            >
                                                <img src={item.thumb ?? item.src} alt="" className="w-full h-full object-cover bg-white" loading="lazy" />
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>,
                document.body,
            )}
        </LightboxContext.Provider>
    );
}
