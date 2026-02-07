import { Github, Linkedin, Twitter, Mail } from 'lucide-react';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-cream-50 border-t border-cream-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
                    {/* Brand */}
                    <div className="space-y-4 md:col-span-2">
                        <h3 className="text-xl font-display font-black text-midnight-900">Nirmal Adhikari</h3>
                        <p className="text-midnight-600 text-sm max-w-md leading-relaxed">
                            Researcher, educator, and technology leader working at the intersection of immersive computing,
                            resilient systems, and human-centered design.
                        </p>
                        <div className="flex space-x-4">
                            <a href="https://www.linkedin.com/in/nirmalbrj7/" target="_blank" rel="noopener noreferrer" className="text-midnight-400 hover:text-royal-700 transition-colors">
                                <span className="sr-only">LinkedIn</span>
                                <Linkedin size={20} />
                            </a>
                            <a href="https://twitter.com/nirmalbrj7" target="_blank" rel="noopener noreferrer" className="text-midnight-400 hover:text-royal-700 transition-colors">
                                <span className="sr-only">Twitter</span>
                                <Twitter size={20} />
                            </a>
                            <a href="https://github.com/nirmalbrj7" target="_blank" rel="noopener noreferrer" className="text-midnight-400 hover:text-royal-700 transition-colors">
                                <span className="sr-only">GitHub</span>
                                <Github size={20} />
                            </a>
                            <a href="mailto:contact@nirmalad.com.np" className="text-midnight-400 hover:text-royal-700 transition-colors">
                                <span className="sr-only">Email</span>
                                <Mail size={20} />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-3">
                        <h4 className="text-xs font-bold text-midnight-400 uppercase tracking-widest">Explore</h4>
                        <div className="flex flex-col gap-2 text-sm text-midnight-600">
                            <a href="/projects" className="hover:text-royal-700 transition-colors">Key Projects</a>
                            <a href="/publications" className="hover:text-royal-700 transition-colors">Publications</a>
                            <a href="/open-source" className="hover:text-royal-700 transition-colors">Open Source</a>
                            <a href="/cv" className="hover:text-royal-700 transition-colors">Curriculum Vitae</a>
                        </div>
                    </div>

                    {/* Contact */}
                    <div className="space-y-3">
                        <h4 className="text-xs font-bold text-midnight-400 uppercase tracking-widest">Contact</h4>
                        <p className="text-sm text-midnight-600">Halifax, Nova Scotia</p>
                        <a href="mailto:contact@nirmalad.com.np" className="text-sm text-royal-700 font-medium hover:text-royal-800 transition-colors">
                            contact@nirmalad.com.np
                        </a>
                    </div>
                </div>

                <div className="mt-12 pt-6 border-t border-cream-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs text-midnight-500">
                    <p>&copy; {currentYear} Nirmal Adhikari. All rights reserved.</p>
                    <a href="#content" className="text-midnight-500 hover:text-midnight-900 transition-colors">
                        Back to top
                    </a>
                </div>
            </div>
        </footer>
    );
}
