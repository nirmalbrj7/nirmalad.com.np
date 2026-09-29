import { cn } from '@/lib/utils';
import { formatLinkDate, posterSrc, type ProjectLink } from '@/data/links';
import LiteYouTube from './LiteYouTube';

interface VideoShelfProps {
    videos: ProjectLink[];
    tone?: 'light' | 'dark';
    className?: string;
}

/** Click-to-play YouTube embeds with a caption under each. */
export default function VideoShelf({ videos, tone = 'light', className }: VideoShelfProps) {
    if (!videos.length) return null;
    const dark = tone === 'dark';

    return (
        <div className={cn('grid gap-6', videos.length > 1 && 'md:grid-cols-2', className)}>
            {videos.map((v) => (
                <figure key={v.id}>
                    <LiteYouTube videoId={v.videoId!} title={v.title} poster={posterSrc(v.videoId!, false)} duration={v.duration} />
                    <figcaption className={cn('mt-3 text-sm', dark ? 'text-white/70' : 'text-charcoal-600')}>
                        {v.summary}
                        <span className={cn('block text-xs mt-0.5', dark ? 'text-white/40' : 'text-charcoal-400')}>
                            {v.publisher} on YouTube · {formatLinkDate(v.date)}
                        </span>
                    </figcaption>
                </figure>
            ))}
        </div>
    );
}
