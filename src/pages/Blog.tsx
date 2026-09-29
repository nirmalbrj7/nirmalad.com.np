import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Calendar, ArrowUpRight, BookOpen, Clock, Map, LayoutTemplate } from 'lucide-react';
import { cn } from '@/lib/utils';
import { imageSrc } from '@/data/media';
import { AnimatedSection } from '../components/ui/AnimatedSection';
import OrganicBlob from '../components/ui/OrganicBlob';

type Topic = 'UX & Research' | 'GIS & Disasters';

interface Post {
    title: string;
    date: string;
    iso: string;
    topic: Topic;
    platform: 'LinkedIn' | 'Medium';
    readTime: string;
    excerpt: string;
    takeaways: string[];
    link: string;
    cover?: string;
}

const posts: Post[] = [
    {
        title: 'Beyond User Testing: Why Heuristic Evaluation Is Your Secret Weapon for Better UX',
        date: 'February 27, 2025',
        iso: '2025-02-27',
        topic: 'UX & Research',
        platform: 'LinkedIn',
        readTime: '9 min read',
        excerpt: 'How heuristic evaluation catches usability issues early and cheaply, before user testing, with a step-by-step guide and a downloadable template teams can reuse.',
        takeaways: ['When to run a heuristic review vs. user testing', 'A repeatable step-by-step process', 'Downloadable evaluation template'],
        link: 'https://www.linkedin.com/pulse/beyond-user-testing-why-heuristic-evaluation-your-secret-adhikari-fdkac/',
        cover: 'blog-heuristic-evaluation',
    },
    {
        title: 'GIS: Its Problems and Potential Solution Approaches in the IT Profession',
        date: 'September 2, 2020',
        iso: '2020-09-02',
        topic: 'GIS & Disasters',
        platform: 'LinkedIn',
        readTime: '9 min read',
        excerpt: 'Common challenges teams face when adopting GIS in IT environments, from data quality to skills, and practical, sustainable ways to respond.',
        takeaways: ['What a GIS really is', 'Where GIS projects go wrong', 'Practical solution approaches'],
        link: 'https://www.linkedin.com/pulse/gis-its-problems-potential-solution-approaches-nirmal-adhikari/',
    },
    {
        title: 'Implementation of Geographic Information System (GIS) Technology to Plan, Monitor and Manage',
        date: 'September 1, 2020',
        iso: '2020-09-01',
        topic: 'GIS & Disasters',
        platform: 'Medium',
        readTime: '3 min read',
        excerpt: 'Disasters hit hardest at the local level. How GIS supports planning, monitoring and managing disaster response, and what it takes to turn spatial data into decisions.',
        takeaways: ['Why local impact matters', 'GIS across plan, monitor, manage', 'From maps to decisions'],
        link: 'https://medium.com/@nirmaladhikari/implementation-of-geographic-information-system-gis-technology-to-plan-monitor-and-manage-d22ec4d2fa9f',
    },
];

const topicMeta: Record<Topic, { icon: typeof Map; gradient: string; chip: string }> = {
    'UX & Research': { icon: LayoutTemplate, gradient: 'from-coral-400 to-amber-400', chip: 'bg-coral-50 text-coral-700' },
    'GIS & Disasters': { icon: Map, gradient: 'from-teal-500 to-indigo-500', chip: 'bg-teal-50 text-teal-700' },
};

export default function Blog() {
    const [topic, setTopic] = useState<Topic | 'all'>('all');
    const visible = posts.filter((p) => topic === 'all' || p.topic === topic);
    const [featured, ...rest] = visible;

    return (
        <div className="min-h-screen py-20 md:py-32 relative">
            <OrganicBlob color="teal" size="lg" className="top-0 left-1/4 -translate-y-1/4" delay={0} />
            <OrganicBlob color="coral" size="md" className="bottom-1/4 right-0 translate-x-1/3" delay={2} />

            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <AnimatedSection className="max-w-3xl mb-10">
                    <div className="flex items-center gap-3 mb-4">
                        <BookOpen size={24} className="text-teal-600" />
                        <span className="text-teal-600 font-semibold tracking-widest uppercase text-xs">Writing</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-charcoal-900 mb-6">Blog & Articles</h1>
                    <p className="text-lg md:text-xl text-charcoal-600 leading-relaxed">
                        I write to capture what I am learning, to organise ideas, and to share stories from research,
                        technology and work with communities.
                    </p>
                </AnimatedSection>

                <div className="flex flex-wrap gap-2 mb-10">
                    {(['all', 'UX & Research', 'GIS & Disasters'] as const).map((t) => (
                        <button
                            key={t}
                            onClick={() => setTopic(t)}
                            aria-pressed={topic === t}
                            className={cn('px-4 py-2 rounded-full text-sm font-semibold border transition-colors', topic === t ? 'bg-charcoal-900 border-charcoal-900 text-white' : 'bg-white border-sand-200 text-charcoal-700 hover:border-charcoal-300')}
                        >
                            {t === 'all' ? `All posts (${posts.length})` : t}
                        </button>
                    ))}
                </div>

                <AnimatePresence mode="wait">
                    <motion.div key={topic} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
                        {featured && <PostCard post={featured} featured />}
                        <div className="grid md:grid-cols-2 gap-6 mt-6">
                            {rest.map((p) => <PostCard key={p.link} post={p} />)}
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
}

function PostCard({ post, featured }: { post: Post; featured?: boolean }) {
    const meta = topicMeta[post.topic];
    const Icon = meta.icon;

    return (
        <motion.a
            href={post.link}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ y: -4 }}
            className={cn(
                'group block rounded-3xl bg-white border border-sand-200 hover:border-teal-200 hover:shadow-xl overflow-hidden transition-[border-color,box-shadow]',
                featured && 'md:grid md:grid-cols-[1.1fr_1fr]',
            )}
        >
            <div className={cn('relative overflow-hidden bg-gradient-to-br', meta.gradient, featured ? 'aspect-[16/10] md:aspect-auto md:min-h-full' : 'aspect-[16/8]')}>
                {post.cover ? (
                    <img src={imageSrc(post.cover, true)} alt="" loading="lazy" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                ) : (
                    <>
                        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '18px 18px' }} />
                        <Icon size={featured ? 96 : 64} className="absolute right-6 bottom-4 text-white/40" strokeWidth={1.2} />
                        <p className="absolute left-6 top-6 right-24 font-display font-bold text-white/90 text-lg leading-snug line-clamp-3">{post.topic}</p>
                    </>
                )}
                <span className="absolute left-4 bottom-4 px-2.5 py-1 rounded-full bg-white/90 text-charcoal-800 text-[11px] font-bold">{post.platform}</span>
            </div>
            <div className="p-6 md:p-8 flex flex-col">
                <div className="flex flex-wrap items-center gap-3 text-xs mb-4">
                    <span className={cn('font-bold uppercase tracking-wider px-2.5 py-1 rounded-full', meta.chip)}>{post.topic}</span>
                    <span className="flex items-center text-charcoal-400"><Calendar size={13} className="mr-1" /> <time dateTime={post.iso}>{post.date}</time></span>
                    <span className="flex items-center text-charcoal-400"><Clock size={13} className="mr-1" /> {post.readTime}</span>
                </div>
                <h2 className={cn('font-bold text-charcoal-900 mb-3 font-display group-hover:text-teal-700 transition-colors', featured ? 'text-2xl md:text-3xl' : 'text-xl')}>{post.title}</h2>
                <p className="text-charcoal-600 leading-relaxed mb-4">{post.excerpt}</p>
                <ul className="space-y-1.5 mb-5">
                    {post.takeaways.map((t) => (
                        <li key={t} className="flex gap-2 text-sm text-charcoal-600"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-teal-500 shrink-0" /> {t}</li>
                    ))}
                </ul>
                <span className="mt-auto inline-flex items-center gap-2 text-teal-700 font-semibold group-hover:gap-3 transition-all">
                    Read on {post.platform} <ArrowUpRight size={18} />
                </span>
            </div>
        </motion.a>
    );
}
