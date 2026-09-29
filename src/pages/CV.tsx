import { Download, Award, Globe, MapPin, BookOpen, Code2, Users, CheckCircle2, Sparkles, Layout, Database, GraduationCap, HandHeart } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { TiltCard } from '../components/ui/TiltCard';
import { AnimatedSection, StaggerContainer, StaggerItem } from '../components/ui/AnimatedSection';
import OrganicBlob from '../components/ui/OrganicBlob';

const SKILLS = [
    { name: "IT Strategy", level: 95, icon: <Layout className="w-4 h-4" /> },
    { name: "AI/ML & Research", level: 90, icon: <Database className="w-4 h-4" /> },
    { name: "Project Management", level: 100, icon: <CheckCircle2 className="w-4 h-4" /> },
    { name: "Spatial Computing", level: 85, icon: <Globe className="w-4 h-4" /> },
];

const VOLUNTEER_WORK = [
    {
        role: "Web Chair",
        company: "ACM SUI & VRST 2025",
        period: "Dec 2025 – Present",
        location: "Global",
        description: "Managing the official website and working with organizing committees to share clear, timely information for the spatial user interaction and virtual reality software communities.",
        achievements: ["Web Chair for SUI 2025", "Web Chair for VRST 2025"],
        icon: <Users className="w-5 h-5" />,
        color: "bg-indigo-50 text-indigo-600",
        pill: "bg-indigo-50 text-indigo-700 border-indigo-100"
    },
    {
        role: "Volunteer Instructor",
        company: "University of the People",
        period: "Apr 2025 – Present",
        location: "Online",
        description: "Mentoring undergraduate students from around the world in courses ranging from Introduction to CS to Artificial Intelligence. I focus on building confidence and curiosity in students.",
        achievements: ["Mentoring global students", "Teaching CS to AI courses"],
        icon: <Globe className="w-5 h-5" />,
        color: "bg-emerald-50 text-emerald-600",
        pill: "bg-emerald-50 text-emerald-700 border-emerald-100"
    },
    {
        role: "Technical Volunteer",
        company: "Earthquake Recovery",
        period: "2015",
        location: "Nepal",
        description: "Technical volunteering during the 2015 Nepal Earthquake recovery. Assisted in setting up communication channels and IT logistics for relief efforts, ensuring help reached those who needed it most.",
        achievements: ["IT logistics for relief", "Communication channels setup"],
        icon: <HandHeart className="w-5 h-5" />,
        color: "bg-rose-50 text-rose-600",
        pill: "bg-rose-50 text-rose-700 border-rose-100"
    }
];

const EXPERIENCE = [
    {
        role: "Adjunct Lecturer",
        company: "American University of Afghanistan (AUAF)",
        period: "Spring 2026 – Present",
        location: "Online (remote)",
        description: "Teaching undergraduate computing courses online for AUAF, which has taught Afghan students remotely since 2021.",
        achievements: ["Design of Programming Languages (Fall 2026)", "Web Design and Development (Fall 2026)", "Fundamentals of Networking and Telecommunications (Spring 2026)"],
        icon: <GraduationCap className="w-5 h-5" />,
        color: "bg-indigo-50 text-indigo-600",
        pill: "bg-indigo-50 text-indigo-700 border-indigo-100"
    },
    {
        role: "Research Assistant & Teaching Assistant",
        company: "Dalhousie University",
        period: "Sept 2023 – Present",
        location: "Halifax, Canada",
        description: "PhD research in the GEM Lab on immersive AR narratives, and teaching-assistant work across AR/VR, software engineering, HCI, UI design and introductory programming.",
        achievements: ["First-author paper at ICIDS 2025 (Springer LNCS)", "TA for 5 undergraduate courses", "Web Chair, ACM SUI & VRST 2025"],
        icon: <BookOpen className="w-5 h-5" />,
        color: "bg-teal-50 text-teal-600",
        pill: "bg-teal-50 text-teal-700 border-teal-100"
    },
    {
        role: "Lecturer (GIS & Remote Sensing)",
        company: "Institute of Crisis Management Studies (ICMS)",
        period: "Mar 2023 – Aug 2023",
        location: "Kathmandu, Nepal",
        description: "Designed and delivered interactive courses on spatial data analysis and geospatial modelling for crisis-management students.",
        achievements: ["Designed an interactive GIS curriculum", "Mentored advanced GIS projects", "Developed practical labs"],
        icon: <Users className="w-5 h-5" />,
        color: "bg-amber-50 text-amber-600",
        pill: "bg-amber-50 text-amber-700 border-amber-100"
    },
    {
        role: "Technology Program Manager",
        company: "Build Change",
        period: "Mar 2022 – Aug 2023",
        location: "USA / Nepal",
        description: "Led digital platforms for resilient housing: BCtap, microfinance platforms for Indonesia and the Philippines with integrated builder guides, and Resilient Housing in a Box with the Cisco Foundation.",
        achievements: ["Partnered with the Cisco Foundation", "Microfinance platforms in Indonesia & the Philippines", "Managed cross-functional teams"],
        icon: <Globe className="w-5 h-5" />,
        color: "bg-coral-50 text-coral-600",
        pill: "bg-coral-50 text-coral-700 border-coral-100"
    },
    {
        role: "NFT Coding Hub Manager",
        company: "Build Change",
        period: "Jan 2019 – Mar 2022",
        location: "Kathmandu, Nepal",
        description: "Established a new IT team focused on frontier technology for housing resilience, digitising inspection workflows, monitoring systems and ISAC-SIMO.",
        achievements: ["Cut organisational downtime by 80%", "Optimised workflows by 40% with Agile", "Led ISAC-SIMO (Linux Foundation)"],
        icon: <Code2 className="w-5 h-5" />,
        color: "bg-indigo-50 text-indigo-600",
        pill: "bg-indigo-50 text-indigo-700 border-indigo-100"
    },
    {
        role: "Information Systems: GIS Intern → IS Coordinator",
        company: "Build Change",
        period: "Oct 2017 – Jan 2019",
        location: "Kathmandu, Nepal",
        description: "Built a web GIS platform, introduced IT policy and preventive maintenance, and managed PD3R, Build Change's Call for Code entry.",
        achievements: ["PD3R: Call for Code 2018, 2nd place", "Software costs cut by 60%", "System breakdowns down 70%"],
        icon: <Database className="w-5 h-5" />,
        color: "bg-teal-50 text-teal-600",
        pill: "bg-teal-50 text-teal-700 border-teal-100"
    },
    {
        role: "IT Project Manager",
        company: "Polaris Information Technologies",
        period: "Jan 2015 – Sep 2017",
        location: "Kathmandu, Nepal",
        description: "Managed full-lifecycle enterprise IT projects with risk-management frameworks and transparent stakeholder communication.",
        achievements: ["Delivered 6 large-scale IT initiatives", "On time and under budget", "Client relationship management"],
        icon: <CheckCircle2 className="w-5 h-5" />,
        color: "bg-charcoal-50 text-charcoal-600",
        pill: "bg-charcoal-50 text-charcoal-700 border-charcoal-100"
    }
];

export default function CV() {
    return (
        <div className="min-h-screen py-20 md:py-32 relative overflow-x-hidden">
            {/* Background */}
            <OrganicBlob color="teal" size="xl" className="top-0 right-0 translate-x-1/4 -translate-y-1/4" delay={0} />
            <OrganicBlob color="coral" size="lg" className="bottom-0 left-0 -translate-x-1/4 translate-y-1/4" delay={3} />

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Header Section */}
                <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-12 items-center mb-20">
                    <AnimatedSection>
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-50 border border-teal-100 text-teal-700 text-xs font-bold uppercase tracking-wider mb-6"
                        >
                            <Sparkles size={12} className="text-teal-500" />
                            Research & Leadership
                        </motion.div>

                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-charcoal-900 tracking-tight leading-[0.95] mb-6">
                            Nirmal <br />
                            <span className="text-gradient">Adhikari</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-teal-600 font-display italic mb-8 max-w-lg">
                            "Storyteller of Resilient Technologies."
                        </p>

                        <div className="flex flex-wrap gap-4 text-charcoal-600 text-sm mb-10">
                            <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/80 border border-sand-200">
                                <MapPin className="w-4 h-4 text-teal-500" /> Halifax, NS
                            </div>
                            <a href="mailto:nirmalbrj7@gmail.com" className="flex items-center gap-2 hover:text-teal-600 transition-colors px-3 py-2 rounded-xl bg-white/80 border border-sand-200">
                                nirmalbrj7@gmail.com
                            </a>
                            <a href="https://nirmalad.com.np" className="flex items-center gap-2 hover:text-teal-600 transition-colors px-3 py-2 rounded-xl bg-white/80 border border-sand-200">
                                nirmalad.com.np
                            </a>
                        </div>

                        <a
                            href="/Nirmal_Adhikari_CV.pdf"
                            download
                            className="group inline-flex items-center justify-center px-8 py-4 bg-charcoal-900 text-white rounded-full font-bold shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all"
                        >
                            <Download className="mr-2 w-5 h-5 group-hover:animate-bounce" />
                            Download CV
                        </a>
                    </AnimatedSection>

                    <AnimatedSection delay={0.2}>
                        <div className="bg-white/70 backdrop-blur-md p-8 rounded-[2rem] border border-white/60 shadow-xl relative hidden lg:block">
                            <div className="absolute top-6 left-6 text-6xl text-teal-100 font-serif -z-10 select-none">"</div>
                            <p className="text-lg font-display font-medium leading-relaxed text-charcoal-800 italic relative z-10">
                                I thrive at the nexus of technology, innovation, and social impact—advancing
                                projects that foster resilience and elevate user experiences.
                            </p>

                            <div className="mt-8 grid grid-cols-2 gap-6 border-t border-sand-200 pt-8">
                                <div className="space-y-1">
                                    <div className="text-3xl md:text-4xl font-black text-gradient font-display">10+ Yrs</div>
                                    <div className="text-xs font-bold text-charcoal-400 uppercase tracking-widest">Global Experience</div>
                                </div>
                                <div className="space-y-1">
                                    <div className="text-3xl md:text-4xl font-black text-coral-500 font-display">2nd</div>
                                    <div className="text-xs font-bold text-charcoal-400 uppercase tracking-widest">Call for Code 2018</div>
                                </div>
                            </div>
                        </div>
                    </AnimatedSection>
                </div>

                {/* Content Grid */}
                <div className="grid lg:grid-cols-[2fr_1fr] gap-12 lg:gap-16">
                    {/* Main Column: Experience */}
                    <div className="space-y-10">
                        <AnimatedSection>
                            <div className="flex items-center gap-4 mb-8">
                                <h2 className="text-2xl md:text-3xl font-display font-bold text-charcoal-900">Professional Experience</h2>
                                <div className="h-px flex-1 bg-sand-200" />
                            </div>
                        </AnimatedSection>

                        <StaggerContainer className="space-y-6" staggerDelay={0.1}>
                            {EXPERIENCE.map((item, idx) => (
                                <StaggerItem key={idx}>
                                    <TiltCard className="h-full">
                                        <div className="p-6 md:p-8 rounded-3xl bg-white/70 border border-sand-200 hover:border-teal-200 transition-all">
                                            <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-6 gap-4">
                                                <div className="flex gap-4">
                                                    <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-sm", item.color)}>
                                                        {item.icon}
                                                    </div>
                                                    <div>
                                                        <h3 className="text-lg md:text-xl font-display font-bold text-charcoal-900 leading-tight">{item.role}</h3>
                                                        <div className="text-teal-600 font-bold text-sm mt-1">{item.company}</div>
                                                    </div>
                                                </div>

                                                <div className="flex flex-col md:items-end gap-1">
                                                    <div className="inline-flex items-center px-3 py-1 rounded-full bg-sand-100 text-charcoal-600 text-[10px] font-bold tracking-widest uppercase border border-sand-200">
                                                        {item.period}
                                                    </div>
                                                    <div className="text-xs text-charcoal-400 font-medium flex items-center gap-1">
                                                        <MapPin className="w-3 h-3" /> {item.location}
                                                    </div>
                                                </div>
                                            </div>

                                            <p className="text-charcoal-600 leading-relaxed mb-6">
                                                {item.description}
                                            </p>

                                            <div className="flex flex-wrap gap-2">
                                                {item.achievements.map((ach, i) => (
                                                    <span key={i} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-sand-200 text-xs font-medium text-charcoal-700 shadow-sm">
                                                        <CheckCircle2 className="w-3 h-3 text-teal-500" />
                                                        {ach}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </TiltCard>
                                </StaggerItem>
                            ))}
                        </StaggerContainer>

                        <AnimatedSection>
                            <div className="flex items-center gap-4 mt-12 mb-8">
                                <h2 className="text-2xl md:text-3xl font-display font-bold text-charcoal-900">Volunteering & Service</h2>
                                <div className="h-px flex-1 bg-sand-200" />
                            </div>
                        </AnimatedSection>

                        <StaggerContainer className="space-y-6" staggerDelay={0.1}>
                            {VOLUNTEER_WORK.map((item, idx) => (
                                <StaggerItem key={idx}>
                                    <TiltCard className="h-full">
                                        <div className="p-6 md:p-8 rounded-3xl bg-white/70 border border-sand-200 hover:border-teal-200 transition-all">
                                            <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-6 gap-4">
                                                <div className="flex gap-4">
                                                    <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-sm", item.color)}>
                                                        {item.icon}
                                                    </div>
                                                    <div>
                                                        <h3 className="text-lg md:text-xl font-display font-bold text-charcoal-900 leading-tight">{item.role}</h3>
                                                        <div className="text-teal-600 font-bold text-sm mt-1">{item.company}</div>
                                                    </div>
                                                </div>

                                                <div className="flex flex-col md:items-end gap-1">
                                                    <div className="inline-flex items-center px-3 py-1 rounded-full bg-sand-100 text-charcoal-600 text-[10px] font-bold tracking-widest uppercase border border-sand-200">
                                                        {item.period}
                                                    </div>
                                                    <div className="text-xs text-charcoal-400 font-medium flex items-center gap-1">
                                                        <MapPin className="w-3 h-3" /> {item.location}
                                                    </div>
                                                </div>
                                            </div>

                                            <p className="text-charcoal-600 leading-relaxed mb-6">
                                                {item.description}
                                            </p>

                                            <div className="flex flex-wrap gap-2">
                                                {item.achievements.map((ach, i) => (
                                                    <span key={i} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-sand-200 text-xs font-medium text-charcoal-700 shadow-sm">
                                                        <CheckCircle2 className="w-3 h-3 text-teal-500" />
                                                        {ach}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </TiltCard>
                                </StaggerItem>
                            ))}
                        </StaggerContainer>
                    </div>

                    {/* Sidebar Column: Skills & Education */}
                    <div className="space-y-10">
                        {/* Skills */}
                        <AnimatedSection>
                            <h2 className="text-xl font-display font-bold text-charcoal-900 mb-6 flex items-center gap-3">
                                <Layout className="w-5 h-5 text-teal-500" />
                                Competencies
                            </h2>
                            <div className="space-y-4">
                                {SKILLS.map((skill, i) => (
                                    <div key={i} className="bg-white/70 backdrop-blur-sm p-4 rounded-2xl border border-sand-200">
                                        <div className="flex justify-between items-center mb-3">
                                            <span className="font-bold text-charcoal-800 text-sm flex items-center gap-2">
                                                <span className="p-1.5 bg-teal-50 rounded-lg text-teal-600">{skill.icon}</span>
                                                {skill.name}
                                            </span>
                                            <span className="text-xs font-bold text-teal-600">{skill.level}%</span>
                                        </div>
                                        <div className="h-1.5 bg-sand-100 rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                whileInView={{ width: `${skill.level}%` }}
                                                transition={{ duration: 1, ease: "easeOut" }}
                                                className="h-full bg-gradient-to-r from-teal-500 to-coral-400 rounded-full"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </AnimatedSection>

                        {/* Education */}
                        <AnimatedSection delay={0.1}>
                            <h2 className="text-xl font-display font-bold text-charcoal-900 mb-6 flex items-center gap-3">
                                <GraduationCap className="w-5 h-5 text-teal-500" />
                                Education
                            </h2>
                            <div className="space-y-4">
                                {[
                                    { deg: "PhD in Computer Science", school: "Dalhousie University", sub: "Canada (In Progress)" },
                                    { deg: "MSc in Information Tech", school: "Leeds Beckett", sub: "United Kingdom (2022)" },
                                    { deg: "B.Sc. (Hons) Computing", school: "London Met", sub: "United Kingdom (2016)" }
                                ].map((edu, i) => (
                                    <div key={i} className="bg-white/70 backdrop-blur-sm p-5 rounded-2xl border border-sand-200 hover:border-teal-200 transition-colors">
                                        <div className="font-bold text-charcoal-900 text-sm mb-1">{edu.deg}</div>
                                        <div className="text-xs font-bold text-charcoal-500 mb-1">{edu.school}</div>
                                        <div className="text-[10px] font-bold text-charcoal-400 uppercase tracking-widest">{edu.sub}</div>
                                    </div>
                                ))}
                            </div>
                        </AnimatedSection>

                        {/* Credentials */}
                        <AnimatedSection delay={0.2}>
                            <h2 className="text-xl font-display font-bold text-charcoal-900 mb-6 flex items-center gap-3">
                                <Award className="w-5 h-5 text-teal-500" />
                                Credentials
                            </h2>
                            <div className="bg-white/70 backdrop-blur-sm p-6 rounded-3xl border border-sand-200 space-y-5">
                                {[
                                    { title: "PMP® Certified", inst: "Project Management Institute" },
                                    { title: "CIPS Member", inst: "Canadian Info. Processing Society" },
                                    { title: "Call for Code 2018: 2nd Place", inst: "IBM Global Challenge · 2,500+ entries" }
                                ].map((cert, i) => (
                                    <div key={i} className="flex gap-3 items-start group">
                                        <div className="mt-0.5 w-1.5 h-1.5 rounded-full bg-teal-300 group-hover:bg-teal-500 transition-colors shrink-0" />
                                        <div>
                                            <div className="font-bold text-charcoal-800 text-sm leading-tight">{cert.title}</div>
                                            <div className="text-[10px] font-medium text-charcoal-400 mt-0.5">{cert.inst}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </AnimatedSection>
                    </div>
                </div>
            </div>
        </div>
    );
}
