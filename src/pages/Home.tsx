import { Link } from 'react-router-dom';
import { ArrowRight, Globe, Shield, Activity } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Home() {
    return (
        <div className="flex flex-col font-sans text-midnight-900 bg-cream-50 overflow-hidden">
            <div className="bg-noise" />

            {/* Immersive Hero Section */}
            <section className="relative min-h-screen flex items-center justify-center py-20 overflow-hidden">
                {/* Dynamic Background Blobs */}
                <div className="absolute inset-0 w-full h-full overflow-hidden -z-10 bg-cream-50">
                    <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03]"></div>
                    <div className="absolute top-[10%] left-[20%] w-[30vw] h-[30vw] bg-purple-200/30 rounded-full mix-blend-multiply filter blur-[80px] animate-blob" />
                    <div className="absolute top-[20%] right-[20%] w-[35vw] h-[35vw] bg-blue-200/30 rounded-full mix-blend-multiply filter blur-[80px] animate-blob animation-delay-2000" />
                    <div className="absolute bottom-[20%] left-[30%] w-[40vw] h-[40vw] bg-pink-200/30 rounded-full mix-blend-multiply filter blur-[80px] animate-blob animation-delay-4000" />
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full flex flex-col items-center">

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        className="mb-8 relative"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-royal-400 to-purple-500 blur-2xl opacity-20 rounded-full transform scale-110"></div>
                        <img src="https://nirmalad.com.np/profile-pic-placeholder" alt="" className="hidden" /> {/* Placeholder/hidden if no image, using layout instead */}
                        <div className="w-24 h-1 bg-gradient-to-r from-royal-500 to-purple-600 rounded-full mx-auto mb-8"></div>
                    </motion.div>

                    <div className="text-center max-w-4xl mx-auto">
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="text-7xl md:text-9xl font-serif font-black text-midnight-950 tracking-tighter mb-6"
                        >
                            Nirmal<br className="md:hidden" /> Adhikari
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="text-2xl md:text-3xl text-royal-600 font-serif italic mb-10"
                        >
                            Storyteller of Resilient Technologies
                        </motion.p>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1, delay: 0.6 }}
                            className="text-lg md:text-xl text-midnight-600 max-w-2xl mx-auto leading-relaxed mb-12"
                        >
                            Bridging the gap between <strong>human experience</strong> and <strong>digital innovation</strong>. <br className="hidden md:block" /> Building tools that protect communities and empower decisions.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.8 }}
                            className="flex flex-col sm:flex-row gap-5 justify-center items-center"
                        >
                            <Link
                                to="/projects"
                                className="group relative px-8 py-4 bg-midnight-900 text-white rounded-full font-medium overflow-hidden transition-all hover:scale-105 shadow-xl hover:shadow-royal-900/20 w-fit"
                            >
                                <span className="relative z-10 flex items-center">
                                    Explore My Work <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                                </span>
                            </Link>

                            <Link
                                to="/cv"
                                className="px-8 py-4 bg-white text-midnight-800 border-2 border-midnight-50 rounded-full font-medium hover:border-royal-200 hover:text-royal-700 transition-all w-fit"
                            >
                                View CV
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Purpose / Journey Section */}
            <section className="py-24 bg-white relative">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        <div className="order-2 md:order-1">
                            <h2 className="text-4xl font-serif font-bold text-midnight-900 mb-6 relative inline-block">
                                A Journey <span className="text-royal-500">Guided by Purpose</span>
                                <svg className="absolute w-full h-3 -bottom-1 left-0 text-yellow-300 -z-10 opacity-60" viewBox="0 0 100 10" preserveAspectRatio="none">
                                    <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
                                </svg>
                            </h2>
                            <div className="prose prose-lg text-midnight-600 leading-relaxed space-y-6">
                                <p>
                                    My work grows from the places and people I have met along the way. I have spent time in communities where buildings were damaged, systems were stretched, and families were searching for a path forward.
                                </p>
                                <p>
                                    Those experiences shaped the way I think about technology. It’s not just about code—it’s about designing systems that help people make decisions with confidence and rebuild their lives with dignity.
                                </p>
                                <div className="border-l-4 border-royal-500 pl-6 italic text-midnight-800 font-serif text-xl">
                                    "At the heart of all of it is a simple belief: Technology should make life better."
                                </div>
                            </div>
                        </div>
                        <div className="order-1 md:order-2 relative">
                            <div className="aspect-square bg-gradient-to-tr from-cream-100 to-royal-50 rounded-[3rem] rotate-3"></div>
                            <div className="absolute inset-0 bg-midnight-950/5 rounded-[3rem] -rotate-3 backdrop-blur-sm border border-white/20 flex items-center justify-center p-8 text-center">
                                {/* Abstract representation of global impact */}
                                <div className="grid grid-cols-2 gap-4 w-full h-full">
                                    <div className="bg-white rounded-2xl flex flex-col items-center justify-center p-4 shadow-sm">
                                        <span className="text-4xl mb-2">🌍</span>
                                        <span className="font-bold text-midnight-900">Global</span>
                                        <span className="text-xs text-midnight-500">Impact</span>
                                    </div>
                                    <div className="bg-white rounded-2xl flex flex-col items-center justify-center p-4 shadow-sm mt-8">
                                        <span className="text-4xl mb-2">🏘️</span>
                                        <span className="font-bold text-midnight-900">Resilience</span>
                                        <span className="text-xs text-midnight-500">Housing</span>
                                    </div>
                                    <div className="bg-white rounded-2xl flex flex-col items-center justify-center p-4 shadow-sm -mt-8">
                                        <span className="text-4xl mb-2">🤖</span>
                                        <span className="font-bold text-midnight-900">Innovation</span>
                                        <span className="text-xs text-midnight-500">AI & Tech</span>
                                    </div>
                                    <div className="bg-white rounded-2xl flex flex-col items-center justify-center p-4 shadow-sm">
                                        <span className="text-4xl mb-2">🎓</span>
                                        <span className="font-bold text-midnight-900">Research</span>
                                        <span className="text-xs text-midnight-500">Academic</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Philosophy Grid */}
            <section className="py-24 bg-white relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cream-300 to-transparent" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mb-16 text-center">
                        <span className="text-royal-600 font-bold tracking-widest uppercase text-xs">Core Philosophy</span>
                        <h2 className="text-3xl md:text-5xl font-serif font-bold text-midnight-900 mt-3">What Drives My Work</h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
                        {[
                            {
                                icon: Globe,
                                color: "text-royal-600",
                                bg: "bg-royal-50",
                                title: "Transformation",
                                desc: "Technology is not only about efficiency. I build platforms that guide nations through complex recovery efforts and help communities grow stronger."
                            },
                            {
                                icon: Shield,
                                color: "text-emerald-600",
                                bg: "bg-emerald-50",
                                title: "Safety & Resilience",
                                desc: "From AI-based housing assessments to global risk awareness apps, my goal is to create technology that helps people feel safer in their homes."
                            },
                            {
                                icon: Activity,
                                color: "text-rose-600",
                                bg: "bg-rose-50",
                                title: "Human Experience",
                                desc: "Explorations in immersive AR and spatial storytelling. Improving how people move, feel, and experience stories in physical space."
                            }
                        ].map((item, index) => (
                            <motion.div
                                key={index}
                                whileHover={{ y: -10 }}
                                className="group p-8 rounded-3xl bg-cream-50/50 border border-transparent hover:border-cream-200 hover:bg-white hover:shadow-2xl transition-all duration-500"
                            >
                                <div className={`h-14 w-14 ${item.bg} rounded-2xl flex items-center justify-center ${item.color} mb-8 shadow-sm group-hover:scale-110 transition-transform`}>
                                    <item.icon className="h-7 w-7" />
                                </div>
                                <h3 className="text-2xl font-serif font-bold text-midnight-900 mb-4">{item.title}</h3>
                                <p className="text-midnight-600 leading-relaxed">
                                    {item.desc}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Project Highlight */}
            <section className="py-32 bg-midnight-950 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10"></div>
                {/* Glow effects */}
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-royal-900/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-20 items-center">
                        <div>
                            <span className="flex items-center gap-2 text-royal-400 font-bold tracking-widest uppercase text-xs mb-6">
                                <span className="w-8 h-px bg-royal-400"></span> Featured Story
                            </span>
                            <h3 className="text-5xl md:text-6xl font-serif font-bold mb-8 leading-tight">
                                Resilient Housing <br /><span className="text-royal-400 italic">& Innovation</span>
                            </h3>
                            <div className="prose prose-lg prose-invert text-midnight-200 mb-10 leading-relaxed font-light">
                                <p>
                                    Much of my work is shaped by the idea that homes are more than buildings. They hold stories, memories, and the lives of people who trust them. My early journey involved developing systems that assess the safety and strength of homes in vulnerable communities.
                                </p>
                                <p>
                                    I contributed to <strong className="text-white">PD3R</strong>, an AI-based mobile solution that identifies whether a house is safe to retrofit after a disaster. This work became a global finalist in the Call for Code challenge.
                                </p>
                            </div>
                            <Link to="/projects" className="group inline-flex items-center text-white border-b border-royal-500 pb-1 hover:text-royal-300 transition-colors">
                                Read more about PD3R and other projects <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>

                        <div className="relative">
                            <div className="absolute -inset-4 bg-gradient-to-r from-royal-600 to-purple-600 rounded-2xl blur-lg opacity-30 animate-pulse"></div>
                            <div className="relative bg-midnight-900 rounded-2xl p-1 border border-white/10 overflow-hidden shadow-2xl skew-y-1 lg:skew-y-2 transform hover:skew-y-0 transition-transform duration-700">
                                <div className="aspect-video bg-gradient-to-br from-midnight-800 to-midnight-950 rounded-xl flex items-center justify-center relative overflow-hidden group">
                                    {/* Abstract Grid + AI Node */}
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
            </section>
        </div>
    );
}

