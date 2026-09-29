import { lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronDown, Globe, Shield, Activity, Sparkles, Quote, ExternalLink, PlayCircle, Camera } from 'lucide-react';
import { motion } from 'framer-motion';
import Hero3D from '../components/ui/Hero3D';
import { MagneticButton } from '../components/ui/MagneticButton';
import { WordReveal } from '../components/ui/AnimatedText';
import NowStatus from '../components/ui/NowStatus';
import CountUp from '../components/ui/CountUp';
import { AnimatedSection, StaggerContainer, StaggerItem } from '../components/ui/AnimatedSection';
import LiteYouTube from '@/components/media/LiteYouTube';
import RelatedLinks from '@/components/media/RelatedLinks';
import PhotoGallery from '@/components/media/PhotoGallery';
import VideoShelf from '@/components/media/VideoShelf';
import { linkById, linksByIds, posterSrc } from '@/data/links';
import { photos } from '@/data/media';
import { courses } from '@/data/teaching';

// d3 + country shapes only load when the map scrolls into the page.
const WorldImpactMap = lazy(() => import('../components/viz/WorldImpactMap'));

const focusAreas = [
    {
        icon: Globe,
        title: 'Resilient Systems',
        desc: 'Technology platforms that strengthen communities before, during and after crises.',
        card: 'from-teal-50 to-white border-teal-100 hover:border-teal-300',
        icon_: 'bg-teal-600 text-white',
        link: { label: 'BCtap & housing platforms', to: '/projects' },
    },
    {
        icon: Shield,
        title: 'Safety & Trust',
        desc: 'AI-assisted tools that help people make confident decisions about their homes and environments.',
        card: 'from-coral-50 to-white border-coral-100 hover:border-coral-300',
        icon_: 'bg-coral-500 text-white',
        link: { label: 'PD3R & ISAC-SIMO', to: '/research/pd3r' },
    },
    {
        icon: Activity,
        title: 'Immersive Experience',
        desc: 'Spatial narratives and XR prototypes that bring stories to life in real space.',
        card: 'from-amber-50 to-white border-amber-100 hover:border-amber-300',
        icon_: 'bg-amber-500 text-white',
        link: { label: 'Locative AR research', to: '/research/ar-narratives' },
    },
];

// Organisations that published, hosted or ran the work; each links to where it's covered on this site.
const partners = [
    { name: 'IBM', detail: 'Call for Code 2018', to: '/research/pd3r' },
    { name: 'The Linux Foundation', detail: 'Hosts ISAC-SIMO', to: '/research/isac-simo' },
    { name: 'Springer Nature', detail: 'LNCS · ICIDS 2025', to: '/publications' },
    { name: 'ACM', detail: 'SUI & VRST 2025', to: '/recognition' },
    { name: 'World Bank', detail: 'Dominica HRP', to: '/projects' },
    { name: 'Build Change', detail: '2017–2023', to: '/projects' },
    { name: 'Dalhousie University', detail: 'GEM Lab', to: '/academic' },
    { name: 'AUAF', detail: 'Adjunct Lecturer', to: '/academic' },
];

const impact = [
    { value: 23088, suffix: '', label: 'Households in the Nuwakot programme I built the monitoring system for', source: 'buildchange-stfc' },
    { value: 2500, suffix: '+', prefix: '2nd of ', label: 'Solutions in IBM\'s first Call for Code, where PD3R placed second', source: 'prnewswire-cfc2018' },
    { value: 7, suffix: '', label: 'Countries where I\'ve delivered projects or research', to: '/projects' },
    { value: courses.length, suffix: '', label: 'University courses taught or assisted in Canada, Nepal and online', to: '/academic' },
];

const teachingNow = courses
    .filter((c) => c.institution === 'auaf' && c.status === 'current')
    .map((c) => c.title)
    .join(' & ');

export default function Home() {
    return (
        <div className="relative overflow-hidden">
            {/* Hero */}
            <section className="relative min-h-screen flex items-center">
                <Hero3D />

                <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
                    <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-center">
                        <div className="lg:col-span-3 space-y-8">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-teal-100 shadow-sm"
                            >
                                <Sparkles size={16} className="text-teal-500" />
                                <span className="text-sm font-medium text-charcoal-600">Researcher • Educator • Tech Architect</span>
                            </motion.div>

                            <motion.h1
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.3 }}
                                className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-display font-bold text-charcoal-900 leading-[0.95] tracking-tight"
                            >
                                <WordReveal delay={0.4}>Storyteller of</WordReveal>
                                <br />
                                <span className="text-gradient"><WordReveal delay={0.6}>Resilient Tech</WordReveal></span>
                            </motion.h1>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.8 }}
                                className="text-lg md:text-xl text-charcoal-600 leading-relaxed max-w-2xl"
                            >
                                Bridging human experience and digital innovation. I design platforms and immersive systems
                                that help people rebuild, navigate risk and make decisions with clarity and dignity, and I
                                teach the next generation to do the same.
                            </motion.p>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.9 }}
                                className="flex flex-col sm:flex-row gap-4"
                            >
                                <MagneticButton variant="primary">
                                    <Link to="/projects" className="flex items-center gap-2">Explore My Work <ArrowRight size={18} /></Link>
                                </MagneticButton>
                                <MagneticButton variant="secondary">
                                    <Link to="/cv">View CV</Link>
                                </MagneticButton>
                            </motion.div>

                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 1 }} className="flex flex-wrap gap-2 pt-4">
                                {['AR/VR & Spatial Storytelling', 'AI for Social Good', 'Resilient Housing', 'Teaching CS Online'].map((tag) => (
                                    <span key={tag} className="px-3 py-1.5 rounded-full bg-white/70 border border-sand-200 text-sm text-charcoal-600">{tag}</span>
                                ))}
                            </motion.div>
                        </div>

                        <div className="lg:col-span-2">
                            <NowStatus
                                location="Halifax, NS"
                                focus="Immersive Computing & Resilience"
                                role="PhD Researcher · Adjunct Lecturer"
                                teaching={`${teachingNow} · AUAF (online)`}
                                currentProject="Locative AR Narratives"
                                availability="available"
                                updated="Sep 2026"
                            />
                        </div>
                    </div>
                </div>

                <motion.div
                    className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2, duration: 0.6 }}
                >
                    <span className="text-xs font-medium text-charcoal-400 uppercase tracking-widest">Scroll</span>
                    <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}>
                        <ChevronDown size={20} className="text-charcoal-400" />
                    </motion.div>
                </motion.div>
            </section>

            {/* Impact */}
            <section className="py-20 md:py-28 relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <AnimatedSection className="text-center mb-14">
                        <span className="text-teal-600 font-semibold tracking-widest uppercase text-xs">Impact</span>
                        <h2 className="text-3xl md:text-4xl font-display font-bold text-charcoal-900 mt-3">Making a Difference</h2>
                        <p className="text-charcoal-600 mt-4 max-w-2xl mx-auto">Numbers that represent real lives touched and communities strengthened.</p>
                    </AnimatedSection>

                    <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6" staggerDelay={0.1}>
                        {impact.map((s) => {
                            const src = s.source ? linkById[s.source] : undefined;
                            return (
                                <StaggerItem key={s.label}>
                                    <div className="h-full rounded-3xl bg-white/80 backdrop-blur border border-sand-200 p-5 md:p-7 flex flex-col">
                                        <p className="font-display font-bold leading-none mb-3">
                                            {s.prefix && <span className="block text-lg md:text-xl text-charcoal-500 mb-1">{s.prefix}</span>}
                                            <CountUp value={s.value} suffix={s.suffix} className="text-4xl md:text-5xl lg:text-6xl text-gradient" />
                                        </p>
                                        <p className="text-sm text-charcoal-600 leading-snug flex-1">{s.label}</p>
                                        {src ? (
                                            <a href={src.url} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-teal-700 hover:text-teal-900">
                                                {src.publisher} <ExternalLink size={11} />
                                            </a>
                                        ) : s.to ? (
                                            <Link to={s.to} className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-teal-700 hover:text-teal-900">
                                                See more <ArrowRight size={11} />
                                            </Link>
                                        ) : null}
                                    </div>
                                </StaggerItem>
                            );
                        })}
                    </StaggerContainer>

                    <AnimatedSection className="mt-16">
                        <p className="text-center mb-6 text-xs font-bold uppercase tracking-widest text-charcoal-500">Work published, hosted or run with</p>
                        <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
                            <div className="flex w-max gap-4 animate-marquee motion-reduce:animate-none hover:[animation-play-state:paused]">
                                {[...partners, ...partners].map((org, i) => (
                                    <Link
                                        key={`${org.name}-${i}`}
                                        to={org.to}
                                        aria-hidden={i >= partners.length}
                                        tabIndex={i >= partners.length ? -1 : undefined}
                                        className="group shrink-0 px-6 py-4 rounded-2xl bg-white/80 border border-sand-200 hover:border-teal-300 hover:shadow-lg transition-all"
                                    >
                                        <span className="block font-display font-bold text-lg text-charcoal-800 group-hover:text-teal-700 whitespace-nowrap">{org.name}</span>
                                        <span className="block text-xs text-charcoal-500 whitespace-nowrap">{org.detail}</span>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </AnimatedSection>
                </div>
            </section>

            {/* Journey + map */}
            <section className="py-20 md:py-28 bg-gradient-to-b from-sand-50/50 to-white relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-12 lg:gap-16 items-start">
                        <AnimatedSection className="min-w-0 lg:sticky lg:top-28">
                            <span className="text-coral-500 font-handwritten text-2xl">My Story</span>
                            <h2 className="text-4xl md:text-5xl font-display font-bold text-charcoal-900 mt-2 mb-6">A Journey Guided by Purpose</h2>
                            <div className="text-lg text-charcoal-600 leading-relaxed space-y-5">
                                <p>
                                    My work grows from the places and people I have met along the way. After the 2015 Gorkha
                                    earthquake I spent years in Nepal building the systems that tracked reconstruction for
                                    tens of thousands of families, then took that work to Dominica, Colombia, the Philippines
                                    and Indonesia.
                                </p>
                                <p>
                                    Those experiences shaped the way I think about technology. It's not just about code: it's
                                    about designing systems that help people make decisions with confidence and rebuild their
                                    lives with dignity. Today I carry that into PhD research in Halifax and into classrooms,
                                    in person and online.
                                </p>
                            </div>
                            <blockquote className="mt-8 pl-6 border-l-4 border-teal-500 relative">
                                <Quote size={32} className="absolute -top-2 -left-2 text-teal-100 -z-10" />
                                <p className="text-xl md:text-2xl font-display italic text-charcoal-800">
                                    "At the heart of all of it is a simple belief: technology should make life better."
                                </p>
                            </blockquote>
                        </AnimatedSection>

                        {/* min-w-0 stops the map's scrollable chip row from widening the grid column on phones */}
                        <AnimatedSection delay={0.15} className="min-w-0">
                            <Suspense fallback={<div className="aspect-[16/10] rounded-3xl bg-sand-100 animate-pulse" />}>
                                <WorldImpactMap />
                            </Suspense>
                        </AnimatedSection>
                    </div>
                </div>
            </section>

            {/* From the field */}
            <section className="py-20 md:py-28 relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <AnimatedSection className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
                        <div>
                            <span className="inline-flex items-center gap-2 text-teal-600 font-semibold tracking-widest uppercase text-xs"><Camera size={14} /> From the field</span>
                            <h2 className="text-3xl md:text-4xl font-display font-bold text-charcoal-900 mt-3">The places behind the platforms</h2>
                            <p className="text-charcoal-600 mt-3 max-w-2xl">
                                Nuwakot after the 2015 earthquake, Roseau the day after Hurricane Maria, hillside homes in
                                Bogotá: the contexts my systems were built for. Tap a photo to enlarge it.
                            </p>
                        </div>
                        <Link to="/projects" className="inline-flex items-center gap-1.5 text-sm font-semibold text-teal-700 hover:text-teal-900 shrink-0">
                            See the projects <ArrowRight size={16} />
                        </Link>
                    </AnimatedSection>
                    <PhotoGallery
                        layout="strip"
                        columns={4}
                        photos={[photos.nuwakotAfterQuake, photos.nuwakotRebuild, photos.roseauAerial, photos.bogota]}
                    />
                </div>
            </section>

            {/* Core philosophy */}
            <section className="py-20 md:py-28 relative bg-gradient-to-b from-white to-sand-50/60">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <AnimatedSection className="text-center mb-14">
                        <span className="text-teal-600 font-semibold tracking-widest uppercase text-xs">Core Philosophy</span>
                        <h2 className="text-3xl md:text-5xl font-display font-bold text-charcoal-900 mt-3">What Drives My Work</h2>
                        <p className="text-charcoal-600 mt-4 max-w-2xl mx-auto">Three pillars that guide every project and research endeavour.</p>
                    </AnimatedSection>

                    <StaggerContainer className="grid md:grid-cols-3 gap-6 md:gap-8" staggerDelay={0.15}>
                        {focusAreas.map((item) => (
                            <StaggerItem key={item.title}>
                                <motion.div className={`h-full flex flex-col p-8 rounded-3xl bg-gradient-to-br border transition-[border-color,box-shadow] hover:shadow-xl ${item.card}`} whileHover={{ y: -8 }}>
                                    <div className={`h-14 w-14 rounded-2xl flex items-center justify-center mb-6 shadow-lg ${item.icon_}`}>
                                        <item.icon className="h-7 w-7" />
                                    </div>
                                    <h3 className="text-2xl font-display font-bold text-charcoal-900 mb-3">{item.title}</h3>
                                    <p className="text-charcoal-600 leading-relaxed mb-6 flex-1">{item.desc}</p>
                                    <Link to={item.link.to} className="inline-flex items-center gap-1.5 text-sm font-semibold text-charcoal-800 hover:text-teal-700 group">
                                        {item.link.label} <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                                    </Link>
                                </motion.div>
                            </StaggerItem>
                        ))}
                    </StaggerContainer>
                </div>
            </section>

            {/* Featured: PD3R */}
            <section className="py-20 md:py-28 bg-charcoal-900 text-white relative overflow-hidden">
                <div className="absolute inset-0">
                    <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-teal-900/40 via-transparent to-transparent" />
                    <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-coral-900/30 via-transparent to-transparent" />
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                        <AnimatedSection>
                            <div className="flex items-center gap-3 mb-6">
                                <div className="h-px w-12 bg-teal-400" />
                                <span className="text-teal-400 font-semibold tracking-widest uppercase text-xs">Featured Story</span>
                            </div>
                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-8 leading-tight">
                                Resilient Housing
                                <br />
                                <span className="text-gradient-light italic">& Innovation</span>
                            </h2>
                            <div className="space-y-6 text-charcoal-200 text-lg leading-relaxed">
                                <p>
                                    Much of my work is shaped by the idea that homes are more than buildings. They hold
                                    stories, memories and the lives of people who trust them.
                                </p>
                                <p>
                                    I managed <strong className="text-white">PD3R</strong>, an AI tool that tells families
                                    whether an earthquake-damaged house can be retrofitted instead of rebuilt. It placed{' '}
                                    <strong className="text-white">2nd worldwide</strong> in IBM's first Call for Code, out of
                                    2,500+ solutions from 156 countries, and grew into the Linux Foundation–hosted ISAC-SIMO.
                                </p>
                            </div>

                            <RelatedLinks ids={['prnewswire-cfc2018', 'ibm-newsroom-top5', 'github-pd3r', 'lf-isac-simo']} tone="dark" className="mt-6" />

                            <div className="flex flex-wrap gap-6 mt-8">
                                <Link to="/research/pd3r" className="inline-flex items-center gap-2 text-white border-b-2 border-teal-400 pb-1 hover:text-teal-300 transition-colors group">
                                    Read the PD3R story <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                                </Link>
                                <Link to="/projects" className="inline-flex items-center gap-2 text-white/80 border-b-2 border-white/20 pb-1 hover:text-white transition-colors group">
                                    All projects <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                                </Link>
                            </div>
                        </AnimatedSection>

                        <AnimatedSection delay={0.2}>
                            <div className="relative">
                                <div className="absolute -inset-4 bg-gradient-to-r from-teal-500 to-coral-500 rounded-3xl blur-2xl opacity-30 animate-pulse-slow" />
                                <div className="relative bg-charcoal-800 rounded-3xl p-1 border border-white/10 overflow-hidden">
                                    <LiteYouTube
                                        videoId="mVkjJx_Ko3k"
                                        title="Call for Code: Artificial Intelligence for Retrofitting"
                                        poster={posterSrc('mVkjJx_Ko3k', false)}
                                        duration="3:00"
                                        className="rounded-[1.25rem] shadow-none"
                                    />
                                </div>
                                <p className="relative mt-4 text-xs text-white/50 text-center">Build Change's Call for Code submission video, October 2018</p>
                            </div>
                        </AnimatedSection>
                    </div>
                </div>
            </section>

            {/* Watch the work */}
            <section className="py-20 md:py-28 relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <AnimatedSection className="mb-10">
                        <span className="inline-flex items-center gap-2 text-coral-500 font-semibold tracking-widest uppercase text-xs"><PlayCircle size={14} /> Watch</span>
                        <h2 className="text-3xl md:text-4xl font-display font-bold text-charcoal-900 mt-3">See the tools in action</h2>
                        <p className="text-charcoal-600 mt-3 max-w-2xl">Build Change's own videos of two platforms I led: construction checks from a phone photo, and field assessment in BCtap.</p>
                    </AnimatedSection>
                    <VideoShelf videos={linksByIds(['video-isac-simo', 'video-bctap'])} />
                </div>
            </section>
        </div>
    );
}
