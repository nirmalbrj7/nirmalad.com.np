import { Download, CheckCircle2 } from 'lucide-react';

export default function CV() {
    return (
        <div className="bg-cream-50 min-h-screen py-20 font-sans text-midnight-900">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header Section */}
                <div className="text-center mb-16 space-y-6">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-midnight-900 font-serif">Nirmal Adhikari, PMP</h1>
                    <div className="text-sm md:text-base text-midnight-600 font-medium space-x-2 md:space-x-4 flex flex-wrap justify-center items-center">
                        <span>Halifax, Nova Scotia</span>
                        <span className="hidden md:inline">•</span>
                        <a href="mailto:nirmalbrj7@gmail.com" className="hover:text-royal-600 transition-colors">nirmalbrj7@gmail.com</a>
                        <span className="hidden md:inline">•</span>
                        <a href="https://nirmalad.com.np" className="hover:text-royal-600 transition-colors">nirmalad.com.np</a>
                    </div>

                    <div className="max-w-3xl mx-auto italic text-midnight-700 text-lg md:text-xl border-l-4 border-royal-500 pl-6 py-2 bg-white/50 rounded-r-lg shadow-sm">
                        “I thrive at the nexus of technology, innovation, and social impact—advancing projects that foster resilience, elevate user experiences, and shape a better future.”
                    </div>

                    <div className="mt-8">
                        <a
                            href="/Nirmal_Adhikari_CV.pdf"
                            download="Nirmal_Adhikari_CV.pdf"
                            className="inline-flex items-center px-8 py-3 border border-transparent text-lg font-medium rounded-full shadow-lg text-white bg-royal-600 hover:bg-royal-700 hover:scale-105 transition-all group"
                        >
                            <Download size={20} className="mr-3 group-hover:animate-bounce" />
                            Download Full CV
                        </a>
                    </div>
                </div>

                <div className="space-y-12">

                    {/* Summary */}
                    <section className="bg-white p-8 md:p-10 rounded-3xl shadow-sm border border-cream-200">
                        <h2 className="text-2xl font-serif font-bold text-midnight-900 mb-6 flex items-center">
                            <span className="w-8 h-1 bg-royal-500 mr-4 rounded-full"></span>
                            Global IT Leader & Researcher
                        </h2>
                        <p className="text-midnight-700 leading-relaxed text-lg">
                            Relentless innovator with 5+ years of global success in IT management, software development, and emerging technologies (AI, ML, AR/VR, IoT). Winner of the 2018 Call for Code challenge. Proven track record in leading cross-functional teams, transforming business processes, and delivering cutting-edge digital solutions for multinational organizations and governments. Adept at bridging industry and academia to pioneer data-driven solutions that optimize costs, minimize downtime, and revolutionize user experiences.
                        </p>
                    </section>

                    {/* Career Highlights */}
                    <section className="grid md:grid-cols-2 gap-6">
                        <div className="bg-white p-8 rounded-3xl shadow-sm border border-cream-200">
                            <h3 className="text-xl font-bold text-midnight-900 mb-4 text-royal-700">Strategic Impact</h3>
                            <ul className="space-y-4 text-midnight-700">
                                <li className="flex gap-3"><CheckCircle2 size={20} className="text-royal-500 shrink-0 mt-1" /><span><strong>Revolutionized IT Ecosystems:</strong> Slashed downtime by 80% and boosted data integrity by 60%.</span></li>
                                <li className="flex gap-3"><CheckCircle2 size={20} className="text-royal-500 shrink-0 mt-1" /><span><strong>Strategic Cost Optimization:</strong> Reduced software expenses by 60% via digital transformation strategies.</span></li>
                            </ul>
                        </div>
                        <div className="bg-white p-8 rounded-3xl shadow-sm border border-cream-200">
                            <h3 className="text-xl font-bold text-midnight-900 mb-4 text-royal-700">Innovation & Global Reach</h3>
                            <ul className="space-y-4 text-midnight-700">
                                <li className="flex gap-3"><CheckCircle2 size={20} className="text-royal-500 shrink-0 mt-1" /><span><strong>Global Program Management:</strong> Oversaw projects in USA, Nepal, Indonesia, Philippines, Colombia.</span></li>
                                <li className="flex gap-3"><CheckCircle2 size={20} className="text-royal-500 shrink-0 mt-1" /><span><strong>Award-Winning:</strong> Key contributor to “PD3R”, recognized at 2018 Call for Code.</span></li>
                            </ul>
                        </div>
                    </section>

                    {/* Professional Experience */}
                    <section>
                        <h2 className="text-3xl font-serif font-bold text-midnight-900 mb-8 pb-4 border-b border-cream-200">Professional Experience</h2>
                        <div className="space-y-12">

                            {/* Role 1 */}
                            <div className="group">
                                <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-2">
                                    <h3 className="text-2xl font-bold text-midnight-900 group-hover:text-royal-600 transition-colors">Dalhousie University</h3>
                                    <span className="text-midnight-500 font-medium bg-cream-100 px-3 py-1 rounded-full text-sm">Halifax, Canada</span>
                                </div>

                                <div className="ml-4 border-l-2 border-cream-200 pl-6 pb-6 space-y-6">
                                    <div className="relative">
                                        <div className="absolute -left-[31px] top-2 w-3 h-3 bg-royal-400 rounded-full ring-4 ring-white"></div>
                                        <h4 className="text-lg font-bold text-midnight-800">Research Assistant</h4>
                                        <span className="text-sm text-midnight-500 block mb-2">Sept 2023 – Present</span>
                                        <p className="text-midnight-600">Developing data-driven methodologies and contributing to peer-reviewed journals in Human-Computer Interaction and AR/VR.</p>
                                    </div>
                                    <div className="relative">
                                        <div className="absolute -left-[31px] top-2 w-3 h-3 bg-royal-400 rounded-full ring-4 ring-white"></div>
                                        <h4 className="text-lg font-bold text-midnight-800">Teaching Assistant</h4>
                                        <span className="text-sm text-midnight-500 block mb-2">Jan 2024 – Present</span>
                                        <p className="text-midnight-600">Instructing in AR/VR, Software Engineering, and UI/HCI. Delivering lab sessions and mentoring students on real-world projects.</p>
                                    </div>
                                </div>
                            </div>

                            {/* Role 2 */}
                            <div className="group">
                                <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-2">
                                    <h3 className="text-2xl font-bold text-midnight-900 group-hover:text-royal-600 transition-colors">Build Change</h3>
                                    <span className="text-midnight-500 font-medium bg-cream-100 px-3 py-1 rounded-full text-sm">USA / Nepal</span>
                                </div>
                                <div className="ml-4 border-l-2 border-cream-200 pl-6 pb-6 space-y-6">
                                    <div className="relative">
                                        <div className="absolute -left-[31px] top-2 w-3 h-3 bg-royal-400 rounded-full ring-4 ring-white"></div>
                                        <h4 className="text-lg font-bold text-midnight-800">Technology Program Manager</h4>
                                        <span className="text-sm text-midnight-500 block mb-2">Mar 2022 – Aug 2023</span>
                                        <ul className="list-disc list-outside ml-4 text-midnight-600 space-y-1">
                                            <li>Spearheaded digital platforms for microfinance in Indonesia/Philippines.</li>
                                            <li>Partnered with CISCO Foundation on "Resilient Housing in a Box".</li>
                                        </ul>
                                    </div>
                                    <div className="relative">
                                        <div className="absolute -left-[31px] top-2 w-3 h-3 bg-royal-400 rounded-full ring-4 ring-white"></div>
                                        <h4 className="text-lg font-bold text-midnight-800">NFT Coding Hub Manager</h4>
                                        <span className="text-sm text-midnight-500 block mb-2">Jan 2019 – Mar 2022</span>
                                        <p className="text-midnight-600">Established a new IT team focused on frontier tech, cutting organizational downtime by 80%.</p>
                                    </div>
                                </div>
                            </div>

                            {/* Role 3 */}
                            <div className="group">
                                <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-2">
                                    <h3 className="text-2xl font-bold text-midnight-900 group-hover:text-royal-600 transition-colors">Institute of Crisis Management Studies</h3>
                                    <span className="text-midnight-500 font-medium bg-cream-100 px-3 py-1 rounded-full text-sm">Kathmandu, Nepal</span>
                                </div>
                                <div className="ml-4 border-l-2 border-cream-200 pl-6 pb-6">
                                    <div className="relative">
                                        <div className="absolute -left-[31px] top-2 w-3 h-3 bg-royal-400 rounded-full ring-4 ring-white"></div>
                                        <h4 className="text-lg font-bold text-midnight-800">Lecturer (GIS & Remote Sensing)</h4>
                                        <span className="text-sm text-midnight-500 block mb-2">Mar 2023 – Aug 2023</span>
                                        <p className="text-midnight-600">Designed interactive courses on spatial data analysis and mentored students on advanced GIS.</p>
                                    </div>
                                </div>
                            </div>

                            {/* Role 4 */}
                            <div className="group">
                                <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-2">
                                    <h3 className="text-2xl font-bold text-midnight-900 group-hover:text-royal-600 transition-colors">Polaris Information Technologies</h3>
                                    <span className="text-midnight-500 font-medium bg-cream-100 px-3 py-1 rounded-full text-sm">Kathmandu, Nepal</span>
                                </div>
                                <div className="ml-4 border-l-2 border-cream-200 pl-6 pb-6">
                                    <div className="relative">
                                        <div className="absolute -left-[31px] top-2 w-3 h-3 bg-royal-400 rounded-full ring-4 ring-white"></div>
                                        <h4 className="text-lg font-bold text-midnight-800">IT Project Manager</h4>
                                        <span className="text-sm text-midnight-500 block mb-2">Jan 2015 – Sep 2017</span>
                                        <p className="text-midnight-600">Oversaw 6 large-scale initiatives, delivering on time and under budget. Implemented risk management frameworks.</p>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </section>

                    {/* Volunteer & Education Grid */}
                    <div className="grid md:grid-cols-2 gap-12">

                        {/* Volunteer */}
                        <section>
                            <h2 className="text-2xl font-serif font-bold text-midnight-900 mb-6 border-b border-cream-200 pb-2">Volunteer Leadership</h2>
                            <div className="space-y-6">
                                <div>
                                    <h4 className="font-bold text-midnight-800">Web Chair, SUI Conference 2025</h4>
                                    <p className="text-sm text-midnight-600">Overseeing official website design and maintenance.</p>
                                </div>
                                <div>
                                    <h4 className="font-bold text-midnight-800">Web Chair, VRST Conference 2025</h4>
                                    <p className="text-sm text-midnight-600">Managing digital presence and content accuracy.</p>
                                </div>
                                <div>
                                    <h4 className="font-bold text-midnight-800">Instructor, University of the People</h4>
                                    <p className="text-sm text-midnight-600">Mentoring students in CS, AI, and Machine Learning.</p>
                                </div>
                            </div>
                        </section>

                        {/* Education */}
                        <section>
                            <h2 className="text-2xl font-serif font-bold text-midnight-900 mb-6 border-b border-cream-200 pb-2">Education</h2>
                            <div className="space-y-6">
                                <div>
                                    <h4 className="font-bold text-midnight-800">PhD in Computer Science (In Progress)</h4>
                                    <p className="text-sm text-midnight-600">Dalhousie University, Canada</p>
                                </div>
                                <div>
                                    <h4 className="font-bold text-midnight-800">MSc in Information Technology (2022)</h4>
                                    <p className="text-sm text-midnight-600">Leeds Beckett University, UK</p>
                                    <p className="text-xs text-midnight-500 italic">Thesis: AI-Based System Architecture for Flood Forecasting</p>
                                </div>
                                <div>
                                    <h4 className="font-bold text-midnight-800">B.Sc. (Hons) in Computing (2016)</h4>
                                    <p className="text-sm text-midnight-600">London Metropolitan University, UK</p>
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* Certifications & Affiliations */}
                    <section className="bg-royal-50 p-8 rounded-3xl">
                        <h2 className="text-2xl font-serif font-bold text-midnight-900 mb-6">Certifications & Affiliations</h2>
                        <div className="flex flex-wrap gap-4">
                            <span className="bg-white px-4 py-2 rounded-full text-midnight-700 font-medium shadow-sm border border-royal-100">Project Management Professional (PMP)</span>
                            <span className="bg-white px-4 py-2 rounded-full text-midnight-700 font-medium shadow-sm border border-royal-100">Canadian Information Processing Society (CIPS)</span>
                            <span className="bg-white px-4 py-2 rounded-full text-midnight-700 font-medium shadow-sm border border-royal-100">IAENG Member</span>
                        </div>
                    </section>

                </div>
            </div>
        </div>
    );
}
