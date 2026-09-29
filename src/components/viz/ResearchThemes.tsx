import { useRef, useState, type KeyboardEvent } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Glasses, ScanFace, Building2, BrainCircuit, BookOpen, Layers, Users, Code2, ArrowUpRight, ArrowRight, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';
import { imageSrc, photos, type Photo } from '@/data/media';
import { creditText } from '@/components/media/lightboxContext';

type ItemKind = 'paper' | 'project' | 'service' | 'code';

interface ThemeItem {
    kind: ItemKind;
    title: string;
    year: string;
    note: string;
    /** Internal route */
    to?: string;
    /** External URL */
    href?: string;
}

interface Theme {
    id: string;
    name: string;
    icon: typeof Glasses;
    question: string;
    where: string;
    keywords: string[];
    photo?: Photo;
    /** Shown instead of a photo */
    stat?: { value: string; label: string };
    items: ThemeItem[];
    tone: { tab: string; soft: string; text: string; bar: string };
}

const themes: Theme[] = [
    {
        id: 'xr',
        name: 'Immersive & spatial storytelling',
        icon: Glasses,
        question: 'How can stories be anchored to real places, and carried to new ones?',
        where: 'GEM Lab, Dalhousie University · 2023–present',
        keywords: ['Locative AR', 'HoloLens 2', 'Space syntax', 'Presence', 'VR for older adults'],
        photo: photos.dalhousie,
        tone: { tab: 'bg-indigo-600 text-white', soft: 'bg-indigo-50 text-indigo-700', text: 'text-indigo-700', bar: 'bg-indigo-500' },
        items: [
            { kind: 'paper', title: 'Combining Experiential and Spatial Data for Immersive AR Narrative Creation', year: '2025', note: 'First author · ICIDS 2025, Springer LNCS', to: '/research/ar-narratives' },
            { kind: 'paper', title: 'Virtual Reality for Active Aging: First-Time Experiences of Older Adults', year: '2025', note: 'Our Future is Aging conference · Best Paper Award', to: '/publications' },
            { kind: 'service', title: 'Web Chair, ACM SUI 2025 & ACM VRST 2025', year: '2025', note: 'Spatial UI and VR symposia, Montréal', to: '/recognition' },
            { kind: 'code', title: 'HoloLens 2 interaction prototypes', year: '2024', note: 'Hand interaction, pull/push and QR reading in Unity', to: '/open-source' },
        ],
    },
    {
        id: 'ai-homes',
        name: 'AI for safer homes',
        icon: ScanFace,
        question: 'Can a phone photo tell a family whether their home can be made safe?',
        where: 'Build Change, Kathmandu · 2018–2021',
        keywords: ['Computer vision', 'Synthetic training data', 'IBM Watson', 'GO / NO-GO checks'],
        photo: photos.pd3rFieldFront,
        tone: { tab: 'bg-coral-500 text-white', soft: 'bg-coral-50 text-coral-700', text: 'text-coral-700', bar: 'bg-coral-500' },
        items: [
            { kind: 'project', title: 'PD3R: AI retrofit triage', year: '2018', note: '2nd place, IBM Call for Code (2,500+ entries)', to: '/research/pd3r' },
            { kind: 'project', title: 'ISAC-SIMO: construction quality checks', year: '2020–21', note: 'Open source, hosted by The Linux Foundation', to: '/research/isac-simo' },
        ],
    },
    {
        id: 'platforms',
        name: 'Resilient housing systems',
        icon: Building2,
        question: 'How do you run recovery for thousands of homes without losing track of a single family?',
        where: 'Build Change · Nepal, Dominica, Colombia, Philippines, Indonesia · 2017–2023',
        keywords: ['Offline-first', 'Management information systems', 'Community-centred design', '6-step value chain'],
        photo: photos.roseauAerial,
        tone: { tab: 'bg-teal-600 text-white', soft: 'bg-teal-50 text-teal-700', text: 'text-teal-700', bar: 'bg-teal-500' },
        items: [
            { kind: 'project', title: 'BCtap: Technical Assistance Platform', year: '2021–23', note: 'Used in 26+ countries; absorbed RHIAB', to: '/research/bctap' },
            { kind: 'project', title: 'Dominica Housing Recovery Project MIS', year: '2019–22', note: 'World Bank–financed rebuilding after Hurricane Maria', to: '/projects' },
            { kind: 'project', title: 'Nuwakot STFC monitoring system', year: '2018–19', note: '23,088 earthquake-affected households', to: '/projects' },
            { kind: 'project', title: 'Resilient Housing in a Box (RHIAB)', year: '2022–23', note: 'With the Cisco Foundation; later merged into BCtap', to: '/projects' },
            { kind: 'project', title: 'Global Risk Awareness App', year: '2018–21', note: 'Hazard maps and household vulnerability', to: '/projects' },
        ],
    },
    {
        id: 'ml',
        name: 'Applied machine learning',
        icon: BrainCircuit,
        question: 'Where does deep learning earn its place outside the lab?',
        where: 'Collaborative research · 2021–2023',
        keywords: ['CNN + LSTM', 'Transfer learning', 'Drone imagery', 'Flood forecasting'],
        stat: { value: '4', label: 'applied ML works, 2021–2023' },
        tone: { tab: 'bg-amber-500 text-white', soft: 'bg-amber-50 text-amber-800', text: 'text-amber-700', bar: 'bg-amber-500' },
        items: [
            { kind: 'paper', title: 'Object Detection and Classification on Drone Imagery', year: '2022', note: 'First author · ICAISS 2022 (IEEE)', href: 'https://doi.org/10.1109/ICAISS55157.2022.10010957' },
            { kind: 'paper', title: 'A LSTM-CNN Model for Epileptic Seizure Detection using EEG', year: '2022', note: 'eSmarTA 2022 (IEEE)', href: 'https://doi.org/10.1109/eSmarTA56775.2022.9935403' },
            { kind: 'paper', title: 'Deep Learning Frameworks for Precision Fish Farming', year: '2023', note: 'Journal of Food Quality', href: 'https://doi.org/10.1155/2023/4399512' },
            { kind: 'paper', title: 'AI-based System Architecture for Flood Forecasting', year: '2021', note: 'MSc thesis, Leeds Beckett University', href: 'https://doi.org/10.13140/RG.2.2.30061.05605' },
        ],
    },
];

const kindMeta: Record<ItemKind, { icon: typeof BookOpen; label: string }> = {
    paper: { icon: BookOpen, label: 'Paper' },
    project: { icon: Layers, label: 'Project' },
    service: { icon: Users, label: 'Service' },
    code: { icon: Code2, label: 'Code' },
};

export default function ResearchThemes() {
    const [active, setActive] = useState(0);
    const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
    const theme = themes[active];

    const onKeyDown = (e: KeyboardEvent) => {
        const delta = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
        if (!delta) return;
        e.preventDefault();
        const next = (active + delta + themes.length) % themes.length;
        setActive(next);
        tabRefs.current[next]?.focus();
    };

    return (
        <div>
            {/* Tabs */}
            <div role="tablist" aria-label="Research themes" onKeyDown={onKeyDown} className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
                {themes.map((t, i) => {
                    const selected = i === active;
                    return (
                        <button
                            key={t.id}
                            ref={(el) => { tabRefs.current[i] = el; }}
                            role="tab"
                            id={`theme-tab-${t.id}`}
                            aria-selected={selected}
                            aria-controls={`theme-panel-${t.id}`}
                            tabIndex={selected ? 0 : -1}
                            onClick={() => setActive(i)}
                            className={cn(
                                'group relative text-left rounded-2xl border p-4 transition-all overflow-hidden',
                                selected ? 'bg-white border-charcoal-900 shadow-lg' : 'bg-white/70 border-sand-200 hover:border-charcoal-300 hover:bg-white',
                            )}
                        >
                            <span className={cn('inline-flex w-9 h-9 rounded-xl items-center justify-center mb-3 transition-colors', selected ? t.tone.tab : 'bg-sand-100 text-charcoal-500 group-hover:text-charcoal-800')}>
                                <t.icon size={18} />
                            </span>
                            <span className="block font-display font-bold text-sm md:text-base text-charcoal-900 leading-snug">{t.name}</span>
                            <span className="block text-xs text-charcoal-500 mt-1">{t.items.length} linked items</span>
                            {selected && <motion.span layoutId="theme-underline" className={cn('absolute left-0 right-0 bottom-0 h-1', t.tone.bar)} />}
                        </button>
                    );
                })}
            </div>

            {/* Panel */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={theme.id}
                    role="tabpanel"
                    id={`theme-panel-${theme.id}`}
                    aria-labelledby={`theme-tab-${theme.id}`}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.25 }}
                    className="rounded-3xl bg-white border border-sand-200 overflow-hidden grid lg:grid-cols-[0.9fr_1.1fr]"
                >
                    {/* Visual + framing */}
                    <div className="relative min-h-[18rem] lg:min-h-full bg-charcoal-950 text-white flex flex-col justify-end p-6 md:p-8 overflow-hidden">
                        {theme.photo ? (
                            <>
                                <img src={imageSrc(theme.photo.id, true)} alt={theme.photo.alt} className="absolute inset-0 w-full h-full object-cover opacity-70" loading="lazy" />
                            </>
                        ) : theme.stat ? (
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="absolute inset-0 opacity-15" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '22px 22px' }} />
                                <div className="text-center -mt-16">
                                    <p className="font-display font-bold text-7xl text-amber-300">{theme.stat.value}</p>
                                    <p className="text-sm text-white/70">{theme.stat.label}</p>
                                </div>
                            </div>
                        ) : null}
                        {theme.photo && <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-charcoal-950/60 to-transparent" />}
                        <div className="relative">
                            <p className="flex items-start gap-1.5 text-[11px] font-semibold uppercase tracking-widest text-white/60 mb-3">
                                <MapPin size={12} className="mt-0.5 shrink-0" /> {theme.where}
                            </p>
                            <p className="font-display font-bold text-2xl md:text-3xl leading-tight">{theme.question}</p>
                            <div className="flex flex-wrap gap-1.5 mt-5">
                                {theme.keywords.map((k) => (
                                    <span key={k} className="px-2.5 py-1 rounded-full bg-white/10 border border-white/15 text-[11px] font-medium text-white/85">{k}</span>
                                ))}
                            </div>
                            {theme.photo && (
                                <a href={theme.photo.credit.source} target="_blank" rel="noopener noreferrer" className="inline-block mt-4 text-[10px] text-white/45 hover:text-white">
                                    Photo: {creditText(theme.photo)}
                                </a>
                            )}
                        </div>
                    </div>

                    {/* Linked work */}
                    <div className="p-4 sm:p-6 md:p-8">
                        <p className="text-xs font-bold uppercase tracking-widest text-charcoal-400 mb-4">Work in this theme</p>
                        <ul className="space-y-2.5">
                            {theme.items.map((item, i) => {
                                const meta = kindMeta[item.kind];
                                const inner = (
                                    <>
                                        <span className={cn('shrink-0 w-10 h-10 rounded-xl flex items-center justify-center', theme.tone.soft)}>
                                            <meta.icon size={18} />
                                        </span>
                                        <span className="min-w-0 flex-1">
                                            <span className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-charcoal-400 mb-0.5">
                                                {meta.label} <span className="font-mono normal-case tracking-normal">{item.year}</span>
                                            </span>
                                            <span className="block font-semibold text-charcoal-900 leading-snug group-hover:text-teal-700 transition-colors">{item.title}</span>
                                            <span className="block text-sm text-charcoal-500 mt-0.5">{item.note}</span>
                                        </span>
                                        {item.href
                                            ? <ArrowUpRight size={18} className="shrink-0 mt-1 text-charcoal-300 group-hover:text-teal-600 transition-colors" />
                                            : <ArrowRight size={18} className="shrink-0 mt-1 text-charcoal-300 group-hover:text-teal-600 group-hover:translate-x-0.5 transition-all" />}
                                    </>
                                );
                                const cls = 'group flex items-start gap-4 rounded-2xl border border-sand-200 hover:border-teal-300 hover:bg-teal-50/30 p-3 sm:p-4 transition-colors';
                                return (
                                    <motion.li key={item.title} initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 * i }}>
                                        {item.href ? (
                                            <a href={item.href} target="_blank" rel="noopener noreferrer" className={cls}>{inner}</a>
                                        ) : (
                                            <Link to={item.to!} className={cls}>{inner}</Link>
                                        )}
                                    </motion.li>
                                );
                            })}
                        </ul>
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
