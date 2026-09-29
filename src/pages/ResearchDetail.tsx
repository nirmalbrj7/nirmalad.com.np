import React, { useRef, useEffect } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import {
    ArrowLeft, MapPin, Users, Calendar, Lightbulb, Target,
    TrendingUp, Wrench, BookOpen, ExternalLink, Sparkles,
    ChevronRight, Quote, Zap, Activity, ShieldCheck, CheckCircle2,
    Layers, GitBranch, ArrowRight
} from 'lucide-react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { AnimatedSection } from '../components/ui/AnimatedSection';
import OrganicBlob from '../components/ui/OrganicBlob';
import CountUp from '../components/ui/CountUp';
import { videosFor, type LinkTopic } from '@/data/links';
import { photos, type Photo } from '@/data/media';
import PhotoGallery from '@/components/media/PhotoGallery';
import VideoShelf from '@/components/media/VideoShelf';
import RelatedLinks from '@/components/media/RelatedLinks';

interface ResearchProject {
    id: string;
    title: string;
    subtitle: string;
    organization: string;
    location: string;
    date: string;
    story: {
        hook: string;
        challenge: string;
        approach: string;
        results: string;
        impact: string;
    };
    problemSolution?: { problem: string; solution: string };
    methodology?: { step: string; title: string; description: string; icon?: string }[];
    takeaways?: { title: string; description: string }[];
    contributions?: { area: string; value: number }[];
    team: { name: string; role: string }[];
    /** Institutions the authors come from, shown under the team */
    affiliations?: string[];
    technologies: string[];
    publications: { title: string; venue: string; link?: string }[];
    awards?: { title: string; description: string }[];
    relatedLinks: { title: string; url: string }[];
    stats: { label: string; value: string; change?: string }[];
    timeline: { phase: string; description: string; date: string; milestone?: boolean }[];
    quotes?: { text: string; author: string; role: string }[];
    /** Topic in data/links: videos and press & links for this story */
    topic?: LinkTopic;
    /** Real photos and project imagery */
    gallery?: Photo[];
}

const projects: Record<string, ResearchProject> = {
    'pd3r': {
        id: 'pd3r',
        title: 'PD3R',
        subtitle: 'Can this house be saved? Ask the AI.',
        organization: 'Build Change · IBM Call for Code',
        location: 'Kathmandu, Nepal & Colombia',
        date: '2018',
        story: {
            hook: 'Three years after the 2015 Gorkha earthquake, more than 100,000 people in Nepal were still waiting to return home. Many of their houses could have been strengthened rather than demolished, but only an engineer’s site visit could say so, and engineers were scarce.',
            challenge: 'Retrofit eligibility decisions depended on specialist assessments that were slow, costly and hard to scale across remote districts. Families could not know whether to wait, repair or rebuild, and every month of uncertainty meant more time in temporary shelter.',
            approach: 'Our Build Change team in Kathmandu and Colombia built PD3R (Post-Disaster Rapid Response Retrofit) for IBM’s first Call for Code. Because real labelled photos were rare, we generated synthetic training images of typical house types from 3D building models in Autodesk Revit and Dynamo, combined them with real photographs, and trained a custom visual-recognition model in IBM Watson Studio on more than 2,000 images. A mobile app sent photos to a Laravel API that returned a retrofit-eligibility assessment. I managed the project from model design to the working prototype.',
            results: 'Out of 2,500+ solutions from 100,000+ developers in 156 countries, PD3R was named one of five global finalists and then placed second, winning USD $25,000 and long-term open-source support from The Linux Foundation. Judges included President Bill Clinton.',
            impact: 'PD3R showed that AI could compress weeks of engineering triage into minutes. Its code was open-sourced under Call for Code with me listed first on the authors file, and the approach grew into ISAC-SIMO, an IBM-funded, Linux Foundation–hosted tool that lets anyone check construction quality with a phone.'
        },
        problemSolution: {
            problem: "After an earthquake, deciding whether a damaged house can be retrofitted needs an engineer on site. Engineers are scarce, so families wait months in temporary shelter.",
            solution: "A phone photo goes to a visual-recognition model trained on synthetic 3D-model images plus real photos, which returns a first-pass retrofit-eligibility assessment in minutes."
        },
        methodology: [
            { step: '01', title: 'Synthetic data', description: 'Generated labelled images of typical house types from BIM models with Revit and Dynamo.' },
            { step: '02', title: 'Model training', description: 'Trained a custom visual-recognition classifier on 2,000+ synthetic and real images in Watson Studio.' },
            { step: '03', title: 'API & app', description: 'Laravel API serving the model to an Android / React Native app for field capture.' },
            { step: '04', title: 'Open source', description: 'Published under Call for Code with The Linux Foundation, Apache-2.0 licensed.' }
        ],
        takeaways: [
            { title: 'Synthetic data unlocks scarce domains', description: 'Rendering building models filled the gap where labelled disaster photos did not exist.' },
            { title: 'Triage, not replacement', description: 'The model speeds up the first decision; engineers still confirm the retrofit design.' }
        ],
        contributions: [
            { area: 'Project Management', value: 95 },
            { area: 'ML Pipeline Design', value: 80 },
            { area: 'Backend & API', value: 75 },
            { area: 'Mobile Prototype', value: 70 }
        ],
        team: [
            { name: 'Nirmal Adhikari', role: 'Project Manager · first-listed author' },
            { name: 'Lakshyana KC', role: 'Author' },
            { name: 'Shreyasha Paudel', role: 'Author' },
            { name: 'Kshitiz Rimal', role: 'Author' },
            { name: 'Nicolas Ortiz', role: 'Author (Colombia)' },
        ],
        technologies: ['IBM Watson Studio', 'Visual Recognition', 'Python', 'Autodesk Revit & Dynamo', 'Laravel', 'Android / React Native'],
        publications: [],
        awards: [
            { title: 'Call for Code 2018 — 2nd Place', description: 'IBM Call for Code Global Challenge, USD $25,000, announced in San Francisco on 29 October 2018' }
        ],
        relatedLinks: [
            { title: 'PD3R on GitHub', url: 'https://github.com/Call-for-Code/PD3R' },
            { title: 'IBM results announcement', url: 'https://www.prnewswire.com/news-releases/winning-developer-solutions-announced-in-inaugural-call-for-code-global-challenge-to-mitigate-effects-of-natural-disasters-300739705.html' },
            { title: 'Build Change', url: 'https://buildchange.org' }
        ],
        stats: [
            { label: 'Global placing', value: '2nd', change: 'Call for Code 2018' },
            { label: 'Competing solutions', value: '2,500+', change: 'from 156 countries' },
            { label: 'Training images', value: '2,000+', change: 'synthetic + real' },
            { label: 'Prize', value: '$25K', change: '+ Linux Foundation support' },
        ],
        timeline: [
            { phase: 'Build', description: 'Synthetic images, model training and app prototype', date: 'Mid 2018' },
            { phase: 'Finalist', description: 'Named one of five global finalists by IBM', date: 'Oct 2018', milestone: true },
            { phase: '2nd Place', description: 'Winners announced in San Francisco', date: 'Oct 2018', milestone: true },
            { phase: 'Open source', description: 'Code published; ISAC-SIMO grows from PD3R', date: '2019' }
        ],
        topic: 'pd3r',
        gallery: [photos.pd3rFieldFront, photos.pd3rFieldSide, photos.pd3rRender1, photos.pd3rRender2, photos.pd3rRender3, photos.nuwakotAfterQuake]
    },
    'bctap': {
        id: 'bctap',
        title: 'BCtap Platform',
        subtitle: 'Scaling resilient housing tech',
        organization: 'Build Change',
        location: 'Global',
        date: '2021 - 2024',
        story: {
            hook: 'The Build Change Technical Assistance Platform (BCtap) is an end-to-end solution designed to scale resilient housing programs by integrating technology with expert knowledge.',
            challenge: 'Empowering communities worldwide to build or retrofit homes to better withstand natural disasters such as earthquakes and extreme weather events.',
            approach: 'BCtap digitalizes all aspects of the six-step construction value chain, offering a comprehensive methodology that guides users from collecting homeowner and site data to design, financing, construction, quality supervision, and reporting. It is built as both a web-based and an offline-first mobile tool.',
            results: 'Utilized by project teams, governments, builders, homeowners, and financial institutions, providing transparency for funders, efficiency for project teams, and quality and safety for homeowners.',
            impact: 'Developed, tested and iterated in more than 26 countries, BCtap has been used to prevent disaster and rebuild safely after more than 40 earthquakes, windstorms, floods and fires, giving funders transparency, project teams efficiency, and homeowners quality and safety.'
        },
        problemSolution: {
            problem: "Lack of scalability in resilient housing programs, traditional paper processes, and disconnected systems for homeowners, builders, and governments.",
            solution: "An end-to-end digital platform (BCtap) integrated with AI, enabling offline-first mobile access to manage the entire construction value chain."
        },
        methodology: [
            { step: '01', title: 'Assessment', description: 'Collecting homeowner data and site assessment.' },
            { step: '02', title: 'Design & Finance', description: 'Automated design generation and micro-financing.' },
            { step: '03', title: 'Construction', description: 'Guiding builders with step-by-step mobile instructions.' },
            { step: '04', title: 'Supervision & Reporting', description: 'Quality checks and stakeholder reporting.' }
        ],
        takeaways: [
            { title: 'Global Customization', description: 'The platform must easily adapt to geographic locations, cultural contexts, and local building materials.' },
            { title: 'Integrated Ecosystem', description: 'Connecting financing directly to construction quality empowers homeowners.' }
        ],
        contributions: [
            { area: 'Platform Architecture', value: 85 },
            { area: 'Frontend Engineering', value: 95 },
            { area: 'Offline Data Sync', value: 90 },
            { area: 'UX/UI Design', value: 75 }
        ],
        team: [
            { name: 'Build Change Technology Team', role: 'Platform Development' },
            { name: 'Nirmal Adhikari', role: 'Tech Lead & Program Manager' },
            { name: 'Technology partners', role: 'Autodesk, Cisco, IBM, Microsoft' },
            { name: 'Local Gov & Microfinance', role: 'Stakeholders' },
        ],
        technologies: ['React', 'React Native', 'Node.js', 'PostgreSQL', 'Offline First Sync'],
        publications: [],
        relatedLinks: [
            { title: 'BCtap Website', url: 'https://bctap.buildchange.org' },
            { title: 'Build Change Technology & AI', url: 'https://buildchange.org/technology-programs' }
        ],
        topic: 'bctap',
        stats: [
            { label: 'Countries', value: '26+', change: 'developed & iterated in' },
            { label: 'Disasters', value: '40+', change: 'earthquakes, storms, floods, fires' },
            { label: 'Value chain', value: '6 steps', change: 'assessment to reporting' },
            { label: 'Platform', value: 'Web & Mobile', change: 'offline-capable' },
        ],
        timeline: [
            { phase: 'Initiation', description: 'Platform conception and architecture', date: '2021', milestone: true },
            { phase: 'Development', description: 'Core features and offline capability', date: '2022' },
            { phase: 'Global Rollout', description: 'Deployment in multiple countries', date: '2023', milestone: true },
            { phase: 'AI Integration', description: 'Adding ML models for QA', date: '2024' }
        ]
    },
    'isac-simo': {
        id: 'isac-simo',
        title: 'ISAC-SIMO',
        subtitle: 'Intelligent Supervision Assistant for Construction',
        organization: 'Build Change · IBM · Linux Foundation',
        location: 'Global (Open Source)',
        date: '2020 - 2021',
        story: {
            hook: 'To the average person, a construction site can be a complex and confusing place. Even more so when trying to determine the quality of that construction. What’s the difference between a well-built and a poorly-built wall anyway?',
            challenge: 'Gaps in technical knowledge in the field led to unverified construction quality. Manual structural assessment is slow, expensive, and requires scarce engineering expertise.',
            approach: 'ISAC-SIMO packs important construction quality assurance checks into a convenient mobile app. The tool harnesses the power of machine learning and image processing to provide feedback on specific construction elements such as masonry walls and reinforced concrete columns.',
            results: 'Started by Build Change with the support of IBM, ISAC-SIMO ensures that workmanship issues can be easily identified by anyone with a phone, instead of solely relying on technical staff.',
            impact: 'By open-sourcing the models and platform, ISAC-SIMO democratizes construction quality assurance and helps prevent disaster-induced damage to homes globally.'
        },
        problemSolution: {
            problem: "Construction sites are complex, and identifying a well-built vs poorly-built wall requires specific engineering expertise not broadly available in developing areas.",
            solution: "An Intelligent Supervision Assistant mobile app powered by IBM Watson to instantly validate construction elements using smartphone photos."
        },
        methodology: [
            { step: '01', title: 'Data Gathering', description: 'Collecting thousands of images of masonry and RC columns.' },
            { step: '02', title: 'Model Training', description: 'Training IBM Watson ML models on labeled datasets.' },
            { step: '03', title: 'Mobile Integration', description: 'Embedding ML inference pipeline into a daily-use app.' },
            { step: '04', title: 'Open Source Release', description: 'Making code available via LF Projects and GitHub.' }
        ],
        takeaways: [
            { title: 'AI for the Physical World', description: 'Computer vision can effectively bridge the physical skills gap in construction.' },
            { title: 'Open Source Community', description: 'Building in the open (via Linux Foundation) accelerates global adoption.' }
        ],
        contributions: [
            { area: 'App Development', value: 80 },
            { area: 'ML Pipeline Integration', value: 85 },
            { area: 'IBM Watson Connect', value: 90 }
        ],
        team: [
            { name: 'Nirmal Adhikari', role: 'Project Manager & Tech Lead: ML pipeline and homeowner app' },
            { name: 'Build Change', role: 'Project creator' },
            { name: 'IBM', role: 'Call for Code grant' },
            { name: 'Autodesk Foundation', role: 'Funding & pro-bono expertise' },
            { name: 'The Linux Foundation', role: 'Open-source host' }
        ],
        technologies: ['React Native', 'Python', 'IBM Watson ML', 'Django'],
        publications: [
            { title: 'Developer Guide', venue: 'Docs', link: 'https://docs.isac-simo.net/developer-guide/' }
        ],
        relatedLinks: [
            { title: 'ISAC-SIMO Site', url: 'https://isac-simo.net/' },
            { title: 'GitHub Organisation', url: 'https://github.com/ISAC-SIMO' },
            { title: 'Linux Foundation announcement', url: 'https://www.linuxfoundation.org/press/press-release/new-open-source-project-uses-machine-learning-to-inform-quality-assurance-for-construction-in-emerging-nations' }
        ],
        topic: 'isac-simo',
        gallery: [photos.isacOverview, photos.isacRebarShape, photos.isacRebarTexture, photos.isacRebarCage, photos.isacBond, photos.isacBondGoNoGo],
        stats: [
            { label: 'Checks', value: 'Rebar & walls', change: 'shape, texture, spacing, bond, mortar' },
            { label: 'Grant', value: 'IBM', change: 'Call for Code' },
            { label: 'Host', value: 'Linux Fdn.', change: 'since June 2021' },
            { label: 'License', value: 'Apache-2.0', change: 'open source' },
        ],
        timeline: [
            { phase: 'Origin', description: 'Grows out of PD3R, Call for Code 2018 runner-up', date: '2019', milestone: true },
            { phase: 'Development', description: 'IBM grant; ML pipeline and mobile app built', date: '2020' },
            { phase: 'Demo', description: 'Build Change publishes the app walkthrough', date: 'Jan 2021' },
            { phase: 'Linux Foundation', description: 'Hosted as an open-source project', date: 'Jun 2021', milestone: true }
        ]
    },
    'ar-narratives': {
        id: 'ar-narratives',
        title: 'Locative AR Narratives',
        subtitle: 'Combining experiential & spatial data',
        organization: 'Dalhousie University',
        location: 'Halifax, Canada',
        date: '2023 - Present',
        story: {
            hook: 'Two fundamental challenges in locative Augmented Reality (AR) storytelling are collecting data about places and the lived experiences within them, and using this data to produce compelling narratives that are experienced within their original context or in new contexts.',
            challenge: 'We lacked robust methodologies to capture both the socio-spatial lived experiences of a source community (e.g., a high school) and the spatial configurations needed to map these narratives to diverse physical environments.',
            approach: 'This research introduces a multi-phased methodology for collecting lived socio-spatial experiences and analyzing spatial configurations using diverse methods. We collaboratively synthesize this data with experts in situated theatre and architecture to produce immersive AR narratives highly reflective of their source environment.',
            results: 'Our study with 48 participants indicated that universal themes from source-synthesized stories can resonate in different contexts when the stories are deployed using our method.',
            impact: 'This research provides a replicable methodology for the design and deployment of locative AR narratives rooted in real-world settings, directly contributing to the future of spatial computing.'
        },
        problemSolution: {
            problem: "Transferring narratives to different contexts often results in contextual dissonance and complexities when applying spatial metrics for adaptive deployment.",
            solution: "A multi-phased methodology addressing both the collection of lived experiences and precise spatial configurations to adapt stories accurately."
        },
        methodology: [
            { step: '01', title: 'Data Collection', description: 'Gathering lived socio-spatial experiences and spatial metrics.' },
            { step: '02', title: 'Collaborative Synthesis', description: 'Working with theatre and architecture experts to map themes.' },
            { step: '03', title: 'AR Deployment', description: 'Implementing narratives via AR in target environments.' },
            { step: '04', title: 'User Studies', description: 'Conducting mixed-methods tracking with 48+ participants.' }
        ],
        takeaways: [
            { title: 'Universal Resonance', description: 'Universal themes from site-specific stories can successfully resonate in completely different spatial contexts.' },
            { title: 'Contextual Dissonance', description: 'Challenges remain in matching complex spatial graphs to varied physical environments seamlessly.' }
        ],
        contributions: [
            { area: 'Spatial Analytics Framework', value: 95 },
            { area: 'Mixed-Methods Research', value: 90 },
            { area: 'AR Prototyping', value: 85 }
        ],
        team: [
            { name: 'Nirmal Adhikari', role: 'First author, PhD researcher' },
            { name: 'Dr. Derek Reilly', role: 'Supervisor, GEM Lab, Dalhousie' },
            { name: 'Brian Lilley', role: 'Co-author' },
            { name: 'Martha Radice', role: 'Co-author' },
            { name: 'Susan Fitzgerald', role: 'Co-author' },
            { name: 'Alex McLean', role: 'Co-author' },
        ],
        affiliations: ['Dalhousie University', 'Zuppa Theatre', 'Universidad del Norte', 'University of Amsterdam'],
        technologies: ['HoloLens 2', 'Unity', 'Space Syntax', 'Spatial Analysis', 'Qualitative Analysis'],
        publications: [
            { title: 'Combining Experiential and Spatial Data for Immersive AR Narrative Creation: A Phased Methodology', venue: "ICIDS 2025, Saint Julian's, Malta · Springer LNCS 16374, pp. 133–157", link: 'https://doi.org/10.1007/978-3-032-12408-1_8' }
        ],
        relatedLinks: [
            { title: 'Springer Chapter', url: 'https://link.springer.com/chapter/10.1007/978-3-032-12408-1_8' }
        ],
        stats: [
            { label: 'Participants', value: '48', change: 'study participants' },
            { label: 'Venue', value: 'ICIDS', change: 'Springer LNCS, peer-reviewed' },
            { label: 'Deployment', value: 'HoloLens 2', change: 'source to target sites' },
            { label: 'Accesses', value: '1,000+', change: 'first year online' },
        ],
        timeline: [
            { phase: 'Framework Design', description: 'Methodology conception', date: '2023' },
            { phase: 'Data Synthesis', description: 'Collaborative theatre workshops', date: '2024' },
            { phase: 'Deployment & Study', description: 'Testing with 48 participants', date: '2024', milestone: true },
            { phase: 'Publication', description: 'Presented at ICIDS 2025, Malta; Springer LNCS', date: 'Dec 2025', milestone: true }
        ],
        quotes: [
            { text: "Universal themes from source-synthesized stories can resonate in different contexts when deployed using our method.", author: "Research Conclusion", role: "Springer Chapter" }
        ],
        topic: 'ar-narratives',
        gallery: [photos.dalhousie, photos.halifax]
    }
};

// Animated Counter Component
// Two-letter avatar initials: first and last word, ignoring titles like "Dr." and "The".
function initials(name: string) {
    const words = name.replace(/^(Dr\.?|The)\s+/i, '').split(/\s+/).filter((w) => /^[A-Za-z]/.test(w));
    if (words.length === 0) return '?';
    if (words.length === 1) return /^[A-Z]{2,4}$/.test(words[0]) ? words[0].slice(0, 3) : words[0][0].toUpperCase();
    return (words[0][0] + words[words.length - 1][0]).toUpperCase();
}

// Counts up the leading integer ("2,500+", "$25K", "2nd") and shows anything else as written.
function AnimatedCounter({ value }: { value: string }) {
    const match = value.match(/^([^0-9A-Za-z]*)(\d{1,3}(?:,\d{3})+|\d+)(?![.\d])(.*)$/);

    return (
        <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
        >
            {match ? (
                <CountUp prefix={match[1]} value={Number(match[2].replace(/,/g, ''))} suffix={match[3]} />
            ) : (
                value
            )}
        </motion.span>
    );
}

// Text Reveal Component
function TextReveal({ children, delay = 0, className = '' }: { children: string; delay?: number; className?: string }) {
    const words = children.split(' ');

    return (
        <span className={className}>
            {words.map((word, i) => (
                <motion.span
                    key={i}
                    className="inline-block mr-[0.25em]"
                    initial={{ opacity: 0, y: 20, rotateX: -90 }}
                    whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{
                        duration: 0.5,
                        delay: delay + (i * 0.03),
                        ease: [0.33, 1, 0.68, 1]
                    }}
                >
                    {word}
                </motion.span>
            ))}
        </span>
    );
}

// Story Section Component with Parallax
function StorySection({
    icon: Icon,
    color,
    title,
    children,
    delay = 0,
    chapter
}: {
    icon: React.ElementType;
    color: 'teal' | 'coral' | 'amber' | 'indigo';
    title: string;
    children: React.ReactNode;
    delay?: number;
    chapter: number;
}) {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
    const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

    const colorMap = {
        teal: { bg: 'bg-teal-50', border: 'border-teal-200', text: 'text-teal-700', icon: 'text-teal-600', gradient: 'from-teal-500/20 to-teal-600/10' },
        coral: { bg: 'bg-coral-50', border: 'border-coral-200', text: 'text-coral-700', icon: 'text-coral-600', gradient: 'from-coral-500/20 to-coral-600/10' },
        amber: { bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-700', icon: 'text-amber-600', gradient: 'from-amber-500/20 to-amber-600/10' },
        indigo: { bg: 'bg-indigo-50', border: 'border-indigo-200', text: 'text-indigo-700', icon: 'text-indigo-600', gradient: 'from-indigo-500/20 to-indigo-600/10' }
    };
    const colors = colorMap[color];

    return (
        <motion.div
            ref={ref}
            style={{ y, opacity }}
            className="relative"
        >
            <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.8, delay }}
                className={`relative p-8 md:p-12 rounded-3xl ${colors.bg} border ${colors.border} overflow-hidden`}
            >
                {/* Chapter Number */}
                <div className="absolute top-6 right-6">
                    <span className={`text-8xl font-black ${colors.text} opacity-10`}>0{chapter}</span>
                </div>

                {/* Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${colors.gradient} opacity-50`} />

                <div className="relative z-10">
                    {/* Header */}
                    <div className="flex items-center gap-4 mb-6">
                        <motion.div
                            initial={{ scale: 0, rotate: -180 }}
                            whileInView={{ scale: 1, rotate: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: delay + 0.2, type: 'spring' }}
                            className={`w-14 h-14 rounded-2xl bg-white shadow-lg flex items-center justify-center`}
                        >
                            <Icon size={28} className={colors.icon} />
                        </motion.div>
                        <div>
                            <motion.span
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: delay + 0.3 }}
                                className={`text-xs font-bold uppercase tracking-widest ${colors.text}`}
                            >
                                Chapter {chapter}
                            </motion.span>
                            <motion.h3
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: delay + 0.4 }}
                                className="text-2xl md:text-3xl font-bold text-charcoal-900 font-display"
                            >
                                {title}
                            </motion.h3>
                        </div>
                    </div>

                    {/* Content */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: delay + 0.5, duration: 0.6 }}
                        className="prose prose-lg max-w-none"
                    >
                        {children}
                    </motion.div>
                </div>
            </motion.div>
        </motion.div>
    );
}


// 1. Problem VS Solution Component
function ProblemSolutionCard({ data }: { data: { problem: string; solution: string } }) {
    return (
        <div className="grid md:grid-cols-2 gap-6 my-16">
            <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="p-8 rounded-3xl bg-sand-50 border border-sand-200 relative overflow-hidden"
            >
                <div className="absolute top-0 right-0 p-4 opacity-5"><Activity size={120} /></div>
                <div className="flex items-center gap-3 mb-4 text-coral-600">
                    <Zap size={24} />
                    <h3 className="text-xl font-bold font-display">The Problem</h3>
                </div>
                <p className="text-charcoal-700 leading-relaxed relative z-10">{data.problem}</p>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="p-8 rounded-3xl bg-teal-50 border border-teal-200 relative overflow-hidden"
            >
                <div className="absolute top-0 right-0 p-4 opacity-5"><ShieldCheck size={120} /></div>
                <div className="flex items-center gap-3 mb-4 text-teal-600">
                    <CheckCircle2 size={24} />
                    <h3 className="text-xl font-bold font-display">Our Solution</h3>
                </div>
                <p className="text-charcoal-700 leading-relaxed relative z-10">{data.solution}</p>
            </motion.div>
        </div>
    );
}

// 2. Methodology Flow
function MethodologyFlow({ steps }: { steps: { step: string; title: string; description: string }[] }) {
    return (
        <div className="my-20">
            <AnimatedSection className="text-center mb-12">
                <Layers size={32} className="mx-auto text-indigo-500 mb-4" />
                <h2 className="text-3xl md:text-4xl font-display font-bold text-charcoal-900">Methodology & Process</h2>
            </AnimatedSection>

            <div className="grid md:grid-cols-4 gap-4">
                {steps.map((step, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.15 }}
                        className="relative p-6 rounded-2xl bg-white border border-sand-200 hover:border-indigo-200 transition-all hover:shadow-lg group"
                    >
                        <div className="text-4xl font-black text-indigo-100 mb-4 group-hover:text-indigo-200 transition-colors">{step.step}</div>
                        <h3 className="text-lg font-bold text-charcoal-900 mb-2">{step.title}</h3>
                        <p className="text-sm text-charcoal-600 leading-relaxed">{step.description}</p>

                        {idx !== steps.length - 1 && (
                            <div className="hidden md:block absolute top-1/2 -right-3 text-sand-300 transform -translate-y-1/2 z-10">
                                <ArrowRight size={24} />
                            </div>
                        )}
                    </motion.div>
                ))}
            </div>
        </div>
    );
}

// 3. Takeaways Accordion-style layout
function KeyTakeaways({ takeaways }: { takeaways: { title: string; description: string }[] }) {
    return (
        <div className="my-20 p-8 md:p-12 rounded-3xl bg-charcoal-900 text-white relative overflow-hidden">
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-teal-500 rounded-full blur-[100px] opacity-20" />
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-coral-500 rounded-full blur-[100px] opacity-20" />

            <AnimatedSection className="relative z-10 mb-10">
                <div className="flex items-center gap-3 mb-2">
                    <Sparkles size={24} className="text-amber-400" />
                    <h2 className="text-3xl font-display font-bold">Key Takeaways</h2>
                </div>
                <p className="text-charcoal-300">Crucial learnings from this research phase.</p>
            </AnimatedSection>

            <div className="relative z-10 grid md:grid-cols-2 gap-6">
                {takeaways.map((item, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.1 }}
                        className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
                    >
                        <h3 className="text-lg font-bold text-amber-400 mb-2">{item.title}</h3>
                        <p className="text-charcoal-200 text-sm leading-relaxed">{item.description}</p>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}

// 4. Role/Contribution Bars
function ContributionBars({ contributions }: { contributions: { area: string; value: number }[] }) {
    return (
        <AnimatedSection className="my-12 p-8 rounded-3xl bg-white border border-sand-200">
            <div className="flex items-center gap-3 mb-8">
                <GitBranch size={24} className="text-teal-600" />
                <h3 className="text-xl font-bold font-display text-charcoal-900">My Contributions</h3>
            </div>

            <div className="space-y-6">
                {contributions.map((cont, idx) => (
                    <div key={idx}>
                        <div className="flex justify-between text-sm font-semibold mb-2">
                            <span className="text-charcoal-700">{cont.area}</span>
                            <span className="text-teal-600">{cont.value}%</span>
                        </div>
                        <div className="h-2 w-full bg-sand-100 rounded-full overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                whileInView={{ width: `${cont.value}%` }}
                                viewport={{ once: true }}
                                transition={{ duration: 1, delay: 0.2 + (idx * 0.1), ease: "easeOut" }}
                                className="h-full bg-gradient-to-r from-teal-400 to-teal-600 rounded-full"
                            />
                        </div>
                    </div>
                ))}
            </div>
        </AnimatedSection>
    );
}

function MediaSection({ project }: { project: ResearchProject }) {
    const videos = project.topic ? videosFor(project.topic) : [];
    const gallery = project.gallery ?? [];

    return (
        <section className="py-20 md:py-28 bg-charcoal-950 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-teal-900/50 via-transparent to-transparent" />
            <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
                {(videos.length > 0 || gallery.length > 0) && (
                    <div>
                        <p className="text-teal-300 text-xs font-bold uppercase tracking-widest mb-2">From the field</p>
                        <h2 className="text-3xl md:text-4xl font-display font-bold mb-8">Photos & video</h2>
                        {videos.length > 0 && <VideoShelf videos={videos} tone="dark" className="mb-10" />}
                        {gallery.length > 0 && <PhotoGallery photos={gallery} tone="dark" columns={3} />}
                    </div>
                )}
                {project.topic && (
                    <div>
                        <p className="text-teal-300 text-xs font-bold uppercase tracking-widest mb-2">Read more</p>
                        <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">Press & links</h2>
                        <RelatedLinks topic={project.topic} variant="list" tone="dark" excludeVideos />
                    </div>
                )}
            </div>
        </section>
    );
}

export default function ResearchDetail() {
    const { projectId } = useParams<{ projectId: string }>();
    const project = projectId ? projects[projectId] : null;

    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ container: containerRef });
    const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'instant' });
    }, []);

    if (!project) {
        return <Navigate to="/research" replace />;
    }

    return (
        <div ref={containerRef} className="min-h-screen relative">
            {/* Progress Bar */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-1 bg-teal-500 origin-left z-50"
                style={{ scaleX }}
            />

            {/* Background */}
            <OrganicBlob color="teal" size="xl" className="top-0 left-0 -translate-x-1/4 -translate-y-1/4" delay={0} />
            <OrganicBlob color="coral" size="lg" className="top-1/3 right-0 translate-x-1/4" delay={2} />

            {/* Navigation */}
            <motion.div
                className="fixed top-24 left-0 right-0 z-40 px-4 sm:px-6 lg:px-8"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
            >
                <div className="max-w-6xl mx-auto flex items-center justify-between">
                    <Link
                        to="/research"
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white shadow-lg border border-sand-200 text-charcoal-700 font-semibold hover:bg-teal-50 hover:border-teal-300 hover:text-teal-700 transition-all group"
                    >
                        <ArrowLeft size={18} className="transition-transform group-hover:-translate-x-1" />
                        <span className="hidden sm:inline">Back to Research</span>
                        <span className="sm:hidden">Back</span>
                    </Link>

                    {/* Project indicator */}
                    <div className="hidden md:flex items-center gap-2 px-4 py-2.5 rounded-xl bg-charcoal-900/90 backdrop-blur-sm text-white shadow-lg">
                        <span className="text-xs text-charcoal-400 uppercase tracking-wider">Project</span>
                        <span className="text-sm font-medium truncate max-w-[200px]">{project.title}</span>
                    </div>
                </div>
            </motion.div>

            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center justify-center pt-28 pb-10">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2 }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-50 border border-teal-100 text-teal-700 text-sm font-medium mb-8"
                        >
                            <Sparkles size={16} className="text-teal-500" />
                            Research Story
                        </motion.div>

                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold text-charcoal-900 mb-6 leading-tight">
                            <TextReveal delay={0.3}>{project.title}</TextReveal>
                        </h1>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.8 }}
                            className="text-2xl md:text-3xl text-coral-500 font-handwritten mb-8"
                        >
                            {project.subtitle}
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1 }}
                            className="flex items-center justify-center gap-6 text-charcoal-500"
                        >
                            <span className="flex items-center gap-2">
                                <MapPin size={18} className="text-teal-500" />
                                {project.location}
                            </span>
                            <span className="w-1 h-1 rounded-full bg-charcoal-300" />
                            <span>{project.organization}</span>
                            <span className="w-1 h-1 rounded-full bg-charcoal-300" />
                            <span>{project.date}</span>
                        </motion.div>
                    </motion.div>

                    {/* Scroll Indicator */}
                    <motion.div
                        className="absolute bottom-10 left-1/2 -translate-x-1/2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.5 }}
                    >
                        <motion.div
                            animate={{ y: [0, 10, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="flex flex-col items-center gap-2 text-charcoal-400"
                        >
                            <span className="text-xs uppercase tracking-widest">Scroll to explore</span>
                            <ChevronRight size={20} className="rotate-90" />
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Stats Dashboard */}
            <section className="py-20 bg-gradient-to-b from-white to-sand-50">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <AnimatedSection>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {project.stats.map((stat, idx) => (
                                <motion.div
                                    key={idx}
                                    className="relative p-6 rounded-2xl bg-white border border-sand-200 overflow-hidden group"
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.1 }}
                                    whileHover={{ y: -5, boxShadow: '0 20px 40px -15px rgba(0,0,0,0.1)' }}
                                >
                                    <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-teal-50 to-transparent rounded-bl-full" />
                                    <motion.div
                                        className="text-4xl md:text-5xl font-black text-charcoal-900 mb-2"
                                        initial={{ scale: 0.5 }}
                                        whileInView={{ scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: idx * 0.1 + 0.2, type: 'spring' }}
                                    >
                                        <AnimatedCounter value={stat.value} />
                                    </motion.div>
                                    <p className="text-sm font-medium text-charcoal-600 mb-1">{stat.label}</p>
                                    {stat.change && (
                                        <p className="text-xs text-teal-600 font-medium">{stat.change}</p>
                                    )}
                                </motion.div>
                            ))}
                        </div>
                    </AnimatedSection>
                </div>
            </section>

            {/* Photos, video, press & links */}
            {(project.topic || project.gallery) && <MediaSection project={project} />}

            {/* Story Chapters */}
            <section className="py-20 md:py-32">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <AnimatedSection className="text-center mb-16">
                        <BookOpen size={32} className="mx-auto text-teal-600 mb-4" />
                        <h2 className="text-3xl md:text-4xl font-display font-bold text-charcoal-900">The Story</h2>
                    </AnimatedSection>

                    <div className="space-y-16">
                        {/* Hook - Special Treatment */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="relative p-8 md:p-12 rounded-3xl bg-gradient-to-br from-charcoal-900 to-charcoal-800 text-white overflow-hidden"
                        >
                            <Quote size={80} className="absolute top-4 right-4 text-white/5" />
                            <motion.span
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                className="text-coral-400 font-handwritten text-2xl mb-4 block"
                            >
                                The Beginning
                            </motion.span>
                            <p className="text-xl md:text-2xl leading-relaxed font-display">
                                <TextReveal delay={0.2}>{project.story.hook}</TextReveal>
                            </p>
                        </motion.div>

                        {project.problemSolution && (
                            <ProblemSolutionCard data={project.problemSolution} />
                        )}

                        {/* Story Chapters */}
                        <StorySection
                            icon={Target}
                            color="coral"
                            title="The Challenge"
                            chapter={1}
                            delay={0}
                        >
                            <p className="text-charcoal-700 text-lg leading-relaxed">{project.story.challenge}</p>
                        </StorySection>

                        <StorySection
                            icon={Lightbulb}
                            color="teal"
                            title="Our Approach"
                            chapter={2}
                            delay={0.1}
                        >
                            <p className="text-charcoal-700 text-lg leading-relaxed">{project.story.approach}</p>
                        </StorySection>

                        <StorySection
                            icon={TrendingUp}
                            color="amber"
                            title="The Results"
                            chapter={3}
                            delay={0.2}
                        >
                            <p className="text-charcoal-700 text-lg leading-relaxed">{project.story.results}</p>
                        </StorySection>

                        <StorySection
                            icon={Sparkles}
                            color="indigo"
                            title="Impact & Legacy"
                            chapter={4}
                            delay={0.3}
                        >
                            <p className="text-charcoal-700 text-lg leading-relaxed">{project.story.impact}</p>
                        </StorySection>

                        {project.methodology && (
                            <MethodologyFlow steps={project.methodology} />
                        )}

                        {project.takeaways && (
                            <KeyTakeaways takeaways={project.takeaways} />
                        )}
                    </div>
                </div>
            </section>

            {/* Quote Section */}
            {project.quotes && project.quotes.length > 0 && (
                <section className="py-20 bg-sand-50">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                        {project.quotes.map((quote, idx) => (
                            <motion.blockquote
                                key={idx}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="text-center"
                            >
                                <Quote size={48} className="mx-auto text-teal-200 mb-6" />
                                <p className="text-2xl md:text-3xl font-display italic text-charcoal-800 mb-6">
                                    "{quote.text}"
                                </p>
                                <footer className="text-charcoal-500">
                                    <strong className="text-charcoal-700">{quote.author}</strong>
                                    <span className="mx-2">·</span>
                                    <span>{quote.role}</span>
                                </footer>
                            </motion.blockquote>
                        ))}
                    </div>
                </section>
            )}

            {/* Timeline */}
            <section className="py-20 md:py-32">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <AnimatedSection className="text-center mb-16">
                        <Calendar size={32} className="mx-auto text-teal-600 mb-4" />
                        <h2 className="text-3xl md:text-4xl font-display font-bold text-charcoal-900">Journey Timeline</h2>
                    </AnimatedSection>

                    <div className="relative">
                        {/* Timeline Line */}
                        <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-teal-200 via-coral-200 to-teal-200 md:-translate-x-1/2" />

                        <div className="space-y-12">
                            {project.timeline.map((item, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true, margin: '-50px' }}
                                    transition={{ delay: idx * 0.1 }}
                                    className={`relative flex items-start gap-8 ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                                >
                                    {/* Content */}
                                    <div className={`flex-1 ${idx % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                                        <motion.div
                                            whileHover={{ scale: 1.02 }}
                                            className={`inline-block p-6 rounded-2xl bg-white border border-sand-200 hover:border-teal-200 transition-all ${item.milestone ? 'shadow-lg' : ''}`}
                                        >
                                            {item.milestone && (
                                                <span className="inline-block px-3 py-1 rounded-full bg-coral-100 text-coral-700 text-xs font-bold uppercase tracking-wider mb-3">
                                                    Milestone
                                                </span>
                                            )}
                                            <span className="text-teal-600 font-bold text-sm">{item.date}</span>
                                            <h3 className="text-xl font-bold text-charcoal-900 mt-1 mb-2">{item.phase}</h3>
                                            <p className="text-charcoal-600">{item.description}</p>
                                        </motion.div>
                                    </div>

                                    {/* Center Dot */}
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        whileInView={{ scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: idx * 0.1 + 0.2, type: 'spring' }}
                                        className={`relative z-10 w-16 h-16 rounded-full flex items-center justify-center shrink-0 ${item.milestone
                                            ? 'bg-gradient-to-br from-coral-500 to-coral-600 shadow-lg shadow-coral-500/30'
                                            : 'bg-white border-4 border-teal-200'
                                            }`}
                                    >
                                        <span className={`text-sm font-bold ${item.milestone ? 'text-white' : 'text-teal-600'}`}>
                                            {item.date.slice(-2)}
                                        </span>
                                    </motion.div>

                                    {/* Spacer for alternating layout */}
                                    <div className="flex-1 hidden md:block" />
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Team & Technologies */}
            <section className="py-20 md:py-32 bg-gradient-to-b from-sand-50 to-white">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-12">
                        {/* Team */}
                        <AnimatedSection>
                            <div className="flex items-center gap-3 mb-8">
                                <Users size={24} className="text-teal-600" />
                                <h2 className="text-2xl font-bold text-charcoal-900">Team</h2>
                            </div>
                            <div className="space-y-4">
                                {project.team.map((member, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: idx * 0.1 }}
                                        whileHover={{ x: 10 }}
                                        className="flex items-center gap-4 p-4 rounded-xl bg-white border border-sand-200 hover:border-teal-200 transition-all"
                                    >
                                        <div className="w-12 h-12 shrink-0 rounded-full bg-gradient-to-br from-teal-100 to-teal-200 flex items-center justify-center text-teal-700 font-bold text-sm">
                                            {initials(member.name)}
                                        </div>
                                        <div>
                                            <p className="font-semibold text-charcoal-900">{member.name}</p>
                                            <p className="text-sm text-charcoal-500">{member.role}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                            {project.affiliations && (
                                <div className="mt-5">
                                    <p className="text-xs font-bold uppercase tracking-widest text-charcoal-400 mb-2">Author affiliations</p>
                                    <div className="flex flex-wrap gap-2">
                                        {project.affiliations.map((a) => (
                                            <span key={a} className="px-3 py-1.5 rounded-full bg-white border border-sand-200 text-sm text-charcoal-700">{a}</span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </AnimatedSection>

                        {project.contributions && (
                            <ContributionBars contributions={project.contributions} />
                        )}

                        {/* Technologies */}
                        <AnimatedSection delay={0.2}>
                            <div className="flex items-center gap-3 mb-8">
                                <Wrench size={24} className="text-teal-600" />
                                <h2 className="text-2xl font-bold text-charcoal-900">Technologies</h2>
                            </div>
                            <div className="p-6 rounded-2xl bg-gradient-to-br from-charcoal-900 to-charcoal-800 text-white">
                                <div className="flex flex-wrap gap-3">
                                    {project.technologies.map((tech, idx) => (
                                        <motion.span
                                            key={idx}
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            whileInView={{ opacity: 1, scale: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: idx * 0.05 }}
                                            whileHover={{ scale: 1.1 }}
                                            className="px-4 py-2 rounded-full bg-white/10 text-white font-medium text-sm border border-white/20 hover:bg-white/20 transition-colors cursor-default"
                                        >
                                            {tech}
                                        </motion.span>
                                    ))}
                                </div>
                            </div>
                        </AnimatedSection>
                    </div>
                </div>
            </section>

            {/* Publications & Links */}
            {(project.publications.length > 0 || project.awards) && (
                <section className="py-20">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid md:grid-cols-2 gap-8">
                            {/* Publications */}
                            {project.publications.length > 0 && (
                                <AnimatedSection>
                                    <div className="flex items-center gap-3 mb-6">
                                        <BookOpen size={24} className="text-teal-600" />
                                        <h2 className="text-2xl font-bold text-charcoal-900">Publications</h2>
                                    </div>
                                    <div className="space-y-4">
                                        {project.publications.map((pub, idx) => (
                                            <motion.div
                                                key={idx}
                                                initial={{ opacity: 0, y: 20 }}
                                                whileInView={{ opacity: 1, y: 0 }}
                                                viewport={{ once: true }}
                                                transition={{ delay: idx * 0.1 }}
                                                whileHover={{ scale: 1.02 }}
                                                className="p-5 rounded-2xl bg-white border border-sand-200 hover:border-teal-200 hover:shadow-lg transition-all"
                                            >
                                                <p className="font-semibold text-charcoal-900 mb-1">{pub.title}</p>
                                                <p className="text-sm text-charcoal-500 mb-3">{pub.venue}</p>
                                                {pub.link && (
                                                    <a
                                                        href={pub.link}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="inline-flex items-center gap-1 text-sm text-teal-600 hover:text-teal-700 font-medium"
                                                    >
                                                        View Publication <ExternalLink size={14} />
                                                    </a>
                                                )}
                                            </motion.div>
                                        ))}
                                    </div>
                                </AnimatedSection>
                            )}

                            {/* Awards */}
                            {project.awards && project.awards.length > 0 && (
                                <AnimatedSection delay={0.2}>
                                    <div className="flex items-center gap-3 mb-6">
                                        <Sparkles size={24} className="text-amber-500" />
                                        <h2 className="text-2xl font-bold text-charcoal-900">Recognition</h2>
                                    </div>
                                    <div className="space-y-4">
                                        {project.awards.map((award, idx) => (
                                            <motion.div
                                                key={idx}
                                                initial={{ opacity: 0, y: 20 }}
                                                whileInView={{ opacity: 1, y: 0 }}
                                                viewport={{ once: true }}
                                                transition={{ delay: idx * 0.1 }}
                                                className="p-5 rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200"
                                            >
                                                <p className="font-semibold text-charcoal-900 mb-1">{award.title}</p>
                                                <p className="text-sm text-charcoal-600">{award.description}</p>
                                            </motion.div>
                                        ))}
                                    </div>
                                </AnimatedSection>
                            )}
                        </div>
                    </div>
                </section>
            )}

            {/* Related Links */}
            <section className="py-10">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <AnimatedSection>
                        <div className="flex flex-wrap gap-4">
                            {project.relatedLinks.map((link, idx) => (
                                <motion.a
                                    key={idx}
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.1 }}
                                    whileHover={{ scale: 1.05 }}
                                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white border border-sand-200 text-charcoal-900 font-medium hover:border-teal-300 hover:bg-teal-50 transition-all"
                                >
                                    {link.title}
                                    <ExternalLink size={16} className="text-teal-500" />
                                </motion.a>
                            ))}
                        </div>
                    </AnimatedSection>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 bg-gradient-to-r from-teal-50 to-coral-50">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl md:text-4xl font-display font-bold text-charcoal-900 mb-4">
                            Interested in this research?
                        </h2>
                        <p className="text-charcoal-600 mb-8 max-w-xl mx-auto">
                            I'm always open to discussing collaborations, partnerships, or answering questions about my work.
                        </p>
                        <Link
                            to="/contact"
                            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-charcoal-900 text-white font-semibold hover:bg-charcoal-800 transition-colors hover:scale-105 transform"
                        >
                            Get in Touch
                        </Link>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
