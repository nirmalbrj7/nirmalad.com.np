import { Mail, MapPin, Linkedin, Github } from 'lucide-react';

export default function Contact() {
    return (
        <div className="bg-cream-50 min-h-screen py-20 lg:py-32 flex items-center justify-center">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full">

                <div className="bg-white rounded-[2.5rem] shadow-xl border border-cream-200 overflow-hidden relative">
                    {/* Decorative Top Bar */}
                    <div className="h-3 bg-gradient-to-r from-royal-400 via-purple-400 to-royal-600 w-full"></div>

                    <div className="p-10 md:p-20 text-center">
                        <h1 className="text-4xl md:text-5xl font-extrabold text-midnight-900 font-serif mb-6">Let's Connect</h1>
                        <p className="text-xl text-midnight-600 max-w-2xl mx-auto mb-16 leading-relaxed">
                            I am always open to discussing new research collaborations, tech innovation in resilience, or just sharing ideas about the future of interactions.
                        </p>

                        <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">

                            {/* Email Card */}
                            <a href="mailto:contact@nirmalad.com.np" className="group block p-8 rounded-3xl bg-royal-50/50 hover:bg-royal-50 border border-transparent hover:border-royal-200 transition-all duration-300">
                                <div className="w-16 h-16 mx-auto bg-white rounded-2xl flex items-center justify-center text-royal-600 shadow-sm mb-6 group-hover:scale-110 transition-transform">
                                    <Mail size={32} />
                                </div>
                                <h3 className="text-xl font-bold text-midnight-900 mb-2">Email Me</h3>
                                <p className="text-royal-600 font-medium">contact@nirmalad.com.np</p>
                            </a>

                            {/* Location Card */}
                            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100">
                                <div className="w-16 h-16 mx-auto bg-white rounded-2xl flex items-center justify-center text-slate-600 shadow-sm mb-6">
                                    <MapPin size={32} />
                                </div>
                                <h3 className="text-xl font-bold text-midnight-900 mb-2">Based In</h3>
                                <p className="text-slate-600">Halifax, Nova Scotia, Canada</p>
                            </div>

                        </div>

                        {/* Social Links Row */}
                        <div className="mt-16 pt-10 border-t border-cream-100">
                            <p className="text-sm font-bold text-midnight-400 uppercase tracking-widest mb-8">Find me on social</p>
                            <div className="flex justify-center space-x-12">
                                <a href="https://linkedin.com/in/nirmalbrj7" target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center gap-3 text-slate-400 hover:text-royal-700 transition-colors">
                                    <span className="p-4 rounded-full bg-slate-50 group-hover:bg-royal-100 transition-colors">
                                        <Linkedin size={28} />
                                    </span>
                                    <span className="text-sm font-medium">LinkedIn</span>
                                </a>
                                <a href="https://github.com/nirmalbrj7" target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center gap-3 text-slate-400 hover:text-midnight-900 transition-colors">
                                    <span className="p-4 rounded-full bg-slate-50 group-hover:bg-white border border-transparent group-hover:border-slate-200 transition-colors">
                                        <Github size={28} />
                                    </span>
                                    <span className="text-sm font-medium">GitHub</span>
                                </a>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
