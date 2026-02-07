import { ExternalLink, Calendar, Users } from 'lucide-react';
import { motion } from 'framer-motion';

const publications = [
    {
        category: "Forthcoming & Recent",
        items: [
            {
                title: "Combining Experiential and Spatial Data for Immersive AR Narrative Creation: A Phased Methodology",
                authors: ["Nirmal Adhikari", "Brian Lilley", "Martha Radice", "Susan Fitzgerald", "Alex McLean", "Derek Reilly"],
                venue: "International Conference on Interactive Digital Storytelling (ICIDS 2025), LNCS, Springer",
                year: "2025",
                type: "Conference Paper",
                abstract: "Proposes a phased methodology blending spatial analysis with experiential data from real deployments of immersive AR narratives. Offers a framework for connecting narrative design with measured experience in physical space.",
                link: "http://doi.org/10.1007/978-3-032-12408-1_8"
            },
            {
                title: "Virtual Reality for Active Aging: First-Time Experiences of Older Adults with First Steps",
                authors: ["Roland Goddy-Worlu", "Nirmal Adhikari", "Derek Reilly"],
                venue: "Our Future is Aging: Multidisciplinary Research Informing People, Policy and Practice",
                year: "2025",
                type: "Conference Paper",
                abstract: "Explores challenges and opportunities for older adults using VR. Highlights themes of device discomfort vs. immersive enjoyment and social engagement potentials.",
                link: "#"
            }
        ]
    },
    {
        category: "Journal Articles",
        items: [
            {
                title: "Recent Advancements in Deep Learning Frameworks for Precision Fish Farming",
                authors: ["Gaganpreet Kaur", "Singamaneni Krishnapriya", "Surindar Gopalrao Wawale", "R. Q. Malik", "Abu Sarwar Zamani", "Julian Perez-Falcon", "Nirmal Adhikari", "Jonathan Osei-Owusu"],
                venue: "Journal of Food Quality",
                year: "2023",
                type: "Journal Article",
                abstract: "Reviews deep learning and sensing technologies for water quality monitoring and growth prediction in aquaculture.",
                link: "https://doi.org/10.1155/2023/4399512"
            },
            {
                title: "An Analysis of Social Networking for E-learning in Institutions of Higher Learning",
                authors: ["Samuel-Soma M. Ajibade", "Nirmal Adhikari", "Dai-Long Ngo-Hoang"],
                venue: "Journal of Scientometric Research",
                year: "2022",
                type: "Journal Article",
                abstract: "Applies Technology Acceptance Model (TAM) to understand adoption of social networking tools by students and faculty.",
                link: "https://doi.org/10.5530/jscires.11.2.26"
            },
            {
                title: "The Artificially Intelligent Switching Framework for Terminal Access",
                authors: ["Nirmal Adhikari", "J. Logeshwaran", "T. Kiruthiga"],
                venue: "BOHR International Journal of Smart Computing",
                year: "2021",
                type: "Journal Article",
                abstract: "Proposes an intelligent framework for smart routing and secure access to network devices.",
                link: "https://doi.org/10.54646/bijscit.2021.18"
            }
        ]
    },
    {
        category: "Conference Proceedings",
        items: [
            {
                title: "Modeling of Optimal Deep Learning Enabled Object Detection on Drone Imagery",
                authors: ["Nirmal Adhikari", "Nihar Ranjan Behera", "Vijayakrishna Rapaka E.", "S. John Pimo", "Vaibhav Chaturvedi", "Vikas Tripathi"],
                venue: "ICAISS 2022",
                year: "2022",
                type: "Conference Paper",
                abstract: "Presents an ensemble transfer learning approach for object detection in complex aerial scenes.",
                link: "https://ieeexplore.ieee.org/document/10010998"
            },
            {
                title: "Blockchain Technology in Healthcare Industry",
                authors: ["Nirmal Adhikari", "Ketan Gupta", "Nasmin Jiwani", "Neda Afreen"],
                venue: "ICETEMS 2022",
                year: "2022",
                type: "Conference Paper",
                abstract: "Reviews blockchain applications for securing medical records and enabling data sharing.",
                link: "https://doi.org/10.1109/ICETEMS56252.2022.10093377"
            },
            {
                title: "A LSTM-CNN Model for Epileptic Seizures Detection using EEG Signal",
                authors: ["Nasmin Jiwani", "Ketan Gupta", "Md Haris Uddin Sharif", "Nirmal Adhikari", "N. Afreen"],
                venue: "ESmarTA 2022",
                year: "2022",
                type: "Conference Paper",
                abstract: "Combines CNN and LSTM to capture spatial and temporal patterns in brain signals for seizure detection.",
                link: "https://doi.org/10.1109/eSmarTA56775.2022.9935403"
            }
        ]
    }
];

export default function Publications() {
    return (
        <div className="bg-cream-50 min-h-screen py-20 font-sans text-midnight-900">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="max-w-3xl mb-16">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-midnight-900 font-display mb-6">Publications</h1>
                    <p className="text-xl text-midnight-600 leading-relaxed">
                        My research sits at the intersection of immersive technologies, spatial analysis, and AI systems.
                    </p>
                    <div className="flex gap-4 mt-6">
                        <a href="https://scholar.google.com/citations?user=3HxpopEAAAAJ&hl=en" target="_blank" rel="noopener noreferrer" className="text-royal-700 font-medium hover:underline flex items-center">
                            Google Scholar <ExternalLink size={14} className="ml-1" />
                        </a>
                        <a href="https://orcid.org/0000-0003-1555-7867" target="_blank" rel="noopener noreferrer" className="text-royal-700 font-medium hover:underline flex items-center">
                            ORCID Profile <ExternalLink size={14} className="ml-1" />
                        </a>
                    </div>
                </div>

                <div className="space-y-16">
                    {publications.map((section, idx) => (
                        <motion.section
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-80px" }}
                            transition={{ duration: 0.6 }}
                        >
                            <h2 className="text-2xl font-bold text-midnight-900 mb-8 border-l-4 border-royal-500 pl-4">{section.category}</h2>
                            <div className="grid gap-8">
                                {section.items.map((pub, pIdx) => (
                                    <motion.article
                                        key={pIdx}
                                        initial={{ opacity: 0, y: 18 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, margin: "-80px" }}
                                        transition={{ duration: 0.5, delay: pIdx * 0.04 }}
                                        className="group surface-card rounded-3xl p-8 md:p-10"
                                    >
                                        <h3 className="text-xl md:text-2xl font-bold text-midnight-900 group-hover:text-royal-700 transition-colors mb-2 font-display">
                                            {pub.link && pub.link !== "#" ? (
                                                <a href={pub.link} target="_blank" rel="noopener noreferrer" className="hover:underline flex items-center gap-2">
                                                    {pub.title}
                                                    <ExternalLink size={16} className="inline opacity-50" />
                                                </a>
                                            ) : (
                                                pub.title
                                            )}
                                        </h3>
                                        <div className="text-sm text-midnight-500 font-medium mb-3 flex flex-wrap gap-4 items-center">
                                            <span className="flex items-center flex-wrap gap-1">
                                                <Users size={14} className="mr-1" />
                                                {pub.authors.map((author, i) => (
                                                    <span key={i}>
                                                        {author === "Nirmal Adhikari" ? (
                                                            <strong className="text-midnight-900 font-bold">{author}</strong>
                                                        ) : (
                                                            author
                                                        )}
                                                        {i < pub.authors.length - 1 ? ", " : ""}
                                                    </span>
                                                ))}
                                            </span>
                                            <span className="flex items-center"><Calendar size={14} className="mr-1" /> {pub.year}</span>
                                            <span className="flex items-center bg-cream-100 px-2 py-0.5 rounded text-midnight-600 font-normal">{pub.type}</span>
                                        </div>
                                        <div className="text-sm font-display italic text-midnight-700 mb-3 block">
                                            {pub.venue}
                                        </div>
                                        <p className="text-midnight-600 leading-relaxed text-sm">
                                            {pub.abstract}
                                        </p>
                                    </motion.article>
                                ))}
                            </div>
                        </motion.section>
                    ))}
                </div>

            </div>
        </div>
    );
}
