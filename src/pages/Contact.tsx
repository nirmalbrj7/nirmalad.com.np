import { Mail, MapPin, Linkedin, Github } from 'lucide-react';


export default function Contact() {
    return (
        <div className="bg-cream-50 min-h-screen py-20 lg:py-28 flex items-center justify-center">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <div className="surface-card rounded-[2.5rem] border border-white/70 overflow-hidden relative">
                    <div className="h-2 bg-gradient-to-r from-royal-400 via-emerald-400 to-royal-600 w-full"></div>

                    <div className="p-10 md:p-16 lg:p-20">
                        <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-12 items-center">
                            <div>
                                <h1 className="text-4xl md:text-5xl font-extrabold text-midnight-900 font-display mb-6">Let's Connect</h1>
                                <p className="text-xl text-midnight-600 max-w-2xl mb-10 leading-relaxed">
                                    I am always open to discussing new research collaborations, tech innovation in resilience,
                                    or just sharing ideas about the future of interactions.
                                </p>

                                <div className="grid sm:grid-cols-2 gap-6">
                                    <a href="mailto:contact@nirmalad.com.np" className="group block p-6 rounded-3xl bg-white/70 border border-white/70 hover:border-royal-200 transition-all duration-300">
                                        <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-royal-600 shadow-sm mb-6 group-hover:scale-110 transition-transform">
                                            <Mail size={28} />
                                        </div>
                                        <h3 className="text-lg font-bold text-midnight-900 mb-2">Email Me</h3>
                                        <p className="text-royal-700 font-medium text-sm">contact@nirmalad.com.np</p>
                                    </a>

                                    <div className="p-6 rounded-3xl bg-white/70 border border-white/70">
                                        <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-midnight-600 shadow-sm mb-6">
                                            <MapPin size={28} />
                                        </div>
                                        <h3 className="text-lg font-bold text-midnight-900 mb-2">Based In</h3>
                                        <p className="text-midnight-600 text-sm">Halifax, Nova Scotia, Canada</p>
                                    </div>
                                </div>
                            </div>

                            <div className="rounded-3xl bg-midnight-950 text-white p-8 relative overflow-hidden">
                                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10"></div>
                                <div className="relative z-10">
                                    <p className="text-xs uppercase tracking-widest text-royal-200 font-bold mb-4">Find me online</p>
                                    <div className="space-y-4">
                                        <a href="https://linkedin.com/in/nirmalbrj7" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-4 rounded-2xl bg-white/10 hover:bg-white/15 px-4 py-3 transition-colors">
                                            <span className="p-2 rounded-full bg-royal-500/20 text-royal-200">
                                                <Linkedin size={20} />
                                            </span>
                                            <span className="text-sm font-semibold">LinkedIn</span>
                                        </a>
                                        <a href="https://github.com/nirmalbrj7" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-4 rounded-2xl bg-white/10 hover:bg-white/15 px-4 py-3 transition-colors">
                                            <span className="p-2 rounded-full bg-emerald-500/20 text-emerald-200">
                                                <Github size={20} />
                                            </span>
                                            <span className="text-sm font-semibold">GitHub</span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
