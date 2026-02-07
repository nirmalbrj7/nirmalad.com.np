import { Calendar, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

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
        <div className="bg-cream-50 min-h-screen py-20 font-sans text-midnight-900">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="max-w-3xl mb-16">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-midnight-900 font-display mb-6">Blog & Writing</h1>
                    <p className="text-xl text-midnight-600 leading-relaxed">
                        I write to capture what I am learning, to organize ideas, and to share stories from research, technology, and work with communities.
                    </p>
                </div>

                <div className="grid gap-8">
                    {posts.map((post, index) => (
                        <motion.article
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-80px" }}
                            transition={{ duration: 0.6, delay: index * 0.05 }}
                            className="surface-card rounded-3xl p-8 md:p-10"
                        >
                            <div className="flex flex-wrap items-center gap-4 text-xs text-midnight-500 mb-4">
                                <span className="font-bold text-royal-700 uppercase tracking-wider">{post.category}</span>
                                <span className="flex items-center"><Calendar size={14} className="mr-2" /> {post.date}</span>
                            </div>
                            <h2 className="text-2xl md:text-3xl font-bold text-midnight-900 mb-4 font-display hover:text-royal-700 transition-colors">
                                <a href={post.link} target="_blank" rel="noopener noreferrer">{post.title}</a>
                            </h2>
                            <p className="text-midnight-600 leading-relaxed mb-6">
                                {post.excerpt}
                            </p>
                            <a href={post.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-royal-700 font-medium hover:text-royal-900 transition-colors">
                                Read on LinkedIn/Medium <ArrowRight size={16} className="ml-2" />
                            </a>
                        </motion.article>
                    ))}
                </div>
            </div>
        </div>
    );
}
