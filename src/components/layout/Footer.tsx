import { Github, Linkedin, Twitter, Mail, ArrowUpRight, Heart, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { MagneticButton } from '../ui/MagneticButton';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    const footerLinks = {
        explore: [
            { name: 'Projects', path: '/projects' },
            { name: 'Publications', path: '/publications' },
            { name: 'Open Source', path: '/open-source' },
            { name: 'Recognition', path: '/recognition' },
            { name: 'Academic', path: '/academic' },
        ],
        connect: [
            { name: 'Contact', path: '/contact' },
            { name: 'CV', path: '/cv' },
            { name: 'Blog', path: '/blog' },
        ],
    };

    const socialLinks = [
        { icon: Linkedin, href: 'https://www.linkedin.com/in/nirmalbrj7/', label: 'LinkedIn' },
        { icon: Twitter, href: 'https://twitter.com/nirmalbrj7', label: 'Twitter' },
        { icon: Github, href: 'https://github.com/nirmalbrj7', label: 'GitHub' },
        { icon: Mail, href: 'mailto:contact@nirmalad.com.np', label: 'Email' },
    ];

    return (
        <footer className="relative overflow-hidden">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-sand-50 to-sand-100" />
            <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 via-transparent to-coral-500/5" />

            {/* CTA Section */}
            <div className="relative z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
                    <motion.div
                        className="text-center max-w-4xl mx-auto"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                    >
                        <motion.p
                            className="font-handwritten text-coral-500 text-2xl md:text-3xl mb-4"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                        >
                            Let's create something meaningful together
                        </motion.p>

                        <h2 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-charcoal-900 leading-tight mb-8">
                            Bridging {' '}
                            <span className="text-gradient">Human Experience. Building Resilient</span>{' '}
                            Futures.
                        </h2>

                        <p className="text-lg md:text-xl text-charcoal-600 max-w-2xl mx-auto mb-10">
                            Whether you're interested in collaboration, research partnerships,
                            or just want to connect, I'd love to hear from you.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <MagneticButton variant="coral">
                                <a href="mailto:contact@nirmalad.com.np" className="flex items-center gap-2">
                                    Get In Touch
                                    <ArrowUpRight size={18} />
                                </a>
                            </MagneticButton>

                            <MagneticButton variant="secondary">
                                <a href="/cv" className="flex items-center gap-2">
                                    Download CV
                                </a>
                            </MagneticButton>
                        </div>
                    </motion.div>
                </div>

                {/* Main footer content */}
                <div className="border-t border-sand-200">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                            {/* Brand */}
                            <div className="lg:col-span-2 space-y-6">
                                <Link to="/" className="inline-block">
                                    <span className="font-display text-2xl font-bold text-charcoal-900">
                                        Nirmal<span className="text-teal-600">.</span>
                                    </span>
                                </Link>

                                <p className="text-charcoal-600 leading-relaxed max-w-md">
                                    Researcher, educator, and technology leader working at the
                                    intersection of immersive computing, resilient systems, and
                                    human-centered design.
                                </p>

                                <div className="flex items-center gap-2 text-sm text-charcoal-500">
                                    <MapPin size={16} className="text-coral-500" />
                                    <span>Halifax, Nova Scotia, Canada</span>
                                </div>

                                {/* Social links */}
                                <div className="flex items-center gap-3">
                                    {socialLinks.map((social) => (
                                        <motion.a
                                            key={social.label}
                                            href={social.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="p-3 rounded-full bg-white border border-sand-200 text-charcoal-500 hover:text-teal-600 hover:border-teal-200 hover:shadow-lg transition-all duration-300"
                                            whileHover={{ scale: 1.1, y: -2 }}
                                            whileTap={{ scale: 0.95 }}
                                            aria-label={social.label}
                                        >
                                            <social.icon size={20} />
                                        </motion.a>
                                    ))}
                                </div>
                            </div>

                            {/* Explore links */}
                            <div>
                                <h4 className="font-semibold text-charcoal-900 mb-4">Explore</h4>
                                <ul className="space-y-3">
                                    {footerLinks.explore.map((link) => (
                                        <li key={link.name}>
                                            <a
                                                href={link.path}
                                                className="text-charcoal-600 hover:text-teal-600 transition-colors inline-flex items-center gap-1 group"
                                            >
                                                {link.name}
                                                <ArrowUpRight
                                                    size={14}
                                                    className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all"
                                                />
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Connect links */}
                            <div>
                                <h4 className="font-semibold text-charcoal-900 mb-4">Connect</h4>
                                <ul className="space-y-3">
                                    {footerLinks.connect.map((link) => (
                                        <li key={link.name}>
                                            <a
                                                href={link.path}
                                                className="text-charcoal-600 hover:text-teal-600 transition-colors inline-flex items-center gap-1 group"
                                            >
                                                {link.name}
                                                <ArrowUpRight
                                                    size={14}
                                                    className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all"
                                                />
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="border-t border-sand-200">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                            <p className="text-sm text-charcoal-500 flex items-center gap-1">
                                © {currentYear} Nirmal Adhikari. Made with
                                <Heart size={14} className="text-coral-500 fill-coral-500" />
                                in Halifax
                            </p>

                            <motion.button
                                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                                className="text-sm text-charcoal-500 hover:text-teal-600 transition-colors flex items-center gap-1 group"
                                whileHover={{ y: -2 }}
                            >
                                Back to top
                                <ArrowUpRight
                                    size={14}
                                    className="rotate-[-45deg] group-hover:rotate-0 transition-transform"
                                />
                            </motion.button>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
