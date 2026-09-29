import { Link } from 'react-router-dom';
import { Award, Star, Trophy, Medal, Users, Building2, ArrowRight, ExternalLink, MapPin, CalendarDays } from 'lucide-react';
import { AnimatedSection, StaggerContainer, StaggerItem } from '../components/ui/AnimatedSection';
import { TiltCard } from '../components/ui/TiltCard';
import OrganicBlob from '../components/ui/OrganicBlob';
import RelatedLinks from '@/components/media/RelatedLinks';
import LiteYouTube from '@/components/media/LiteYouTube';
import { linkById, posterSrc } from '@/data/links';

interface Honour {
    icon: typeof Award;
    title: string;
    year: string;
    description: string;
    venue: string;
    color: string;
    bgColor: string;
    borderColor: string;
    links?: string[];
    cta?: { label: string; to: string };
}

const awards: Honour[] = [
    {
        icon: Trophy,
        title: '2nd Place, Global',
        year: 'IBM Call for Code 2018',
        description: 'PD3R, the AI retrofit-assessment tool I managed at Build Change, placed second of 2,500+ solutions from 100,000+ developers in 156 countries, winning USD $25,000 and long-term open-source support from The Linux Foundation.',
        venue: 'Announced in San Francisco, October 2018. Judges included President Bill Clinton.',
        color: 'from-teal-500 to-teal-400',
        bgColor: 'bg-teal-50',
        borderColor: 'border-teal-200',
        links: ['prnewswire-cfc2018', 'ibm-newsroom-top5', 'github-pd3r'],
        cta: { label: 'Read the PD3R story', to: '/research/pd3r' },
    },
    {
        icon: Award,
        title: 'Best Paper Award',
        year: '2025',
        description: '"Virtual Reality for Active Aging: First-Time Experiences of Older Adults with First Steps," with Roland Goddy-Worlu and Derek Reilly.',
        venue: 'Our Future is Aging: Multidisciplinary Research Informing People, Policy and Practice, Nova Scotia Centre on Aging, Halifax.',
        color: 'from-amber-500 to-amber-400',
        bgColor: 'bg-amber-50',
        borderColor: 'border-amber-200',
        cta: { label: 'See publications', to: '/publications' },
    },
];

const service = [
    { role: 'Web Chair', event: 'ACM Symposium on Virtual Reality Software and Technology', short: 'VRST 2025', place: 'Montréal, Canada', dates: '12–14 November 2025', link: 'acm-vrst2025' },
    { role: 'Web Chair', event: 'ACM Symposium on Spatial User Interaction', short: 'SUI 2025', place: 'Montréal, Canada', dates: '10–11 November 2025', link: 'acm-sui2025' },
];

const certifications = [
    {
        icon: Medal,
        title: 'Project Management Professional (PMP)',
        issuer: 'Project Management Institute · 2020',
        description: 'Validates expertise in leading cross-functional teams and guiding digital projects across multiple countries.',
        url: 'https://www.pmi.org/certifications/project-management-pmp',
    },
];

const memberships = [
    { name: 'Canadian Information Processing Society (CIPS)', url: 'https://cips.ca' },
    { name: 'International Association of Engineers (IAENG)', url: 'https://www.iaeng.org' },
    { name: 'Information Technology Professionals Association (ITPA)' },
];

export default function Recognition() {
    return (
        <div className="min-h-screen py-20 md:py-32 relative">
            <OrganicBlob color="teal" size="xl" className="top-0 left-0 -translate-x-1/3 -translate-y-1/4" delay={0} />
            <OrganicBlob color="coral" size="lg" className="bottom-0 right-0 translate-x-1/3 translate-y-1/4" delay={3} />

            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <AnimatedSection className="text-center mb-16">
                    <span className="text-teal-600 font-semibold tracking-widest uppercase text-xs">Achievements</span>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-charcoal-900 mt-3 mb-6">Awards & Recognition</h1>
                    <p className="text-lg text-charcoal-600 max-w-2xl mx-auto">
                        Recognition for contributions to technology, research and community resilience.
                    </p>
                </AnimatedSection>

                {/* Awards */}
                <StaggerContainer className="grid md:grid-cols-2 gap-8 mb-10" staggerDelay={0.15}>
                    {awards.map((award) => (
                        <StaggerItem key={award.title}>
                            <TiltCard className="h-full">
                                <div className={`h-full flex flex-col p-8 rounded-3xl ${award.bgColor} border ${award.borderColor} relative overflow-hidden group`}>
                                    <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${award.color} rounded-bl-full -mr-8 -mt-8 opacity-20 group-hover:opacity-40 transition-opacity`} />
                                    <award.icon className="mb-6 relative z-10 text-charcoal-800" size={44} />
                                    <h3 className="text-2xl font-bold text-charcoal-900 mb-2 relative z-10 font-display">{award.title}</h3>
                                    <p className="text-sm font-bold text-teal-700 uppercase tracking-widest mb-4">{award.year}</p>
                                    <p className="text-charcoal-600 leading-relaxed mb-3">{award.description}</p>
                                    <p className="text-sm text-charcoal-500 italic mb-5">{award.venue}</p>
                                    <div className="mt-auto pt-4 border-t border-charcoal-900/10 space-y-3">
                                        {award.links && <RelatedLinks ids={award.links} />}
                                        {award.cta && (
                                            <Link to={award.cta.to} className="inline-flex items-center gap-1.5 text-sm font-semibold text-teal-700 hover:text-teal-900">
                                                {award.cta.label} <ArrowRight size={14} />
                                            </Link>
                                        )}
                                    </div>
                                </div>
                            </TiltCard>
                        </StaggerItem>
                    ))}
                </StaggerContainer>

                {/* The winning entry */}
                <AnimatedSection className="mb-20">
                    <div className="rounded-3xl bg-charcoal-950 text-white p-4 md:p-6 grid md:grid-cols-[1.3fr_1fr] gap-6 items-center">
                        <LiteYouTube videoId="mVkjJx_Ko3k" title="Call for Code: Artificial Intelligence for Retrofitting" poster={posterSrc('mVkjJx_Ko3k', false)} duration="3:00" />
                        <div className="px-2 md:px-0">
                            <p className="text-xs font-bold uppercase tracking-widest text-teal-300 mb-2">Watch the entry</p>
                            <h3 className="font-display font-bold text-2xl mb-3">PD3R's Call for Code video</h3>
                            <p className="text-white/70 text-sm leading-relaxed mb-4">
                                The submission video Build Change published the day IBM named the five global finalists.
                            </p>
                            <div className="grid grid-cols-3 gap-2 text-center">
                                {[['2nd', 'place'], ['156', 'countries'], ['$25K', 'prize']].map(([v, l]) => (
                                    <div key={l} className="rounded-xl bg-white/5 border border-white/10 py-3">
                                        <p className="font-display font-bold text-xl">{v}</p>
                                        <p className="text-[10px] uppercase tracking-wider text-white/50">{l}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </AnimatedSection>

                {/* Academic service */}
                <AnimatedSection>
                    <div className="flex items-center gap-3 mb-8">
                        <Users size={24} className="text-teal-600" />
                        <h2 className="text-2xl md:text-3xl font-bold text-charcoal-900">Academic Service</h2>
                    </div>
                </AnimatedSection>
                <div className="grid md:grid-cols-2 gap-6 mb-20">
                    {service.map((s, i) => {
                        const l = linkById[s.link];
                        return (
                            <AnimatedSection key={s.short} delay={i * 0.1}>
                                <a href={l.url} target="_blank" rel="noopener noreferrer" className="group block h-full rounded-3xl bg-white/85 border border-sand-200 hover:border-teal-300 hover:shadow-xl p-6 md:p-8 transition-all">
                                    <div className="flex items-start justify-between gap-4 mb-4">
                                        <span className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-teal-500 to-indigo-600 text-white font-display font-bold text-sm">ACM</span>
                                        <ExternalLink size={18} className="text-charcoal-300 group-hover:text-teal-600" />
                                    </div>
                                    <p className="text-xs font-bold uppercase tracking-widest text-coral-500 mb-1">{s.role} · {s.short}</p>
                                    <h3 className="text-lg font-bold text-charcoal-900 font-display leading-snug mb-3">{s.event}</h3>
                                    <p className="text-sm text-charcoal-500 flex flex-wrap gap-x-4 gap-y-1">
                                        <span className="inline-flex items-center gap-1.5"><MapPin size={14} /> {s.place}</span>
                                        <span className="inline-flex items-center gap-1.5"><CalendarDays size={14} /> {s.dates}</span>
                                    </p>
                                    <p className="text-sm font-semibold text-teal-700 mt-4">View the organising committee</p>
                                </a>
                            </AnimatedSection>
                        );
                    })}
                </div>

                {/* Certifications & memberships */}
                <AnimatedSection>
                    <div className="flex items-center gap-3 mb-8">
                        <Star size={24} className="text-teal-600" />
                        <h2 className="text-2xl md:text-3xl font-bold text-charcoal-900">Certifications & Memberships</h2>
                    </div>
                </AnimatedSection>
                <StaggerContainer className="grid md:grid-cols-[1.2fr_1fr] gap-6" staggerDelay={0.1}>
                    {certifications.map((cert) => (
                        <StaggerItem key={cert.title}>
                            <TiltCard className="h-full">
                                <a href={cert.url} target="_blank" rel="noopener noreferrer" className="h-full p-6 md:p-8 rounded-3xl bg-white/80 border border-sand-200 hover:border-teal-300 flex flex-col sm:flex-row items-center sm:items-start gap-6">
                                    <div className="shrink-0 p-4 rounded-full bg-teal-50 text-teal-600"><cert.icon size={32} /></div>
                                    <div className="text-center sm:text-left">
                                        <h3 className="text-xl font-bold text-charcoal-900 mb-1">{cert.title}</h3>
                                        <p className="text-sm text-teal-600 font-medium mb-2">{cert.issuer}</p>
                                        <p className="text-charcoal-600">{cert.description}</p>
                                    </div>
                                </a>
                            </TiltCard>
                        </StaggerItem>
                    ))}
                    <StaggerItem>
                        <div className="h-full p-6 md:p-8 rounded-3xl bg-white/80 border border-sand-200">
                            <div className="flex items-center gap-3 mb-4">
                                <Building2 size={20} className="text-coral-500" />
                                <h3 className="font-bold text-charcoal-900">Professional memberships</h3>
                            </div>
                            <ul className="space-y-2.5">
                                {memberships.map((m) => (
                                    <li key={m.name} className="flex gap-2.5 text-sm text-charcoal-600">
                                        <span className="mt-2 w-1.5 h-1.5 shrink-0 rounded-full bg-teal-500" />
                                        {m.url ? <a href={m.url} target="_blank" rel="noopener noreferrer" className="hover:text-teal-700 hover:underline">{m.name}</a> : m.name}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </StaggerItem>
                </StaggerContainer>
            </div>
        </div>
    );
}
