import { useState } from 'react';
import { Play } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LiteYouTubeProps {
    videoId: string;
    title: string;
    /** Local poster image; nothing is requested from YouTube until the user presses play */
    poster: string;
    duration?: string;
    className?: string;
}

export default function LiteYouTube({ videoId, title, poster, duration, className }: LiteYouTubeProps) {
    const [playing, setPlaying] = useState(false);

    return (
        <div className={cn('relative aspect-video rounded-2xl overflow-hidden bg-charcoal-950 shadow-xl', className)}>
            {playing ? (
                <iframe
                    className="absolute inset-0 w-full h-full"
                    src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
                    title={title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                />
            ) : (
                <button
                    type="button"
                    onClick={() => setPlaying(true)}
                    className="group absolute inset-0 w-full h-full text-left"
                    aria-label={`Play video: ${title}`}
                >
                    <img src={poster} alt="" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/90 via-charcoal-950/20 to-transparent" />
                    <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/95 text-coral-500 shadow-2xl transition-transform duration-300 group-hover:scale-110">
                        <Play size={30} className="ml-1" fill="currentColor" />
                        <span className="absolute inset-0 rounded-full border-2 border-white/60 animate-ping" />
                    </span>
                    <span className="absolute left-4 right-4 bottom-4 flex items-end justify-between gap-3 text-white">
                        <span className="font-display font-semibold text-sm md:text-base leading-snug drop-shadow">{title}</span>
                        {duration && (
                            <span className="shrink-0 px-2 py-0.5 rounded-md bg-black/70 text-xs font-mono">{duration}</span>
                        )}
                    </span>
                </button>
            )}
        </div>
    );
}
