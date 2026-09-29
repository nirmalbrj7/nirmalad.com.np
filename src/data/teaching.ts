import type { Photo } from './media';
import { photos } from './media';

export type Mode = 'In person' | 'Online';
export type Level = 'Undergraduate' | 'Graduate';

export interface Institution {
    id: string;
    name: string;
    short: string;
    location: string;
    role: string;
    period: string;
    mode: Mode;
    url?: string;
    blurb: string;
    photo?: Photo;
    accent: string;
}

export interface Course {
    id: string;
    title: string;
    code?: string;
    institution: string;
    role: string;
    /** e.g. "Fall 2026"; ordering uses `sortKey` */
    term: string;
    sortKey: string;
    status: 'current' | 'past';
    level: Level;
    mode: Mode;
    description: string;
    topics: string[];
    responsibilities: string[];
}

export const institutions: Institution[] = [
    {
        id: 'auaf',
        name: 'American University of Afghanistan',
        short: 'AUAF',
        location: 'Online (Kabul campus, teaching remotely since 2021)',
        role: 'Adjunct Lecturer',
        period: 'Spring 2026 – present',
        mode: 'Online',
        url: 'https://www.auaf.edu.af',
        blurb: 'Afghanistan\'s first private, not-for-profit university, founded in 2006, now teaching Afghan students online and from Doha. Its online programmes keep higher education open to women barred from universities inside Afghanistan.',
        photo: photos.auaf,
        accent: 'indigo',
    },
    {
        id: 'dal',
        name: 'Dalhousie University',
        short: 'Dalhousie',
        location: 'Halifax, Nova Scotia',
        role: 'PhD Researcher & Teaching Assistant',
        period: 'Sept 2023 – present',
        mode: 'In person',
        url: 'https://www.dal.ca/faculty/computerscience.html',
        blurb: 'PhD research in the Graphics and Experiential Media (GEM) Lab with Dr. Derek Reilly, and lab teaching across immersive technology, software engineering and HCI.',
        photo: photos.dalhousie,
        accent: 'teal',
    },
    {
        id: 'uopeople',
        name: 'University of the People',
        short: 'UoPeople',
        location: 'Online, worldwide',
        role: 'Volunteer Instructor',
        period: 'Apr 2025 – present',
        mode: 'Online',
        url: 'https://www.uopeople.edu',
        blurb: 'A tuition-free, accredited online university. I mentor undergraduates from around the world through core computer science and AI courses.',
        accent: 'emerald',
    },
    {
        id: 'icms',
        name: 'Institute of Crisis Management Studies',
        short: 'ICMS',
        location: 'Kathmandu, Nepal',
        role: 'Lecturer (part-time)',
        period: 'Mar 2023 – Aug 2023',
        mode: 'In person',
        blurb: 'Designed and taught GIS and remote sensing for crisis-management students, drawing on post-earthquake reconstruction work in Nepal.',
        photo: photos.nuwakotAfterQuake,
        accent: 'amber',
    },
];

export const institutionById = Object.fromEntries(institutions.map((i) => [i.id, i])) as Record<string, Institution>;

export const courses: Course[] = [
    // ── AUAF ─────────────────────────────────────────────
    {
        id: 'auaf-pl',
        title: 'Design of Programming Languages',
        institution: 'auaf',
        role: 'Adjunct Lecturer',
        term: 'Fall 2026',
        sortKey: '2026-3',
        status: 'current',
        level: 'Undergraduate',
        mode: 'Online',
        description: 'How programming languages are designed and why they behave the way they do: syntax and semantics, names and scope, types, control structures and the major paradigms.',
        topics: ['Syntax & semantics', 'Type systems', 'Scope & binding', 'Functional, OO & logic paradigms'],
        responsibilities: ['Teaching the full course online', 'Designing assignments and assessments', 'Virtual office hours and feedback'],
    },
    {
        id: 'auaf-web',
        title: 'Web Design and Development',
        institution: 'auaf',
        role: 'Adjunct Lecturer',
        term: 'Fall 2026',
        sortKey: '2026-3',
        status: 'current',
        level: 'Undergraduate',
        mode: 'Online',
        description: 'Designing and building usable, accessible websites: semantic HTML, modern CSS layout, JavaScript, responsive design and deploying to the web.',
        topics: ['HTML & CSS', 'JavaScript', 'Responsive & accessible design', 'Deployment'],
        responsibilities: ['Teaching the full course online', 'Hands-on web projects and code reviews', 'Virtual office hours and feedback'],
    },
    {
        id: 'auaf-net',
        title: 'Fundamentals of Networking and Telecommunications',
        institution: 'auaf',
        role: 'Adjunct Lecturer',
        term: 'Spring 2026',
        sortKey: '2026-1',
        status: 'past',
        level: 'Undergraduate',
        mode: 'Online',
        description: 'How data moves across networks: layered models, the TCP/IP stack, addressing and routing, wireless and telecommunication systems, and network security basics.',
        topics: ['OSI & TCP/IP', 'Addressing & routing', 'Wireless & telecom', 'Network security'],
        responsibilities: ['Taught the full course online', 'Designed assignments and exams', 'Virtual office hours and feedback'],
    },
    // ── University of the People ─────────────────────────
    {
        id: 'uop-ai',
        title: 'Artificial Intelligence',
        code: 'CS 4408',
        institution: 'uopeople',
        role: 'Volunteer Instructor',
        term: '2025 – present',
        sortKey: '2025-2',
        status: 'current',
        level: 'Undergraduate',
        mode: 'Online',
        description: 'Core AI concepts: search and problem solving, reasoning, machine learning foundations, neural networks and the ethics of AI.',
        topics: ['Search', 'Reasoning', 'Neural networks', 'AI ethics'],
        responsibilities: ['Grading and individual feedback', 'Leading discussion forums', 'Supporting learners across time zones'],
    },
    {
        id: 'uop-dmml',
        title: 'Data Mining and Machine Learning',
        code: 'CS 4407',
        institution: 'uopeople',
        role: 'Volunteer Instructor',
        term: '2025 – present',
        sortKey: '2025-2',
        status: 'current',
        level: 'Undergraduate',
        mode: 'Online',
        description: 'Data preparation, classification, clustering, association rules and model evaluation, applied to real datasets.',
        topics: ['Classification', 'Clustering', 'Model evaluation', 'Data preparation'],
        responsibilities: ['Reviewing ML assignments', 'Guiding analysis projects', 'Facilitating discussions'],
    },
    {
        id: 'uop-net',
        title: 'Communications and Networking',
        code: 'CS 2204',
        institution: 'uopeople',
        role: 'Volunteer Instructor',
        term: '2025 – present',
        sortKey: '2025-2',
        status: 'current',
        level: 'Undergraduate',
        mode: 'Online',
        description: 'Networking fundamentals: the OSI model, TCP/IP, routing and switching, and security basics.',
        topics: ['OSI model', 'TCP/IP', 'Routing', 'Security basics'],
        responsibilities: ['Grading and feedback', 'Explaining protocols with worked examples', 'Discussion facilitation'],
    },
    {
        id: 'uop-prog',
        title: 'Programming Fundamentals',
        code: 'CS 1101',
        institution: 'uopeople',
        role: 'Volunteer Instructor',
        term: '2025 – present',
        sortKey: '2025-2',
        status: 'current',
        level: 'Undergraduate',
        mode: 'Online',
        description: 'Programming logic and problem solving in Python, from variables and control flow to functions and debugging.',
        topics: ['Python', 'Control flow', 'Functions', 'Debugging'],
        responsibilities: ['Code feedback', 'Debugging help', 'Encouraging peer learning'],
    },
    {
        id: 'uop-cs',
        title: 'Introduction to Computer Science',
        institution: 'uopeople',
        role: 'Volunteer Instructor',
        term: '2025 – present',
        sortKey: '2025-2',
        status: 'current',
        level: 'Undergraduate',
        mode: 'Online',
        description: 'Computational thinking, algorithms and how computers represent and process information.',
        topics: ['Computational thinking', 'Algorithms', 'Data representation'],
        responsibilities: ['Mentoring first-year students', 'Grading and feedback', 'Discussion facilitation'],
    },
    // ── Dalhousie ────────────────────────────────────────
    {
        id: 'dal-se',
        title: 'Software Engineering',
        code: 'CSCI 3130',
        institution: 'dal',
        role: 'Teaching Assistant',
        term: 'Fall 2024',
        sortKey: '2024-3',
        status: 'past',
        level: 'Undergraduate',
        mode: 'In person',
        description: 'The software lifecycle in practice: agile teams, requirements, design patterns, testing and continuous integration.',
        topics: ['Agile', 'Git & CI/CD', 'Testing', 'Design patterns'],
        responsibilities: ['Ran labs and design discussions', 'Reviewed code and assignments', 'Coached Git and CI workflows'],
    },
    {
        id: 'dal-hci',
        title: 'Human-Computer Interaction',
        code: 'CSCI 4163',
        institution: 'dal',
        role: 'Teaching Assistant',
        term: 'Fall 2024',
        sortKey: '2024-3',
        status: 'past',
        level: 'Undergraduate',
        mode: 'In person',
        description: 'User-centred design, usability evaluation and the theory behind interactive systems.',
        topics: ['User-centred design', 'Usability testing', 'Evaluation methods'],
        responsibilities: ['Usability workshops', 'Mentored design projects', 'Graded assignments'],
    },
    {
        id: 'dal-ui',
        title: 'Designing User Interfaces',
        code: 'CSCI 3160',
        institution: 'dal',
        role: 'Teaching Assistant',
        term: '2024',
        sortKey: '2024-2',
        status: 'past',
        level: 'Undergraduate',
        mode: 'In person',
        description: 'Interface design principles, prototyping, accessibility and usability evaluation.',
        topics: ['Prototyping', 'Accessibility', 'Design critique'],
        responsibilities: ['Led design critiques', 'Supported usability testing', 'Reviewed UI assignments'],
    },
    {
        id: 'dal-intro',
        title: 'Introduction to Computer Programming',
        code: 'CSCI 1105',
        institution: 'dal',
        role: 'Teaching Assistant',
        term: '2024',
        sortKey: '2024-2',
        status: 'past',
        level: 'Undergraduate',
        mode: 'In person',
        description: 'First programming course for students with no prior experience: algorithms, problem solving and core coding skills.',
        topics: ['Problem solving', 'Algorithms', 'Programming basics'],
        responsibilities: ['Supported beginner labs', 'Debugging help', 'Evaluated assignments'],
    },
    {
        id: 'dal-arvr',
        title: 'Augmented & Virtual Reality',
        institution: 'dal',
        role: 'Teaching Assistant',
        term: 'Winter 2024',
        sortKey: '2024-1',
        status: 'past',
        level: 'Undergraduate',
        mode: 'In person',
        description: 'Immersive systems and XR development in Unity: spatial interaction, tracking and building AR/VR applications.',
        topics: ['Unity', 'XR interaction', 'Spatial computing'],
        responsibilities: ['Ran AR/VR lab sessions', 'Supported Unity projects', 'Mentored project teams'],
    },
    // ── ICMS ─────────────────────────────────────────────
    {
        id: 'icms-gis',
        title: 'GIS & Remote Sensing',
        institution: 'icms',
        role: 'Lecturer',
        term: 'Mar – Aug 2023',
        sortKey: '2023-1',
        status: 'past',
        level: 'Graduate',
        mode: 'In person',
        description: 'Applied GIS, satellite imagery interpretation and geospatial modelling for disaster management.',
        topics: ['ArcGIS & QGIS', 'Remote sensing', 'Hazard mapping'],
        responsibilities: ['Designed the curriculum', 'Delivered lectures and labs', 'Supervised student GIS projects'],
    },
];
