import { Layers, Zap, Smartphone, HardHat, LandPlot, Building2, Globe, BookOpen, Landmark, ScanFace } from 'lucide-react';
import { MagicalCard } from '../components/ui/MagicalCard';
import { motion } from 'framer-motion';

const categories = [
    {
        name: "Global Digital Platforms",
        description: "Large-scale systems for resilient housing and recovery.",
        color: "blue",
        projects: [
            {
                title: "Resilient Housing in a Box (RHIAB)",
                role: "Tech Lead & Program Manager",
                period: "2022 - 2023",
                desc: "I led the design and delivery of RHIAB, a comprehensive web-based technology solution that supports every stage of a resilient housing program. The platform guides users from enrollment and assessment through design, finance, and project closeout.",
                impact: "RHIAB made it possible for teams to manage large housing programs with better clarity and less friction. It improved reporting, data quality, and coordination, and offered a scalable model adaptable for different contexts.",
                tags: ["Web Platform", "Housing Recovery", "Systems Design"],
                icon: Building2
            },
            {
                title: "Technical Assistance Platform",
                role: "Tech Lead & Program Manager",
                period: "2021 - 2023",
                desc: "I oversaw the development of a flexible information management platform for resilient housing projects. The system includes advanced form building, data collection, resource library, design tools, and multiple integrations.",
                impact: "The platform became a central nervous system for programs. It helped teams see where each house, family, and project stood and made project management more transparent and accountable.",
                tags: ["Info Management", "Data Collection", "Workflow"],
                icon: Layers
            },
            {
                title: "Housing Recovery Project MIS (Dominica)",
                role: "Technology Lead",
                period: "2019 - 2022",
                desc: "I led the development of the Management Information System for the Housing Recovery Project in Dominica, supporting beneficiary registration, screening, and financial delivery for rebuilding 1,700+ homes.",
                impact: "The system allowed the project team to manage a complex, high-stakes recovery effort with clarity and traceability, giving families a structured path to safe homes.",
                tags: ["MIS", "World Bank", "Crisis Recovery"],
                icon: HardHat
            },
            {
                title: "National Home Improvement Program (Colombia)",
                role: "Technical Advisor",
                period: "2019 - 2022",
                desc: "I advised on technical resources and a customized Technical Assistance Platform for Colombia's National Home Improvement Program (Box of Popular Housing), targeting the improvement of 600,000+ units.",
                impact: "My work helped bring global expertise into a national scale effort, supporting better tools and systems for large-scale housing improvements affecting hundreds of thousands of families.",
                tags: ["Technical Strategy", "Scale", "Government"],
                icon: Globe
            }
        ]
    },
    {
        name: "AI & Quality Assurance",
        description: "Leveraging Artificial Intelligence for safety and inspection.",
        color: "purple",
        projects: [
            {
                title: "ISAC-SIMO Open Source QA",
                role: "Project Manager & Tech Lead",
                period: "2020 - 2021",
                desc: "Directed the development of ISAC-SIMO, an open-source system (IBM + Linux Foundation) helping homeowners validate construction quality via mobile app and AI-backed image evaluation.",
                impact: "The system gives homeowners a way to check construction quality themselves, increasing trust, safety, and accountability in the building process.",
                tags: ["Open Source", "AI/ML", "IBM"],
                icon: Zap
            },
            {
                title: "PD3R (Nepal)",
                role: "Project Manager",
                period: "2018 - 2019",
                desc: "Managed a mobile/web system using AI to assess retrofit potential of post-disaster houses. Led full lifecycle from model design to field deployment. Global finalist in Call for Code 2018.",
                impact: "Demonstrated how AI can support faster, more consistent, and safer decisions in post-disaster housing recovery.",
                tags: ["AI", "Call for Code", "Retrofit"],
                icon: ScanFace
            }
        ]
    },
    {
        name: "Field Systems, Monitoring & Training",
        description: "Mobile tools facilitating on-site operations and skills.",
        color: "emerald",
        projects: [
            {
                title: "Construction Guidelines System (Philippines)",
                role: "Project Lead",
                period: "2019 - 2022",
                desc: "Led an integrated web/mobile system serving as a central repository for reports and process steps, connecting to a mobile app for tracking field progress.",
                impact: "Helped enforce good construction practices, made tracking site-level progress easier, and improved communication between field staff and supervisors.",
                tags: ["Mobile App", "Compliance", "Field Ops"],
                icon: Smartphone
            },
            {
                title: "Competency Based Training System (Nepal)",
                role: "Project Lead",
                period: "2018 - 2019",
                desc: "Created a system to manage on-the-job training for construction workers, tracking attendance and daily progress with an offline-capable mobile app.",
                impact: "Made training structured and transparent, helping the program build practical skills in the construction workforce at scale.",
                tags: ["EdTech", "Training", "Offline-First"],
                icon: BookOpen
            },
            {
                title: "STFC Monitoring System (Nuwakot)",
                role: "Project Lead",
                period: "2018 - 2019",
                desc: "Developed the monitoring MIS for the Socio-Technical Facilitation project, recording data on beneficiaries, inspections, and reconstruction stages.",
                impact: "Gave the team a complete picture of thousands of homes' progress and ensured technical assistance reached the right families at the right time.",
                tags: ["Monitoring", "Data Viz", "MIS"],
                icon: LandPlot
            },
            {
                title: "Socio-Technical Facilitation (Nuwakot)",
                role: "Technical Assistance Provider",
                period: "2018 - 2019",
                desc: "Worked directly with 23,000+ earthquake-affected homeowners, advising on safe rebuilding and using the monitoring systems I helped build.",
                impact: "Helped families rebuild safer homes and supported a homeowner-driven reconstruction model respecting local needs.",
                tags: ["Community", "Advisory", "Field Work"],
                icon: HardHat
            }
        ]
    },
    {
        name: "Mobile, Awareness & Immersive",
        description: "Engaging communities through apps and VR experiences.",
        color: "rose",
        projects: [
            {
                title: "Mobile Awareness Apps",
                role: "Development Manager",
                period: "2018 - 2021",
                desc: "Managed 'Tibay Balay', 'Surakshit Ghar', and 'Rumah Aman' apps across Philippines, Nepal, and Indonesia. Provided construction libraries and interactive tools.",
                impact: "Brought expert device advice directly to people on-site, facilitating safer choices during reconstruction.",
                tags: ["Mobile", "Education", "Multi-Region"],
                icon: Smartphone
            },
            {
                title: "Global Risk Awareness App",
                role: "Project Lead & Developer",
                period: "2018 - 2021",
                desc: "Developed an app displaying hazard maps and safe zones. Users can mark their homes to see vulnerability to specific natural hazards.",
                impact: "Supports better everyday decisions about risk and preparedness for communities in disaster-prone areas.",
                tags: ["GIS", "Risk Mapping", "React Native"],
                icon: LandPlot
            },
            {
                title: "Eklephat Village VR Tour",
                role: "Project Coordinator",
                period: "2018",
                desc: "Coordinated an immersive VR tour showcasing retrofitted houses using stitched 360-degree images for a guided experience.",
                impact: "Served as a powerful advocacy tool, allowing donors and partners to experience retrofit results without traveling.",
                tags: ["VR", "Immersive", "Storytelling"],
                icon: Layers
            }
        ]
    },
    {
        name: "Policy, Finance & Technical Guidance",
        description: "Strategic resources for financial and organizational growth.",
        color: "amber",
        projects: [
            {
                title: "Microfinance Strengthening (Indonesia/Philippines)",
                role: "Technical Advisor",
                period: "2022 - 2023",
                desc: "Contributed to resources helping microfinance institutions integrate disaster prevention into lending, including product design and technical workflows.",
                impact: "Enabled financial institutions to support affordable home strengthening loans, allowing families to improve safety before disasters.",
                tags: ["Microfinance", "Policy", "Strategy"],
                icon: Landmark
            },
            {
                title: "Build Change Website Redesign",
                role: "Product Manager",
                period: "2022 - 2023",
                desc: "Managed the complete redesign of buildchange.org with a refreshed identity, responsive design, and rich resource library.",
                impact: "Improved discovery of resources and strengthened the organization's global digital presence and storytelling.",
                tags: ["Product Mgmt", "Web Design", "Branding"],
                icon: Globe
            }
        ]
    }
];

export default function KeyProjects() {
    return (
        <div className="bg-cream-50 min-h-screen py-20 font-sans text-midnight-900">
            <div className="bg-noise" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">

                <div className="max-w-3xl mx-auto text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 className="text-5xl md:text-6xl font-black text-midnight-950 font-serif mb-6 tracking-tight">
                            Key Projects<span className="text-royal-500">.</span>
                        </h1>
                        <p className="text-xl text-midnight-700 leading-relaxed font-light">
                            These projects tell the story of my work with communities, governments, and teams across the world. Each system, platform, and tool was built to solve real problems and to give people more control over their homes, data, and decisions.
                        </p>
                    </motion.div>
                </div>

                <div className="space-y-24">
                    {categories.map((cat, catIdx) => (
                        <section key={catIdx}>
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5 }}
                                className="flex items-end mb-10"
                            >
                                <div>
                                    <h2 className="text-3xl font-bold text-midnight-900 font-serif">{cat.name}</h2>
                                    <p className="text-midnight-500 text-sm mt-2 font-medium bg-white/50 inline-block px-3 py-1 rounded-full backdrop-blur-sm border border-white/20">
                                        {cat.description}
                                    </p>
                                </div>
                                <span className="h-px flex-grow bg-gradient-to-r from-midnight-100 to-transparent ml-6 mb-2"></span>
                            </motion.div>

                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {cat.projects.map((project, idx) => (
                                    <MagicalCard key={idx} className="p-8 h-full flex flex-col group">
                                        <div className="flex justify-between items-start mb-6">
                                            <div className={`p-3 rounded-2xl bg-${cat.color}-50 text-${cat.color}-600 ring-1 ring-${cat.color}-100 transition-colors duration-300 group-hover:bg-${cat.color}-100`}>
                                                <project.icon size={28} />
                                            </div>
                                            <span className="text-[10px] font-bold tracking-widest uppercase text-midnight-400 bg-midnight-50/50 px-2 py-1 rounded backdrop-blur-sm">{project.period}</span>
                                        </div>

                                        <h3 className="text-xl font-bold text-midnight-900 mb-2 font-serif">{project.title}</h3>
                                        <div className="text-xs font-bold text-royal-600 uppercase tracking-wider mb-4 border-b border-dashed border-midnight-100 pb-4 w-full">{project.role}</div>

                                        <p className="text-midnight-600 text-sm leading-relaxed mb-6 font-light">
                                            {project.desc}
                                        </p>

                                        {project.impact && (
                                            <div className="mb-6 p-4 bg-midnight-50/50 rounded-xl border border-midnight-100/50">
                                                <span className="text-[10px] font-bold text-royal-600 uppercase tracking-wider block mb-1">Impact</span>
                                                <p className="text-midnight-700 text-xs italic leading-relaxed">
                                                    "{project.impact}"
                                                </p>
                                            </div>
                                        )}

                                        <div className="flex flex-wrap gap-2 mt-auto">
                                            {project.tags.map((tag, tIdx) => (
                                                <span key={tIdx} className="text-[10px] uppercase tracking-wide bg-white text-midnight-500 px-3 py-1 rounded-full font-medium border border-midnight-50 shadow-sm">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </MagicalCard>
                                ))}
                            </div>
                        </section>
                    ))}
                </div>

            </div>
        </div>
    );
}
