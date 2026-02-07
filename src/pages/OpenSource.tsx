import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
    Github,
    Globe,
    Chrome,
    Zap,
    ExternalLink,
    Package,
    Layout,
    Code2,
    MonitorSmartphone,
    ArrowRight
} from 'lucide-react';
import { MagicalCard } from '../components/ui/MagicalCard';

const tools = [
    {
        title: "BlankTab",
        description: "A professional, distraction-free dashboard for your browser. Features a beautiful Nepali calendar, live weather, curated quotes, and a modular widget system. Designed for productivity and aesthetics.",
        gradient: "from-blue-600 to-cyan-500",
        tags: ["React", "Extension", "Productivity"],
        links: [
            { icon: Chrome, label: "Chrome Store", url: "https://chromewebstore.google.com/detail/blanktab/ckipjiilanlihnifdiffadaclhiblkog", color: "text-blue-500" },
            { icon: Layout, label: "Edge Addons", url: "https://microsoftedge.microsoft.com/addons/detail/blanktab/lfjaoeebkgmdhjpijbnikccjimmmagmd", color: "text-blue-600" },
            { icon: Github, label: "Source Code", url: "https://github.com/nirmalbrj7/BlankTab", color: "text-midnight-900" },
            //{ icon: Globe, label: "Live Demo", url: "https://nirmalad.com.np", color: "text-emerald-600" }
        ],
        stats: "10k+ Users"
    },
    {
        title: "QuikToolbox",
        description: "Your modern utility hub with 240+ privacy-first free tools. Includes PDF editors, universal image converters, bulk URL openers, and live time zone converters. No data collection, 100% client-side.",
        gradient: "from-emerald-600 to-teal-500",
        tags: ["Next.js", "Web Utilities", "Privacy First"],
        links: [
            { icon: Globe, label: "Visit Website", url: "https://quiktoolbox.com", color: "text-emerald-600" },
        ],
        stats: "240+ Tools"
    },
    {
        title: "CleanTabs",
        description: "Reclaim your focus with smart tab management. Features automated de-duplication, domain-based grouping, inactive tab suspension, and session saving. Built for power users to reduce memory usage.",
        gradient: "from-slate-700 to-slate-900",
        tags: ["Extension", "Productivity", "Automation"],
        links: [
            { icon: Chrome, label: "Chrome Store", url: "https://chromewebstore.google.com/detail/cleantabs/cebidodphgbaklhiiggjkbjnadnffcfg", color: "text-blue-500" },
            { icon: Github, label: "Source Code", url: "https://github.com/nirmalbrj7/cleantabs", color: "text-midnight-900" },
            { icon: Package, label: "Releases", url: "https://github.com/nirmalbrj7/cleantabs/releases", color: "text-red-600" }
        ],
        stats: "Tab Manager"
    },
    {
        title: "Nepali Date Engine",
        description: "A robust, standalone JavaScript engine for Bikram Sambat (BS) to Gregorian (AD) conversions. Includes full Tithi (Panchang) engine, festival tracking, and 100+ years of accurate data.",
        gradient: "from-red-600 to-orange-600",
        tags: ["JavaScript", "NPM", "Localization"],
        links: [
            { icon: Package, label: "NPM Package", url: "https://www.npmjs.com/package/nepali-date-engine", color: "text-red-600" },
            { icon: Github, label: "Repo", url: "https://github.com/nirmalbrj7/nepali-date-engine", color: "text-midnight-900" },
            { icon: Globe, label: "Web API", url: "https://nepalidate.quiktoolbox.com", color: "text-indigo-600" }
        ],
        stats: "NPM Package"
    },
    {
        title: "SpatialOS Platform",
        description: "The complete open-source ecosystem for the Spatial Web. Features 'Open-SAG' (Spatial Anchor Gateway) for unified coordinate systems, a real-time Cloud Dashboard for device management, and high-performance SDKs for Unity, Unreal, and Web.",
        gradient: "from-indigo-950 to-blue-900",
        tags: ["Spatial Computing", "Open-SAG", "Infrastructure", "IoT"],
        links: [
            { icon: Github, label: "Organization", url: "https://github.com/SpatialOS-Platform", color: "text-midnight-900" },
            { icon: Globe, label: "Docs", url: "https://docs.spatial-os.org", color: "text-emerald-600" },
            { icon: Package, label: "Unity SDK", url: "https://github.com/SpatialOS-Platform/spatial-unity-sdk", color: "text-blue-600" }
        ],
        stats: "Full Ecosystem"
    },
    {
        title: "EasyApplyFill (Coming Soon)",
        description: "Automate your job applications with ease. This extension fills complex job application forms across multiple platforms using your professional profiles. Privacy-focused and local-first.",
        gradient: "from-purple-600 to-pink-500",
        tags: ["Extension", "Automation", "Productivity"],
        links: [
            // { icon: Globe, label: "Join Waitlist", url: "#", color: "text-purple-600" },
            // { icon: Github, label: "Repository", url: "#", color: "text-midnight-900" }
        ],
        stats: "Waitlist Coming Soon"
    }
];

export default function OpenSource() {
    return (
        <div className="bg-cream-50 min-h-screen py-20 font-sans text-midnight-900 selection:bg-royal-100 selection:text-royal-900">

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
                {/* Header */}
                <div className="max-w-3xl mx-auto text-center mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-royal-50 border border-royal-100 text-royal-600 text-xs font-bold uppercase tracking-wider mb-6">
                            <Zap size={14} className="fill-royal-500" />
                            <span>Developer Ecosystem</span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black text-midnight-950 font-display mb-8 tracking-tighter leading-tight">
                            Open Source <span className="text-royal-600">&</span> Free Tools<span className="text-royal-500">.</span>
                        </h1>
                        <p className="text-xl text-midnight-700 leading-relaxed font-light">
                            I believe in building tools that solve small problems for many people.
                            From browser extensions to localized engines, everything here is free, open, and built to empower developers and creators globally.
                        </p>
                    </motion.div>
                </div>

                {/* Grid */}
                <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
                    {tools.map((tool, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <MagicalCard className="group h-full flex flex-col overflow-hidden bg-white/40 backdrop-blur-md border border-white/40 hover:border-royal-200/50 shadow-sm hover:shadow-2xl transition-all duration-500">
                                {/* Tool Image/Screenshot */}
                                <div className="relative h-64 w-full overflow-hidden bg-midnight-50">
                                    <div className="absolute inset-0 bg-gradient-to-t from-midnight-950/60 via-transparent to-transparent z-10 opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
                                    {/* @ts-ignore - Dynamic check suitable for this specific iteration */}
                                    {tool.image ? (
                                        <img
                                            // @ts-ignore
                                            src={tool.image}
                                            alt={tool.title}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                    ) : (
                                        <div className={`w-full h-full flex items-center justify-center bg-gradient-to-br ${tool.gradient} p-8 group-hover:scale-105 transition-transform duration-700`}>
                        <h3 className="text-3xl md:text-4xl font-black text-white font-display text-center leading-tight tracking-tight drop-shadow-lg">
                                            {tool.title}
                                        </h3>
                                        </div>
                                    )}
                                    <div className="absolute top-4 left-4 z-20 flex flex-wrap gap-2">
                                        {tool.tags.map(tag => (
                                            <span key={tag} className="px-2 py-1 rounded-md bg-white/20 backdrop-blur-md border border-white/30 text-[10px] font-bold text-white uppercase tracking-wider">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                    <div className="absolute bottom-4 left-4 z-20">
                                        <div className="flex items-center gap-2 text-white/90">
                                            <MonitorSmartphone size={16} />
                                            <span className="text-xs font-medium tracking-wide">{tool.stats}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-8 flex flex-col flex-grow">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex flex-col">
                                        <h3 className="text-2xl font-black text-midnight-950 font-display leading-tight">
                                            {tool.title}
                                        </h3>
                                        </div>
                                        <div className="p-2 rounded-full bg-midnight-50 text-midnight-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            <ArrowRight size={20} />
                                        </div>
                                    </div>
                                    <p className="text-midnight-600 text-sm leading-relaxed mb-8 flex-grow font-light">
                                        {tool.description}
                                    </p>

                                    {/* Links Grid */}
                                    <div className="grid grid-cols-2 gap-3">
                                        {tool.links.map((link, lIdx) => (
                                            <a
                                                key={lIdx}
                                                href={link.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-3 p-3 rounded-xl bg-midnight-50/50 border border-midnight-100/50 hover:bg-white hover:border-royal-200 hover:shadow-md transition-all duration-300 group/link"
                                            >
                                                <link.icon size={18} className={`${link.color} transition-transform group-hover/link:scale-110`} />
                                                <span className="text-[11px] font-bold text-midnight-700 uppercase tracking-tight">{link.label}</span>
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            </MagicalCard>
                        </motion.div>
                    ))}
                </div>

                {/* Bottom CTA */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="mt-32 text-center p-12 rounded-[2.5rem] bg-gradient-to-br from-royal-600 to-indigo-700 text-white shadow-2xl relative overflow-hidden"
                >
                    <div className="bg-noise opacity-10 absolute inset-0 pointer-events-none" />
                    <div className="relative z-10 max-w-2xl mx-auto">
                        <Code2 size={48} className="mx-auto mb-8 text-royal-200 opacity-80" />
                        <h2 className="text-3xl md:text-4xl font-black font-display mb-6 leading-tight">Have a project idea or want to collaborate?</h2>
                        <p className="text-royal-100 text-lg mb-10 font-light leading-relaxed">
                            I'm always looking for interesting open-source projects to contribute to or new tools to build. Feel free to reach out.
                        </p>
                        <Link
                            to="/contact"
                            className="inline-flex items-center gap-2 bg-white text-royal-600 px-8 py-4 rounded-full font-bold hover:bg-royal-50 transition-all hover:scale-105 shadow-lg group"
                        >
                            Get in Touch
                            <ExternalLink size={18} className="transition-transform group-hover:translate-x-1" />
                        </Link>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
