// Press coverage, official records, repositories and videos about the work.
// Projects, case studies and awards reference these by id or by topic.

export type LinkKind = 'press' | 'record' | 'code' | 'paper' | 'video' | 'service' | 'product';

export type LinkTopic =
    | 'pd3r'
    | 'isac-simo'
    | 'stfc'
    | 'dominica'
    | 'colombia'
    | 'surakshit-ghar'
    | 'bctap'
    | 'eklephat'
    | 'ar-narratives'
    | 'academic-service'
    | 'dalhousie'
    | 'open-source';

export interface ProjectLink {
    id: string;
    title: string;
    publisher: string;
    kind: LinkKind;
    /** ISO date; `YYYY-MM` or `YYYY` when that is all that is known */
    date: string;
    url: string;
    /** Archived copy when the original has moved */
    archiveUrl?: string;
    summary: string;
    /** Key points from the source, paraphrased */
    highlights: string[];
    videoId?: string;
    duration?: string;
    topics: LinkTopic[];
}

export const kindLabels: Record<LinkKind, string> = {
    press: 'Press',
    record: 'Report',
    code: 'Code',
    paper: 'Paper',
    video: 'Video',
    service: 'Conference',
    product: 'Product',
};

export const links: ProjectLink[] = [
    // ── PD3R ─────────────────────────────────────────────
    {
        id: 'prnewswire-cfc2018',
        title: 'Winning Developer Solutions Announced in Inaugural Call for Code Global Challenge',
        publisher: 'IBM via PR Newswire',
        kind: 'press',
        date: '2018-10-30',
        url: 'https://www.prnewswire.com/news-releases/winning-developer-solutions-announced-in-inaugural-call-for-code-global-challenge-to-mitigate-effects-of-natural-disasters-300739705.html',
        summary: 'IBM\'s results announcement naming PD3R the second-place winner of the first Call for Code Global Challenge.',
        highlights: [
            'PD3R placed 2nd worldwide and received USD $25,000',
            '100,000+ developers from 156 nations submitted 2,500+ solutions',
            'Judges included President Bill Clinton',
        ],
        topics: ['pd3r'],
    },
    {
        id: 'ibm-newsroom-top5',
        title: 'Top 5 Call for Code solutions unveiled',
        publisher: 'IBM Newsroom',
        kind: 'press',
        date: '2018-10-23',
        url: 'https://newsroom.ibm.com/Top-5-Call-for-Code-solutions-unveiled',
        archiveUrl: 'https://web.archive.org/web/20251017002714/https://newsroom.ibm.com/Top-5-Call-for-Code-solutions-unveiled',
        summary: 'IBM\'s finalist announcement explaining how PD3R\'s visual-recognition model assesses retrofit eligibility.',
        highlights: [
            'One of five global finalists after three rounds of judging',
            'Custom model trained on 2,000+ images in IBM Watson Studio',
        ],
        topics: ['pd3r'],
    },
    {
        id: 'video-pd3r',
        title: 'Call for Code: Artificial Intelligence for Retrofitting',
        publisher: 'Build Change',
        kind: 'video',
        date: '2018-10-23',
        url: 'https://www.youtube.com/watch?v=mVkjJx_Ko3k',
        summary: 'The PD3R submission video.',
        highlights: ['How AI trained on 3D-model images judges retrofit eligibility'],
        videoId: 'mVkjJx_Ko3k',
        duration: '3:00',
        topics: ['pd3r'],
    },
    {
        id: 'github-pd3r',
        title: 'Call-for-Code/PD3R',
        publisher: 'GitHub',
        kind: 'code',
        date: '2019-12-13',
        url: 'https://github.com/Call-for-Code/PD3R',
        summary: 'Open-source PD3R code and training data, with Nirmal Adhikari listed first in AUTHORS.md.',
        highlights: ['Apache-2.0; Python, Android and Dynamo', 'Companion Laravel API and React Native app repositories'],
        topics: ['pd3r', 'open-source'],
    },
    {
        id: 'buildchange-nepal-5yrs',
        title: '150,000 People in Better Housing: Nepal 5 Years On',
        publisher: 'Build Change',
        kind: 'record',
        date: '2020-04-23',
        url: 'https://buildchange.org/150000-people-in-better-housing-nepal-5-years-on',
        summary: 'Five-year retrospective of Build Change\'s Nepal earthquake programme and its technology.',
        highlights: [
            'Call for Code runner-up using Autodesk Revit and Dynamo',
            'A 3D automated tool made retrofit design 97% faster',
            '150,000+ people in 24,000+ new or strengthened homes',
        ],
        topics: ['pd3r', 'surakshit-ghar', 'stfc'],
    },
    // ── ISAC-SIMO ────────────────────────────────────────
    {
        id: 'lf-isac-simo',
        title: 'New Open Source Project Uses Machine Learning to Inform Quality Assurance for Construction',
        publisher: 'The Linux Foundation',
        kind: 'press',
        date: '2021-06-10',
        url: 'https://www.linuxfoundation.org/press/press-release/new-open-source-project-uses-machine-learning-to-inform-quality-assurance-for-construction-in-emerging-nations',
        summary: 'The Linux Foundation announces it will host ISAC-SIMO, created by Build Change with an IBM Call for Code grant.',
        highlights: ['Hosted by The Linux Foundation', 'Supported by IBM and the Autodesk Foundation'],
        topics: ['isac-simo'],
    },
    {
        id: 'video-isac-simo',
        title: 'Intelligent Supervision Assistant for Construction',
        publisher: 'Build Change',
        kind: 'video',
        date: '2021-01-06',
        url: 'https://www.youtube.com/watch?v=145ytpzG3I8',
        summary: 'Walkthrough of the ISAC-SIMO app checking rebar and masonry.',
        highlights: ['GO / NO-GO quality checks from smartphone photos'],
        videoId: '145ytpzG3I8',
        duration: '4:30',
        topics: ['isac-simo'],
    },
    {
        id: 'github-isac-simo',
        title: 'ISAC-SIMO/ISAC-SIMO',
        publisher: 'GitHub',
        kind: 'code',
        date: '2019-12-13',
        url: 'https://github.com/ISAC-SIMO/ISAC-SIMO',
        summary: 'Main repository, with contributions from @nirmalbrj7 across the core, backend and mobile app.',
        highlights: ['Apache-2.0; rebar and wall checks via ML and image processing'],
        topics: ['isac-simo', 'open-source'],
    },
    {
        id: 'site-isac-simo',
        title: 'ISAC-SIMO',
        publisher: 'isac-simo.net',
        kind: 'product',
        date: '2021',
        url: 'https://isac-simo.net/',
        summary: 'Project site and developer documentation.',
        highlights: [],
        topics: ['isac-simo'],
    },
    // ── BCtap ────────────────────────────────────────────
    {
        id: 'bctap-site',
        title: 'BCtap: Resilient Housing at Scale',
        publisher: 'Build Change',
        kind: 'product',
        date: '2024',
        url: 'https://bctap.buildchange.org/',
        summary: 'Official site for the Build Change Technical Assistance Platform.',
        highlights: ['Developed and iterated in 26+ countries', 'Used after 40+ earthquakes, windstorms, floods and fires'],
        topics: ['bctap'],
    },
    {
        id: 'video-bctap',
        title: 'BCtap: Digital Home Strengthening Tool',
        publisher: 'Build Change',
        kind: 'video',
        date: '2024-04-19',
        url: 'https://www.youtube.com/watch?v=i2C4f3fzVOo',
        summary: 'Build Change’s introduction to the Digital Home Strengthening Tool in BCtap.',
        highlights: [],
        videoId: 'i2C4f3fzVOo',
        duration: '3:44',
        topics: ['bctap'],
    },
    {
        id: 'bctap-ios',
        title: 'BCtap by Build Change',
        publisher: 'App Store',
        kind: 'product',
        date: '2024',
        url: 'https://apps.apple.com/us/app/bctap-by-build-change/id6670199601',
        summary: 'The BCtap mobile app for iOS.',
        highlights: [],
        topics: ['bctap'],
    },
    {
        id: 'bctap-android',
        title: 'BCtap by Build Change',
        publisher: 'Google Play',
        kind: 'product',
        date: '2024',
        url: 'https://play.google.com/store/apps/details?id=org.bctap',
        summary: 'The BCtap mobile app for Android.',
        highlights: [],
        topics: ['bctap'],
    },
    {
        id: 'buildchange-technology',
        title: 'Technology and AI',
        publisher: 'Build Change',
        kind: 'record',
        date: '2024',
        url: 'https://buildchange.org/technology-programs',
        summary: 'Build Change\'s overview of BCtap, ISAC-SIMO and AI for retrofit decisions.',
        highlights: ['Partnerships with Autodesk, Cisco, IBM and Microsoft'],
        topics: ['bctap', 'isac-simo', 'pd3r'],
    },
    // ── Nepal: STFC, Surakshit Ghar, Eklephat ────────────
    {
        id: 'buildchange-stfc',
        title: 'Sometime in Nepal',
        publisher: 'Build Change',
        kind: 'record',
        date: '2020-07-16',
        url: 'https://buildchange.org/sometime-in-nepal',
        summary: 'Field account of the Socio-Technical Facilitation and Consultation project in Nuwakot.',
        highlights: [
            '23,088 earthquake-affected households supported',
            '2 municipalities and 8 rural municipalities, March 2018 to February 2021',
            'Funded by the Government of India',
        ],
        topics: ['stfc'],
    },
    {
        id: 'video-nepal-homes',
        title: 'A Foundation of Hope: Nepal\'s Journey Towards Earthquake-Resistant Homes',
        publisher: 'Build Change',
        kind: 'video',
        date: '2025-04-24',
        url: 'https://www.youtube.com/watch?v=3a-H0eqdUws',
        summary: 'Released for the tenth anniversary of the Gorkha earthquake: Nepal’s journey towards earthquake-resistant homes.',
        highlights: [],
        videoId: '3a-H0eqdUws',
        duration: '4:22',
        topics: ['stfc'],
    },
    {
        id: 'myrepublica-surakshit-ghar',
        title: 'NRA launches Surakshit Ghar app',
        publisher: 'myRepública',
        kind: 'press',
        date: '2017-05-09',
        url: 'https://myrepublica.nagariknetwork.com/news/nra-launches-surakshit-ghar-app/',
        summary: 'Nepal\'s National Reconstruction Authority launches the Build Change–developed Surakshit Ghar ("Safe House") app.',
        highlights: ['Guidance through images, illustrations, audio and video'],
        topics: ['surakshit-ghar'],
    },
    {
        id: 'buildchange-eklephat',
        title: 'Saving Embodied Carbon: Nepal',
        publisher: 'Build Change',
        kind: 'record',
        date: '',
        url: 'https://embodiedcarbon.climateresilienthousing.org/nepal',
        summary: 'Before-and-after of a retrofitted stone-masonry house in Eklephat village.',
        highlights: ['Strengthening an existing Nepali home saves ~15 t CO₂ on average'],
        topics: ['eklephat'],
    },
    // ── Dominica ─────────────────────────────────────────
    {
        id: 'worldbank-dominica-mis',
        title: 'Dominica Housing Recovery Project: contracts awarded',
        publisher: 'World Bank',
        kind: 'record',
        date: '2024-02',
        url: 'https://documents1.worldbank.org/curated/en/099022124194016072/txt/P1665371eb813d07d1a8241ff1d8be9c7e3.txt',
        summary: 'Project record listing Build Change\'s contract for technical advisory and MIS development.',
        highlights: ['US$499,288 contract for advisory services and the Management Information System'],
        topics: ['dominica'],
    },
    {
        id: 'hrp-dominica',
        title: 'About the Housing Recovery Project',
        publisher: 'Government of Dominica',
        kind: 'record',
        date: '2019',
        url: 'https://hrp.gov.dm/about/about-hrp',
        summary: 'The island-wide, World Bank–financed rebuilding programme after Hurricane Maria.',
        highlights: ['Maria affected ~90% of housing; 4,500+ houses destroyed'],
        topics: ['dominica'],
    },
    {
        id: 'video-dominica',
        title: 'Dominica: Evaluating Housing Resilience After Hurricane Maria',
        publisher: 'Build Change',
        kind: 'video',
        date: '2025-07-01',
        url: 'https://www.youtube.com/watch?v=U9HWZtWoWas',
        summary: 'Build Change on evaluating housing resilience in Dominica after Hurricane Maria.',
        highlights: [],
        videoId: 'U9HWZtWoWas',
        duration: '2:36',
        topics: ['dominica'],
    },
    {
        id: 'worldbank-blog-dominica',
        title: 'Dominica\'s path to resilient recovery after Hurricane Maria',
        publisher: 'World Bank Blogs',
        kind: 'press',
        date: '2018-07-02',
        url: 'https://blogs.worldbank.org/en/latinamerica/dominica-s-path-resilient-recovery-after-hurricane-maria',
        summary: 'How Dominica set out to rebuild with resilient building practices after Maria.',
        highlights: [],
        topics: ['dominica'],
    },
    // ── Colombia ─────────────────────────────────────────
    {
        id: 'buildchange-colombia-2021',
        title: 'Informe de Gestión 2021',
        publisher: 'Build Change Colombia',
        kind: 'record',
        date: '2022-09',
        url: 'https://get.buildchange.org/wp-content/uploads/2022/09/5.-Informe-de-gestion-2021.pdf',
        summary: 'Annual report on technical assistance to Casa Digna, Vida Digna and Bogotá\'s Caja de Vivienda Popular.',
        highlights: [
            'Fulcrum field app screens viable homes, scopes works and estimates budgets',
            'Interoperability with the Ministry of Housing\'s system and MiCasa',
            'Design support for the first 100 Plan Terrazas pilot homes',
        ],
        topics: ['colombia'],
    },
    // ── Research & academic service ──────────────────────
    {
        id: 'springer-icids2025',
        title: 'Combining Experiential and Spatial Data for Immersive AR Narrative Creation',
        publisher: 'Springer, LNCS 16374',
        kind: 'paper',
        date: '2025-12-01',
        url: 'https://doi.org/10.1007/978-3-032-12408-1_8',
        summary: 'First-author paper at ICIDS 2025, Saint Julian\'s, Malta.',
        highlights: ['48-participant study across source and target sites', 'HoloLens 2 deployment'],
        topics: ['ar-narratives'],
    },
    {
        id: 'gem-lab-profile',
        title: 'Nirmal Adhikari, GEM Lab',
        publisher: 'Dalhousie University',
        kind: 'record',
        date: '2023-09-29',
        url: 'https://gem.cs.dal.ca/people/nirmal-adhikari/',
        summary: 'PhD profile at the Graphics and Experiential Media Lab, supervised by Dr. Derek Reilly.',
        highlights: [],
        topics: ['dalhousie', 'ar-narratives'],
    },
    {
        id: 'acm-vrst2025',
        title: 'VRST 2025 Organising Committee',
        publisher: 'ACM VRST 2025',
        kind: 'service',
        date: '2025-11-12',
        url: 'https://vrst.acm.org/vrst2025/index.php/committee/',
        summary: 'Web Chair, ACM Symposium on Virtual Reality Software and Technology, Montréal.',
        highlights: [],
        topics: ['academic-service'],
    },
    {
        id: 'acm-sui2025',
        title: 'SUI 2025 Committee',
        publisher: 'ACM SUI 2025',
        kind: 'service',
        date: '2025-11-10',
        url: 'https://sui.acm.org/2025/committee-members/index.html',
        summary: 'Web Chair, ACM Symposium on Spatial User Interaction, Montréal.',
        highlights: [],
        topics: ['academic-service'],
    },
];

export const linkById = Object.fromEntries(links.map((l) => [l.id, l])) as Record<string, ProjectLink>;

export const linksByIds = (ids: string[]) => ids.map((id) => linkById[id]).filter(Boolean);

export const linksFor = (topic: LinkTopic) =>
    links.filter((l) => l.topics.includes(topic)).sort((a, b) => b.date.localeCompare(a.date));

export const videosFor = (topic: LinkTopic) => linksFor(topic).filter((l) => l.videoId);

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export function formatLinkDate(date: string): string {
    if (!date) return '';
    const [y, m] = date.split('-');
    return m ? `${MONTHS[Number(m) - 1]} ${y}` : y;
}

export const posterSrc = (videoId: string, thumb = true) => `/images/yt-${videoId}${thumb ? '-thumb' : ''}.webp`;
