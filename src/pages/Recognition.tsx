import { Award, Star, Trophy } from 'lucide-react';

export default function Recognition() {
    return (
        <div className="bg-slate-50 min-h-screen py-20 font-sans text-slate-900">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 font-serif mb-16 text-center">Awards & Recognition</h1>

                <div className="grid md:grid-cols-2 gap-8">

                    {/* Major Award 1 */}
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 relative overflow-hidden group hover:shadow-md transition-all">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-yellow-100 rounded-bl-full -mr-4 -mt-4 opacity-50 transition-opacity group-hover:opacity-100"></div>
                        <Award className="text-yellow-500 mb-6 relative z-10" size={48} />

                        <h3 className="text-2xl font-bold text-slate-900 mb-2 relative z-10">Best Paper Award</h3>
                        <p className="text-sm font-bold text-primary-600 uppercase tracking-widest mb-4">2025</p>
                        <p className="text-slate-600 leading-relaxed">
                            "Virtual Reality for Active Aging: First-Time Experiences of Older Adults." <br />
                            <em className="text-slate-500 text-sm">Presented at Our Future is Aging: Multidisciplinary Research Informing People, Policy and Practice.</em>
                        </p>
                    </div>

                    {/* Major Award 2 */}
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 relative overflow-hidden group hover:shadow-md transition-all">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-blue-100 rounded-bl-full -mr-4 -mt-4 opacity-50 transition-opacity group-hover:opacity-100"></div>
                        <Trophy className="text-blue-500 mb-6 relative z-10" size={48} />

                        <h3 className="text-2xl font-bold text-slate-900 mb-2 relative z-10">Global Finalist</h3>
                        <p className="text-sm font-bold text-primary-600 uppercase tracking-widest mb-4">Call for Code 2018</p>
                        <p className="text-slate-600 leading-relaxed">
                            Received international attention for <strong>PD3R</strong>, an AI-assisted rapid retrofit assessment tool supporting post-disaster housing recovery.
                        </p>
                    </div>

                    {/* Certifications and others */}
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 md:col-span-2 flex flex-col md:flex-row items-center gap-8">
                        <div className="shrink-0 bg-slate-100 p-6 rounded-full text-slate-600">
                            <Star size={32} />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-slate-900 mb-2">Project Management Professional (PMP)</h3>
                            <p className="text-slate-600">
                                Certified by the Project Management Institute. Validates expertise in leading cross-functional teams and guiding digital projects across multiple countries.
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
