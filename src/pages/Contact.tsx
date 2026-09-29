import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, MapPin, Linkedin, Github, ArrowUpRight, Sparkles, Copy, Check, GraduationCap, BookOpen, Glasses, Home, Code2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { AnimatedSection } from '../components/ui/AnimatedSection';
import OrganicBlob from '../components/ui/OrganicBlob';
import { imageSrc, photos } from '@/data/media';
import { creditText } from '@/components/media/lightboxContext';

const EMAIL = 'contact@nirmalad.com.np';

const profiles = [
    { icon: Linkedin, label: 'LinkedIn', handle: '@nirmalbrj7', href: 'https://www.linkedin.com/in/nirmalbrj7/' },
    { icon: Github, label: 'GitHub', handle: '@nirmalbrj7', href: 'https://github.com/nirmalbrj7' },
    { icon: GraduationCap, label: 'Google Scholar', handle: 'Citations & papers', href: 'https://scholar.google.com/citations?user=3HxpopEAAAAJ&hl=en' },
    { icon: BookOpen, label: 'ORCID', handle: '0000-0003-1555-7867', href: 'https://orcid.org/0000-0003-1555-7867' },
];

const topics = [
    { icon: Glasses, title: 'Research collaboration', text: 'AR/VR, locative storytelling, HCI studies', to: '/research' },
    { icon: GraduationCap, title: 'Teaching & guest lectures', text: 'Programming, web, networking, GIS, HCI', to: '/academic' },
    { icon: Home, title: 'Resilient housing tech', text: 'Platforms, MIS and AI for recovery programmes', to: '/projects' },
    { icon: Code2, title: 'Open source', text: 'Extensions, npm packages, Spatial OS', to: '/open-source' },
];

export default function Contact() {
    const [copied, setCopied] = useState(false);
    const copyEmail = async () => {
        try {
            await navigator.clipboard.writeText(EMAIL);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            /* clipboard unavailable; the mailto link still works */
        }
    };

    return (
        <div className="min-h-screen py-20 md:py-32 relative">
            <OrganicBlob color="teal" size="xl" className="top-1/4 left-0 -translate-x-1/3" delay={0} />
            <OrganicBlob color="coral" size="lg" className="bottom-1/4 right-0 translate-x-1/3" delay={2} />

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
                <AnimatedSection>
                    <div className="glass rounded-[2.5rem] border border-white/60 shadow-2xl overflow-hidden">
                        <div className="h-2 bg-gradient-to-r from-teal-500 via-coral-400 to-teal-500 w-full" />

                        <div className="p-6 sm:p-10 lg:p-14">
                            <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-10 lg:gap-12">
                                <div>
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: 0.2 }}
                                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 text-teal-700 text-sm font-medium mb-6"
                                    >
                                        <Sparkles size={14} /> Let's collaborate
                                    </motion.div>

                                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-charcoal-900 mb-6">Let's Connect</h1>
                                    <p className="text-lg md:text-xl text-charcoal-600 max-w-xl mb-8 leading-relaxed">
                                        I'm always open to research collaborations, teaching opportunities, technology for
                                        resilience, or simply sharing ideas about the future of interaction.
                                    </p>

                                    {/* Email */}
                                    <div className="rounded-2xl bg-white/85 border border-sand-200 p-5 flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
                                        <div className="w-12 h-12 bg-teal-50 rounded-xl flex items-center justify-center text-teal-600 shrink-0">
                                            <Mail size={24} />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-xs font-bold uppercase tracking-widest text-charcoal-400">Email</p>
                                            <a href={`mailto:${EMAIL}`} className="text-lg font-semibold text-charcoal-900 hover:text-teal-700 break-all">{EMAIL}</a>
                                        </div>
                                        <div className="flex gap-2">
                                            <button onClick={copyEmail} className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-sand-200 text-sm font-semibold text-charcoal-700 hover:border-teal-300" aria-live="polite">
                                                {copied ? <Check size={15} className="text-emerald-600" /> : <Copy size={15} />}
                                                {copied ? 'Copied' : 'Copy'}
                                            </button>
                                            <a href={`mailto:${EMAIL}`} className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-charcoal-900 text-white text-sm font-semibold hover:bg-teal-700">
                                                Write <ArrowUpRight size={15} />
                                            </a>
                                        </div>
                                    </div>

                                    {/* Topics */}
                                    <p className="text-xs font-bold uppercase tracking-widest text-charcoal-400 mb-3">Good reasons to get in touch</p>
                                    <div className="grid sm:grid-cols-2 gap-3">
                                        {topics.map((t) => (
                                            <Link key={t.title} to={t.to} className="group flex gap-3 rounded-2xl bg-white/70 border border-sand-200 hover:border-teal-300 hover:bg-white p-4 transition-colors">
                                                <span className="w-10 h-10 shrink-0 rounded-xl bg-sand-100 text-charcoal-600 group-hover:bg-teal-50 group-hover:text-teal-600 flex items-center justify-center transition-colors">
                                                    <t.icon size={20} />
                                                </span>
                                                <span>
                                                    <span className="block font-semibold text-charcoal-900 text-sm">{t.title}</span>
                                                    <span className="block text-xs text-charcoal-500">{t.text}</span>
                                                </span>
                                            </Link>
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-5">
                                    {/* Based in */}
                                    <div className="relative rounded-3xl overflow-hidden aspect-[4/3] bg-sand-100">
                                        <img src={imageSrc(photos.halifax.id, true)} alt={photos.halifax.alt} className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/85 via-charcoal-950/20 to-transparent" />
                                        <div className="absolute left-5 right-5 bottom-4 text-white">
                                            <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-teal-300"><MapPin size={13} /> Based in</p>
                                            <p className="font-display font-bold text-2xl">Halifax, Nova Scotia</p>
                                            <p className="text-sm text-white/70">Atlantic Time (UTC−4 / −3) · teaching online worldwide</p>
                                            <a href={photos.halifax.credit.source} target="_blank" rel="noopener noreferrer" className="block mt-1 text-[10px] text-white/50 hover:text-white">
                                                Photo: {creditText(photos.halifax)}
                                            </a>
                                        </div>
                                    </div>

                                    {/* Profiles */}
                                    <div className="rounded-3xl bg-charcoal-900 text-white p-6 relative overflow-hidden">
                                        <div className="absolute -top-20 -right-20 w-40 h-40 bg-teal-500/30 rounded-full blur-3xl" />
                                        <p className="relative text-xs uppercase tracking-widest text-teal-300 font-bold mb-4">Find me online</p>
                                        <div className="relative space-y-2">
                                            {profiles.map((p) => (
                                                <a key={p.label} href={p.href} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-3 rounded-2xl bg-white/10 hover:bg-white/15 px-4 py-3 transition-all">
                                                    <span className="p-2 rounded-xl bg-teal-500/20 text-teal-300"><p.icon size={18} /></span>
                                                    <span className="flex-1 min-w-0">
                                                        <span className="font-semibold block text-sm">{p.label}</span>
                                                        <span className="text-xs text-charcoal-300 truncate block">{p.handle}</span>
                                                    </span>
                                                    <ArrowUpRight size={16} className="opacity-40 group-hover:opacity-100 transition-opacity" />
                                                </a>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </AnimatedSection>
            </div>
        </div>
    );
}
