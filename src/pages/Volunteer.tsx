import { Heart, Users, Globe } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Volunteer() {
    return (
        <div className="bg-cream-50 min-h-screen py-20 font-sans text-midnight-900">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-midnight-900 font-display mb-6">Volunteering & Service</h1>
                    <p className="text-xl text-midnight-600 leading-relaxed max-w-2xl mx-auto">
                        I give my time to communities that shape the future of computing, from international conferences to global classrooms. These roles keep me grounded in collaboration and mentorship.
                    </p>
                </div>

                <div className="grid gap-12">

                    {/* Conference Service */}
                    <motion.div
                        initial={{ opacity: 0, y: 18 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-80px" }}
                        transition={{ duration: 0.6 }}
                        className="surface-card rounded-3xl p-8 md:p-10"
                    >
                        <div className="flex items-center mb-8">
                            <div className="bg-indigo-100 p-3 rounded-full text-indigo-600 mr-4">
                                <Users size={28} />
                            </div>
                            <h2 className="text-2xl font-bold text-midnight-900">Conference Service</h2>
                        </div>

                        <div className="space-y-8 pl-4 border-l-2 border-indigo-50">
                            <div className="relative pl-8">
                                <div className="absolute -left-[9px] top-2 w-4 h-4 rounded-full bg-indigo-500 border-4 border-indigo-100"></div>
                                <h3 className="text-xl font-bold text-midnight-900">Web Chair, ACM Symposium on Spatial User Interaction (SUI 2025)</h3>
                                <p className="text-sm text-midnight-500 font-mono mb-2">Dec 2025 - Present</p>
                                <p className="text-midnight-600">
                                    Managing the official website and working with the organizing committee to share clear, timely information for the spatial user interaction community.
                                </p>
                            </div>

                            <div className="relative pl-8">
                                <div className="absolute -left-[9px] top-2 w-4 h-4 rounded-full bg-indigo-500 border-4 border-indigo-100"></div>
                                <h3 className="text-xl font-bold text-midnight-900">Web Chair, ACM VRST 2025</h3>
                                <p className="text-sm text-midnight-500 font-mono mb-2">Dec 2025 - Present</p>
                                <p className="text-midnight-600">
                                    Responsible for digital presence of the Symposium on Virtual Reality Software and Technology. Supporting researchers and developers shaping the future of VR tools.
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Teaching Service */}
                    <motion.div
                        initial={{ opacity: 0, y: 18 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-80px" }}
                        transition={{ duration: 0.6, delay: 0.05 }}
                        className="surface-card rounded-3xl p-8 md:p-10"
                    >
                        <div className="flex items-center mb-8">
                            <div className="bg-emerald-100 p-3 rounded-full text-emerald-600 mr-4">
                                <Globe size={28} />
                            </div>
                            <h2 className="text-2xl font-bold text-midnight-900">Global Teaching & Mentorship</h2>
                        </div>

                        <div className="prose prose-lg text-midnight-600">
                            <h3 className="text-lg font-bold text-midnight-900">Volunteer Instructor, University of the People</h3>
                            <p className="text-sm text-midnight-500 font-mono mb-4">Apr 2025 - Present</p>
                            <p>
                                Mentoring undergraduate students from around the world in courses ranging from <strong>Introduction to CS</strong> to <strong>Artificial Intelligence</strong>.
                            </p>
                            <p>
                                I focus on building confidence and curiosity in students who are often studying under challenging personal and geographic circumstances. Teaching is a form of service that connects theory with hope and practical skills.
                            </p>
                        </div>
                    </motion.div>

                    {/* Disaster Response */}
                    <motion.div
                        initial={{ opacity: 0, y: 18 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-80px" }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="surface-card rounded-3xl p-8 md:p-10"
                    >
                        <div className="flex items-center mb-8">
                            <div className="bg-rose-100 p-3 rounded-full text-rose-600 mr-4">
                                <Heart size={28} />
                            </div>
                            <h2 className="text-2xl font-bold text-midnight-900">Community & Disaster Response</h2>
                        </div>

                        <div className="prose prose-lg text-midnight-600">
                            <h3 className="text-lg font-bold text-midnight-900">Nepal Earthquake Recovery (2015)</h3>
                            <p>
                                Technical volunteering during the 2015 Nepal Earthquake recovery. Assisted in setting up communication channels and IT logistics for relief efforts, ensuring help reached those who needed it most.
                            </p>
                        </div>
                    </motion.div>

                </div>
            </div>
        </div>
    );
}
