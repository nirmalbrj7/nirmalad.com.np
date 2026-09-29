import { ExternalLink, Newspaper, FileText, Github, BookOpen, PlayCircle, Users, Smartphone } from 'lucide-react';
import { cn } from '@/lib/utils';
import { formatLinkDate, kindLabels, linksByIds, linksFor, type LinkKind, type LinkTopic, type ProjectLink } from '@/data/links';

const kindIcons: Record<LinkKind, typeof Newspaper> = {
    press: Newspaper,
    record: FileText,
    code: Github,
    paper: BookOpen,
    video: PlayCircle,
    service: Users,
    product: Smartphone,
};

const kindRank: Record<LinkKind, number> = { press: 0, paper: 1, service: 2, record: 3, video: 4, code: 5, product: 6 };

interface RelatedLinksProps {
    ids?: string[];
    topic?: LinkTopic;
    /** 'pills' for cards, 'list' for detail sections */
    variant?: 'pills' | 'list';
    tone?: 'light' | 'dark';
    /** Hide videos when they are already embedded nearby */
    excludeVideos?: boolean;
    label?: string;
    className?: string;
}

export default function RelatedLinks({ ids, topic, variant = 'pills', tone = 'light', excludeVideos, label = 'Press & links', className }: RelatedLinksProps) {
    // Explicit ids keep their order; topic lists lead with press coverage, then newest first.
    let items: ProjectLink[] = ids
        ? linksByIds(ids)
        : topic
            ? [...linksFor(topic)].sort((a, b) => kindRank[a.kind] - kindRank[b.kind] || b.date.localeCompare(a.date))
            : [];
    if (excludeVideos) items = items.filter((l) => !l.videoId);
    if (!items.length) return null;
    const dark = tone === 'dark';

    if (variant === 'list') {
        return (
            <ul className={cn('divide-y', dark ? 'divide-white/10 border-y border-white/10' : 'divide-sand-200 border-y border-sand-200', className)}>
                {items.map((l) => {
                    const Icon = kindIcons[l.kind];
                    return (
                        <li key={l.id}>
                            <a
                                href={l.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={cn('group flex gap-4 py-4 px-2 -mx-2 rounded-xl transition-colors', dark ? 'hover:bg-white/5' : 'hover:bg-teal-50/50')}
                            >
                                <span className={cn('shrink-0 mt-0.5 w-9 h-9 rounded-xl flex items-center justify-center', dark ? 'bg-white/10 text-teal-300' : 'bg-teal-50 text-teal-700')}>
                                    <Icon size={17} />
                                </span>
                                <span className="min-w-0 flex-1">
                                    <span className={cn('flex flex-wrap items-center gap-x-2 text-[11px] font-semibold uppercase tracking-wider mb-0.5', dark ? 'text-white/50' : 'text-charcoal-400')}>
                                        <span>{kindLabels[l.kind]}</span>
                                        <span>·</span>
                                        <span className={dark ? 'text-teal-300' : 'text-teal-700'}>{l.publisher}</span>
                                        {l.date && <><span>·</span><span>{formatLinkDate(l.date)}</span></>}
                                    </span>
                                    <span className={cn('block font-semibold leading-snug', dark ? 'text-white group-hover:text-teal-300' : 'text-charcoal-900 group-hover:text-teal-700')}>
                                        {l.title}
                                    </span>
                                    <span className={cn('block text-sm mt-1', dark ? 'text-white/60' : 'text-charcoal-600')}>{l.summary}</span>
                                    {l.highlights.length > 0 && (
                                        <span className={cn('flex flex-wrap gap-1.5 mt-2')}>
                                            {l.highlights.map((h) => (
                                                <span key={h} className={cn('text-[11px] px-2 py-0.5 rounded-full', dark ? 'bg-white/5 text-white/70' : 'bg-sand-100 text-charcoal-600')}>
                                                    {h}
                                                </span>
                                            ))}
                                        </span>
                                    )}
                                </span>
                                <ExternalLink size={16} className={cn('shrink-0 mt-1', dark ? 'text-white/30 group-hover:text-teal-300' : 'text-charcoal-300 group-hover:text-teal-600')} />
                            </a>
                        </li>
                    );
                })}
            </ul>
        );
    }

    // Same-publisher links would look identical; label those by title.
    const counts = items.reduce<Record<string, number>>((acc, l) => ({ ...acc, [l.publisher]: (acc[l.publisher] ?? 0) + 1 }), {});

    return (
        <div className={cn('flex flex-wrap items-center gap-1.5', className)}>
            <span className={cn('text-[10px] font-bold uppercase tracking-wider mr-1', dark ? 'text-white/50' : 'text-charcoal-400')}>{label}</span>
            {items.map((l) => {
                const Icon = kindIcons[l.kind];
                return (
                    <a
                        key={l.id}
                        href={l.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        title={l.title}
                        className={cn(
                            'inline-flex items-center gap-1.5 max-w-full px-2.5 py-1 rounded-full text-[11px] font-semibold border transition-colors',
                            dark ? 'bg-white/10 border-white/15 text-white/90 hover:bg-white/20' : 'bg-white border-sand-200 text-charcoal-700 hover:border-teal-300 hover:text-teal-800',
                        )}
                    >
                        <Icon size={12} className="shrink-0 opacity-70" />
                        <span className="truncate">{counts[l.publisher] > 1 ? `${l.publisher}: ${l.title}` : l.publisher}</span>
                    </a>
                );
            })}
        </div>
    );
}
