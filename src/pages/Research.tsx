import { Microscope, ExternalLink, ChevronRight, Target, Globe, Code2, Trophy } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { AnimatedSection, StaggerContainer, StaggerItem } from '../components/ui/AnimatedSection';
import OrganicBlob from '../components/ui/OrganicBlob';
import { imageSrc } from '@/data/media';

interface ResearchProject {
    id: string;
    title: string;
    subtitle: string;
    description: string;
    organization: string;
    location: string;
    date: string;
    stats: { label: string; value: string }[];
    tags: string[];
    color: 'teal' | 'coral' | 'amber' | 'indigo';
    award?: string;
    /** Image in /public/images shown at the top of the card */
    image: string;
    imageFit?: 'cover' | 'contain';
}

const activeResearch: ResearchProject[] = [
    {
        id: 'ar-narratives',
        title: 'Locative AR Narratives',
        subtitle: 'Combining experiential & spatial data',
        description: 'Research presenting a phased methodology for collecting lived socio-spatial experiences and translating them into immersive, responsive AR narratives embedded in physical spaces.',
        organization: 'Dalhousie University',
        location: 'Halifax, Canada',
        date: '2023 - Present',
        stats: [
            { label: 'Participants', value: '48' },
            { label: 'Headset', value: 'HoloLens 2' },
            { label: 'Published', value: 'ICIDS 2025' }
        ],
        tags: ['Augmented Reality', 'Spatial Computing', 'Human-Computer Interaction'],
        color: 'indigo',
        image: 'dalhousie-goldberg-cs-building'
    }
];

const pastProjects: ResearchProject[] = [
    {
        id: 'bctap',
        title: 'BCtap Platform',
        subtitle: 'Scaling resilient housing tech',
        description: 'The Build Change Technical Assistance Platform (BCtap) digitalizes the 6-step construction value chain, supporting assessment, design, financing, and supervision for disaster-resilient housing.',
        organization: 'Build Change',
        location: 'Global',
        date: '2021 - 2024',
        stats: [
            { label: 'Countries', value: '26+' },
            { label: 'Disasters', value: '40+' },
            { label: 'Value chain', value: '6 steps' }
        ],
        tags: ['Enterprise Platform', 'Disaster Recovery', 'Tech for Good'],
        color: 'coral',
        image: 'yt-i2C4f3fzVOo'
    },
    {
        id: 'isac-simo',
        title: 'ISAC-SIMO',
        subtitle: 'Intelligent Supervision Assistant',
        description: 'An open-source ML tool funded by IBM and hosted by The Linux Foundation. Photograph rebar or a masonry wall and machine learning plus image processing return GO / NO-GO quality feedback.',
        organization: 'Build Change · IBM · Linux Foundation',
        location: 'Global (Open Source)',
        date: '2020 - 2021',
        stats: [
            { label: 'Host', value: 'Linux Fdn.' },
            { label: 'Grant', value: 'IBM' },
            { label: 'License', value: 'Apache-2.0' }
        ],
        tags: ['Machine Learning', 'Computer Vision', 'QA'],
        color: 'amber',
        image: 'isac-overview',
        imageFit: 'contain'
    },
    {
        id: 'pd3r',
        title: 'PD3R',
        subtitle: 'AI retrofit triage · Call for Code 2nd place',
        description: 'Post-Disaster Rapid Response Retrofit: a visual-recognition model trained on 2,000+ synthetic and real images that tells families whether an earthquake-damaged house can be retrofitted rather than rebuilt.',
        organization: 'Build Change · IBM Call for Code',
        location: 'Nepal & Colombia',
        date: '2018',
        stats: [
            { label: 'Global rank', value: '2nd' },
            { label: 'Entries', value: '2,500+' },
            { label: 'Prize', value: '$25K' }
        ],
        tags: ['Machine Learning', 'Synthetic Data', 'Humanitarian'],
        award: 'Call for Code 2018 · 2nd place',
        color: 'teal',
        image: 'pd3r-field-house-front'
    }
];

interface OpenSourceTool {
    name: string;
    description: string;
    tech: string[];
    link?: string;
    stars?: string;
    category: string;
}

const openSourceTools: OpenSourceTool[] = [
    {
        name: "ISAC-SIMO",
        description: "Construction quality checks from smartphone photos: rebar shape, texture and spacing, wall bond and mortar joints.",
        tech: ["Python", "Django", "React Native"],
        link: "https://github.com/ISAC-SIMO/ISAC-SIMO",
        stars: "★ 33",
        category: "Computer Vision"
    },
    {
        name: "PD3R",
        description: "Retrofit-eligibility AI trained on BIM-generated synthetic images. Laravel API with a mobile client.",
        tech: ["Python", "Dynamo", "Laravel"],
        link: "https://github.com/Call-for-Code/PD3R",
        category: "Machine Learning"
    },
    {
        name: "VR Active Aging Studies",
        description: "Research framework for studying VR engagement among older adults with accessibility features.",
        tech: ["Unity", "C#", "UX Research"],
        category: "Research Tools"
    }
];

const colorMap = {
    teal: { bg: 'bg-teal-50', border: 'border-teal-200', text: 'text-teal-700', accent: 'bg-teal-500', light: 'bg-teal-100' },
    coral: { bg: 'bg-coral-50', border: 'border-coral-200', text: 'text-coral-700', accent: 'bg-coral-500', light: 'bg-coral-100' },
    amber: { bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-700', accent: 'bg-amber-500', light: 'bg-amber-100' },
    indigo: { bg: 'bg-indigo-50', border: 'border-indigo-200', text: 'text-indigo-700', accent: 'bg-indigo-500', light: 'bg-indigo-100' }
};

export default function Research() {
    return (
        <div className="min-h-screen py-20 md:py-32 relative">
            {/* Background */}
            <OrganicBlob color="teal" size="xl" className="top-0 left-0 -translate-x-1/4 -translate-y-1/4" delay={0} />
            <OrganicBlob color="coral" size="lg" className="bottom-1/4 right-0 translate-x-1/4" delay={2} />

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Header */}
                <AnimatedSection className="max-w-3xl mb-16">
                    <div className="flex items-center gap-3 mb-4">
                        <Microscope size={24} className="text-teal-600" />
                        <span className="text-teal-600 font-semibold tracking-widest uppercase text-xs">Research</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-charcoal-900 mb-6">
                        Research & Projects
                    </h1>
                    <p className="text-lg md:text-xl text-charcoal-600 leading-relaxed">
                        My research sits at the intersection of technology, spatial experience, and social impact.
                        I build systems that help people recover from disasters, navigate complex processes,
                        and experience new forms of storytelling.
                    </p>
                </AnimatedSection>

                {/* Active Research Projects */}
                <section className="mb-24">
                    <AnimatedSection>
                        <div className="flex items-center gap-3 mb-10">
                            <Target size={24} className="text-teal-600" />
                            <h2 className="text-2xl md:text-3xl font-bold text-charcoal-900">
                                Active Research Projects
                            </h2>
                        </div>
                    </AnimatedSection>

                    <StaggerContainer className="grid md:grid-cols-2 gap-6" staggerDelay={0.15}>
                        {activeResearch.map((project) => (
                            <StaggerItem key={project.id}>
                                <ResearchStoryCard project={project} />
                            </StaggerItem>
                        ))}
                    </StaggerContainer>
                </section>

                {/* Past Projects & Applied Research */}
                <section className="mb-24">
                    <AnimatedSection>
                        <div className="flex items-center gap-3 mb-10">
                            <Target size={24} className="text-coral-600" />
                            <h2 className="text-2xl md:text-3xl font-bold text-charcoal-900">
                                Past Projects & Applied Research
                            </h2>
                        </div>
                    </AnimatedSection>

                    <StaggerContainer className="grid md:grid-cols-2 gap-6" staggerDelay={0.15}>
                        {pastProjects.map((project) => (
                            <StaggerItem key={project.id}>
                                <ResearchStoryCard project={project} />
                            </StaggerItem>
                        ))}
                    </StaggerContainer>
                </section>

                {/* Open Source Tools Preview */}
                <section className="mb-16">
                    <AnimatedSection>
                        <div className="flex items-center justify-between mb-10">
                            <div className="flex items-center gap-3">
                                <Code2 size={24} className="text-teal-600" />
                                <h2 className="text-2xl md:text-3xl font-bold text-charcoal-900">
                                    Open Source Tools
                                </h2>
                            </div>
                            <Link
                                to="/open-source"
                                className="hidden md:inline-flex items-center gap-2 text-teal-600 font-medium hover:text-teal-700 transition-colors"
                            >
                                View All Tools <ChevronRight size={18} />
                            </Link>
                        </div>
                    </AnimatedSection>

                    <StaggerContainer className="grid md:grid-cols-3 gap-6" staggerDelay={0.1}>
                        {openSourceTools.map((tool, idx) => (
                            <StaggerItem key={idx}>
                                <OpenSourcePreviewCard tool={tool} />
                            </StaggerItem>
                        ))}
                    </StaggerContainer>

                    <div className="mt-6 text-center md:hidden">
                        <Link
                            to="/open-source"
                            className="inline-flex items-center gap-2 text-teal-600 font-medium hover:text-teal-700 transition-colors"
                        >
                            View All Tools <ChevronRight size={18} />
                        </Link>
                    </div>
                </section>
            </div>
        </div>
    );
}

function ResearchStoryCard({ project }: { project: ResearchProject }) {
    const colors = colorMap[project.color];

    return (
        <motion.div
            className="group relative h-full"
            whileHover={{ y: -8 }}
            transition={{ duration: 0.3 }}
        >
            <Link to={`/research/${project.id}`} className="block h-full">
                <div className={`h-full rounded-3xl bg-white border-2 ${colors.border} overflow-hidden transition-all duration-300 group-hover:shadow-2xl`}>
                    {/* Image */}
                    <div className="relative aspect-[16/8] overflow-hidden bg-white">
                        <img
                            src={imageSrc(project.image, true)}
                            alt=""
                            loading="lazy"
                            className={`absolute inset-0 w-full h-full transition-transform duration-700 group-hover:scale-105 ${project.imageFit === 'contain' ? 'object-contain p-4' : 'object-cover'}`}
                        />
                        <div className={`absolute inset-x-0 bottom-0 h-1.5 ${colors.accent}`} />
                    </div>

                    <div className="p-6 md:p-8">
                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mb-4">
                            {project.tags.map((tag, idx) => (
                                <span
                                    key={idx}
                                    className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full ${colors.bg} ${colors.text}`}
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>

                        {project.award && (
                            <span className="inline-flex items-center gap-1.5 mb-3 px-2.5 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-[11px] font-bold">
                                <Trophy size={12} /> {project.award}
                            </span>
                        )}

                        {/* Title */}
                        <h3 className="text-xl md:text-2xl font-bold text-charcoal-900 mb-2 font-display group-hover:text-teal-600 transition-colors">
                            {project.title}
                        </h3>
                        <p className={`text-sm font-medium ${colors.text} mb-4`}>
                            {project.subtitle}
                        </p>

                        {/* Description */}
                        <p className="text-charcoal-600 text-sm leading-relaxed mb-6 line-clamp-3">
                            {project.description}
                        </p>

                        {/* Stats */}
                        <div className="flex gap-4 mb-6">
                            {project.stats.map((stat, idx) => (
                                <div key={idx} className="text-center">
                                    <div className="text-xl font-bold text-charcoal-900">{stat.value}</div>
                                    <div className="text-[10px] text-charcoal-500 uppercase tracking-wider">{stat.label}</div>
                                </div>
                            ))}
                        </div>

                        {/* Footer */}
                        <div className="flex items-center justify-between pt-4 border-t border-sand-100">
                            <div className="flex items-center gap-1 text-xs text-charcoal-500">
                                <Globe size={12} />
                                {project.location}
                            </div>
                            <span className={`inline-flex items-center gap-1 text-sm font-semibold ${colors.text} group-hover:gap-2 transition-all`}>
                                Read Story <ChevronRight size={16} />
                            </span>
                        </div>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}

function OpenSourcePreviewCard({ tool }: { tool: OpenSourceTool }) {
    return (
        <motion.div
            className="h-full p-6 rounded-2xl bg-white border border-sand-200 hover:border-teal-200 transition-all duration-300 group"
            whileHover={{ y: -4, boxShadow: '0 12px 30px -15px rgba(0,0,0,0.1)' }}
        >
            <div className="flex items-start justify-between mb-4">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full bg-sand-100 text-charcoal-600">
                    {tool.category}
                </span>
                {tool.stars && (
                    <span className="text-sm text-amber-500 font-medium">{tool.stars}</span>
                )}
            </div>

            <h3 className="text-lg font-bold text-charcoal-900 mb-2 group-hover:text-teal-600 transition-colors">
                {tool.name}
            </h3>

            <p className="text-charcoal-600 text-sm leading-relaxed mb-4">
                {tool.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-4">
                {tool.tech.slice(0, 3).map((t, idx) => (
                    <span
                        key={idx}
                        className="text-xs font-medium px-2 py-1 rounded-full bg-teal-50 text-teal-700"
                    >
                        {t}
                    </span>
                ))}
            </div>

            {tool.link && (
                <a
                    href={tool.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-teal-600 font-medium hover:text-teal-700 transition-colors"
                    onClick={(e) => e.stopPropagation()}
                >
                    <ExternalLink size={14} />
                    View on GitHub
                </a>
            )}
        </motion.div>
    );
}
