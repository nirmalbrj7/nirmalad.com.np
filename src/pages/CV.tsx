import { Download, Award, Globe, MapPin, BookOpen, Code2, Users, CheckCircle2, Sparkles, Layout, Database, GraduationCap } from 'lucide-react';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import { MagicalCard } from '../components/ui/MagicalCard'; // Ensure consistent card style

// --- Data ---

const SKILLS = [
    { name: "IT Strategy", level: 95, icon: <Layout className="w-4 h-4" /> },
    { name: "AI/ML & Research", level: 90, icon: <Database className="w-4 h-4" /> },
    { name: "Project Management", level: 100, icon: <CheckCircle2 className="w-4 h-4" /> },
    { name: "Spatial Computing", level: 85, icon: <Globe className="w-4 h-4" /> },
];

const EXPERIENCE = [
    {
        role: "Research Assistant & TA",
        company: "Dalhousie University",
        period: "2023 – Present",
        location: "Halifax, Canada",
        description: "Advancing Human-Computer Interaction through data-driven methodologies. Designing immersive AR/VR experiences and mentoring 100+ students in Software Engineering.",
        achievements: ["Leading AR/VR lab sessions", "Contributing to peer-reviewed HCI journals", "Mentoring undergraduate students"],
        icon: <BookOpen className="w-5 h-5" />,
        color: "bg-indigo-50 text-indigo-700 ring-indigo-100",
        pill: "bg-indigo-50 text-indigo-700 border-indigo-100"
    },
    {
        role: "Technology Program Manager",
        company: "Build Change",
        period: "2022 – 2023",
        location: "USA / Global",
        description: "Orchestrated global digital transformation for resilient housing. Scaled microfinance platforms across Southeast Asia and Latin America.",
        achievements: ["Partnered with CISCO Foundation", "Scaled platforms to 3+ countries", "Managed cross-functional teams"],
        icon: <Globe className="w-5 h-5" />,
        color: "bg-emerald-50 text-emerald-700 ring-emerald-100",
        pill: "bg-emerald-50 text-emerald-700 border-emerald-100"
    },
    {
        role: "NFT Coding Hub Manager",
        company: "Build Change",
        period: "2019 – 2022",
        location: "Nepal",
        description: "Pioneered frontier-tech team for housing resilience. Digitized inspection workflows and infrastructure monitoring.",
        achievements: ["80% reduction in downtime", "Established 1st modern Dev Hub in region", "Led 15+ developer team"],
        icon: <Code2 className="w-5 h-5" />,
        color: "bg-royal-50 text-royal-700 ring-royal-100",
        pill: "bg-royal-50 text-royal-700 border-royal-100"
    },
    {
        role: "Lecturer (GIS & Remote Sensing)",
        company: "ICMS",
        period: "2023",
        location: "Kathmandu, Nepal",
        description: "Translated complex spatial data into actionable insights for disaster management students.",
        achievements: ["Designed interactive GIS curriculum", " taught 50+ students", "Developed practical labs"],
        icon: <Users className="w-5 h-5" />,
        color: "bg-rose-50 text-rose-700 ring-rose-100",
        pill: "bg-rose-50 text-rose-700 border-rose-100"
    },
    {
        role: "IT Project Manager",
        company: "Polaris IT",
        period: "2015 – 2017",
        location: "Kathmandu, Nepal",
        description: "Managed full-lifecycle enterprise IT projects for government and banking sectors.",
        achievements: ["Delivered 6+ large-scale projects", "Zero budget overruns", "Client relationship management"],
        icon: <CheckCircle2 className="w-5 h-5" />,
        color: "bg-midnight-50 text-midnight-700 ring-midnight-100",
        pill: "bg-midnight-50 text-midnight-700 border-midnight-100"
    }
];

// --- Components ---

export default function CV() {
    return (
        <div className="bg-cream-50 min-h-screen py-24 font-sans text-midnight-900 overflow-x-hidden relative">
            {/* Background Decoration */}
            <div className="fixed inset-0 pointer-events-none -z-10 bg-radial-sheen opacity-30" />
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-royal-100/40 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

                {/* Header Section - Aligned with KeyProjects/Home */}
                <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-12 items-center mb-24">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                    >
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/60 border border-white/50 shadow-sm text-[10px] font-bold uppercase tracking-[0.2em] text-midnight-500 mb-6"
                        >
                            <Sparkles size={12} className="text-royal-500" />
                            Research & Leadership
                        </motion.div>

                        <h1 className="text-5xl md:text-7xl font-display font-black text-midnight-950 tracking-tight leading-[0.95] mb-6">
                            Nirmal <br />
                            <span className="text-royal-600">Adhikari</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-royal-700 font-display italic mb-8 max-w-lg font-light">
                            "Storyteller of Resilient Technologies."
                        </p>

                        <div className="flex flex-wrap gap-6 text-midnight-600 font-medium text-sm mb-10">
                            <div className="flex items-center gap-2 px-3 py-1 bg-white/50 rounded-lg border border-white/40"><MapPin className="w-4 h-4 text-royal-500" /> Halifax, NS</div>
                            <a href="mailto:nirmalbrj7@gmail.com" className="flex items-center gap-2 hover:text-royal-600 transition-colors px-3 py-1 bg-white/50 rounded-lg border border-white/40"> nirmalbrj7@gmail.com</a>
                            <a href="https://nirmalad.com.np" className="flex items-center gap-2 hover:text-royal-600 transition-colors px-3 py-1 bg-white/50 rounded-lg border border-white/40"> nirmalad.com.np</a>
                        </div>

                        <div className="flex gap-4">
                            <a
                                href="/Nirmal_Adhikari_CV.pdf"
                                download
                                className="group inline-flex items-center justify-center px-8 py-4 bg-midnight-900 text-white rounded-full font-bold shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all"
                            >
                                <Download className="mr-2 w-5 h-5 group-hover:animate-bounce" />
                                Download CV
                            </a>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="bg-white/60 backdrop-blur-md p-10 rounded-[2.5rem] border border-white/50 shadow-xl relative hidden lg:block"
                    >
                        <div className="absolute top-8 left-8 text-6xl text-royal-100 font-serif -z-10 select-none">“</div>
                        <p className="text-xl font-display font-medium leading-relaxed text-midnight-800 italic relative z-10">
                            I thrive at the nexus of technology, innovation, and social impact—advancing projects that foster resilience and elevate user experiences.
                        </p>

                        <div className="mt-8 grid grid-cols-2 gap-8 border-t border-midnight-100/50 pt-8">
                            <div className="space-y-1">
                                <div className="text-4xl font-black text-royal-600 font-display">5+ Yrs</div>
                                <div className="text-[10px] font-bold text-midnight-400 uppercase tracking-widest">Global Experience</div>
                            </div>
                            <div className="space-y-1">
                                <div className="text-4xl font-black text-emerald-600 font-display">Award</div>
                                <div className="text-[10px] font-bold text-midnight-400 uppercase tracking-widest">Call for Code '18</div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Content Grid */}
                <div className="grid lg:grid-cols-[2fr_1fr] gap-12 lg:gap-16">

                    {/* Main Column: Experience */}
                    <div className="space-y-10">
                        <div className="flex items-center gap-4 mb-4">
                            <h2 className="text-3xl font-display font-bold text-midnight-950">Professional Experience</h2>
                            <div className="h-px flex-1 bg-midnight-100" />
                        </div>

                        <div className="space-y-6">
                            {EXPERIENCE.map((item, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-50px" }}
                                    transition={{ delay: idx * 0.1 }}
                                >
                                    <MagicalCard className="p-8 h-full">
                                        <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-6 gap-4">
                                            <div className="flex gap-4">
                                                <div className={clsx("w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-sm border border-black/5", item.color)}>
                                                    {item.icon}
                                                </div>
                                                <div>
                                                    <h3 className="text-xl font-display font-bold text-midnight-900 leading-tight">{item.role}</h3>
                                                    <div className="text-royal-600 font-bold text-sm mt-1">{item.company}</div>
                                                </div>
                                            </div>

                                            <div className="flex flex-col items-end gap-1">
                                                <div className="inline-flex items-center px-3 py-1 rounded-full bg-midnight-50 text-midnight-600 text-[10px] font-black tracking-widest uppercase border border-midnight-100">
                                                    {item.period}
                                                </div>
                                                <div className="text-xs text-midnight-400 font-bold flex items-center gap-1">
                                                    <MapPin className="w-3 h-3" /> {item.location}
                                                </div>
                                            </div>
                                        </div>

                                        <p className="text-midnight-600 leading-relaxed text-base mb-6 font-medium">
                                            {item.description}
                                        </p>

                                        <div className="flex flex-wrap gap-2">
                                            {item.achievements.map((ach, i) => (
                                                <span key={i} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-midnight-100 text-xs font-medium text-midnight-700 shadow-sm">
                                                    <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                                                    {ach}
                                                </span>
                                            ))}
                                        </div>
                                    </MagicalCard>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Sidebar Column: Skills & Education */}
                    <div className="space-y-10">

                        {/* Skills */}
                        <section>
                            <h2 className="text-xl font-display font-bold text-midnight-900 mb-6 flex items-center gap-3">
                                <Layout className="w-5 h-5 text-royal-500" />
                                Competencies
                            </h2>
                            <div className="space-y-4">
                                {SKILLS.map((skill, i) => (
                                    <div key={i} className="bg-white/60 backdrop-blur-sm p-4 rounded-2xl border border-white/50 shadow-sm">
                                        <div className="flex justify-between items-center mb-3">
                                            <span className="font-bold text-midnight-800 text-sm flex items-center gap-2">
                                                <span className="p-1.5 bg-royal-50 rounded-lg text-royal-600">{skill.icon}</span>
                                                {skill.name}
                                            </span>
                                            <span className="text-[10px] font-black text-royal-400">{skill.level}%</span>
                                        </div>
                                        <div className="h-1.5 bg-midnight-50 rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                whileInView={{ width: `${skill.level}%` }}
                                                transition={{ duration: 1, ease: "easeOut" }}
                                                className="h-full bg-royal-500 rounded-full"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Education */}
                        <section>
                            <h2 className="text-xl font-display font-bold text-midnight-900 mb-6 flex items-center gap-3">
                                <GraduationCap className="w-5 h-5 text-royal-500" />
                                Education
                            </h2>
                            <div className="space-y-4">
                                {[
                                    { deg: "PhD in Computer Science", school: "Dalhousie University", sub: "Canada (In Progress)" },
                                    { deg: "MSc in Information Tech", school: "Leeds Beckett", sub: "United Kingdom (2022)" },
                                    { deg: "B.Sc. (Hons) Computing", school: "London Met", sub: "United Kingdom (2016)" }
                                ].map((edu, i) => (
                                    <div key={i} className="bg-white/60 backdrop-blur-sm p-5 rounded-2xl border border-white/50 shadow-sm group hover:border-royal-200 transition-colors">
                                        <div className="font-bold text-midnight-900 text-sm mb-1 group-hover:text-royal-600 transition-colors">{edu.deg}</div>
                                        <div className="text-xs font-bold text-midnight-500 mb-1">{edu.school}</div>
                                        <div className="text-[10px] font-black text-midnight-300 uppercase tracking-widest">{edu.sub}</div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Credentials */}
                        <section>
                            <h2 className="text-xl font-display font-bold text-midnight-900 mb-6 flex items-center gap-3">
                                <Award className="w-5 h-5 text-royal-500" />
                                Credentials
                            </h2>
                            <div className="bg-white/60 backdrop-blur-sm p-6 rounded-3xl border border-white/50 shadow-sm space-y-5">
                                {[
                                    { title: "PMP® Certified", inst: "Project Management Institute" },
                                    { title: "CIPS Member", inst: "Canadian Info. Processing Society" },
                                    { title: "Call for Code Finalist", inst: "IBM / UN Recognition" }
                                ].map((cert, i) => (
                                    <div key={i} className="flex gap-3 items-start group">
                                        <div className="mt-0.5 w-1.5 h-1.5 rounded-full bg-royal-300 group-hover:bg-royal-500 transition-colors shrink-0" />
                                        <div>
                                            <div className="font-bold text-midnight-800 text-sm leading-tight group-hover:text-royal-700 transition-colors">{cert.title}</div>
                                            <div className="text-[10px] font-medium text-midnight-400 mt-0.5">{cert.inst}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                    </div>
                </div>
            </div>
        </div>
    );
}
