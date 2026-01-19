import { GraduationCap, Briefcase, BookOpen, Calendar, MapPin, Globe } from 'lucide-react';
import ResearchGraph from '../components/viz/ResearchGraph';

const experiences = [
    {
        role: "Research Assistant",
        organization: "Dalhousie University",
        location: "Halifax, Canada",
        date: "Sept 2023 - Present",
        description: "Supporting research in AR, VR, and human–computer interaction. Designing and running user studies in real spaces, analyzing behavioral data, and co-authoring manuscripts for HCI conferences.",
        icon: BookOpen,
    },
    {
        role: "Teaching Assistant",
        organization: "Dalhousie University",
        location: "Halifax, Canada",
        date: "Jan 2024 - Present",
        description: "Guiding students in Augmented and Virtual Reality, Software Engineering, and HCI courses. Mentoring groups on design prototypes and code.",
        icon: Briefcase,
    },
    {
        role: "Lecturer, GIS and Remote Sensing",
        organization: "Institute of Crisis Management Studies (ICMS)",
        location: "Kathmandu, Nepal",
        date: "Mar 2023 - Aug 2023",
        description: "Designed and delivered an applied course for the Master in Crisis Management program, linking spatial analysis with disaster preparedness.",
        icon: Briefcase,
    },
    {
        role: "Volunteer Instructor",
        organization: "University of the People (Global Online)",
        location: "Remote",
        date: "Apr 2025 - Present",
        description: "Mentoring undergraduate students globally in CS fundamentals, AI, and Data Mining, focusing on building confidence in challenging circumstances.",
        icon: Globe
    }
];

const education = [
    {
        degree: "PhD in Computer Science",
        institution: "Dalhousie University",
        location: "Halifax, Canada",
        year: "In Progress",
        description: "Focus on immersive AR narratives, spatial analysis, and human–space interaction. Studying how spatial layout and narrative structure shape presence and memory.",
        icon: GraduationCap,
    },
    {
        degree: "MSc in Information Technology",
        institution: "The British College, Leeds Beckett University",
        location: "UK / Nepal",
        year: "2022",
        description: "Thesis: Artificial Intelligence-based System Architecture for Flood Forecasting.",
        icon: GraduationCap,
    },
    {
        degree: "BSc (Hons) in Computing",
        institution: "Islington College, London Metropolitan University",
        location: "UK / Nepal",
        year: "2016",
        description: "Final Year Project: Transport Management System with Driver’s Android Tracking.",
        icon: GraduationCap,
    },
];

export default function Academic() {
    return (
        <div className="bg-white min-h-screen py-20 font-sans text-slate-900">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <div className="max-w-3xl mb-20">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 font-serif mb-6">Academic Profile</h1>
                    <p className="text-xl text-slate-600 leading-relaxed">
                        My academic work grows from real problems, real communities, and the desire to understand how people move, learn, and live with technology in their everyday spaces.
                    </p>
                </div>

                {/* Research Interests & Viz */}
                <section className="mb-24">
                    <h2 className="text-2xl font-bold text-slate-900 mb-8 border-b border-slate-200 pb-4">Research Interests</h2>
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div className="prose prose-lg text-slate-600">
                            <p>
                                I am interested in how technology shapes experience, space, and decision making. My current focus includes:
                            </p>
                            <ul className="list-disc pl-5 space-y-2">
                                <li>Immersive augmented and virtual reality experiences in real-world spaces</li>
                                <li>Human–computer interaction and human–space interaction</li>
                                <li>Spatial storytelling, narrative placement, and mixed reality design</li>
                                <li>Data-driven resilience, disaster risk reduction, and housing technologies</li>
                                <li>AI and machine learning applications for decision support</li>
                            </ul>
                        </div>
                        <div>
                            {/* D3 Graph Component */}
                            <ResearchGraph />
                            <p className="text-center text-sm text-slate-400 mt-4">Interactive Network of Research Areas</p>
                        </div>
                    </div>
                </section>

                {/* Experience Section */}
                <section className="mb-24">
                    <h2 className="text-2xl font-bold text-slate-900 mb-10 flex items-center">
                        <Briefcase className="mr-3 text-primary-600" /> Professional & Teaching Experience
                    </h2>
                    <div className="space-y-6">
                        {experiences.map((item, index) => (
                            <div key={index} className="bg-slate-50 rounded-xl p-8 border border-slate-100 hover:border-primary-200 transition-colors">
                                <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                                    <div>
                                        <h3 className="text-xl font-bold text-slate-900">{item.role}</h3>
                                        <div className="text-primary-700 font-medium text-lg">{item.organization}</div>
                                    </div>
                                    <div className="flex flex-col md:items-end text-sm text-slate-500 mt-2 md:mt-0 font-mono">
                                        <span className="flex items-center"><Calendar size={14} className="mr-2" /> {item.date}</span>
                                        <span className="flex items-center mt-1"><MapPin size={14} className="mr-2" /> {item.location}</span>
                                    </div>
                                </div>
                                <p className="text-slate-600 leading-relaxed max-w-4xl">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Education Section */}
                <section>
                    <h2 className="text-2xl font-bold text-slate-900 mb-10 flex items-center">
                        <GraduationCap className="mr-3 text-primary-600" /> Education
                    </h2>
                    <div className="space-y-12">
                        {education.map((item, index) => (
                            <div key={index} className="relative pl-8 md:pl-0">
                                {/* Timeline Logic (Pure CSS/Visual) */}
                                <div className="md:flex gap-8 group">
                                    <div className="hidden md:block w-32 text-right pt-1 font-mono text-sm text-slate-400 shrink-0">
                                        {item.year}
                                    </div>

                                    <div className="border-l-2 border-slate-200 pl-8 pb-12 relative">
                                        <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-white border-4 border-primary-500"></div>

                                        {/* Mobile Date */}
                                        <span className="md:hidden inline-block px-2 py-1 mb-2 text-xs font-mono font-bold bg-primary-50 text-primary-700 rounded-md">
                                            {item.year}
                                        </span>

                                        <h3 className="text-2xl font-bold text-slate-900">{item.degree}</h3>
                                        <div className="text-lg text-slate-700 mb-2">{item.institution}, {item.location}</div>
                                        <p className="text-slate-600">{item.description}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

            </div>
        </div>
    );
}
