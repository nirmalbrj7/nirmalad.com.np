import { useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import {
    GraduationCap, BookOpen, MapPin, Globe, Microscope, Users, Search, X, Wifi, Building2,
    ArrowRight, ExternalLink, Sparkles, CalendarDays, LayoutGrid, List, CheckCircle2,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { courses, institutions, institutionById, type Course } from '@/data/teaching';
import { imageSrc } from '@/data/media';
import { photoToItem, useLightbox, creditText } from '@/components/media/lightboxContext';
import ResearchThemes from '../components/viz/ResearchThemes';
import { AnimatedSection } from '../components/ui/AnimatedSection';
import OrganicBlob from '../components/ui/OrganicBlob';
import CountUp from '../components/ui/CountUp';
import ScrollRail from '../components/ui/ScrollRail';

const accent: Record<string, { chip: string; soft: string; text: string; ring: string; dot: string }> = {
    indigo: { chip: 'bg-indigo-600 text-white', soft: 'bg-indigo-50 border-indigo-100', text: 'text-indigo-700', ring: 'hover:border-indigo-300', dot: 'bg-indigo-500' },
    teal: { chip: 'bg-teal-600 text-white', soft: 'bg-teal-50 border-teal-100', text: 'text-teal-700', ring: 'hover:border-teal-300', dot: 'bg-teal-500' },
    emerald: { chip: 'bg-emerald-600 text-white', soft: 'bg-emerald-50 border-emerald-100', text: 'text-emerald-700', ring: 'hover:border-emerald-300', dot: 'bg-emerald-500' },
    amber: { chip: 'bg-amber-600 text-white', soft: 'bg-amber-50 border-amber-100', text: 'text-amber-800', ring: 'hover:border-amber-300', dot: 'bg-amber-500' },
};
const toneOf = (c: Course) => accent[institutionById[c.institution].accent];

const education = [
    {
        degree: 'PhD in Computer Science',
        institution: 'Dalhousie University',
        location: 'Halifax, Canada',
        year: 'In progress',
        detail: 'Immersive AR narratives, spatial analysis and human–space interaction, supervised by Dr. Derek Reilly in the GEM Lab.',
    },
    {
        degree: 'MSc in Information Technology',
        institution: 'The British College, Leeds Beckett University',
        location: 'Kathmandu, Nepal / UK',
        year: '2022',
        detail: 'Thesis: Artificial Intelligence-based System Architecture for Flood Forecasting.',
    },
    {
        degree: 'BSc (Hons) in Computing',
        institution: 'Islington College, London Metropolitan University',
        location: 'Kathmandu, Nepal / UK',
        year: '2016',
        detail: 'Final project: Transport Management System with Driver\'s Android Tracking.',
    },
];

const memberships = ['Canadian Information Processing Society (CIPS)', 'International Association of Engineers (IAENG)', 'Information Technology Professionals Association (ITPA)'];

type StatusFilter = 'all' | 'current' | 'past';

export default function Academic() {
    const [selected, setSelected] = useState<Course | null>(null);
    const [query, setQuery] = useState('');
    const [inst, setInst] = useState<string>('all');
    const [status, setStatus] = useState<StatusFilter>('all');
    const [mode, setMode] = useState<'all' | 'Online' | 'In person'>('all');
    const [view, setView] = useState<'grid' | 'list'>('grid');
    const catalogueRef = useRef<HTMLDivElement>(null);

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        return courses
            .filter((c) => (inst === 'all' || c.institution === inst) && (status === 'all' || c.status === status) && (mode === 'all' || c.mode === mode))
            .filter((c) => !q || [c.title, c.code ?? '', c.description, ...c.topics].join(' ').toLowerCase().includes(q))
            .sort((a, b) => b.sortKey.localeCompare(a.sortKey));
    }, [query, inst, status, mode]);

    const current = courses.filter((c) => c.status === 'current');
    const auafNow = current.filter((c) => c.institution === 'auaf');
    const onlineShare = Math.round((courses.filter((c) => c.mode === 'Online').length / courses.length) * 100);
    const hasFilters = Boolean(query || inst !== 'all' || status !== 'all' || mode !== 'all');

    const showInstitution = (id: string) => {
        setInst(id);
        setStatus('all');
        setMode('all');
        setQuery('');
        catalogueRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    return (
        <div className="min-h-screen py-20 md:py-32 relative">
            <OrganicBlob color="teal" size="xl" className="top-0 right-0 translate-x-1/3 -translate-y-1/4" delay={0} />
            <OrganicBlob color="coral" size="lg" className="top-[60rem] left-0 -translate-x-1/3" delay={2} />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <Hero auafNowCount={auafNow.length} />

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-20">
                    {[
                        { v: courses.length, s: '', l: 'Courses taught' },
                        { v: institutions.length, s: '', l: 'Institutions' },
                        { v: current.length, s: '', l: 'Teaching now' },
                        { v: onlineShare, s: '%', l: 'Online' },
                        { v: 4, s: ' yrs', l: 'Teaching (2023–26)' },
                    ].map((m) => (
                        <div key={m.l} className="rounded-2xl bg-white/80 border border-sand-200 p-4">
                            <CountUp value={m.v} suffix={m.s} className="block text-3xl font-display font-bold text-gradient leading-none mb-1" />
                            <span className="text-[11px] font-semibold uppercase tracking-wider text-charcoal-500">{m.l}</span>
                        </div>
                    ))}
                </div>

                {/* Teaching now */}
                <AnimatedSection className="mb-24">
                    <SectionTitle icon={Sparkles} eyebrow="Fall 2026" title="Teaching now" />
                    <div className="grid lg:grid-cols-[1.3fr_1fr] gap-6">
                        <div className="rounded-3xl bg-charcoal-950 text-white p-6 md:p-8 relative overflow-hidden">
                            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-700/40 via-transparent to-transparent" />
                            <div className="relative">
                                <p className="text-xs font-bold uppercase tracking-widest text-indigo-300 mb-1">American University of Afghanistan · Adjunct Lecturer</p>
                                <p className="text-sm text-white/60 mb-6 flex items-center gap-1.5"><Wifi size={14} /> Taught remotely from Halifax</p>
                                <div className="space-y-4">
                                    {auafNow.map((c) => (
                                        <button key={c.id} onClick={() => setSelected(c)} className="w-full text-left group rounded-2xl bg-white/5 border border-white/10 hover:border-indigo-400/60 hover:bg-white/10 p-5 transition-colors">
                                            <span className="flex items-center justify-between gap-3 mb-1">
                                                <span className="font-display font-bold text-xl">{c.title}</span>
                                                <ArrowRight size={18} className="shrink-0 text-white/40 group-hover:text-indigo-300 group-hover:translate-x-1 transition" />
                                            </span>
                                            <span className="block text-sm text-white/70 mb-3">{c.description}</span>
                                            <span className="flex flex-wrap gap-1.5">
                                                {c.topics.map((t) => <span key={t} className="text-[11px] px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-100">{t}</span>)}
                                            </span>
                                        </button>
                                    ))}
                                </div>
                                <p className="text-xs text-white/50 mt-5">
                                    Also taught at AUAF: Fundamentals of Networking and Telecommunications (Spring 2026).
                                </p>
                            </div>
                        </div>
                        <div className="rounded-3xl bg-white/85 border border-sand-200 p-6 md:p-8">
                            <p className="text-xs font-bold uppercase tracking-widest text-emerald-700 mb-1">University of the People · Volunteer Instructor</p>
                            <p className="text-sm text-charcoal-500 mb-5 flex items-center gap-1.5"><Globe size={14} /> Tuition-free, online, students worldwide</p>
                            <ul className="space-y-2">
                                {current.filter((c) => c.institution === 'uopeople').map((c) => (
                                    <li key={c.id}>
                                        <button onClick={() => setSelected(c)} className="w-full flex items-center gap-3 rounded-xl px-3 py-2.5 border border-sand-200 hover:border-emerald-300 hover:bg-emerald-50/40 text-left transition-colors">
                                            {c.code && <span className="shrink-0 font-mono text-[11px] px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700">{c.code}</span>}
                                            <span className="flex-1 font-semibold text-sm text-charcoal-800">{c.title}</span>
                                            <ArrowRight size={14} className="text-charcoal-300" />
                                        </button>
                                    </li>
                                ))}
                            </ul>
                            <p className="text-xs text-charcoal-400 mt-5">Plus teaching-assistant work at Dalhousie alongside PhD research.</p>
                        </div>
                    </div>
                </AnimatedSection>

                {/* Institutions */}
                <AnimatedSection className="mb-24">
                    <SectionTitle icon={Building2} eyebrow="Where I teach" title="Institutions" />
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                        {institutions.map((i) => {
                            const t = accent[i.accent];
                            const count = courses.filter((c) => c.institution === i.id).length;
                            return (
                                <div key={i.id} className={cn('group rounded-3xl bg-white border border-sand-200 overflow-hidden flex flex-col transition-colors', t.ring)}>
                                    <div className="relative aspect-[16/10] bg-sand-100 overflow-hidden">
                                        {i.photo ? (
                                            <>
                                                <img src={imageSrc(i.photo.id, true)} alt={i.photo.alt} loading="lazy" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                                                <a href={i.photo.credit.source} target="_blank" rel="noopener noreferrer" className="absolute right-2 bottom-2 px-1.5 py-0.5 rounded bg-charcoal-950/60 text-[9px] text-white/80 hover:text-white">
                                                    {creditText(i.photo)}
                                                </a>
                                            </>
                                        ) : (
                                            <div className={cn('absolute inset-0 flex items-center justify-center bg-gradient-to-br from-emerald-500 to-teal-700')}>
                                                <Globe size={56} className="text-white/30" />
                                            </div>
                                        )}
                                        <span className={cn('absolute left-3 top-3 inline-flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider', t.chip)}>
                                            {i.mode === 'Online' ? <Wifi size={11} /> : <MapPin size={11} />} {i.mode}
                                        </span>
                                    </div>
                                    <div className="p-5 flex-1 flex flex-col">
                                        <p className={cn('text-[11px] font-bold uppercase tracking-wider mb-1', t.text)}>{i.role}</p>
                                        <h3 className="font-display font-bold text-charcoal-900 leading-snug">{i.name}</h3>
                                        <p className="text-xs text-charcoal-500 mb-3">{i.period} · {i.location}</p>
                                        <p className="text-sm text-charcoal-600 leading-relaxed mb-4 flex-1">{i.blurb}</p>
                                        <div className="flex items-center justify-between gap-2">
                                            <button onClick={() => showInstitution(i.id)} className={cn('inline-flex items-center gap-1 text-sm font-semibold', t.text)}>
                                                {count} course{count > 1 ? 's' : ''} <ArrowRight size={14} />
                                            </button>
                                            {i.url && (
                                                <a href={i.url} target="_blank" rel="noopener noreferrer" className="text-charcoal-400 hover:text-charcoal-800" aria-label={`${i.name} website`}>
                                                    <ExternalLink size={15} />
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </AnimatedSection>

                {/* Timeline */}
                <AnimatedSection className="mb-24">
                    <SectionTitle icon={CalendarDays} eyebrow="2023 → 2026" title="Teaching timeline" />
                    <TermTimeline onSelect={setSelected} />
                </AnimatedSection>

                {/* Catalogue */}
                <div ref={catalogueRef} className="scroll-mt-28 mb-24">
                    <SectionTitle icon={BookOpen} eyebrow="Every course" title="Course catalogue" />
                    <div className="rounded-3xl bg-white/85 backdrop-blur border border-sand-200 p-3 md:p-4 mb-8 space-y-3">
                        <div className="flex flex-col md:flex-row gap-3">
                            <div className="relative flex-1">
                                <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-charcoal-400" />
                                <input
                                    type="search"
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    placeholder="Search courses, codes, topics…"
                                    aria-label="Search courses"
                                    className="w-full pl-10 pr-4 py-2.5 rounded-full bg-sand-50 border border-sand-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/40 focus:border-teal-400"
                                />
                            </div>
                            <div className="flex items-center gap-2">
                                {(['all', 'current', 'past'] as const).map((s) => (
                                    <Pill key={s} active={status === s} onClick={() => setStatus(s)}>{s === 'all' ? 'All' : s === 'current' ? 'Current' : 'Past'}</Pill>
                                ))}
                                <span className="w-px h-6 bg-sand-200 mx-1" />
                                <div className="flex rounded-full bg-sand-50 border border-sand-200 p-1">
                                    {([['grid', LayoutGrid], ['list', List]] as const).map(([v, Icon]) => (
                                        <button key={v} onClick={() => setView(v)} aria-pressed={view === v} aria-label={`${v} view`} className={cn('p-1.5 rounded-full', view === v ? 'bg-charcoal-900 text-white' : 'text-charcoal-500')}>
                                            <Icon size={15} />
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-wrap items-center gap-2">
                            <Pill small active={inst === 'all'} onClick={() => setInst('all')}>All institutions</Pill>
                            {institutions.map((i) => (
                                <Pill key={i.id} small active={inst === i.id} onClick={() => setInst(inst === i.id ? 'all' : i.id)}>
                                    <span className={cn('w-2 h-2 rounded-full', accent[i.accent].dot)} /> {i.short}
                                </Pill>
                            ))}
                            <span className="w-px h-5 bg-sand-200 mx-1 hidden sm:block" />
                            {(['Online', 'In person'] as const).map((m) => (
                                <Pill key={m} small active={mode === m} onClick={() => setMode(mode === m ? 'all' : m)}>{m}</Pill>
                            ))}
                            {hasFilters && (
                                <button onClick={() => { setQuery(''); setInst('all'); setStatus('all'); setMode('all'); }} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold text-coral-600 hover:bg-coral-50">
                                    <X size={12} /> Clear
                                </button>
                            )}
                        </div>
                    </div>

                    <p className="text-sm text-charcoal-500 mb-4" aria-live="polite">{filtered.length} of {courses.length} courses</p>

                    {filtered.length === 0 ? (
                        <div className="text-center py-16 rounded-3xl border border-dashed border-sand-300 bg-white/50 text-charcoal-500">No courses match those filters.</div>
                    ) : (
                        <motion.div layout className={cn(view === 'grid' ? 'grid sm:grid-cols-2 lg:grid-cols-3 gap-5' : 'space-y-3')}>
                            <AnimatePresence initial={false}>
                                {filtered.map((c) => (
                                    <CourseCard key={c.id} course={c} compact={view === 'list'} onOpen={() => setSelected(c)} />
                                ))}
                            </AnimatePresence>
                        </motion.div>
                    )}
                </div>

                {/* Research */}
                <AnimatedSection className="mb-16">
                    <SectionTitle icon={Microscope} eyebrow="Research" title="Research themes" />
                    <ResearchThemes />
                </AnimatedSection>

                {/* PhD, service & memberships */}
                <AnimatedSection className="mb-24">
                    <div className="grid md:grid-cols-3 gap-5">
                        <div className="rounded-3xl bg-gradient-to-br from-teal-600 to-teal-800 text-white p-6 flex flex-col">
                            <span className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center mb-4"><GraduationCap size={20} /></span>
                            <p className="text-xs font-bold uppercase tracking-widest text-teal-100 mb-1">PhD research</p>
                            <h3 className="font-display font-bold text-lg leading-snug mb-2">Locative AR narratives that travel between places</h3>
                            <p className="text-sm text-white/80 leading-relaxed mb-5 flex-1">
                                Supervised by Dr. Derek Reilly in the GEM Lab. First-author paper at ICIDS 2025 (Springer LNCS).
                            </p>
                            <div className="flex flex-wrap gap-2">
                                <Link to="/research/ar-narratives" className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white text-teal-800 text-sm font-semibold hover:bg-teal-50">
                                    Read the research <ArrowRight size={14} />
                                </Link>
                                <Link to="/publications" className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-white/30 text-sm font-semibold hover:bg-white/10">
                                    Publications
                                </Link>
                            </div>
                        </div>

                        <div className="rounded-3xl bg-white/85 border border-sand-200 p-6 flex flex-col">
                            <span className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4"><Users size={20} /></span>
                            <p className="text-xs font-bold uppercase tracking-widest text-indigo-700 mb-1">Academic service</p>
                            <h3 className="font-display font-bold text-lg text-charcoal-900 leading-snug mb-4">Web Chair, ACM SUI & VRST 2025</h3>
                            <ul className="space-y-2 flex-1">
                                {[
                                    { name: 'ACM SUI 2025', detail: 'Spatial User Interaction · 10–11 Nov, Montréal', href: 'https://sui.acm.org/2025/committee-members/index.html' },
                                    { name: 'ACM VRST 2025', detail: 'VR Software & Technology · 12–14 Nov, Montréal', href: 'https://vrst.acm.org/vrst2025/index.php/committee/' },
                                ].map((c) => (
                                    <li key={c.name}>
                                        <a href={c.href} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-3 rounded-xl border border-sand-200 hover:border-indigo-300 px-3 py-2.5 transition-colors">
                                            <span className="flex-1 min-w-0">
                                                <span className="block text-sm font-semibold text-charcoal-900 group-hover:text-indigo-700">{c.name}</span>
                                                <span className="block text-xs text-charcoal-500 truncate">{c.detail}</span>
                                            </span>
                                            <ExternalLink size={14} className="shrink-0 text-charcoal-300 group-hover:text-indigo-600" />
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="rounded-3xl bg-white/85 border border-sand-200 p-6 flex flex-col">
                            <span className="w-10 h-10 rounded-xl bg-coral-50 text-coral-600 flex items-center justify-center mb-4"><Building2 size={20} /></span>
                            <p className="text-xs font-bold uppercase tracking-widest text-coral-600 mb-1">Memberships</p>
                            <h3 className="font-display font-bold text-lg text-charcoal-900 leading-snug mb-4">Professional bodies</h3>
                            <ul className="space-y-2.5">
                                {memberships.map((m) => (
                                    <li key={m} className="flex gap-2 text-sm text-charcoal-700">
                                        <CheckCircle2 size={16} className="shrink-0 mt-0.5 text-coral-500" /> {m}
                                    </li>
                                ))}
                                <li className="flex gap-2 text-sm text-charcoal-700">
                                    <CheckCircle2 size={16} className="shrink-0 mt-0.5 text-coral-500" /> Project Management Professional (PMP), PMI
                                </li>
                            </ul>
                        </div>
                    </div>
                </AnimatedSection>

                {/* Education */}
                <AnimatedSection>
                    <SectionTitle icon={GraduationCap} eyebrow="Degrees" title="Education" />
                    <div className="relative">
                        <div className="absolute left-[19px] top-3 bottom-3 w-0.5 bg-gradient-to-b from-teal-400 via-sand-300 to-coral-300 hidden sm:block" />
                        <div className="space-y-5">
                            {education.map((e) => (
                                <div key={e.degree} className="relative sm:pl-14">
                                    <span className="hidden sm:flex absolute left-0 top-5 w-10 h-10 rounded-full bg-white border-2 border-teal-400 items-center justify-center text-teal-600">
                                        <GraduationCap size={18} />
                                    </span>
                                    <div className="rounded-2xl bg-white/85 border border-sand-200 hover:border-teal-200 p-5 md:p-6 transition-colors">
                                        <div className="flex flex-wrap items-baseline justify-between gap-2 mb-1">
                                            <h3 className="font-display font-bold text-lg text-charcoal-900">{e.degree}</h3>
                                            <span className="text-sm font-bold text-teal-700">{e.year}</span>
                                        </div>
                                        <p className="text-sm text-charcoal-500 mb-2">{e.institution} · {e.location}</p>
                                        <p className="text-sm text-charcoal-700">{e.detail}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </AnimatedSection>
            </div>

            <CourseModal course={selected} onClose={() => setSelected(null)} />
        </div>
    );
}

function Hero({ auafNowCount }: { auafNowCount: number }) {
    const { open } = useLightbox();
    const heroPhotos = [institutionById.dal.photo!, institutionById.auaf.photo!];

    return (
        <AnimatedSection className="grid lg:grid-cols-[1.1fr_1fr] gap-10 items-center mb-14">
            <div>
                <span className="text-coral-500 font-handwritten text-2xl">Background</span>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-charcoal-900 mt-2 mb-6">Academic Profile</h1>
                <p className="text-lg md:text-xl text-charcoal-600 leading-relaxed mb-6">
                    PhD researcher at Dalhousie, Adjunct Lecturer at the American University of Afghanistan and
                    volunteer instructor at University of the People: teaching programming, web, networking, AI and
                    HCI to students in Halifax and online around the world.
                </p>
                <div className="flex flex-wrap gap-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-sm font-semibold">
                        <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" /> Teaching {auafNowCount} AUAF courses this term
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-sand-200 text-charcoal-600 text-sm">
                        <MapPin size={14} /> Halifax, Canada
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-sand-200 text-charcoal-600 text-sm">
                        <Users size={14} /> In person & online
                    </span>
                </div>
            </div>
            <div className="grid grid-cols-5 gap-3">
                {heroPhotos.map((p, i) => (
                    <button
                        key={p.id}
                        onClick={() => open(heroPhotos.map(photoToItem), i)}
                        className={cn('group relative rounded-3xl overflow-hidden bg-sand-100 cursor-zoom-in', i === 0 ? 'col-span-3 aspect-[4/5]' : 'col-span-2 aspect-[4/5] mt-10')}
                        aria-label={`Enlarge: ${p.alt}`}
                    >
                        <img src={imageSrc(p.id, true)} alt={p.alt} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                        <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-charcoal-950/80 to-transparent p-3 pt-10 text-left">
                            <span className="block text-white text-xs font-semibold">{i === 0 ? 'Dalhousie University' : 'AUAF'}</span>
                            <span className="block text-white/60 text-[9px]">{creditText(p)}</span>
                        </span>
                    </button>
                ))}
            </div>
        </AnimatedSection>
    );
}

function SectionTitle({ icon: Icon, eyebrow, title }: { icon: typeof BookOpen; eyebrow: string; title: string }) {
    return (
        <div className="flex items-end gap-3 mb-8">
            <div className="w-11 h-11 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center shrink-0">
                <Icon size={22} />
            </div>
            <div>
                <p className="text-xs font-bold uppercase tracking-widest text-teal-600">{eyebrow}</p>
                <h2 className="text-2xl md:text-3xl font-display font-bold text-charcoal-900">{title}</h2>
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
                'inline-flex items-center gap-1.5 rounded-full font-semibold border transition-colors whitespace-nowrap',
                small ? 'px-2.5 py-1 text-xs' : 'px-3 py-1.5 text-sm',
                active ? 'bg-charcoal-900 border-charcoal-900 text-white' : 'bg-white border-sand-200 text-charcoal-600 hover:border-charcoal-300',
            )}
        >
            {children}
        </button>
    );
}

function TermTimeline({ onSelect }: { onSelect: (c: Course) => void }) {
    const terms = useMemo(() => {
        const map = new Map<string, Course[]>();
        for (const c of [...courses].sort((a, b) => a.sortKey.localeCompare(b.sortKey))) {
            map.set(c.sortKey, [...(map.get(c.sortKey) ?? []), c]);
        }
        return [...map.entries()].map(([key, list]) => ({ key, label: list[0].term, year: key.slice(0, 4), list }));
    }, []);
    const [hover, setHover] = useState<string | null>(null);

    return (
        <div className="relative">
            <ScrollRail label="Teaching timeline, 2023 to 2026">
                {terms.map((t, i) => (
                    <motion.div
                        key={t.key}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.06 }}
                        className="snap-start shrink-0 w-56"
                    >
                        <div className="flex items-center gap-2 mb-3">
                            <span className={cn('w-3 h-3 rounded-full ring-4 ring-sand-50', t.list.some((c) => c.status === 'current') ? 'bg-indigo-500' : 'bg-teal-500')} />
                            <span className="h-0.5 flex-1 bg-gradient-to-r from-teal-300 to-sand-200" />
                        </div>
                        <p className="text-xs font-bold uppercase tracking-widest text-charcoal-400">{t.year}</p>
                        <p className="font-display font-bold text-charcoal-900 mb-3">{t.label}</p>
                        <div className="space-y-2">
                            {t.list.map((c) => {
                                const tone = toneOf(c);
                                return (
                                    <button
                                        key={c.id}
                                        onClick={() => onSelect(c)}
                                        onMouseEnter={() => setHover(c.institution)}
                                        onMouseLeave={() => setHover(null)}
                                        className={cn(
                                            'w-full text-left rounded-xl border px-3 py-2 text-xs font-semibold transition-all',
                                            tone.soft, tone.text,
                                            hover && hover !== c.institution && 'opacity-40',
                                            'hover:shadow-md hover:-translate-y-0.5',
                                        )}
                                    >
                                        <span className="block text-[10px] uppercase tracking-wider opacity-70">{institutionById[c.institution].short}{c.code ? ` · ${c.code}` : ''}</span>
                                        {c.title}
                                    </button>
                                );
                            })}
                        </div>
                    </motion.div>
                ))}
            </ScrollRail>
            <div className="flex flex-wrap gap-3 mt-4 text-xs text-charcoal-500">
                {institutions.map((i) => (
                    <span key={i.id} className="inline-flex items-center gap-1.5"><span className={cn('w-2.5 h-2.5 rounded-full', accent[i.accent].dot)} /> {i.short}</span>
                ))}
            </div>
        </div>
    );
}

function CourseCard({ course: c, compact, onOpen }: { course: Course; compact: boolean; onOpen: () => void }) {
    const tone = toneOf(c);
    const inst = institutionById[c.institution];

    return (
        <motion.button
            layout
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.25 }}
            onClick={onOpen}
            className={cn(
                'w-full text-left rounded-2xl bg-white border border-sand-200 hover:shadow-xl hover:shadow-charcoal-900/5 transition-[border-color,box-shadow] group',
                tone.ring,
                compact ? 'flex items-center gap-4 p-4' : 'p-5 flex flex-col',
            )}
        >
            <div className={cn(compact ? 'flex-1 min-w-0' : '')}>
                <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className={cn('text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border', tone.soft, tone.text)}>{inst.short}</span>
                    {c.code && <span className="font-mono text-[11px] text-charcoal-500">{c.code}</span>}
                    {c.status === 'current' && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-indigo-700">
                            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" /> Now
                        </span>
                    )}
                </div>
                <h3 className="font-display font-bold text-charcoal-900 leading-snug group-hover:text-teal-700 transition-colors">{c.title}</h3>
                <p className="text-xs text-charcoal-500 mt-1">{c.role} · {c.term} · {c.mode}</p>
            </div>
            {!compact && (
                <>
                    <p className="text-sm text-charcoal-600 leading-relaxed mt-3 mb-4 line-clamp-3">{c.description}</p>
                    <div className="mt-auto flex flex-wrap gap-1.5">
                        {c.topics.slice(0, 3).map((t) => <span key={t} className="text-[10px] px-2 py-0.5 rounded-full bg-sand-50 border border-sand-100 text-charcoal-600">{t}</span>)}
                    </div>
                </>
            )}
            {compact && <ArrowRight size={16} className="shrink-0 text-charcoal-300 group-hover:text-teal-600" />}
        </motion.button>
    );
}

function CourseModal({ course, onClose }: { course: Course | null; onClose: () => void }) {
    useEffect(() => {
        if (!course) return;
        const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
        window.addEventListener('keydown', onKey);
        const prev = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = prev; };
    }, [course, onClose]);

    return createPortal(
        <AnimatePresence>
            {course && (
                <motion.div
                    className="fixed inset-0 z-[80] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-charcoal-950/50 backdrop-blur-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}
                >
                    <motion.div
                        role="dialog"
                        aria-modal="true"
                        aria-label={course.title}
                        initial={{ y: 40, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 40, opacity: 0 }}
                        transition={{ type: 'spring', damping: 28, stiffness: 300 }}
                        className="w-full sm:max-w-2xl max-h-[90vh] overflow-y-auto rounded-t-3xl sm:rounded-3xl bg-white shadow-2xl"
                    >
                        <CourseModalBody course={course} onClose={onClose} />
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>,
        document.body,
    );
}

function CourseModalBody({ course: c, onClose }: { course: Course; onClose: () => void }) {
    const inst = institutionById[c.institution];
    const tone = toneOf(c);

    return (
        <>
            <div className="relative p-6 sm:p-8 border-b border-sand-100">
                <button onClick={onClose} className="absolute right-4 top-4 p-2 rounded-full hover:bg-sand-100 text-charcoal-500" aria-label="Close">
                    <X size={20} />
                </button>
                <div className="flex flex-wrap items-center gap-2 mb-3 pr-10">
                    <span className={cn('text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full', tone.chip)}>{inst.short}</span>
                    {c.code && <span className="font-mono text-xs text-charcoal-500">{c.code}</span>}
                    <span className={cn('text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full', c.status === 'current' ? 'bg-indigo-50 text-indigo-700' : 'bg-sand-100 text-charcoal-500')}>
                        {c.status === 'current' ? 'Current' : 'Completed'}
                    </span>
                </div>
                <h2 className="text-2xl font-display font-bold text-charcoal-900 mb-2">{c.title}</h2>
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-charcoal-500">
                    <span className="inline-flex items-center gap-1.5"><Users size={14} /> {c.role}</span>
                    <span className="inline-flex items-center gap-1.5"><CalendarDays size={14} /> {c.term}</span>
                    <span className="inline-flex items-center gap-1.5">{c.mode === 'Online' ? <Wifi size={14} /> : <MapPin size={14} />} {c.mode}</span>
                    <span className="inline-flex items-center gap-1.5"><GraduationCap size={14} /> {c.level}</span>
                </div>
            </div>
            <div className="p-6 sm:p-8 space-y-6">
                <p className="text-charcoal-700 leading-relaxed">{c.description}</p>
                <div>
                    <h3 className="text-xs font-bold uppercase tracking-widest text-charcoal-400 mb-2">Topics</h3>
                    <div className="flex flex-wrap gap-2">
                        {c.topics.map((t) => <span key={t} className={cn('text-sm px-3 py-1 rounded-full border', tone.soft, tone.text)}>{t}</span>)}
                    </div>
                </div>
                <div>
                    <h3 className="text-xs font-bold uppercase tracking-widest text-charcoal-400 mb-2">My role</h3>
                    <ul className="space-y-2">
                        {c.responsibilities.map((r) => (
                            <li key={r} className="flex gap-2 text-sm text-charcoal-700"><CheckCircle2 size={16} className="shrink-0 mt-0.5 text-teal-600" /> {r}</li>
                        ))}
                    </ul>
                </div>
                <div className="rounded-2xl bg-sand-50 border border-sand-200 p-4 flex items-center gap-3">
                    <Building2 size={20} className="text-charcoal-400 shrink-0" />
                    <div className="flex-1 min-w-0">
                        <p className="font-semibold text-sm text-charcoal-900">{inst.name}</p>
                        <p className="text-xs text-charcoal-500">{inst.location}</p>
                    </div>
                    {inst.url && (
                        <a href={inst.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-sm font-semibold text-teal-700 hover:text-teal-900">
                            Website <ExternalLink size={13} />
                        </a>
                    )}
                </div>
            </div>
        </>
    );
}
