import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
    ExternalLink, Calendar, Users, BookOpen, ArrowUpRight, Search, Quote, Check, Copy,
    ChevronDown, Award, TrendingUp, X,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { publications, typeLabels, toApa, toBibtex, ME, type Publication, type PublicationType } from '@/data/publications';
import { useCrossrefCitations, hIndex } from '@/lib/useCrossrefCitations';
import { AnimatedSection } from '../components/ui/AnimatedSection';
import OrganicBlob from '../components/ui/OrganicBlob';
import CountUp from '../components/ui/CountUp';

type Sort = 'newest' | 'cited';

const years = Array.from(new Set(publications.map((p) => p.year))).sort((a, b) => b - a);
const types = Array.from(new Set(publications.map((p) => p.type))) as PublicationType[];

export default function Publications() {
    const { counts, live } = useCrossrefCitations(publications);
    const [query, setQuery] = useState('');
    const [type, setType] = useState<PublicationType | null>(null);
    const [year, setYear] = useState<number | null>(null);
    const [firstAuthorOnly, setFirstAuthorOnly] = useState(false);
    const [sort, setSort] = useState<Sort>('newest');

    const list = useMemo(() => {
        const q = query.trim().toLowerCase();
        return publications
            .filter((p) => (!type || p.type === type) && (!year || p.year === year))
            .filter((p) => !firstAuthorOnly || p.authors[0] === ME)
            .filter((p) => !q || [p.title, p.venue, p.abstract, ...p.authors].join(' ').toLowerCase().includes(q))
            .sort((a, b) => (sort === 'cited'
                ? (counts[b.id] ?? -1) - (counts[a.id] ?? -1)
                : (b.date ?? `${b.year}`).localeCompare(a.date ?? `${a.year}`)));
    }, [query, type, year, firstAuthorOnly, sort, counts]);

    const totalCitations = Object.values(counts).reduce((a, b) => a + b, 0);
    const h = hIndex(Object.values(counts));
    const firstAuthored = publications.filter((p) => p.authors[0] === ME).length;
    const hasFilters = Boolean(query || type || year || firstAuthorOnly);
    const reset = () => { setQuery(''); setType(null); setYear(null); setFirstAuthorOnly(false); };

    return (
        <div className="min-h-screen py-20 md:py-32 relative">
            <OrganicBlob color="teal" size="xl" className="top-0 left-0 -translate-x-1/4 -translate-y-1/4" delay={0} />
            <OrganicBlob color="coral" size="lg" className="bottom-0 right-0 translate-x-1/4 translate-y-1/4" delay={3} />

            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Header */}
                <AnimatedSection className="max-w-3xl mb-12">
                    <div className="flex items-center gap-3 mb-4">
                        <BookOpen size={24} className="text-teal-600" />
                        <span className="text-teal-600 font-semibold tracking-widest uppercase text-xs">Research</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-charcoal-900 mb-6">Publications</h1>
                    <p className="text-lg md:text-xl text-charcoal-600 leading-relaxed mb-6">
                        My research sits at the intersection of immersive technologies, spatial analysis and AI systems.
                        Every entry links to its DOI and can be cited in one click.
                    </p>
                    <div className="flex flex-wrap gap-4">
                        {[
                            ['Google Scholar', 'https://scholar.google.com/citations?user=3HxpopEAAAAJ&hl=en'],
                            ['ORCID', 'https://orcid.org/0000-0003-1555-7867'],
                        ].map(([label, href]) => (
                            <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-teal-600 font-medium hover:text-teal-700 transition-colors group">
                                {label}
                                <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                            </a>
                        ))}
                    </div>
                </AnimatedSection>

                {/* Metrics */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                    {[
                        { v: publications.length, l: 'Publications' },
                        { v: totalCitations, l: 'Citations' },
                        { v: h, l: 'h-index' },
                        { v: firstAuthored, l: 'First-authored' },
                    ].map((m) => (
                        <div key={m.l} className="rounded-2xl bg-white/80 border border-sand-200 p-4">
                            <CountUp value={m.v} className="block text-3xl font-display font-bold text-gradient leading-none mb-1" />
                            <span className="text-[11px] font-semibold uppercase tracking-wider text-charcoal-500">{m.l}</span>
                        </div>
                    ))}
                </div>
                <p className="text-xs text-charcoal-400 mb-12 flex items-center gap-1.5">
                    <span className={cn('w-2 h-2 rounded-full', live ? 'bg-emerald-500 animate-pulse' : 'bg-charcoal-300')} />
                    {live ? 'Citation counts live from Crossref' : 'Citation counts from Crossref, September 2026'}
                </p>

                <FeaturedPaper pub={publications.find((p) => p.highlight)!} />

                {/* Controls */}
                <div className="rounded-3xl bg-white/85 backdrop-blur border border-sand-200 p-3 md:p-4 mb-10 space-y-3">
                    <div className="flex flex-col sm:flex-row gap-3">
                        <div className="relative flex-1">
                            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-charcoal-400" />
                            <input
                                type="search"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Search titles, venues, co-authors…"
                                aria-label="Search publications"
                                className="w-full pl-10 pr-4 py-2.5 rounded-full bg-sand-50 border border-sand-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/40 focus:border-teal-400"
                            />
                        </div>
                        <select
                            value={sort}
                            onChange={(e) => setSort(e.target.value as Sort)}
                            aria-label="Sort publications"
                            className="text-sm font-semibold bg-white border border-sand-200 rounded-full px-4 py-2.5 text-charcoal-700 focus:outline-none focus:ring-2 focus:ring-teal-500/40"
                        >
                            <option value="newest">Newest first</option>
                            <option value="cited">Most cited</option>
                        </select>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                        <Pill active={!type} onClick={() => setType(null)}>All types</Pill>
                        {types.map((t) => (
                            <Pill key={t} active={type === t} onClick={() => setType(type === t ? null : t)}>{typeLabels[t]}</Pill>
                        ))}
                        <span className="w-px h-5 bg-sand-200 mx-1 hidden sm:block" />
                        {years.map((y) => (
                            <Pill key={y} small active={year === y} onClick={() => setYear(year === y ? null : y)}>{y}</Pill>
                        ))}
                        <span className="w-px h-5 bg-sand-200 mx-1 hidden sm:block" />
                        <Pill small active={firstAuthorOnly} onClick={() => setFirstAuthorOnly((v) => !v)}>First author</Pill>
                        {hasFilters && (
                            <button onClick={reset} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold text-coral-600 hover:bg-coral-50">
                                <X size={12} /> Clear
                            </button>
                        )}
                    </div>
                </div>

                <p className="sr-only" aria-live="polite">{list.length} publications shown</p>

                {list.length === 0 ? (
                    <div className="text-center py-16 rounded-3xl border border-dashed border-sand-300 bg-white/50">
                        <p className="text-charcoal-500 mb-3">No publications match those filters.</p>
                        <button onClick={reset} className="text-teal-700 font-semibold text-sm">Reset filters</button>
                    </div>
                ) : (
                    <motion.div layout className="space-y-5">
                        <AnimatePresence initial={false}>
                            {list.map((pub) => (
                                <PublicationCard key={pub.id} pub={pub} citations={counts[pub.id]} maxCitations={Math.max(...Object.values(counts), 1)} />
                            ))}
                        </AnimatePresence>
                    </motion.div>
                )}
            </div>
        </div>
    );
}

function Pill({ active, onClick, children, small }: { active: boolean; onClick: () => void; children: React.ReactNode; small?: boolean }) {
    return (
        <button
            onClick={onClick}
            aria-pressed={active}
            className={cn(
                'rounded-full font-semibold border transition-colors',
                small ? 'px-2.5 py-1 text-xs' : 'px-3.5 py-1.5 text-sm',
                active ? 'bg-charcoal-900 border-charcoal-900 text-white' : 'bg-white border-sand-200 text-charcoal-600 hover:border-charcoal-300',
            )}
        >
            {children}
        </button>
    );
}

// The three phases described in the ICIDS 2025 paper's abstract.
const phases = [
    { n: '01', title: 'Collect', text: 'Gather lived socio-spatial experiences and analyse spatial configurations of a source community (e.g. a high school) with complementary methods.' },
    { n: '02', title: 'Synthesise', text: 'Work with experts in situated theatre and architecture to turn that data into immersive AR narratives that reflect the source place.' },
    { n: '03', title: 'Redeploy', text: 'Use the spatial data to adapt the narratives to new target sites, such as another school or a university building, tested with 48 participants.' },
];

function FeaturedPaper({ pub }: { pub: Publication }) {
    const [phase, setPhase] = useState(0);

    return (
        <AnimatedSection className="mb-14">
            <div className="rounded-[2rem] bg-charcoal-950 text-white overflow-hidden grid md:grid-cols-[1.1fr_1fr]">
                <div className="p-6 sm:p-10">
                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/15 text-teal-300 text-[11px] font-bold uppercase tracking-widest mb-5">
                        Latest · First author
                    </span>
                    <h2 className="font-display font-bold text-2xl md:text-3xl leading-tight mb-3">{pub.title}</h2>
                    <p className="text-sm text-white/60 mb-5">{pub.details}</p>
                    <p className="text-white/80 leading-relaxed text-sm mb-6">{pub.abstract}</p>
                    <div className="flex flex-wrap gap-3">
                        <a href={`https://doi.org/${pub.doi}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-charcoal-900 text-sm font-semibold hover:bg-teal-50">
                            Read on Springer <ExternalLink size={14} />
                        </a>
                        <CopyButton text={toBibtex(pub)} label="BibTeX" dark />
                    </div>
                </div>
                <div className="relative p-6 sm:p-10 bg-gradient-to-br from-teal-900/60 via-charcoal-900 to-indigo-950 border-t md:border-t-0 md:border-l border-white/10">
                    <p className="text-xs font-bold uppercase tracking-widest text-teal-300 mb-4">The method in three phases</p>
                    <div className="flex gap-2 mb-6" role="tablist" aria-label="Method phases">
                        {phases.map((p, i) => (
                            <button
                                key={p.n}
                                role="tab"
                                aria-selected={phase === i}
                                onClick={() => setPhase(i)}
                                className={cn('flex-1 rounded-xl px-3 py-2 text-left transition-colors border', phase === i ? 'bg-white text-charcoal-900 border-white' : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10')}
                            >
                                <span className="block font-mono text-[10px] opacity-60">{p.n}</span>
                                <span className="block text-sm font-bold">{p.title}</span>
                            </button>
                        ))}
                    </div>
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={phase}
                            initial={{ opacity: 0, x: 12 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -12 }}
                            transition={{ duration: 0.2 }}
                        >
                            <p className="font-display text-3xl font-bold mb-3">{phases[phase].title}</p>
                            <p className="text-white/75 leading-relaxed">{phases[phase].text}</p>
                        </motion.div>
                    </AnimatePresence>
                    <div className="mt-8 flex items-center gap-2">
                        {phases.map((_, i) => (
                            <span key={i} className={cn('h-1.5 rounded-full transition-all', i === phase ? 'w-10 bg-teal-400' : 'w-4 bg-white/20')} />
                        ))}
                        <span className="ml-auto text-[11px] text-white/40">Keywords: HoloLens 2 · space syntax · locative storytelling</span>
                    </div>
                </div>
            </div>
        </AnimatedSection>
    );
}

function PublicationCard({ pub, citations, maxCitations }: { pub: Publication; citations?: number; maxCitations: number }) {
    const [open, setOpen] = useState(false);
    const [cite, setCite] = useState<'apa' | 'bibtex' | null>(null);
    const url = pub.doi ? `https://doi.org/${pub.doi}` : undefined;
    const isFirst = pub.authors[0] === ME;

    return (
        <motion.article
            layout
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.25 }}
            className="p-6 md:p-8 rounded-3xl bg-white border border-sand-200 hover:border-teal-200 hover:shadow-xl hover:shadow-teal-900/5 transition-[border-color,box-shadow] duration-300 group"
        >
            <div className="flex flex-col md:flex-row md:items-start gap-6">
                <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 text-xs mb-4">
                        <span className="font-bold text-teal-700 uppercase tracking-wider px-3 py-1 rounded-full bg-teal-50">{typeLabels[pub.type]}</span>
                        <span className="flex items-center text-charcoal-400"><Calendar size={14} className="mr-1" /> {pub.year}</span>
                        {isFirst && <span className="font-semibold text-coral-600 px-2 py-0.5 rounded-full bg-coral-50">First author</span>}
                        {pub.award && (
                            <span className="inline-flex items-center gap-1 font-semibold text-amber-800 px-2 py-0.5 rounded-full bg-amber-50 border border-amber-200">
                                <Award size={12} /> {pub.award}
                            </span>
                        )}
                    </div>

                    <h3 className="text-xl md:text-2xl font-bold text-charcoal-900 mb-3 font-display leading-snug">
                        {url ? (
                            <a href={url} target="_blank" rel="noopener noreferrer" className="hover:text-teal-700 transition-colors">
                                {pub.title}
                                <ExternalLink size={16} className="inline ml-2 -mt-1 text-teal-500" />
                            </a>
                        ) : pub.title}
                    </h3>

                    <p className="text-sm text-charcoal-500 font-medium mb-3 flex gap-1.5">
                        <Users size={14} className="text-teal-500 shrink-0 mt-0.5" />
                        <span>
                            {pub.authors.map((author, i) => (
                                <span key={author}>
                                    {author === ME ? <strong className="text-charcoal-900 font-bold">{author}</strong> : author}
                                    {i < pub.authors.length - 1 ? ', ' : ''}
                                </span>
                            ))}
                        </span>
                    </p>

                    <p className="text-sm font-display italic text-charcoal-700">
                        {pub.venue}
                        {pub.volume && <span className="not-italic">, {pub.volume}{pub.issue && `(${pub.issue})`}</span>}
                        {pub.pages && <span className="not-italic">, pp. {pub.pages}</span>}
                    </p>
                    {pub.details && <p className="text-xs text-charcoal-400 mt-1">{pub.details}</p>}

                    <AnimatePresence initial={false}>
                        {open && (
                            <motion.p
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="text-charcoal-600 leading-relaxed text-sm overflow-hidden"
                            >
                                <span className="block pt-4">{pub.abstract}</span>
                            </motion.p>
                        )}
                    </AnimatePresence>

                    <div className="flex flex-wrap items-center gap-2 mt-5">
                        <button
                            onClick={() => setOpen((o) => !o)}
                            aria-expanded={open}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-sand-50 border border-sand-200 text-xs font-semibold text-charcoal-700 hover:border-teal-300"
                        >
                            Summary <ChevronDown size={14} className={cn('transition-transform', open && 'rotate-180')} />
                        </button>
                        <button
                            onClick={() => setCite((c) => (c ? null : 'apa'))}
                            aria-expanded={Boolean(cite)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-sand-50 border border-sand-200 text-xs font-semibold text-charcoal-700 hover:border-teal-300"
                        >
                            <Quote size={13} /> Cite
                        </button>
                        {url && (
                            <a href={url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-teal-700 hover:bg-teal-50">
                                DOI: {pub.doi} <ArrowUpRight size={13} />
                            </a>
                        )}
                    </div>

                    <AnimatePresence initial={false}>
                        {cite && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="overflow-hidden"
                            >
                                <div className="mt-4 rounded-2xl bg-charcoal-950 text-white/90 p-4">
                                    <div className="flex items-center gap-2 mb-3">
                                        {(['apa', 'bibtex'] as const).map((f) => (
                                            <button
                                                key={f}
                                                onClick={() => setCite(f)}
                                                className={cn('px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider', cite === f ? 'bg-white text-charcoal-900' : 'text-white/60 hover:text-white')}
                                            >
                                                {f === 'apa' ? 'APA' : 'BibTeX'}
                                            </button>
                                        ))}
                                        <span className="flex-1" />
                                        <CopyButton text={cite === 'apa' ? toApa(pub) : toBibtex(pub)} label="Copy" dark />
                                    </div>
                                    <pre className="text-xs font-mono whitespace-pre-wrap break-words leading-relaxed">
                                        {cite === 'apa' ? toApa(pub) : toBibtex(pub)}
                                    </pre>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {citations != null && (
                    <div className="md:w-28 shrink-0 flex md:flex-col items-center md:items-end gap-3 md:gap-1 md:text-right" title="Crossref citation count">
                        <span className="text-3xl font-display font-bold text-charcoal-900 leading-none">{citations}</span>
                        <span className="text-[10px] uppercase tracking-wider text-charcoal-500 font-semibold flex items-center gap-1">
                            <TrendingUp size={12} /> citations
                        </span>
                        <span className="flex-1 md:flex-none md:w-full h-1.5 rounded-full bg-sand-100 overflow-hidden">
                            <motion.span
                                className="block h-full rounded-full bg-gradient-to-r from-teal-400 to-teal-600"
                                initial={{ width: 0 }}
                                whileInView={{ width: `${(citations / maxCitations) * 100}%` }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8 }}
                            />
                        </span>
                    </div>
                )}
            </div>
        </motion.article>
    );
}

function CopyButton({ text, label, dark }: { text: string; label: string; dark?: boolean }) {
    const [copied, setCopied] = useState(false);
    const copy = async () => {
        try {
            await navigator.clipboard.writeText(text);
            setCopied(true);
            setTimeout(() => setCopied(false), 1800);
        } catch {
            /* clipboard blocked; the text stays visible to select manually */
        }
    };
    return (
        <button
            onClick={copy}
            className={cn(
                'inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold transition-colors',
                dark ? 'border border-white/25 text-white hover:bg-white/10' : 'border border-sand-200 hover:border-teal-300',
            )}
            aria-live="polite"
        >
            {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
            {copied ? 'Copied' : label}
        </button>
    );
}
