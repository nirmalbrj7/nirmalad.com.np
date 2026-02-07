import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Network, Layers, BookOpen, Share2 } from 'lucide-react';
import clsx from 'clsx';

// --- Data Types ---
type NodeType = 'theme' | 'project' | 'publication' | 'collaboration';

interface Node {
    id: string;
    group: number;
    val: number;
    type: NodeType;
    description: string;
    year?: string;
}

interface Link {
    source: string;
    target: string;
}

// --- Data (Migrated from ResearchGraph) ---
const NODES: Node[] = [
    // Themes
    { id: "Resilient Technologies", group: 1, val: 26, type: 'theme', description: "Systems and platforms that strengthen housing recovery and community resilience." },
    { id: "Immersive Computing (XR)", group: 1, val: 20, type: 'theme', description: "Augmented and virtual reality for spatial narratives and embodied experience." },
    { id: "AI for Social Good", group: 2, val: 18, type: 'theme', description: "Applied AI for decision support, safety, and community impact." },
    { id: "Disaster Resilience", group: 2, val: 15, type: 'theme', description: "Preparedness, risk reduction, and recovery systems." },
    { id: "Community Centered Design", group: 1, val: 14, type: 'theme', description: "Co-design approaches grounded in real-world community needs." },
    { id: "Spatial Storytelling", group: 3, val: 12, type: 'theme', description: "Narrative placement, presence, and memory in physical space." },

    // Projects
    { id: "PD3R (Call for Code Finalist)", group: 2, val: 14, type: 'project', description: "AI-based mobile tool to assess post-disaster housing retrofit potential.", year: "2018" },
    { id: "Resilient Housing in a Box", group: 1, val: 14, type: 'project', description: "End-to-end platform for housing recovery programs.", year: "2022–2023" },
    { id: "Technical Assistance Platform", group: 1, val: 12, type: 'project', description: "Data collection and workflow system for housing programs.", year: "2021–2023" },
    { id: "Global Risk Awareness App", group: 2, val: 10, type: 'project', description: "Hazard mapping and vulnerability awareness for communities.", year: "2018–2021" },
    { id: "ISAC-SIMO Open Source QA", group: 2, val: 10, type: 'project', description: "Open-source construction QA with AI image evaluation.", year: "2020–2021" },

    // Publications & Papers
    { id: "ICIDS 2025: Immersive AR Narrative Methodology", group: 3, val: 10, type: 'publication', description: "Phased methodology for AR narrative creation.", year: "2025" },
    { id: "VR for Active Aging (2025)", group: 3, val: 9, type: 'publication', description: "Explores first-time VR experiences for older adults.", year: "2025" },
    { id: "Deep Learning for Precision Fish Farming", group: 2, val: 8, type: 'publication', description: "Survey of deep learning in aquaculture monitoring.", year: "2023" },

    // Collaborations & Context
    { id: "Dalhousie University", group: 3, val: 11, type: 'collaboration', description: "PhD research in HCI, AR/VR, and spatial storytelling.", year: "2023–Present" },
    { id: "Build Change", group: 1, val: 11, type: 'collaboration', description: "Global resilient housing programs and platforms.", year: "2018–2023" },
];

const LINKS: Link[] = [
    { source: "Resilient Technologies", target: "Disaster Resilience" },
    { source: "Resilient Technologies", target: "Community Centered Design" },
    { source: "Resilient Technologies", target: "Resilient Housing in a Box" },
    { source: "Resilient Technologies", target: "Technical Assistance Platform" },
    { source: "Resilient Technologies", target: "Build Change" },
    { source: "Immersive Computing (XR)", target: "Spatial Storytelling" },
    { source: "Immersive Computing (XR)", target: "ICIDS 2025: Immersive AR Narrative Methodology" },
    { source: "Immersive Computing (XR)", target: "Dalhousie University" },
    { source: "Immersive Computing (XR)", target: "VR for Active Aging (2025)" },
    { source: "AI for Social Good", target: "PD3R (Call for Code Finalist)" },
    { source: "AI for Social Good", target: "ISAC-SIMO Open Source QA" },
    { source: "Disaster Resilience", target: "Global Risk Awareness App" },
    { source: "Community Centered Design", target: "Build Change" },
    { source: "Spatial Storytelling", target: "ICIDS 2025: Immersive AR Narrative Methodology" },
    { source: "Build Change", target: "Resilient Housing in a Box" },
    { source: "Build Change", target: "Technical Assistance Platform" },
];

// --- Components ---

const ResearchNexus = () => {
    const [activeThemeId, setActiveThemeId] = useState<string>("Resilient Technologies");

    // Process data to find related nodes for the active theme
    const activeData = useMemo(() => {
        const themeNode = NODES.find(n => n.id === activeThemeId);
        if (!themeNode) return null;

        // Find all directly connected nodes (bidirectional)
        const connectedIds = new Set<string>();
        LINKS.forEach(link => {
            if (link.source === activeThemeId) connectedIds.add(link.target);
            if (link.target === activeThemeId) connectedIds.add(link.source);
        });

        const relatedNodes = NODES.filter(n => connectedIds.has(n.id));

        return {
            theme: themeNode,
            projects: relatedNodes.filter(n => n.type === 'project'),
            publications: relatedNodes.filter(n => n.type === 'publication'),
            collaborations: relatedNodes.filter(n => n.type === 'collaboration'),
            relatedThemes: relatedNodes.filter(n => n.type === 'theme'),
        };
    }, [activeThemeId]);

    const themes = NODES.filter(n => n.type === 'theme');

    return (
        <div className="w-full bg-slate-900 rounded-[2.5rem] overflow-hidden shadow-2xl border border-slate-800 relative">
            {/* Background Ambient Glows */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-royal-900/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-900/10 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/3 pointer-events-none" />

            <div className="grid lg:grid-cols-[300px_1fr] min-h-[600px]">

                {/* Sidebar: Themes */}
                <div className="bg-slate-900/50 backdrop-blur-md border-r border-slate-800 p-6 flex flex-col gap-3">
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 px-2">Core Research Pillars</h3>
                    {themes.map((theme) => (
                        <button
                            key={theme.id}
                            onClick={() => setActiveThemeId(theme.id)}
                            className={clsx(
                                "text-left p-4 rounded-xl transition-all duration-300 group relative overflow-hidden",
                                activeThemeId === theme.id
                                    ? "bg-royal-600/20 text-white shadow-lg border border-royal-500/30"
                                    : "bg-slate-800/40 text-slate-400 hover:bg-slate-800 hover:text-white border border-transparent"
                            )}
                        >
                            <div className={clsx(
                                "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500",
                                "bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transform"
                            )} />
                            <div className="relative z-10">
                                <span className={clsx(
                                    "text-sm font-bold block mb-1",
                                    activeThemeId === theme.id ? "text-royal-300" : "group-hover:text-royal-300"
                                )}>
                                    {theme.id}
                                </span>
                                <span className="text-xs opacity-70 line-clamp-2 leading-relaxed">
                                    {theme.description}
                                </span>
                            </div>
                        </button>
                    ))}
                </div>

                {/* Main Content: Ecosystem */}
                <div className="p-8 lg:p-12 relative overflow-y-auto max-h-[800px] custom-scrollbar">
                    <AnimatePresence mode="wait">
                        {activeData && (
                            <motion.div
                                key={activeThemeId}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.4, ease: "easeOut" }}
                                className="space-y-10"
                            >
                                {/* Header */}
                                <div>
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="p-2 bg-royal-500/20 rounded-lg text-royal-300">
                                            <Network size={24} />
                                        </div>
                                        <h2 className="text-3xl font-display font-bold text-white">
                                            {activeData.theme.id}
                                        </h2>
                                    </div>
                                    <p className="text-lg text-slate-300 leading-relaxed max-w-2xl">
                                        {activeData.theme.description}
                                    </p>
                                </div>

                                {/* Projects Grid */}
                                {activeData.projects.length > 0 && (
                                    <section>
                                        <h4 className="flex items-center gap-2 text-sm font-bold text-slate-500 uppercase tracking-widest mb-6">
                                            <Layers size={16} /> Key Projects
                                        </h4>
                                        <div className="grid md:grid-cols-2 gap-4">
                                            {activeData.projects.map(node => (
                                                <ResearchCard key={node.id} node={node} icon={<Layers size={18} />} />
                                            ))}
                                        </div>
                                    </section>
                                )}

                                {/* Publications & Collaborations */}
                                <div className="grid md:grid-cols-2 gap-8">
                                    {activeData.publications.length > 0 && (
                                        <section>
                                            <h4 className="flex items-center gap-2 text-sm font-bold text-slate-500 uppercase tracking-widest mb-6">
                                                <BookOpen size={16} /> Research Output
                                            </h4>
                                            <div className="flex flex-col gap-3">
                                                {activeData.publications.map(node => (
                                                    <ResearchCard key={node.id} node={node} icon={<BookOpen size={18} />} variant="compact" />
                                                ))}
                                            </div>
                                        </section>
                                    )}

                                    {activeData.collaborations.length > 0 && (
                                        <section>
                                            <h4 className="flex items-center gap-2 text-sm font-bold text-slate-500 uppercase tracking-widest mb-6">
                                                <Share2 size={16} /> Collaborations
                                            </h4>
                                            <div className="flex flex-col gap-3">
                                                {activeData.collaborations.map(node => (
                                                    <ResearchCard key={node.id} node={node} icon={<Share2 size={18} />} variant="compact" />
                                                ))}
                                            </div>
                                        </section>
                                    )}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

// --- Helper Component ---

const ResearchCard = ({ node, icon, variant = 'standard' }: { node: Node, icon: React.ReactNode, variant?: 'standard' | 'compact' }) => (
    <div className={clsx(
        "group relative overflow-hidden bg-slate-800/40 border border-slate-700/50 rounded-2xl hover:bg-slate-800/60 transition-all duration-300 hover:border-royal-500/30",
        variant === 'standard' ? "p-6" : "p-4"
    )}>
        <div className="flex items-start gap-4">
            <div className={clsx(
                "shrink-0 rounded-lg flex items-center justify-center",
                node.type === 'project' ? "bg-blue-500/10 text-blue-400" :
                    node.type === 'publication' ? "bg-purple-500/10 text-purple-400" :
                        "bg-emerald-500/10 text-emerald-400",
                variant === 'standard' ? "w-10 h-10" : "w-8 h-8"
            )}>
                {icon}
            </div>
            <div>
                <h5 className={clsx(
                    "font-bold text-slate-100 mb-1 group-hover:text-royal-300 transition-colors",
                    variant === 'standard' ? "text-base" : "text-sm"
                )}>
                    {node.id}
                </h5>
                {node.year && (
                    <span className="text-xs font-mono text-slate-500 mb-2 block">{node.year}</span>
                )}
                <p className={clsx(
                    "text-slate-400 leading-relaxed",
                    variant === 'standard' ? "text-sm" : "text-xs line-clamp-2"
                )}>
                    {node.description}
                </p>
            </div>
        </div>
    </div>
);

export default ResearchNexus;
