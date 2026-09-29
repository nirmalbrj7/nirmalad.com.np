import { motion } from 'framer-motion';
import { Maximize2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { imageSrc, type Photo } from '@/data/media';
import { creditText, photoToItem, useLightbox } from './lightboxContext';

interface PhotoGalleryProps {
    photos: Photo[];
    /** 'grid' tiles evenly; 'strip' scrolls horizontally on small screens */
    layout?: 'grid' | 'strip';
    columns?: 2 | 3 | 4;
    tone?: 'light' | 'dark';
    /** Fit diagrams/renders inside the tile instead of cropping them */
    contain?: boolean;
    className?: string;
}

const colClass = { 2: 'sm:grid-cols-2', 3: 'sm:grid-cols-2 lg:grid-cols-3', 4: 'grid-cols-2 lg:grid-cols-4' };

export default function PhotoGallery({ photos, layout = 'grid', columns = 3, tone = 'light', contain, className }: PhotoGalleryProps) {
    const { open } = useLightbox();
    const dark = tone === 'dark';
    const items = photos.map(photoToItem);

    return (
        <div
            className={cn(
                layout === 'strip'
                    ? 'flex gap-4 overflow-x-auto no-scrollbar snap-x snap-mandatory -mx-4 px-4 sm:mx-0 sm:px-0 sm:grid sm:overflow-visible'
                    : 'grid gap-4',
                colClass[columns],
                className,
            )}
        >
            {photos.map((p, i) => (
                <motion.figure
                    key={p.id}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ duration: 0.4, delay: i * 0.05 }}
                    className={cn('group', layout === 'strip' && 'shrink-0 w-[78%] sm:w-auto snap-start')}
                >
                    <button
                        type="button"
                        onClick={() => open(items, i)}
                        className={cn(
                            'relative block w-full aspect-[4/3] rounded-2xl overflow-hidden cursor-zoom-in ring-1 transition',
                            dark ? 'ring-white/10 hover:ring-teal-400 bg-white/5' : 'ring-sand-200 hover:ring-teal-300 bg-sand-100',
                            (contain || p.contain) && 'bg-white',
                        )}
                        aria-label={`Enlarge: ${p.alt}`}
                    >
                        <img
                            src={imageSrc(p.id, true)}
                            alt={p.alt}
                            loading="lazy"
                            className={cn(
                                'absolute inset-0 w-full h-full transition-transform duration-700 group-hover:scale-[1.04]',
                                contain || p.contain ? 'object-contain p-3' : 'object-cover',
                            )}
                        />
                        {(p.place || p.year) && (
                            <span className="absolute left-2.5 top-2.5 px-2 py-0.5 rounded-full bg-charcoal-950/70 text-white text-[10px] font-semibold backdrop-blur">
                                {[p.place, p.year].filter(Boolean).join(' · ')}
                            </span>
                        )}
                        <Maximize2 size={26} className="absolute right-2.5 top-2.5 p-1.5 rounded-full bg-white/90 text-charcoal-800 opacity-0 group-hover:opacity-100 transition" />
                    </button>
                    <figcaption className={cn('mt-2 text-xs leading-relaxed', dark ? 'text-white/70' : 'text-charcoal-600')}>
                        {p.caption}
                        <span className={cn('block mt-0.5 text-[10px]', dark ? 'text-white/40' : 'text-charcoal-400')}>
                            <a href={p.credit.source} target="_blank" rel="noopener noreferrer" className="hover:underline">
                                {creditText(p)}
                            </a>
                        </span>
                    </figcaption>
                </motion.figure>
            ))}
        </div>
    );
}
