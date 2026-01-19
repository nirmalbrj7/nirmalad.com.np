import { Calendar, ArrowRight } from 'lucide-react';

const posts = [
    {
        title: "Beyond User Testing: Why Heuristic Evaluation is Your Secret Weapon",
        date: "February 27, 2025",
        category: "UX / Methodology",
        excerpt: "A practical look at how heuristic evaluation can reveal usability issues and design opportunities that traditional user testing may miss, and how teams can use it as a simple, repeatable method.",
        link: "https://www.linkedin.com/pulse/beyond-user-testing-why-heuristic-evaluation-your-secret-adhikari-fdkac/"
    },
    {
        title: "GIS: Its Problems and Potential Solution Approaches in the IT Profession",
        date: "September 2, 2020",
        category: "GIS / Tech Leadership",
        excerpt: "An exploration of the common challenges around GIS use in IT environments, and some direction on how teams can respond in a practical and sustainable way.",
        link: "https://www.linkedin.com/pulse/gis-its-problems-potential-solution-approaches-nirmal-adhikari/"
    },
    {
        title: "Implementation of Geographic Information System (GIS) Technology to Plan, Monitor and Manage",
        date: "September 1, 2020",
        category: "Geospatial",
        excerpt: "A discussion of how GIS can support planning, monitoring, and management in real projects, and what it takes to turn spatial data into decisions that actually change outcomes.",
        link: "https://medium.com/@nirmaladhikari/implementation-of-geographic-information-system-gis-technology-to-plan-monitor-and-manage-d22ec4d2fa9f"
    }
];

export default function Blog() {
    return (
        <div className="bg-white min-h-screen py-20 font-sans text-slate-900">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="max-w-3xl mb-16">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 font-serif mb-6">Blog & Writing</h1>
                    <p className="text-xl text-slate-600 leading-relaxed">
                        I write to capture what I am learning, to organize ideas, and to share stories from research, technology, and work with communities.
                    </p>
                </div>

                <div className="space-y-12">
                    {posts.map((post, index) => (
                        <article key={index} className="flex flex-col border-b border-slate-100 pb-12 last:border-0">
                            <div className="flex items-center text-sm text-slate-500 mb-3">
                                <span className="font-bold text-primary-600 uppercase tracking-wider mr-4">{post.category}</span>
                                <span className="flex items-center"><Calendar size={14} className="mr-2" /> {post.date}</span>
                            </div>
                            <h2 className="text-2xl font-bold text-slate-900 mb-4 hover:text-primary-700 transition-colors">
                                <a href={post.link} target="_blank" rel="noopener noreferrer">{post.title}</a>
                            </h2>
                            <p className="text-slate-600 leading-relaxed mb-6">
                                {post.excerpt}
                            </p>
                            <a href={post.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-primary-600 font-medium hover:text-primary-800 transition-colors">
                                Read on LinkedIn/Medium <ArrowRight size={16} className="ml-2" />
                            </a>
                        </article>
                    ))}
                </div>
            </div>
        </div>
    );
}
