import { Github, Linkedin, Twitter, Mail } from 'lucide-react';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-slate-50 border-t border-slate-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Brand */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-serif font-bold text-slate-900">Nirmal Adhikari</h3>
                        <p className="text-slate-600 text-sm max-w-xs">
                            Academic professional, researcher, and educator dedicated to advancing knowledge in Communication and Media.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-4">
                        <h4 className="text-sm font-semibold text-slate-900 uppercase tracking-wider">Connect</h4>
                        <div className="flex space-x-4">
                            <a href="https://www.linkedin.com/in/nirmalbrj7/" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-slate-900 transition-colors">
                                <span className="sr-only">LinkedIn</span>
                                <Linkedin size={20} />
                            </a>
                            <a href="https://twitter.com/nirmalbrj7" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-slate-900 transition-colors">
                                <span className="sr-only">Twitter</span>
                                <Twitter size={20} />
                            </a>
                            <a href="https://github.com/nirmalbrj7" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-slate-900 transition-colors">
                                <span className="sr-only">GitHub</span>
                                <Github size={20} />
                            </a>
                            <a href="mailto:contact@nirmalad.com.np" className="text-slate-400 hover:text-slate-900 transition-colors">
                                <span className="sr-only">Email</span>
                                <Mail size={20} />
                            </a>
                        </div>
                    </div>

                    {/* Copyright */}
                    <div className="md:text-right text-slate-500 text-sm">
                        <p>&copy; {currentYear} Nirmal Adhikari.</p>
                        <p className="mt-1">All rights reserved.</p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
