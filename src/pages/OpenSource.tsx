import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
    Github, Globe, Chrome, Zap, ExternalLink, Package, Code2, Sparkles, Cpu, Layers,
    Calendar, ArrowRight, Maximize2, GitCommitHorizontal, Star, Glasses, Activity,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { imageSrc } from '@/data/media';
import { useLightbox, type LightboxItem } from '@/components/media/lightboxContext';
import RelatedLinks from '@/components/media/RelatedLinks';
import { AnimatedSection, StaggerContainer, StaggerItem } from '../components/ui/AnimatedSection';
import OrganicBlob from '../components/ui/OrganicBlob';

interface Tool {
    id: string;
    name: string;
    description: string;
    fullDescription: string;
    icon: React.ElementType;
    gradient: string;
    tags: string[];
    links: { icon: React.ElementType; label: string; url: string; primary?: boolean }[];
    stats: { label: string; value: string }[];
    year: string;
    status: 'active' | 'beta' | 'coming-soon';
    /** Product image in /public/images */
    image?: string;
}

const tools: Tool[] = [
    {
        id: 'quiktoolbox',
        name: 'QuikToolbox',
        description: '250+ privacy-first utility tools',
        fullDescription: 'A modern utility hub of 250+ free, privacy-first tools: PDF editing, universal image conversion, bulk URL opening, live time-zone conversion, developer utilities and games. Everything runs client-side in the browser, with no data collection.',
        icon: Layers,
        gradient: 'from-coral-500 to-coral-600',
        tags: ['Web Utilities', 'Privacy First', 'Client-side'],
        links: [{ icon: Globe, label: 'Visit quiktoolbox.com', url: 'https://quiktoolbox.com', primary: true }],
        stats: [
            { label: 'Tools', value: '250+' },
            { label: 'Processing', value: 'In-browser' },
        ],
        year: '2022',
        status: 'active',
        image: 'product-quiktoolbox',
    },
    {
        id: 'spatialos',
        name: 'Spatial OS',
        description: 'Open infrastructure for shared, persistent AR',
        fullDescription: 'An open-source spatial computing platform for AR/MR: persistent spatial anchors, multi-user presence and role-based access, with a core API, admin dashboard, CLI and SDKs for Unity, Unreal, Web, React Native, Flutter and Swift.',
        icon: Cpu,
        gradient: 'from-indigo-600 to-teal-600',
        tags: ['Spatial Computing', 'AR/MR', 'SDKs'],
        links: [
            { icon: Github, label: 'GitHub Org', url: 'https://github.com/SpatialOS-Platform', primary: true },
            { icon: Globe, label: 'Documentation', url: 'https://docs.spatial-os.org' },
            { icon: Package, label: 'Unity SDK', url: 'https://github.com/SpatialOS-Platform/spatial-os-unity' },
        ],
        stats: [
            { label: 'SDKs', value: '6' },
            { label: 'Repos', value: '10' },
        ],
        year: '2025',
        status: 'active',
        image: 'product-spatialos',
    },
    {
        id: 'nepali-date',
        name: 'Nepali Date Engine',
        description: 'BS ↔ AD conversion with Tithi support',
        fullDescription: 'A standalone, zero-dependency TypeScript engine for Bikram Sambat ↔ Gregorian conversion with a full Panchang (Tithi) engine and festival tracking, covering 1970–2090 BS (1913–2033 AD). Also served as a public web API on Cloudflare Workers.',
        icon: Globe,
        gradient: 'from-amber-500 to-coral-500',
        tags: ['TypeScript', 'npm', 'Localization'],
        links: [
            { icon: Package, label: 'npm', url: 'https://www.npmjs.com/package/nepali-date-engine', primary: true },
            { icon: Github, label: 'GitHub', url: 'https://github.com/nirmalbrj7/nepali-date-engine' },
            { icon: Globe, label: 'Web API', url: 'https://nepalidate.quiktoolbox.com' },
        ],
        stats: [
            { label: 'Version', value: '1.0.0' },
            { label: 'Coverage', value: '120 yrs' },
        ],
        year: '2026',
        status: 'active',
    },
    {
        id: 'blanktab',
        name: 'BlankTab',
        description: 'A calm, private new-tab dashboard',
        fullDescription: 'Replaces the browser\'s new tab with a distraction-free dashboard of widgets (to-dos, notes, clock, quick links, reminders, weather, Nepali date and a daily quote). All data stays in local browser storage.',
        icon: Sparkles,
        gradient: 'from-teal-500 to-teal-600',
        tags: ['Browser Extension', 'Productivity', 'Local-first'],
        links: [
            { icon: Chrome, label: 'Chrome Web Store', url: 'https://chromewebstore.google.com/detail/blanktab/ckipjiilanlihnifdiffadaclhiblkog', primary: true },
            { icon: Globe, label: 'Edge Add-ons', url: 'https://microsoftedge.microsoft.com/addons/detail/blanktab/lfjaoeebkgmdhjpijbnikccjimmmagmd' },
            { icon: Github, label: 'GitHub', url: 'https://github.com/nirmalbrj7/BlankTab' },
        ],
        stats: [
            { label: 'Version', value: '1.0' },
            { label: 'Stores', value: 'Chrome · Edge' },
        ],
        year: '2026',
        status: 'active',
        image: 'product-blanktab',
    },
    {
        id: 'cleantabs',
        name: 'CleanTabs',
        description: 'Smart tab management for power users',
        fullDescription: 'Reclaim focus and memory with duplicate-tab detection, automatic domain grouping, sleeping inactive tabs and safe session saving. Built for people who live with dozens of tabs open.',
        icon: Zap,
        gradient: 'from-charcoal-600 to-charcoal-800',
        tags: ['Browser Extension', 'Productivity', 'Automation'],
        links: [
            { icon: Chrome, label: 'Chrome Web Store', url: 'https://chromewebstore.google.com/detail/cleantabs/cebidodphgbaklhiiggjkbjnadnffcfg', primary: true },
            { icon: Github, label: 'GitHub', url: 'https://github.com/nirmalbrj7/cleantabs' },
        ],
        stats: [
            { label: 'Version', value: '1.0.0' },
            { label: 'Store', value: 'Chrome' },
        ],
        year: '2026',
        status: 'active',
        image: 'product-cleantabs',
    },
    {
        id: 'easyapply',
        name: 'EasyApplyFill',
        description: 'Fill job applications from your profile',
        fullDescription: 'A privacy-focused, local-first extension that fills long job-application forms across platforms from your saved professional profile. Your data never leaves the browser.',
        icon: Zap,
        gradient: 'from-sand-400 to-sand-500',
        tags: ['Extension', 'Automation', 'Local-first'],
        links: [{ icon: Github, label: 'GitHub', url: 'https://github.com/nirmalbrj7/EasyApplyFill' }],
        stats: [{ label: 'Status', value: 'In development' }],
        year: '2026',
        status: 'coming-soon',
    },
];

const contributions = [
    {
        name: 'PD3R',
        org: 'Call for Code · The Linux Foundation',
        role: 'First-listed author',
        desc: 'Retrofit-eligibility AI trained on BIM-generated synthetic images; 2nd place in Call for Code 2018.',
        url: 'https://github.com/Call-for-Code/PD3R',
        links: ['github-pd3r', 'prnewswire-cfc2018'],
    },
    {
        name: 'ISAC-SIMO',
        org: 'The Linux Foundation',
        role: 'Contributor: core, Django backend, React Native app',
        desc: 'Construction quality assurance from phone photos with ML and image processing.',
        url: 'https://github.com/ISAC-SIMO/ISAC-SIMO',
        links: ['github-isac-simo', 'lf-isac-simo'],
    },
];

const experiments = [
    { name: 'Hololens2-HandInteraction', desc: 'Hand-tracking interaction studies on HoloLens 2 (Unity, MRTK).', lang: 'C#', url: 'https://github.com/nirmalbrj7/Hololens2-HandInteraction' },
    { name: 'hololens-PullPush', desc: 'Pull/push manipulation using hands on HoloLens 2.', lang: 'C++', url: 'https://github.com/nirmalbrj7/hololens-PullPush' },
    { name: 'Hololens-QR-Read', desc: 'QR code reading on HoloLens with Unity 2019 and MRTK 2.5.1.', lang: 'C#', url: 'https://github.com/nirmalbrj7/Hololens-QR-Read' },
    { name: 'EasySharedSpace', desc: 'Simple multiplayer shared spatial space for Unity.', lang: 'C#', url: 'https://github.com/nirmalbrj7/EasySharedSpace' },
    { name: 'clipboard-intelligence', desc: 'Privacy-first clipboard organiser for Chrome and Edge.', lang: 'JS', url: 'https://github.com/nirmalbrj7/clipboard-intelligence' },
    { name: 'daily-quotes', desc: 'Zero-dependency static daily-quote library for JS/TS.', lang: 'TS', url: 'https://github.com/nirmalbrj7/daily-quotes' },
];

interface Repo { name: string; description: string | null; html_url: string; language: string | null; pushed_at: string; stargazers_count: number; fork: boolean }

function useRecentRepos() {
    const [repos, setRepos] = useState<Repo[] | null>(null);
    const [failed, setFailed] = useState(false);
    useEffect(() => {
        const controller = new AbortController();
        fetch('https://api.github.com/users/nirmalbrj7/repos?sort=pushed&per_page=12', { signal: controller.signal })
            .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
            .then((data: Repo[]) => setRepos(data.filter((r) => !r.fork).slice(0, 6)))
            .catch((e) => { if (!controller.signal.aborted) setFailed(Boolean(e)); });
        return () => controller.abort();
    }, []);
    return { repos, failed };
}

function timeAgo(iso: string) {
    const days = Math.floor((Date.now() - new Date(iso).getTime()) / 86_400_000);
    if (days < 1) return 'today';
    if (days < 30) return `${days}d ago`;
    if (days < 365) return `${Math.floor(days / 30)}mo ago`;
    return `${Math.floor(days / 365)}y ago`;
}

export default function OpenSource() {
    const { repos, failed } = useRecentRepos();

    return (
        <div className="min-h-screen py-20 md:py-32 relative">
            <OrganicBlob color="teal" size="xl" className="top-0 right-0 translate-x-1/3 -translate-y-1/4" delay={0} />
            <OrganicBlob color="coral" size="lg" className="bottom-1/4 left-0 -translate-x-1/3" delay={3} />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Header */}
                <AnimatedSection className="max-w-3xl mb-16">
                    <div className="flex items-center gap-3 mb-4">
                        <Code2 size={24} className="text-teal-600" />
                        <span className="text-teal-600 font-semibold tracking-widest uppercase text-xs">Developer Tools</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-charcoal-900 mb-6">
                        Open Source <span className="text-coral-500">Tools</span>
                    </h1>
                    <p className="text-lg md:text-xl text-charcoal-600 leading-relaxed">
                        Tools I build and publish: browser extensions in the Chrome Web Store, packages on npm, a
                        spatial-computing platform, and contributions to Linux Foundation–hosted humanitarian projects.
                        Tap any product image to see it full size.
                    </p>
                </AnimatedSection>

                {/* Tools */}
                <section>
                    <AnimatedSection>
                        <div className="flex items-center gap-3 mb-8">
                            <Layers size={20} className="text-teal-600" />
                            <h2 className="text-xl font-bold text-charcoal-900">Published tools</h2>
                            <span className="ml-auto text-sm text-charcoal-500">{tools.length} projects</span>
                        </div>
                    </AnimatedSection>

                    <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" staggerDelay={0.1}>
                        {tools.map((tool) => (
                            <StaggerItem key={tool.id}>
                                <ToolCard tool={tool} gallery={tools} />
                            </StaggerItem>
                        ))}
                    </StaggerContainer>
                </section>

                {/* Contributions */}
                <section className="mt-24">
                    <AnimatedSection>
                        <div className="flex items-center gap-3 mb-8">
                            <Github size={20} className="text-teal-600" />
                            <h2 className="text-xl font-bold text-charcoal-900">Humanitarian open source</h2>
                        </div>
                    </AnimatedSection>
                    <div className="grid md:grid-cols-2 gap-6">
                        {contributions.map((c) => (
                            <AnimatedSection key={c.name}>
                                <div className="h-full rounded-3xl bg-white border-2 border-sand-200 hover:border-teal-200 p-6 md:p-8 transition-colors flex flex-col">
                                    <p className="text-xs font-bold uppercase tracking-widest text-teal-700 mb-1">{c.org}</p>
                                    <a href={c.url} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-2 text-2xl font-display font-bold text-charcoal-900 hover:text-teal-700 mb-1">
                                        {c.name} <ExternalLink size={18} className="text-teal-500" />
                                    </a>
                                    <p className="text-sm font-semibold text-coral-600 mb-3">{c.role}</p>
                                    <p className="text-charcoal-600 text-sm leading-relaxed mb-5">{c.desc}</p>
                                    <RelatedLinks ids={c.links} className="mt-auto" />
                                </div>
                            </AnimatedSection>
                        ))}
                    </div>
                </section>

                {/* Live GitHub activity + experiments */}
                <section className="mt-24 grid lg:grid-cols-2 gap-10">
                    {/* min-w-0 lets long repo names truncate instead of widening the column */}
                    <div className="min-w-0">
                        <AnimatedSection>
                            <div className="flex items-center gap-3 mb-2">
                                <Activity size={20} className="text-teal-600" />
                                <h2 className="text-xl font-bold text-charcoal-900">Recently pushed</h2>
                                <span className="ml-auto inline-flex items-center gap-1.5 text-xs text-charcoal-500">
                                    <span className={cn('w-2 h-2 rounded-full', repos ? 'bg-emerald-500 animate-pulse' : 'bg-charcoal-300')} />
                                    {repos ? 'Live from GitHub' : failed ? 'GitHub unavailable' : 'Loading…'}
                                </span>
                            </div>
                            <p className="text-sm text-charcoal-500 mb-6">What I've been committing to lately.</p>
                        </AnimatedSection>
                        <ul className="rounded-3xl bg-white/80 border border-sand-200 divide-y divide-sand-100 overflow-hidden">
                            {repos === null && !failed && Array.from({ length: 5 }).map((_, i) => (
                                <li key={i} className="p-4"><div className="h-4 w-1/2 rounded bg-sand-100 animate-pulse mb-2" /><div className="h-3 w-3/4 rounded bg-sand-50 animate-pulse" /></li>
                            ))}
                            {failed && (
                                <li className="p-5 text-sm text-charcoal-500">
                                    Couldn't reach GitHub right now.{' '}
                                    <a href="https://github.com/nirmalbrj7?tab=repositories" target="_blank" rel="noopener noreferrer" className="text-teal-700 font-semibold">See all repositories</a>.
                                </li>
                            )}
                            {repos?.map((r) => (
                                <li key={r.name}>
                                    <a href={r.html_url} target="_blank" rel="noopener noreferrer" className="group flex items-start gap-3 p-4 hover:bg-teal-50/40 transition-colors">
                                        <GitCommitHorizontal size={18} className="mt-0.5 shrink-0 text-teal-500" />
                                        <span className="min-w-0 flex-1">
                                            <span className="block font-mono text-sm font-semibold text-charcoal-900 group-hover:text-teal-700 truncate">{r.name}</span>
                                            {r.description && <span className="block text-xs text-charcoal-500 truncate">{r.description}</span>}
                                        </span>
                                        <span className="shrink-0 flex items-center gap-3 text-[11px] text-charcoal-400">
                                            {r.language && <span>{r.language}</span>}
                                            {r.stargazers_count > 0 && <span className="inline-flex items-center gap-0.5"><Star size={11} />{r.stargazers_count}</span>}
                                            <span>{timeAgo(r.pushed_at)}</span>
                                        </span>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="min-w-0">
                        <AnimatedSection>
                            <div className="flex items-center gap-3 mb-2">
                                <Glasses size={20} className="text-coral-500" />
                                <h2 className="text-xl font-bold text-charcoal-900">XR & lab experiments</h2>
                            </div>
                            <p className="text-sm text-charcoal-500 mb-6">Small prototypes behind my mixed-reality research.</p>
                        </AnimatedSection>
                        <div className="grid sm:grid-cols-2 gap-3">
                            {experiments.map((x) => (
                                <a key={x.name} href={x.url} target="_blank" rel="noopener noreferrer" className="group rounded-2xl bg-white/80 border border-sand-200 hover:border-coral-300 hover:shadow-md p-4 transition-all">
                                    <span className="flex items-center justify-between gap-2 mb-1">
                                        <span className="font-mono text-xs font-semibold text-charcoal-900 group-hover:text-coral-600 truncate">{x.name}</span>
                                        <span className="shrink-0 text-[10px] font-bold px-1.5 py-0.5 rounded bg-sand-100 text-charcoal-500">{x.lang}</span>
                                    </span>
                                    <span className="block text-xs text-charcoal-500 leading-relaxed">{x.desc}</span>
                                </a>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Bottom CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-24 text-center p-12 rounded-3xl bg-gradient-to-br from-teal-600 to-teal-800 text-white shadow-2xl relative overflow-hidden"
                >
                    <div
                        className="absolute inset-0 opacity-10"
                        style={{
                            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                            backgroundSize: '24px 24px',
                        }}
                    />
                    <div className="absolute -top-20 -right-20 w-40 h-40 bg-coral-500/30 rounded-full blur-3xl" />
                    <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-teal-400/30 rounded-full blur-3xl" />

                    <div className="relative z-10 max-w-2xl mx-auto">
                        <Github size={48} className="mx-auto mb-6 text-teal-200" />
                        <h2 className="text-2xl md:text-3xl font-bold font-display mb-4">Want to collaborate?</h2>
                        <p className="text-teal-100 mb-8">I'm always looking for interesting projects and contributors.</p>
                        <Link
                            to="/contact"
                            className="inline-flex items-center gap-2 bg-white text-teal-700 px-8 py-4 rounded-2xl font-bold hover:bg-teal-50 transition-all hover:scale-105 shadow-lg group"
                        >
                            Get in Touch
                            <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                        </Link>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}

function ToolCard({ tool, gallery }: { tool: Tool; gallery: Tool[] }) {
    const { open } = useLightbox();
    const Icon = tool.icon;
    const statusColors = {
        active: 'bg-emerald-100 text-emerald-700',
        beta: 'bg-amber-100 text-amber-700',
        'coming-soon': 'bg-sand-200 text-charcoal-600',
    };
    const toItem = (t: Tool): LightboxItem => ({
        src: imageSrc(t.image!),
        thumb: imageSrc(t.image!, true),
        alt: `${t.name}: ${t.description}`,
        eyebrow: t.name,
        caption: t.fullDescription,
    });
    const openShot = () => {
        const withImages = gallery.filter((t) => t.image);
        open(withImages.map(toItem), withImages.findIndex((t) => t.id === tool.id));
    };

    return (
        <motion.div className="group h-full" whileHover={{ y: -8 }} transition={{ duration: 0.3 }}>
            <div className="h-full flex flex-col rounded-3xl bg-white border-2 border-sand-200 overflow-hidden transition-all duration-300 group-hover:shadow-2xl group-hover:border-teal-200">
                {/* Product image or gradient header */}
                {tool.image ? (
                    <button
                        type="button"
                        onClick={openShot}
                        className="relative aspect-[16/10] overflow-hidden bg-sand-100 border-b border-sand-200 cursor-zoom-in text-left"
                        aria-label={`Enlarge image of ${tool.name}`}
                    >
                        <img src={imageSrc(tool.image, true)} alt={`${tool.name} interface`} loading="lazy" className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.04]" />
                        <span className={cn('absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t opacity-90', tool.gradient)} style={{ maskImage: 'linear-gradient(to top, black, transparent)', WebkitMaskImage: 'linear-gradient(to top, black, transparent)' }} />
                        <span className="absolute left-4 bottom-3 flex items-center gap-3">
                            <span className="w-10 h-10 rounded-xl bg-white/25 backdrop-blur-md flex items-center justify-center">
                                <Icon size={20} className="text-white" />
                            </span>
                            <span className="text-lg font-bold text-white font-display drop-shadow">{tool.name}</span>
                        </span>
                        <span className={cn('absolute top-3 right-3 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full', statusColors[tool.status])}>
                            {tool.status === 'active' ? 'Live' : tool.status === 'beta' ? 'Beta' : 'Coming soon'}
                        </span>
                        <span className="absolute top-3 left-3 inline-flex items-center gap-1 px-2 py-1 rounded-full bg-charcoal-900/80 text-white text-[10px] font-semibold opacity-0 group-hover:opacity-100 transition">
                            <Maximize2 size={11} /> Enlarge
                        </span>
                    </button>
                ) : (
                    <div className={cn('h-32 bg-gradient-to-br p-6 flex items-end relative', tool.gradient)}>
                        <span className={cn('absolute top-4 right-4 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full', statusColors[tool.status])}>
                            {tool.status === 'active' ? 'Live' : tool.status === 'beta' ? 'Beta' : 'Coming soon'}
                        </span>
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center">
                                <Icon size={24} className="text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-white font-display">{tool.name}</h3>
                        </div>
                    </div>
                )}

                <div className="p-6 flex-1 flex flex-col">
                    <p className="text-sm font-semibold text-charcoal-800 mb-1">{tool.description}</p>
                    <div className="flex items-center gap-2 text-xs text-charcoal-500 mb-4">
                        <Calendar size={13} /> {tool.year}
                    </div>

                    <p className="text-charcoal-600 text-sm leading-relaxed mb-4 flex-1">{tool.fullDescription}</p>

                    <div className="flex gap-6 mb-4 pb-4 border-b border-sand-100">
                        {tool.stats.map((stat) => (
                            <div key={stat.label}>
                                <div className="text-lg font-bold text-charcoal-900">{stat.value}</div>
                                <div className="text-[10px] text-charcoal-500 uppercase tracking-wider">{stat.label}</div>
                            </div>
                        ))}
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                        {tool.tags.map((tag) => (
                            <span key={tag} className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full bg-sand-100 text-charcoal-600">{tag}</span>
                        ))}
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {tool.links.map((link) => (
                            <a
                                key={link.url}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={cn(
                                    'inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all',
                                    link.primary ? 'bg-teal-600 text-white hover:bg-teal-700' : 'bg-sand-100 text-charcoal-700 hover:bg-sand-200',
                                )}
                            >
                                <link.icon size={14} />
                                {link.label}
                                {link.primary && <ExternalLink size={12} />}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
