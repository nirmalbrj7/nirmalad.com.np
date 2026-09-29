import { useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Search, FileText, Layers, BookOpen, Newspaper, CornerDownLeft, ArrowUpRight, Compass, Microscope, GraduationCap } from 'lucide-react';
import { cn } from '@/lib/utils';
import { allProjects } from '@/data/projects';
import { publications } from '@/data/publications';
import { links, formatLinkDate } from '@/data/links';
import { courses, institutionById } from '@/data/teaching';

export const OPEN_PALETTE_EVENT = 'open-command-palette';

type Group = 'Pages' | 'Case studies' | 'Projects' | 'Teaching' | 'Publications' | 'Press & links';

interface Entry {
    id: string;
    group: Group;
    title: string;
    subtitle?: string;
    haystack: string;
    to?: string;
    href?: string;
}

const groupIcons: Record<Group, typeof Search> = {
    Pages: Compass,
    'Case studies': Microscope,
    Projects: Layers,
    Teaching: GraduationCap,
    Publications: BookOpen,
    'Press & links': Newspaper,
};

const pages: [string, string, string][] = [
    ['Home', '/', 'Overview, impact and featured story'],
    ['Research', '/research', 'Active research and applied projects'],
    ['Key Projects', '/projects', 'Platforms, AI, field systems, apps'],
    ['Open Source', '/open-source', 'Extensions, npm packages, Spatial OS'],
    ['Publications', '/publications', 'Papers, citations, BibTeX'],
    ['Awards & Recognition', '/recognition', 'Call for Code, service, certifications'],
    ['Academic Profile', '/academic', 'Teaching at AUAF, Dalhousie and UoPeople'],
    ['Blog', '/blog', 'Articles and writing'],
    ['CV', '/cv', 'Experience and education'],
    ['Contact', '/contact', 'Email and social links'],
];

const caseStudies: [string, string, string][] = [
    ['ar-narratives', 'Locative AR Narratives', 'HoloLens 2 · ICIDS 2025 · 48 participants'],
    ['pd3r', 'PD3R', 'AI retrofit triage · Call for Code 2018, 2nd place'],
    ['isac-simo', 'ISAC-SIMO', 'Construction QA with ML · Linux Foundation'],
    ['bctap', 'BCtap Platform', 'Resilient housing at scale · 26+ countries'],
];

function buildIndex(): Entry[] {
    return [
        ...pages.map(([title, to, subtitle]) => ({ id: `page-${to}`, group: 'Pages' as const, title, subtitle, to, haystack: `${title} ${subtitle}` })),
        ...caseStudies.map(([id, title, subtitle]) => ({ id: `case-${id}`, group: 'Case studies' as const, title, subtitle, to: `/research/${id}`, haystack: `${title} ${subtitle}` })),
        ...allProjects.map((p) => ({
            id: `project-${p.id}`,
            group: 'Projects' as const,
            title: p.title,
            subtitle: `${p.role} · ${p.location} · ${p.period}`,
            to: p.caseStudy ? `/research/${p.caseStudy}` : '/projects',
            haystack: [p.title, p.role, p.location, p.desc, ...p.tags, ...p.countries].join(' '),
        })),
        ...publications.map((p) => ({
            id: `pub-${p.id}`,
            group: 'Publications' as const,
            title: p.title,
            subtitle: `${p.venue} · ${p.year}`,
            href: p.doi ? `https://doi.org/${p.doi}` : undefined,
            to: p.doi ? undefined : '/publications',
            haystack: [p.title, p.venue, p.abstract, ...p.authors].join(' '),
        })),
        ...courses.map((c) => ({
            id: `course-${c.id}`,
            group: 'Teaching' as const,
            title: c.title,
            subtitle: `${institutionById[c.institution].short}${c.code ? ` ${c.code}` : ''} · ${c.term} · ${c.role}`,
            to: '/academic',
            haystack: [c.title, c.code ?? '', c.description, ...c.topics, institutionById[c.institution].name].join(' '),
        })),
        ...links.map((l) => ({
            id: `link-${l.id}`,
            group: 'Press & links' as const,
            title: l.title,
            subtitle: [l.publisher, formatLinkDate(l.date)].filter(Boolean).join(' · '),
            href: l.url,
            haystack: [l.title, l.publisher, l.summary, ...l.highlights].join(' '),
        })),
    ];
}

// Prefer on-site destinations over outbound links when matches are otherwise equal.
const groupWeight: Record<Group, number> = { Pages: 3, 'Case studies': 3, Projects: 2, Teaching: 2, Publications: 1, 'Press & links': 0 };

function search(index: Entry[], query: string): Entry[] {
    const tokens = query.toLowerCase().split(/\s+/).filter(Boolean);
    if (!tokens.length) return index.filter((e) => e.group === 'Pages' || e.group === 'Case studies');
    const scored = index
        .map((e) => {
            const hay = e.haystack.toLowerCase();
            const title = e.title.toLowerCase();
            if (!tokens.every((t) => hay.includes(t))) return null;
            const score = groupWeight[e.group] + tokens.reduce((s, t) => s + (title.startsWith(t) ? 6 : title.includes(t) ? 3 : 1), 0);
            return { e, score };
        })
        .filter((x): x is { e: Entry; score: number } => x !== null)
        .sort((a, b) => b.score - a.score)
        .slice(0, 24);

    // Keep each group contiguous, ordering groups by their best match.
    const groups = new Map<Group, Entry[]>();
    for (const { e } of scored) groups.set(e.group, [...(groups.get(e.group) ?? []), e]);
    return [...groups.values()].flat();
}

export default function CommandPalette() {
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState('');
    const [active, setActive] = useState(0);
    const inputRef = useRef<HTMLInputElement>(null);
    const listRef = useRef<HTMLUListElement>(null);
    const navigate = useNavigate();
    const index = useMemo(buildIndex, []);
    const results = useMemo(() => search(index, query), [index, query]);

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            const target = e.target as HTMLElement;
            const typing = target.closest('input, textarea, select, [contenteditable="true"]');
            if ((e.key.toLowerCase() === 'k' && (e.metaKey || e.ctrlKey)) || (e.key === '/' && !typing)) {
                e.preventDefault();
                setOpen((o) => !o);
            }
        };
        const onOpen = () => setOpen(true);
        window.addEventListener('keydown', onKey);
        window.addEventListener(OPEN_PALETTE_EVENT, onOpen);
        return () => {
            window.removeEventListener('keydown', onKey);
            window.removeEventListener(OPEN_PALETTE_EVENT, onOpen);
        };
    }, []);

    useEffect(() => {
        if (open) {
            setQuery('');
            setActive(0);
            requestAnimationFrame(() => inputRef.current?.focus());
        }
    }, [open]);

    useEffect(() => setActive(0), [query]);

    useEffect(() => {
        listRef.current?.querySelector(`[data-index="${active}"]`)?.scrollIntoView({ block: 'nearest' });
    }, [active]);

    const choose = (entry: Entry) => {
        setOpen(false);
        if (entry.href) window.open(entry.href, '_blank', 'noopener,noreferrer');
        else if (entry.to) navigate(entry.to);
    };

    const onInputKey = (e: React.KeyboardEvent) => {
        if (e.key === 'ArrowDown') { e.preventDefault(); setActive((a) => Math.min(a + 1, results.length - 1)); }
        else if (e.key === 'ArrowUp') { e.preventDefault(); setActive((a) => Math.max(a - 1, 0)); }
        else if (e.key === 'Enter' && results[active]) { e.preventDefault(); choose(results[active]); }
        else if (e.key === 'Escape') setOpen(false);
    };

    let lastGroup: Group | null = null;

    return createPortal(
        <AnimatePresence>
            {open && (
                <motion.div
                    className="fixed inset-0 z-[90] flex items-start justify-center px-4 pt-[12vh] bg-charcoal-950/40 backdrop-blur-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                    onMouseDown={(e) => { if (e.target === e.currentTarget) setOpen(false); }}
                >
                    <motion.div
                        role="dialog"
                        aria-modal="true"
                        aria-label="Search the site"
                        className="w-full max-w-2xl rounded-3xl bg-white shadow-2xl border border-sand-200 overflow-hidden"
                        initial={{ opacity: 0, y: -12, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -12, scale: 0.98 }}
                        transition={{ duration: 0.18 }}
                    >
                        <div className="flex items-center gap-3 px-5 border-b border-sand-100">
                            <Search size={20} className="text-charcoal-400 shrink-0" />
                            <input
                                ref={inputRef}
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                onKeyDown={onInputKey}
                                placeholder="Search projects, courses, papers…"
                                className="flex-1 py-4 text-base bg-transparent focus:outline-none text-charcoal-900 placeholder:text-charcoal-400"
                                role="combobox"
                                aria-expanded="true"
                                aria-controls="palette-results"
                                aria-activedescendant={results[active] ? `palette-${results[active].id}` : undefined}
                            />
                            <kbd className="hidden sm:inline text-[10px] font-mono px-1.5 py-0.5 rounded border border-sand-200 text-charcoal-400">Esc</kbd>
                        </div>

                        <ul id="palette-results" ref={listRef} role="listbox" className="max-h-[55vh] overflow-y-auto py-2">
                            {results.length === 0 && (
                                <li className="px-5 py-10 text-center text-sm text-charcoal-500">No matches for “{query}”.</li>
                            )}
                            {results.map((entry, i) => {
                                const header = entry.group !== lastGroup ? entry.group : null;
                                lastGroup = entry.group;
                                const Icon = groupIcons[entry.group];
                                return (
                                    <li key={entry.id}>
                                        {header && (
                                            <p className="px-5 pt-3 pb-1 text-[10px] font-bold uppercase tracking-widest text-charcoal-400">{header}</p>
                                        )}
                                        <button
                                            id={`palette-${entry.id}`}
                                            data-index={i}
                                            role="option"
                                            aria-selected={i === active}
                                            onMouseMove={() => setActive(i)}
                                            onClick={() => choose(entry)}
                                            className={cn('w-full flex items-center gap-3 px-5 py-2.5 text-left transition-colors', i === active ? 'bg-teal-50' : 'hover:bg-sand-50')}
                                        >
                                            <span className={cn('shrink-0 w-8 h-8 rounded-lg flex items-center justify-center', i === active ? 'bg-teal-600 text-white' : 'bg-sand-100 text-charcoal-500')}>
                                                <Icon size={16} />
                                            </span>
                                            <span className="min-w-0 flex-1">
                                                <span className="block text-sm font-semibold text-charcoal-900 truncate">{entry.title}</span>
                                                {entry.subtitle && <span className="block text-xs text-charcoal-500 truncate">{entry.subtitle}</span>}
                                            </span>
                                            {entry.href ? (
                                                <ArrowUpRight size={16} className="shrink-0 text-charcoal-400" />
                                            ) : i === active ? (
                                                <CornerDownLeft size={14} className="shrink-0 text-teal-600" />
                                            ) : (
                                                <FileText size={14} className="shrink-0 text-transparent" />
                                            )}
                                        </button>
                                    </li>
                                );
                            })}
                        </ul>

                        <div className="hidden sm:flex items-center gap-4 px-5 py-2.5 border-t border-sand-100 text-[11px] text-charcoal-400">
                            <span><kbd className="font-mono">↑↓</kbd> navigate</span>
                            <span><kbd className="font-mono">↵</kbd> open</span>
                            <span className="ml-auto">{index.length} items indexed</span>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>,
        document.body,
    );
}
