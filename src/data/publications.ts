// Bibliographic details match Crossref records (checked September 2026).
// `citations` is a Crossref snapshot used until the live count loads.

export type PublicationType = 'conference' | 'journal' | 'chapter';

export interface Publication {
    id: string;
    title: string;
    authors: string[];
    venue: string;
    /** Proceedings/journal details shown under the venue */
    details?: string;
    publisher?: string;
    year: number;
    date?: string;
    type: PublicationType;
    abstract: string;
    doi?: string;
    pages?: string;
    volume?: string;
    issue?: string;
    citations?: number;
    award?: string;
    highlight?: boolean;
}

export const ME = 'Nirmal Adhikari';

export const publications: Publication[] = [
    {
        id: 'icids2025',
        title: 'Combining Experiential and Spatial Data for Immersive AR Narrative Creation: A Phased Methodology',
        authors: ['Nirmal Adhikari', 'Brian Lilley', 'Martha Radice', 'Susan Fitzgerald', 'Alex McLean', 'Derek Reilly'],
        venue: 'Interactive Storytelling: ICIDS 2025',
        details: "Saint Julian's, Malta · 1–5 December 2025 · Lecture Notes in Computer Science 16374",
        publisher: 'Springer Nature Switzerland',
        year: 2025,
        date: '2025-12-01',
        type: 'chapter',
        abstract: 'A multi-phased methodology for locative AR storytelling: collecting lived socio-spatial experiences and spatial configurations from a source community, synthesising them with experts in situated theatre and architecture into immersive AR narratives, and redeploying those narratives in new environments. A study with 48 participants showed universal themes can resonate across contexts, while surfacing challenges of contextual dissonance and spatial-metric adaptation.',
        doi: '10.1007/978-3-032-12408-1_8',
        pages: '133–157',
        citations: 0,
        highlight: true,
    },
    {
        id: 'vr-aging2025',
        title: 'Virtual Reality for Active Aging: First-Time Experiences of Older Adults with First Steps',
        authors: ['Roland Goddy-Worlu', 'Nirmal Adhikari', 'Derek Reilly'],
        venue: 'Our Future is Aging: Multidisciplinary Research Informing People, Policy and Practice',
        details: 'Nova Scotia Centre on Aging · Mount Saint Vincent University, Halifax · June 2025',
        year: 2025,
        type: 'conference',
        abstract: 'Explores the challenges and opportunities of VR for older adults trying it for the first time, highlighting the tension between device discomfort and immersive enjoyment, and the potential for social engagement.',
        award: 'Best Paper Award',
    },
    {
        id: 'fish2023',
        title: 'Recent Advancements in Deep Learning Frameworks for Precision Fish Farming Opportunities, Challenges, and Applications',
        authors: ['Gaganpreet Kaur', 'Nirmal Adhikari', 'Singamaneni Krishnapriya', 'Surindar Gopalrao Wawale', 'R. Q. Malik', 'Abu Sarwar Zamani', 'Julian Perez-Falcon', 'Jonathan Osei-Owusu'],
        venue: 'Journal of Food Quality',
        publisher: 'Wiley',
        year: 2023,
        date: '2023-02-07',
        type: 'journal',
        abstract: 'Reviews deep learning and sensing technologies for water-quality monitoring, fish identification and growth prediction in aquaculture.',
        doi: '10.1155/2023/4399512',
        volume: '2023',
        pages: '1–11',
        citations: 41,
    },
    {
        id: 'elearning2022',
        title: 'An Analysis of Social Networking for E-learning in Institutions of Higher Learning using Perceived Ease of Use and Perceived Usefulness',
        authors: ['Samuel-Soma M. Ajibade', 'Nirmal Adhikari', 'Dai-Long Ngo-Hoang'],
        venue: 'Journal of Scientometric Research',
        publisher: 'Manuscript Technomedia',
        year: 2022,
        date: '2022-09-13',
        type: 'journal',
        abstract: 'Applies the Technology Acceptance Model to understand how students and faculty adopt social-networking tools for e-learning.',
        doi: '10.5530/jscires.11.2.26',
        volume: '11',
        issue: '2',
        pages: '246–253',
        citations: 6,
    },
    {
        id: 'icaiss2022',
        title: 'Modeling of Optimal Deep Learning Enabled Object Detection and Classification on Drone Imagery',
        authors: ['Nirmal Adhikari', 'Nihar Ranjan Behera', 'Vijayakrishna Rapaka E.', 'S. John Pimo', 'Vaibhav Chaturvedi', 'Vikas Tripathi'],
        venue: '2022 International Conference on Augmented Intelligence and Sustainable Systems (ICAISS)',
        publisher: 'IEEE',
        year: 2022,
        date: '2022-11-24',
        type: 'conference',
        abstract: 'An ensemble transfer-learning approach for detecting and classifying objects in complex aerial drone scenes.',
        doi: '10.1109/ICAISS55157.2022.10010957',
        pages: '303–309',
        citations: 11,
    },
    {
        id: 'eeg2022',
        title: 'A LSTM-CNN Model for Epileptic Seizures Detection using EEG Signal',
        authors: ['Nasmin Jiwani', 'Ketan Gupta', 'Md Haris Uddin Sharif', 'Nirmal Adhikari', 'Neda Afreen'],
        venue: '2022 2nd International Conference on Emerging Smart Technologies and Applications (eSmarTA)',
        publisher: 'IEEE',
        year: 2022,
        date: '2022-10-25',
        type: 'conference',
        abstract: 'Combines CNN and LSTM layers to capture spatial and temporal patterns in EEG signals for seizure detection.',
        doi: '10.1109/eSmarTA56775.2022.9935403',
        pages: '1–5',
        citations: 46,
    },
    {
        id: 'blockchain2022',
        title: 'Blockchain Technology in Healthcare Industry',
        authors: ['Ketan Gupta', 'Nasmin Jiwani', 'Md Haris Uddin Sharif', 'Nirmal Adhikari', 'Neda Afreen'],
        venue: '2022 International Conference on Emerging Trends in Engineering and Medical Sciences (ICETEMS)',
        publisher: 'IEEE',
        year: 2022,
        date: '2022-11-18',
        type: 'conference',
        abstract: 'Reviews blockchain applications for securing medical records and enabling trustworthy data sharing in healthcare.',
        doi: '10.1109/ICETEMS56252.2022.10093377',
        pages: '24–28',
        citations: 7,
    },
    {
        id: 'bohr2021',
        title: 'The Artificially Intelligent Switching Framework for Terminal Access Provides Smart Routing in Modern Computer Networks',
        authors: ['Nirmal Adhikari', 'J. Logeshwaran', 'T. Kiruthiga'],
        venue: 'BOHR International Journal of Smart Computing and Information Technology',
        publisher: 'BOHR Publishers',
        year: 2021,
        type: 'journal',
        abstract: 'Proposes an intelligent switching framework for smart routing and secure terminal access to network devices.',
        doi: '10.54646/bijscit.2021.18',
        volume: '2',
        issue: '1',
        pages: '52–58',
        citations: 0,
    },
];

export const typeLabels: Record<PublicationType, string> = {
    chapter: 'Book chapter',
    conference: 'Conference paper',
    journal: 'Journal article',
};

function lastName(name: string) {
    const parts = name.trim().split(/\s+/);
    return parts[parts.length - 1];
}

function initials(name: string) {
    const parts = name.trim().split(/\s+/);
    return parts.slice(0, -1).map((p) => `${p[0]}.`).join(' ');
}

export function toApa(p: Publication): string {
    const names = p.authors.map((a) => `${lastName(a)}, ${initials(a)}`);
    const authors = names.length > 1 ? `${names.slice(0, -1).join(', ')}, & ${names[names.length - 1]}` : names[0];
    const vol = p.volume ? `, ${p.volume}${p.issue ? `(${p.issue})` : ''}` : '';
    const pages = p.pages ? `, ${p.pages}` : '';
    const doi = p.doi ? ` https://doi.org/${p.doi}` : '';
    return `${authors} (${p.year}). ${p.title}. ${p.venue}${vol}${pages}.${doi}`;
}

export function toBibtex(p: Publication): string {
    const key = `${lastName(p.authors[0]).toLowerCase().replace(/[^a-z]/g, '')}${p.year}${p.title.split(/\s+/)[0].toLowerCase().replace(/[^a-z]/g, '')}`;
    const entry = p.type === 'journal' ? 'article' : p.type === 'chapter' ? 'incollection' : 'inproceedings';
    const container = p.type === 'journal' ? 'journal' : 'booktitle';
    const fields: [string, string | undefined][] = [
        ['title', p.title],
        ['author', p.authors.join(' and ')],
        [container, p.venue],
        ['year', String(p.year)],
        ['volume', p.volume],
        ['number', p.issue],
        ['pages', p.pages?.replace('–', '--')],
        ['publisher', p.publisher],
        ['doi', p.doi],
    ];
    const body = fields.filter(([, v]) => v).map(([k, v]) => `  ${k} = {${v}}`).join(',\n');
    return `@${entry}{${key},\n${body}\n}`;
}
