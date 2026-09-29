import { forwardRef, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Layers, Globe, Search, ArrowRight, ExternalLink, X, MapPin, PlayCircle, Image as ImageIcon, Link2, GitMerge } from 'lucide-react';
import { cn } from '@/lib/utils';
import { projectCategories, allProjects, projectCountries, type CategoryTone, type Project } from '@/data/projects';
import { linkById, posterSrc } from '@/data/links';
import { imageSrc } from '@/data/media';
import RelatedLinks from '@/components/media/RelatedLinks';
import LiteYouTube from '@/components/media/LiteYouTube';
import { creditText, photoToItem, useLightbox } from '@/components/media/lightboxContext';
import { AnimatedSection } from '../components/ui/AnimatedSection';
import OrganicBlob from '../components/ui/OrganicBlob';
import CountUp from '../components/ui/CountUp';

const toneMap: Record<CategoryTone, { pill: string; impact: string; gradient: string; chip: string }> = {
    teal: { pill: 'bg-teal-50/70 text-teal-700 border-teal-100/60', impact: 'bg-teal-50/60 border-teal-100/60', gradient: 'from-teal-500 to-teal-700', chip: 'bg-teal-600 border-teal-600' },
    indigo: { pill: 'bg-indigo-50/70 text-indigo-700 border-indigo-100/60', impact: 'bg-indigo-50/60 border-indigo-100/60', gradient: 'from-indigo-500 to-indigo-700', chip: 'bg-indigo-600 border-indigo-600' },
    emerald: { pill: 'bg-emerald-50/70 text-emerald-700 border-emerald-100/60', impact: 'bg-emerald-50/60 border-emerald-100/60', gradient: 'from-emerald-500 to-emerald-700', chip: 'bg-emerald-600 border-emerald-600' },
    rose: { pill: 'bg-rose-50/70 text-rose-700 border-rose-100/60', impact: 'bg-rose-50/60 border-rose-100/60', gradient: 'from-rose-500 to-rose-700', chip: 'bg-rose-600 border-rose-600' },
    amber: { pill: 'bg-amber-50/70 text-amber-700 border-amber-100/60', impact: 'bg-amber-50/60 border-amber-100/60', gradient: 'from-amber-500 to-amber-600', chip: 'bg-amber-600 border-amber-600' },
};

type MediaFilter = 'all' | 'video' | 'links';

export default function KeyProjects() {
    const [query, setQuery] = useState('');
    const [category, setCategory] = useState<string | null>(null);
    const [country, setCountry] = useState<string | null>(null);
    const [media, setMedia] = useState<MediaFilter>('all');

    const matches = useMemo(() => {
        const q = query.trim().toLowerCase();
        return new Set(
            allProjects
                .filter((p) => !category || p.category.id === category)
                .filter((p) => !country || p.countries.includes(country))
                .filter((p) => media === 'all' || (media === 'video' ? Boolean(p.videoId) : (p.coverage?.length ?? 0) > 0))
                .filter((p) => !q || [p.title, p.role, p.location, p.desc, p.impact, ...p.tags].join(' ').toLowerCase().includes(q))
                .map((p) => p.id),
        );
    }, [query, category, country, media]);

    const visibleCategories = projectCategories
        .map((c) => ({ ...c, projects: c.projects.filter((p) => matches.has(p.id)) }))
        .filter((c) => c.projects.length > 0);

    const hasFilters = Boolean(query || category || country || media !== 'all');
    const reset = () => { setQuery(''); setCategory(null); setCountry(null); setMedia('all'); };
    const years = 2026 - 2015;

    return (
        <div className="min-h-screen py-20 md:py-32 relative">
            <OrganicBlob color="teal" size="xl" className="top-0 right-0 translate-x-1/2 -translate-y-1/4" delay={0} />
            <OrganicBlob color="coral" size="lg" className="bottom-1/4 left-0 -translate-x-1/2" delay={3} />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <AnimatedSection className="grid lg:grid-cols-[1.4fr_1fr] gap-10 items-end mb-12">
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <Layers size={24} className="text-teal-600" />
                            <span className="text-teal-600 font-semibold tracking-widest uppercase text-xs">Portfolio</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-charcoal-900 mb-6">Key Projects</h1>
                        <p className="text-lg md:text-xl text-charcoal-600 leading-relaxed">
                            Systems, platforms and tools I've led with communities, governments and teams across the world,
                            with photos, videos and press coverage wherever they exist.
                        </p>
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                        {[
                            { v: allProjects.length, l: 'Projects', s: '' },
                            { v: projectCountries.filter((c) => c !== 'Global').length, l: 'Countries', s: '' },
                            { v: years, l: 'Years', s: '+' },
                        ].map((s) => (
                            <div key={s.l} className="rounded-2xl bg-white/80 border border-sand-200 p-4">
                                <CountUp value={s.v} suffix={s.s} className="block text-3xl md:text-4xl font-display font-bold text-gradient leading-none mb-1" />
                                <span className="text-[11px] font-semibold uppercase tracking-wider text-charcoal-500">{s.l}</span>
                            </div>
                        ))}
                    </div>
                </AnimatedSection>

                {/* Controls */}
                <div className="relative z-10 mb-12">
                    <div className="rounded-3xl bg-white/85 backdrop-blur-xl border border-sand-200 shadow-lg shadow-charcoal-900/5 p-3 md:p-4 space-y-3">
                        <div className="flex flex-col md:flex-row gap-3">
                            <div className="relative flex-1">
                                <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-charcoal-400" />
                                <input
                                    type="search"
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    placeholder="Search projects, roles, technologies…"
                                    aria-label="Search projects"
                                    className="w-full pl-10 pr-4 py-2.5 rounded-full bg-sand-50 border border-sand-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/40 focus:border-teal-400"
                                />
                            </div>
                            <div className="flex gap-2">
                                {([['all', 'Everything', Layers], ['video', 'With video', PlayCircle], ['links', 'With press & links', Link2]] as const).map(([v, label, Icon]) => (
                                    <button
                                        key={v}
                                        onClick={() => setMedia(v)}
                                        aria-pressed={media === v}
                                        aria-label={label}
                                        className={cn(
                                            'inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-sm font-semibold border transition-colors whitespace-nowrap',
                                            media === v ? 'bg-charcoal-900 border-charcoal-900 text-white' : 'bg-white border-sand-200 text-charcoal-700 hover:border-charcoal-300',
                                        )}
                                    >
                                        <Icon size={15} /> <span className="hidden sm:inline">{label}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="flex gap-2 overflow-x-auto no-scrollbar md:flex-wrap md:overflow-visible -mx-1 px-1">
                            <Chip active={!category} onClick={() => setCategory(null)}>All areas</Chip>
                            {projectCategories.map((c) => (
                                <Chip key={c.id} active={category === c.id} activeClass={toneMap[c.tone].chip} onClick={() => setCategory(category === c.id ? null : c.id)}>
                                    {c.name} <span className="opacity-60">{c.projects.length}</span>
                                </Chip>
                            ))}
                        </div>
                        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar md:flex-wrap md:overflow-visible -mx-1 px-1">
                            <MapPin size={14} className="shrink-0 text-charcoal-400" />
                            {projectCountries.map((c) => (
                                <Chip key={c} small active={country === c} onClick={() => setCountry(country === c ? null : c)}>{c}</Chip>
                            ))}
                            {hasFilters && (
                                <button onClick={reset} className="shrink-0 inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold text-coral-600 hover:bg-coral-50">
                                    <X size={12} /> Clear
                                </button>
                            )}
                        </div>
                    </div>
                    <p className="sr-only" aria-live="polite">{matches.size} projects shown</p>
                </div>

                {visibleCategories.length === 0 ? (
                    <div className="text-center py-20 rounded-3xl border border-dashed border-sand-300 bg-white/50">
                        <p className="text-charcoal-500 mb-3">No projects match those filters.</p>
                        <button onClick={reset} className="text-teal-700 font-semibold text-sm">Reset filters</button>
                    </div>
                ) : (
                    <div className="space-y-20">
                        {visibleCategories.map((cat) => (
                            <section key={cat.id}>
                                <div className="flex items-end mb-10">
                                    <div>
                                        <h2 className="text-2xl md:text-3xl font-bold text-charcoal-900 font-display">{cat.name}</h2>
                                        <p className={cn('text-sm mt-2 font-medium inline-block px-4 py-1.5 rounded-full backdrop-blur-sm border', toneMap[cat.tone].pill)}>{cat.description}</p>
                                    </div>
                                    <span className="h-px flex-grow bg-gradient-to-r from-charcoal-200 to-transparent ml-6 mb-4 hidden md:block" />
                                </div>
                                <motion.div layout className="grid md:grid-cols-2 gap-6">
                                    <AnimatePresence mode="popLayout">
                                        {cat.projects.map((project) => (
                                            <ProjectCard key={project.id} project={project} tone={cat.tone} />
                                        ))}
                                    </AnimatePresence>
                                </motion.div>
                            </section>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

function Chip({ active, onClick, children, activeClass, small }: {
    active: boolean; onClick: () => void; children: React.ReactNode; activeClass?: string; small?: boolean;
}) {
    return (
        <button
            onClick={onClick}
            aria-pressed={active}
            className={cn(
                'shrink-0 inline-flex items-center gap-1.5 rounded-full font-semibold border transition-colors whitespace-nowrap',
                small ? 'px-2.5 py-1 text-xs' : 'px-3.5 py-1.5 text-sm',
                active ? cn('text-white', activeClass ?? 'bg-charcoal-900 border-charcoal-900') : 'bg-white border-sand-200 text-charcoal-600 hover:border-charcoal-300',
            )}
        >
            {children}
        </button>
    );
}

function ProjectMedia({ project }: { project: Project }) {
    const { open } = useLightbox();
    const [showVideo, setShowVideo] = useState(!project.photo);
    const { photo, videoId } = project;

    if (!photo && !videoId) return project.stages ? <StageFlow stages={project.stages} /> : null;

    return (
        <div className="relative">
            {videoId && showVideo ? (
                <LiteYouTube videoId={videoId} title={project.title} poster={posterSrc(videoId)} className="rounded-none shadow-none" />
            ) : photo ? (
                <button
                    type="button"
                    onClick={() => open([photoToItem(photo)])}
                    className="relative block w-full aspect-video overflow-hidden bg-sand-100 cursor-zoom-in group/photo"
                    aria-label={`Enlarge photo: ${photo.alt}`}
                >
                    <img src={imageSrc(photo.id, true)} alt={photo.alt} loading="lazy" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover/photo:scale-105" />
                    <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-charcoal-950/75 to-transparent px-4 pt-10 pb-2 text-left">
                        <span className="block text-white text-xs font-medium line-clamp-1">{photo.caption}</span>
                        <span className="block text-white/60 text-[10px]">{creditText(photo)}</span>
                    </span>
                </button>
            ) : null}
            {photo && videoId && (
                <div className="absolute top-3 left-3 flex rounded-full bg-charcoal-950/70 backdrop-blur p-1 text-white">
                    <button onClick={() => setShowVideo(false)} aria-pressed={!showVideo} className={cn('inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold', !showVideo && 'bg-white text-charcoal-900')}>
                        <ImageIcon size={12} /> Photo
                    </button>
                    <button onClick={() => setShowVideo(true)} aria-pressed={showVideo} className={cn('inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold', showVideo && 'bg-white text-charcoal-900')}>
                        <PlayCircle size={12} /> Video
                    </button>
                </div>
            )}
        </div>
    );
}

/** Auto-advancing, clickable walkthrough of a platform's workflow stages. */
function StageFlow({ stages }: { stages: NonNullable<Project['stages']> }) {
    const [active, setActive] = useState(0);
    const [auto, setAuto] = useState(true);

    useEffect(() => {
        if (!auto) return;
        const t = setInterval(() => setActive((a) => (a + 1) % stages.length), 2600);
        return () => clearInterval(t);
    }, [auto, stages.length]);

    return (
        <div className="relative aspect-video bg-gradient-to-br from-charcoal-900 via-teal-900 to-teal-700 text-white p-5 sm:p-6 flex flex-col overflow-hidden">
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '20px 20px' }} />
            <p className="relative text-[10px] font-bold uppercase tracking-widest text-teal-200 mb-auto">One programme, end to end</p>

            <div className="relative flex items-start justify-between" role="tablist" aria-label="Programme stages">
                <div className="absolute left-4 right-4 top-4 h-0.5 bg-white/20" />
                <motion.div
                    className="absolute left-4 top-4 h-0.5 bg-teal-300 origin-left"
                    style={{ right: '1rem' }}
                    animate={{ scaleX: active / (stages.length - 1) }}
                    transition={{ duration: 0.4 }}
                />
                {stages.map((st, i) => (
                    <button
                        key={st.name}
                        role="tab"
                        aria-selected={i === active}
                        onClick={() => { setActive(i); setAuto(false); }}
                        className="relative flex flex-col items-center gap-2 w-14 sm:w-16 group/stage"
                    >
                        <span
                            className={cn(
                                'w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all',
                                i < active && 'bg-teal-300 border-teal-300 text-charcoal-900',
                                i === active && 'bg-white border-white text-charcoal-900 scale-110 shadow-lg shadow-teal-300/40',
                                i > active && 'bg-charcoal-900/60 border-white/30 text-white/70 group-hover/stage:border-white',
                            )}
                        >
                            {i + 1}
                        </span>
                        <span className={cn('text-[10px] sm:text-[11px] font-semibold leading-tight text-center', i === active ? 'text-white' : 'text-white/60')}>
                            {st.name}
                        </span>
                    </button>
                ))}
            </div>

            <AnimatePresence mode="wait">
                <motion.p
                    key={active}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.2 }}
                    className="relative mt-auto pt-4 text-sm text-white/85 min-h-[2.5rem]"
                >
                    <span className="font-bold text-teal-200">{stages[active].name}:</span> {stages[active].detail}
                </motion.p>
            </AnimatePresence>
        </div>
    );
}

/** "What happened next" panel linking a project to its successor. */
function Evolution({ project }: { project: Project }) {
    const ev = project.evolution!;

    return (
        <div className="mb-5 rounded-2xl border border-teal-100 bg-gradient-to-br from-teal-50 to-white p-4 sm:p-5">
            <p className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-teal-700 mb-3">
                <GitMerge size={13} /> What happened next
            </p>
            <div className="flex items-center gap-2 mb-3">
                <span className="px-3 py-1.5 rounded-xl bg-white border border-sand-200 text-sm font-bold text-charcoal-800">
                    {ev.from}
                    <span className="block text-[10px] font-medium text-charcoal-400">{project.period}</span>
                </span>
                <motion.span
                    className="flex-1 h-0.5 bg-gradient-to-r from-sand-300 to-teal-500 rounded-full origin-left"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                />
                <ArrowRight size={16} className="text-teal-600 -ml-1" />
                <span className="px-3 py-1.5 rounded-xl bg-teal-600 text-white text-sm font-bold">
                    {ev.into}
                    {ev.intoNote && <span className="block text-[10px] font-medium text-teal-100">{ev.intoNote}</span>}
                </span>
            </div>
            <p className="text-sm text-charcoal-700 leading-relaxed">
                <span className="font-semibold">{ev.title}.</span> {ev.text}
            </p>
            {ev.to && (
                <Link to={ev.to} className="inline-flex items-center gap-1 mt-2 text-sm font-semibold text-teal-700 hover:text-teal-900">
                    {ev.toLabel ?? 'Read more'} <ArrowRight size={14} />
                </Link>
            )}
        </div>
    );
}

const ProjectCard = forwardRef<HTMLElement, { project: Project; tone: CategoryTone }>(function ProjectCard({ project, tone }, ref) {
    const t = toneMap[tone];
    const Icon = project.icon;
    const hasMedia = Boolean(project.photo || project.videoId || project.stages);

    return (
        <motion.article
            ref={ref}
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.3 }}
            className="h-full flex flex-col rounded-3xl bg-white border-2 border-sand-200 hover:border-teal-200 hover:shadow-2xl hover:shadow-teal-900/10 transition-[border-color,box-shadow] duration-300 group overflow-hidden"
        >
            <ProjectMedia project={project} />

            <div className={cn('bg-gradient-to-br px-6 flex relative', t.gradient, hasMedia ? 'py-4 items-center' : 'min-h-[7rem] py-6 items-end')}>
                <span className="absolute top-3 right-4 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full bg-white/20 text-white backdrop-blur-sm">
                    {project.period}
                </span>
                <div className="flex items-center gap-4 pr-20">
                    <div className="w-11 h-11 shrink-0 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center">
                        <Icon size={22} className="text-white" />
                    </div>
                    <div>
                        <h3 className="text-lg md:text-xl font-bold text-white font-display leading-tight">{project.title}</h3>
                        <p className="text-white/80 text-sm">{project.role}</p>
                    </div>
                </div>
            </div>

            <div className="flex-1 flex flex-col p-6">
                <div className="flex items-center gap-2 text-sm text-charcoal-500 mb-4">
                    <Globe size={14} />
                    {project.location}
                </div>

                <p className="text-charcoal-600 leading-relaxed mb-4 text-sm">{project.desc}</p>

                <div className={cn('mb-5 p-4 rounded-xl border', t.impact)}>
                    <span className="text-[10px] font-bold uppercase tracking-wider block mb-1 text-charcoal-500">Impact</span>
                    <p className="text-charcoal-700 text-sm leading-relaxed">{project.impact}</p>
                </div>

                <dl className="grid grid-cols-3 gap-3 mb-5 pb-5 border-b border-sand-100">
                    {project.stats.map((stat) => {
                        const src = stat.source ? linkById[stat.source] : undefined;
                        return (
                            <div key={stat.label} className="min-w-0">
                                <dd className="text-lg md:text-xl font-bold text-charcoal-900 leading-tight flex items-start gap-1">
                                    <span className="truncate">{stat.value}</span>
                                    {src && (
                                        <a
                                            href={src.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="shrink-0 text-charcoal-300 hover:text-teal-600 mt-1"
                                            title={`${src.publisher}: ${src.title}`}
                                            aria-label={`Source for ${stat.label}: ${src.publisher}`}
                                        >
                                            <ExternalLink size={12} />
                                        </a>
                                    )}
                                </dd>
                                <dt className="text-[10px] text-charcoal-500 uppercase tracking-wider">{stat.label}</dt>
                            </div>
                        );
                    })}
                </dl>

                <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                        <span key={tag} className="text-[10px] uppercase tracking-wide bg-sand-50 text-charcoal-600 px-3 py-1.5 rounded-full font-medium border border-sand-100">{tag}</span>
                    ))}
                </div>

                {project.evolution && <Evolution project={project} />}

                {(project.coverage?.length || project.caseStudy || project.website?.length) && (
                    <div className="mt-auto pt-4 border-t border-sand-100 space-y-3">
                        {project.coverage && <RelatedLinks ids={project.coverage} />}
                        <div className="flex flex-wrap items-center gap-3">
                            {project.caseStudy && (
                                <Link to={`/research/${project.caseStudy}`} className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-charcoal-900 text-white text-xs font-semibold hover:bg-teal-700 transition-colors">
                                    Read case study <ArrowRight size={14} />
                                </Link>
                            )}
                            {project.website?.map((l) => (
                                <a key={l.url} href={l.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs font-semibold text-charcoal-600 hover:text-teal-700">
                                    {l.label} <ExternalLink size={12} />
                                </a>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </motion.article>
    );
});
