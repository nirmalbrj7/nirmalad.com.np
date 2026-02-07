import { Link } from 'react-router-dom';
import { ArrowRight, Globe, Shield, Activity, MapPin, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import Hero3D from '../components/ui/Hero3D';
import ScrollReveal from '../components/ui/ScrollReveal';

const focusAreas = [
    {
        icon: Globe,
        title: "Resilient Systems",
        desc: "Technology platforms that strengthen communities before, during, and after crises.",
        tone: "bg-royal-50 text-royal-700",
    },
    {
        icon: Shield,
        title: "Safety & Trust",
        desc: "AI-assisted tools that help people make confident decisions about their homes and environments.",
        tone: "bg-emerald-50 text-emerald-700",
    },
    {
        icon: Activity,
        title: "Immersive Experience",
        desc: "Spatial narratives and XR prototypes that bring stories to life in real space.",
        tone: "bg-rose-50 text-rose-700",
    },
];

export default function Home() {
    return (
        <div className="relative overflow-hidden">
            {/* Hero */}
            <section className="relative pt-24 pb-24 lg:pt-28 lg:pb-28">
                <div className="absolute inset-0 -z-10">
                    <Hero3D />
                    <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-cream-50/80 to-cream-100/90" />
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-[1.2fr_0.8fr] gap-16 items-center">
                    <div>
                        <motion.div
                            initial={{ opacity: 0, y: 18 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7 }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/70 border border-white/60 shadow-sm text-xs font-semibold uppercase tracking-[0.18em] text-midnight-500 mb-6"
                        >
                            <Sparkles size={14} className="text-royal-500" />
                            Researcher • Educator • Builder
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 24 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.05 }}
                            className="text-5xl md:text-7xl lg:text-[4.5rem] font-display font-black text-midnight-950 tracking-tight leading-[0.95]"
                        >
                            Nirmal Adhikari
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.15 }}
                            className="mt-6 text-xl md:text-2xl text-royal-700 font-display italic"
                        >
                            Storyteller of Resilient Technologies
                        </motion.p>

                        <motion.p
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.25 }}
                            className="mt-6 text-lg text-midnight-600 leading-relaxed max-w-2xl"
                        >
                            Bridging human experience and digital innovation. I design platforms and immersive systems
                            that help people rebuild, navigate risk, and make decisions with clarity and dignity.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.35 }}
                            className="mt-10 flex flex-col sm:flex-row gap-4"
                        >
                            <Link
                                to="/projects"
                                className="group inline-flex items-center justify-center px-8 py-4 bg-midnight-900 text-white rounded-full font-semibold shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all"
                            >
                                Explore My Work
                                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                            </Link>
                            <Link
                                to="/cv"
                                className="inline-flex items-center justify-center px-8 py-4 rounded-full font-semibold border border-midnight-100 bg-white/70 text-midnight-800 hover:border-royal-200 hover:text-royal-700 transition-all"
                            >
                                View CV
                            </Link>
                        </motion.div>

                        <div className="mt-10 flex flex-wrap gap-3 text-xs font-semibold uppercase tracking-wide text-midnight-500">
                            <span className="px-3 py-1 rounded-full bg-white/70 border border-white/70">AR/VR & Spatial Storytelling</span>
                            <span className="px-3 py-1 rounded-full bg-white/70 border border-white/70">AI for Social Good</span>
                            <span className="px-3 py-1 rounded-full bg-white/70 border border-white/70">Resilient Housing</span>
                        </div>
                    </div>

                    <ScrollReveal delay={0.1}>
                        <div className="relative">
                            <div className="absolute -inset-6 bg-gradient-to-br from-royal-200/40 via-white/60 to-emerald-200/40 rounded-[2.5rem] blur-2xl" />
                            <div className="relative surface-card rounded-[2.5rem] p-8 lg:p-10">
                                <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-widest text-midnight-400 mb-8">
                                    <span>Now</span>
                                    <span className="flex items-center gap-2">
                                        <MapPin size={14} />
                                        Halifax, NS
                                    </span>
                                </div>
                                <div className="space-y-6">
                                    <div>
                                        <p className="text-sm text-midnight-500">Focus</p>
                                        <p className="text-2xl font-display font-black text-midnight-900">Immersive Computing & Resilience</p>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="p-4 rounded-2xl bg-white/70 border border-white/70">
                                            <p className="text-xs uppercase tracking-widest text-midnight-400">Role</p>
                                            <p className="text-lg font-semibold text-midnight-900">PhD Researcher</p>
                                        </div>
                                        <div className="p-4 rounded-2xl bg-white/70 border border-white/70">
                                            <p className="text-xs uppercase tracking-widest text-midnight-400">Focus</p>
                                            <p className="text-lg font-semibold text-midnight-900">Human-Centered XR</p>
                                        </div>
                                        <div className="p-4 rounded-2xl bg-white/70 border border-white/70 col-span-2">
                                            <p className="text-xs uppercase tracking-widest text-midnight-400">Recognition</p>
                                            <p className="text-lg font-semibold text-midnight-900">Call for Code Finalist (PD3R)</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* Journey */}
            <motion.section
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7 }}
                className="py-24"
            >
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <h2 className="text-4xl font-display font-bold text-midnight-900 mb-6">
                            A Journey Guided by Purpose
                        </h2>
                        <div className="prose prose-lg text-midnight-600 leading-relaxed space-y-6">
                            <p>
                                My work grows from the places and people I have met along the way. I have spent time in communities
                                where buildings were damaged, systems were stretched, and families were searching for a path forward.
                            </p>
                            <p>
                                Those experiences shaped the way I think about technology. It’s not just about code—it’s about
                                designing systems that help people make decisions with confidence and rebuild their lives with dignity.
                            </p>
                            <div className="border-l-4 border-royal-500 pl-6 italic text-midnight-800 font-display text-xl">
                                "At the heart of all of it is a simple belief: Technology should make life better."
                            </div>
                        </div>
                    </div>
                    <div className="relative">
                        <div className="absolute -inset-4 bg-gradient-to-tr from-cream-100 to-royal-100 rounded-[2.5rem] rotate-2" />
                        <div className="relative surface-card rounded-[2.5rem] p-8">
                            <div className="grid grid-cols-2 gap-4">
                                {[
                                    { label: "Global", sub: "Impact", emoji: "🌍" },
                                    { label: "Resilience", sub: "Housing", emoji: "🏘️" },
                                    { label: "Innovation", sub: "AI & Tech", emoji: "🤖" },
                                    { label: "Research", sub: "Academic", emoji: "🎓" },
                                ].map((item, idx) => (
                                    <div key={idx} className="bg-white/70 rounded-2xl border border-white/60 flex flex-col items-center justify-center p-4 text-center">
                                        <span className="text-3xl mb-2">{item.emoji}</span>
                                        <span className="font-semibold text-midnight-900">{item.label}</span>
                                        <span className="text-xs text-midnight-500">{item.sub}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </motion.section>

            {/* Focus Areas */}
            <motion.section
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7 }}
                className="py-24"
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mb-14 text-center">
                        <span className="text-royal-600 font-bold tracking-widest uppercase text-xs">Core Philosophy</span>
                        <h2 className="text-3xl md:text-5xl font-display font-bold text-midnight-900 mt-3">What Drives My Work</h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
                        {focusAreas.map((item, index) => (
                            <motion.div
                                key={index}
                                whileHover={{ y: -8 }}
                                className="surface-card p-8 rounded-3xl border border-white/60 shadow-[0_24px_60px_-40px_rgba(15,23,42,0.5)] transition-all duration-500"
                            >
                                <div className={`h-14 w-14 ${item.tone} rounded-2xl flex items-center justify-center mb-8 shadow-sm`}>
                                    <item.icon className="h-7 w-7" />
                                </div>
                                <h3 className="text-2xl font-display font-bold text-midnight-900 mb-4">{item.title}</h3>
                                <p className="text-midnight-600 leading-relaxed">
                                    {item.desc}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.section>

            {/* Featured Project */}
            <motion.section
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7 }}
                className="py-28 bg-midnight-950 text-white relative overflow-hidden"
            >
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10"></div>
                <div className="absolute -top-20 right-0 w-[600px] h-[600px] bg-royal-900/30 rounded-full blur-3xl"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-20 items-center">
                        <div>
                            <span className="flex items-center gap-2 text-royal-300 font-bold tracking-widest uppercase text-xs mb-6">
                                <span className="w-8 h-px bg-royal-300"></span> Featured Story
                            </span>
                            <h3 className="text-5xl md:text-6xl font-display font-bold mb-8 leading-tight">
                                Resilient Housing <br /><span className="text-royal-300 italic">& Innovation</span>
                            </h3>
                            <div className="prose prose-lg prose-invert text-midnight-200 mb-10 leading-relaxed font-light">
                                <p>
                                    Much of my work is shaped by the idea that homes are more than buildings. They hold stories,
                                    memories, and the lives of people who trust them. My early journey involved developing systems
                                    that assess the safety and strength of homes in vulnerable communities.
                                </p>
                                <p>
                                    I contributed to <strong className="text-white">PD3R</strong>, an AI-based mobile solution that
                                    identifies whether a house is safe to retrofit after a disaster. This work became a global finalist
                                    in the Call for Code challenge.
                                </p>
                            </div>
                            <Link to="/projects" className="group inline-flex items-center text-white border-b border-royal-400 pb-1 hover:text-royal-200 transition-colors">
                                Read more about PD3R and other projects <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>

                        <div className="relative">
                            <div className="absolute -inset-4 bg-gradient-to-r from-royal-600 to-emerald-600 rounded-2xl blur-lg opacity-30 animate-pulse"></div>
                            <div className="relative bg-midnight-900 rounded-2xl p-1 border border-white/10 overflow-hidden shadow-2xl skew-y-1 lg:skew-y-2 transform hover:skew-y-0 transition-transform duration-700">
                                <div className="aspect-video bg-gradient-to-br from-midnight-800 to-midnight-950 rounded-xl flex items-center justify-center relative overflow-hidden group">
                                    <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity duration-700">
                                        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                                            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                                                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
                                            </pattern>
                                            <rect width="100%" height="100%" fill="url(#grid)" />
                                        </svg>
                                    </div>
                                    <motion.div
                                        animate={{ scale: [1, 1.05, 1] }}
                                        transition={{ duration: 4, repeat: Infinity }}
                                        className="text-7xl drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]"
                                    >
                                        🏠
                                    </motion.div>
                                    <motion.div
                                        animate={{ x: [0, 20, 0], y: [0, -20, 0] }}
                                        transition={{ duration: 5, repeat: Infinity }}
                                        className="absolute top-1/4 right-1/4 text-4xl"
                                    >
                                        🤖
                                    </motion.div>
                                </div>
                            </div>
                            <div className="absolute -bottom-8 -right-8 w-64 h-64 bg-royal-600/20 rounded-full blur-3xl"></div>
                        </div>
                    </div>
                </div>
            </motion.section>
        </div>
    );
}
