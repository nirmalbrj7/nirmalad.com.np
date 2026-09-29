import {
    Layers, Zap, Smartphone, HardHat, LandPlot, Building2,
    Globe, BookOpen, Landmark, ScanFace, type LucideIcon,
} from 'lucide-react';
import type { LinkTopic } from './links';
import { photos, type Photo } from './media';

export type CategoryTone = 'teal' | 'indigo' | 'emerald' | 'rose' | 'amber';

export interface ProjectStat {
    label: string;
    value: string;
    /** Link id that states this figure */
    source?: string;
}

export interface Project {
    id: string;
    title: string;
    role: string;
    period: string;
    location: string;
    countries: string[];
    desc: string;
    impact: string;
    stats: ProjectStat[];
    tags: string[];
    icon: LucideIcon;
    /** Press, records and repos about the project (ids in data/links), most important first */
    coverage?: string[];
    topic?: LinkTopic;
    /** /research/:id case study */
    caseStudy?: string;
    website?: { label: string; url: string }[];
    /** Real photo shown on the card */
    photo?: Photo;
    /** YouTube video embedded on the card */
    videoId?: string;
    /** Workflow stages, shown as an interactive header when there is no photo or video */
    stages?: { name: string; detail: string }[];
    /** What became of the project afterwards */
    evolution?: {
        title: string;
        text: string;
        /** Short names for the before -> after diagram */
        from: string;
        into: string;
        intoNote?: string;
        to?: string;
        toLabel?: string;
    };
}

export interface ProjectCategory {
    id: string;
    name: string;
    description: string;
    tone: CategoryTone;
    projects: Project[];
}

export const projectCategories: ProjectCategory[] = [
    {
        id: 'platforms',
        name: 'Global Digital Platforms',
        description: 'Large-scale systems for resilient housing and recovery.',
        tone: 'teal',
        projects: [
            {
                id: 'bctap',
                title: 'Technical Assistance Platform (BCtap)',
                role: 'Tech Lead & Program Manager',
                period: '2021 – 2023',
                location: 'Global',
                countries: ['Global'],
                desc: 'I oversaw the development of BCtap, Build Change\'s information management platform for resilient housing programmes: advanced form building, offline data collection, a resource library, design tools and integrations across the six-step construction value chain. It later absorbed Resilient Housing in a Box (RHIAB).',
                impact: 'BCtap became the backbone of programme delivery, letting teams see where each house, family and project stood and making reporting to funders transparent and accountable.',
                stats: [
                    { label: 'Countries', value: '26+', source: 'bctap-site' },
                    { label: 'Disasters', value: '40+', source: 'bctap-site' },
                    { label: 'Value chain', value: '6 steps', source: 'bctap-site' },
                ],
                tags: ['Info Management', 'Offline-First', 'Workflow'],
                icon: Layers,
                coverage: ['bctap-site', 'video-bctap', 'bctap-ios', 'bctap-android', 'buildchange-technology'],
                videoId: 'i2C4f3fzVOo',
                topic: 'bctap',
                caseStudy: 'bctap',
                website: [{ label: 'bctap.buildchange.org', url: 'https://bctap.buildchange.org/' }],
            },
            {
                id: 'rhiab',
                title: 'Resilient Housing in a Box (RHIAB)',
                role: 'Tech Lead & Program Manager',
                period: '2022 – 2023',
                location: 'Global',
                countries: ['Global'],
                desc: 'Built in partnership with the Cisco Foundation, RHIAB is a web-based solution that supports every stage of a resilient housing programme, guiding teams from enrolment and assessment through design, finance and project closeout.',
                impact: 'RHIAB let teams run large housing programmes with less friction, improving reporting, data quality and coordination, and offered a scalable model adaptable to different contexts.',
                stats: [
                    { label: 'Programs', value: '15+' },
                    { label: 'Countries', value: '6' },
                    { label: 'Users', value: '2,000+' },
                ],
                tags: ['Web Platform', 'Housing Recovery', 'Cisco Foundation'],
                icon: Building2,
                coverage: ['buildchange-technology'],
                stages: [
                    { name: 'Enrolment', detail: 'Register households and check eligibility for the programme.' },
                    { name: 'Assessment', detail: 'Survey each house and site to decide what needs to be strengthened.' },
                    { name: 'Design', detail: 'Produce the repair or retrofit design for each home.' },
                    { name: 'Finance', detail: 'Track subsidies, loans and payments tied to construction progress.' },
                    { name: 'Closeout', detail: 'Confirm completion and report results to funders.' },
                ],
                evolution: {
                    title: 'Later merged into BCtap',
                    from: 'RHIAB',
                    into: 'BCtap',
                    intoNote: 'Global platform',
                    text: 'RHIAB\'s end-to-end programme workflow was later folded into BCtap, taking it from a single toolkit to Build Change\'s global platform, developed and used in 26+ countries.',
                    to: '/research/bctap',
                    toLabel: 'See the BCtap story',
                },
            },
            {
                id: 'dominica',
                title: 'Housing Recovery Project MIS (Dominica)',
                role: 'Technology Lead',
                period: '2019 – 2022',
                location: 'Dominica',
                countries: ['Dominica'],
                desc: 'After Hurricane Maria damaged about 90% of Dominica\'s housing, I led development of the Management Information System for the World Bank–financed Housing Recovery Project: beneficiary registration, screening, site-visit assignment and financial delivery for owner-driven rebuilding.',
                impact: 'The MIS gave the project team a traceable, auditable way to manage a complex, high-stakes recovery, giving families a structured path back to safe homes.',
                stats: [
                    { label: 'Homes', value: '1,700+' },
                    { label: 'MIS contract', value: 'US$499K', source: 'worldbank-dominica-mis' },
                    { label: 'Housing hit', value: '~90%', source: 'hrp-dominica' },
                ],
                tags: ['MIS', 'World Bank', 'Crisis Recovery'],
                icon: HardHat,
                coverage: ['worldbank-dominica-mis', 'hrp-dominica', 'video-dominica', 'worldbank-blog-dominica'],
                photo: photos.roseauAerial,
                videoId: 'U9HWZtWoWas',
                topic: 'dominica',
            },
            {
                id: 'colombia',
                title: 'Casa Digna, Vida Digna (Colombia)',
                role: 'Technical Advisor',
                period: '2019 – 2022',
                location: 'Colombia',
                countries: ['Colombia'],
                desc: 'I advised on the field technology Build Change provided to Colombia\'s national housing-improvement programme with the Ministry of Housing: a Fulcrum-based app that semi-automatically screens viable homes, scopes the works and estimates budgets, integrated with the Ministry\'s information system and MiCasa software. The same workflows supported Bogotá\'s Caja de Vivienda Popular on the Plan Terrazas pilot.',
                impact: 'Brought global resilient-housing tooling into a national-scale programme targeting 600,000 home improvements, so structural safety could be assessed consistently in the field.',
                stats: [
                    { label: 'Programme goal', value: '600K homes' },
                    { label: 'Pilot homes', value: '100', source: 'buildchange-colombia-2021' },
                    { label: 'Integrations', value: 'MVCT + MiCasa', source: 'buildchange-colombia-2021' },
                ],
                tags: ['Technical Strategy', 'Government', 'Field Data'],
                icon: Globe,
                coverage: ['buildchange-colombia-2021'],
                photo: photos.bogota,
                topic: 'colombia',
            },
        ],
    },
    {
        id: 'ai',
        name: 'AI & Quality Assurance',
        description: 'Machine learning for safety and inspection.',
        tone: 'indigo',
        projects: [
            {
                id: 'pd3r',
                title: 'PD3R — Post-Disaster Rapid Response Retrofit',
                role: 'Project Manager · Lead author',
                period: '2018',
                location: 'Kathmandu, Nepal & Colombia',
                countries: ['Nepal', 'Colombia'],
                desc: 'I managed Build Change\'s entry to IBM\'s Call for Code: an AI pipeline trained on BIM-generated and real images that tells families whether an earthquake-damaged house can be retrofitted rather than rebuilt. I led it from model design to a working mobile prototype and am listed first on the project\'s authors file.',
                impact: 'Placed 2nd worldwide in the inaugural Call for Code, out of 2,500+ solutions from 156 countries, and became the foundation of the open-source ISAC-SIMO project.',
                stats: [
                    { label: 'Global rank', value: '2nd', source: 'prnewswire-cfc2018' },
                    { label: 'Prize', value: '$25,000', source: 'prnewswire-cfc2018' },
                    { label: 'Training images', value: '2,000+', source: 'ibm-newsroom-top5' },
                ],
                tags: ['AI', 'Call for Code', 'IBM Watson'],
                icon: ScanFace,
                coverage: ['prnewswire-cfc2018', 'ibm-newsroom-top5', 'github-pd3r', 'video-pd3r', 'buildchange-nepal-5yrs'],
                photo: photos.pd3rFieldFront,
                videoId: 'mVkjJx_Ko3k',
                topic: 'pd3r',
                caseStudy: 'pd3r',
                website: [{ label: 'GitHub', url: 'https://github.com/Call-for-Code/PD3R' }],
            },
            {
                id: 'isac-simo',
                title: 'ISAC-SIMO Open Source QA',
                role: 'Project Manager & Tech Lead',
                period: '2020 – 2021',
                location: 'Global',
                countries: ['Global', 'Colombia'],
                desc: 'I directed development of ISAC-SIMO, the open-source offshoot of PD3R. Anyone with a phone can photograph rebar or a masonry wall and get GO / NO-GO feedback from machine-learning and image-processing checks. I managed the ML pipeline and the homeowner-facing mobile app.',
                impact: 'Hosted by The Linux Foundation, ISAC-SIMO lets homeowners, builders and officials check construction quality themselves instead of waiting for scarce engineers.',
                stats: [
                    { label: 'Hosted by', value: 'Linux Fdn.', source: 'lf-isac-simo' },
                    { label: 'Funding', value: 'IBM grant', source: 'lf-isac-simo' },
                    { label: 'License', value: 'Apache-2.0', source: 'github-isac-simo' },
                ],
                tags: ['Open Source', 'Computer Vision', 'IBM'],
                icon: Zap,
                coverage: ['lf-isac-simo', 'video-isac-simo', 'github-isac-simo', 'site-isac-simo'],
                photo: photos.isacOverview,
                videoId: '145ytpzG3I8',
                topic: 'isac-simo',
                caseStudy: 'isac-simo',
                website: [{ label: 'isac-simo.net', url: 'https://isac-simo.net/' }],
            },
        ],
    },
    {
        id: 'field',
        name: 'Field Systems, Monitoring & Training',
        description: 'Mobile tools for on-site operations and skills.',
        tone: 'emerald',
        projects: [
            {
                id: 'stfc-monitoring',
                title: 'STFC Monitoring System (Nuwakot)',
                role: 'Project Lead',
                period: '2018 – 2019',
                location: 'Nuwakot, Nepal',
                countries: ['Nepal'],
                desc: 'I developed the monitoring MIS for the Socio-Technical Facilitation and Consultation project, recording beneficiaries, inspections and reconstruction stages across the district.',
                impact: 'Gave the team a complete picture of every household\'s progress and made sure technical assistance reached the right families at the right time.',
                stats: [
                    { label: 'Households', value: '23,088', source: 'buildchange-stfc' },
                    { label: 'Municipalities', value: '10', source: 'buildchange-stfc' },
                    { label: 'Build seasons', value: '3', source: 'buildchange-stfc' },
                ],
                tags: ['Monitoring', 'Data Viz', 'MIS'],
                icon: LandPlot,
                coverage: ['buildchange-stfc', 'video-nepal-homes'],
                topic: 'stfc',
                photo: photos.nuwakotAfterQuake,
            },
            {
                id: 'stfc',
                title: 'Socio-Technical Facilitation (Nuwakot)',
                role: 'Technical Assistance Provider',
                period: '2018 – 2019',
                location: 'Nuwakot, Nepal',
                countries: ['Nepal'],
                desc: 'I supported earthquake-affected homeowners in Nuwakot with safe-rebuilding guidance, using the monitoring systems I helped build to target visits and follow-up.',
                impact: 'Helped families rebuild safer homes within a homeowner-driven reconstruction model that respected local needs.',
                stats: [
                    { label: 'Households', value: '23,088', source: 'buildchange-stfc' },
                    { label: 'Funder', value: 'Govt. of India', source: 'buildchange-stfc' },
                    { label: 'Programme', value: '2018–21', source: 'buildchange-stfc' },
                ],
                tags: ['Community', 'Advisory', 'Field Work'],
                icon: HardHat,
                coverage: ['buildchange-stfc', 'buildchange-nepal-5yrs', 'video-nepal-homes'],
                photo: photos.nuwakotRebuild,
                videoId: '3a-H0eqdUws',
                topic: 'stfc',
            },
            {
                id: 'construction-guidelines',
                title: 'Construction Guidelines System (Philippines)',
                role: 'Project Lead',
                period: '2019 – 2022',
                location: 'Philippines',
                countries: ['Philippines'],
                desc: 'Led an integrated web and mobile system serving as a central repository for reports and process steps, connected to a mobile app for tracking field progress.',
                impact: 'Helped enforce good construction practice, made site-level progress easier to track, and improved communication between field staff and supervisors.',
                stats: [
                    { label: 'Users', value: '500+' },
                    { label: 'Sites', value: '200+' },
                    { label: 'Compliance', value: '95%' },
                ],
                tags: ['Mobile App', 'Compliance', 'Field Ops'],
                icon: Smartphone,
            },
            {
                id: 'cbt',
                title: 'Competency Based Training System (Nepal)',
                role: 'Project Lead',
                period: '2018 – 2019',
                location: 'Nepal',
                countries: ['Nepal'],
                desc: 'Created a system to manage on-the-job training for construction workers, tracking attendance and daily progress with an offline-capable mobile app.',
                impact: 'Made training structured and transparent, helping build practical skills in the construction workforce at scale.',
                stats: [
                    { label: 'Workers', value: '5,000+' },
                    { label: 'Completion', value: '89%' },
                    { label: 'Districts', value: '12' },
                ],
                tags: ['EdTech', 'Training', 'Offline-First'],
                icon: BookOpen,
            },
        ],
    },
    {
        id: 'mobile',
        name: 'Mobile, Awareness & Immersive',
        description: 'Engaging communities through apps and VR experiences.',
        tone: 'rose',
        projects: [
            {
                id: 'awareness-apps',
                title: 'Mobile Awareness Apps',
                role: 'Development Manager',
                period: '2018 – 2021',
                location: 'Philippines, Nepal, Indonesia',
                countries: ['Philippines', 'Nepal', 'Indonesia'],
                desc: 'Managed development of "Tibay Balay", "Surakshit Ghar" and "Rumah Aman" across the Philippines, Nepal and Indonesia: construction guidance libraries and interactive tools for homeowners and masons. Surakshit Ghar was launched by Nepal\'s National Reconstruction Authority.',
                impact: 'Put expert building advice directly in people\'s hands on site, supporting safer choices during reconstruction.',
                stats: [
                    { label: 'Downloads', value: '50K+' },
                    { label: 'Countries', value: '3' },
                    { label: 'Languages', value: '5' },
                ],
                tags: ['Mobile', 'Education', 'Multi-Region'],
                icon: Smartphone,
                coverage: ['myrepublica-surakshit-ghar', 'buildchange-nepal-5yrs'],
                topic: 'surakshit-ghar',
            },
            {
                id: 'risk-app',
                title: 'Global Risk Awareness App',
                role: 'Project Lead & Developer',
                period: '2018 – 2021',
                location: 'Global',
                countries: ['Global'],
                desc: 'Developed an app displaying hazard maps and safe zones. Users mark their homes to see their vulnerability to specific natural hazards.',
                impact: 'Supports better everyday decisions about risk and preparedness in disaster-prone communities.',
                stats: [
                    { label: 'Hazards', value: '15+' },
                    { label: 'Countries', value: '10+' },
                    { label: 'Users', value: '25K+' },
                ],
                tags: ['GIS', 'Risk Mapping', 'React Native'],
                icon: LandPlot,
            },
            {
                id: 'eklephat-vr',
                title: 'Eklephat Village VR Tour',
                role: 'Project Coordinator',
                period: '2018',
                location: 'Nepal',
                countries: ['Nepal'],
                desc: 'Coordinated an immersive VR tour of retrofitted houses, stitched from 360-degree imagery into a guided experience.',
                impact: 'A powerful advocacy tool that let donors and partners experience retrofit results without travelling.',
                stats: [
                    { label: 'Houses', value: '50+' },
                    { label: 'Experience', value: 'VR 360°' },
                    { label: 'Donors', value: '20+' },
                ],
                tags: ['VR', 'Immersive', 'Storytelling'],
                icon: Layers,
                coverage: ['buildchange-eklephat'],
                topic: 'eklephat',
            },
        ],
    },
    {
        id: 'policy',
        name: 'Policy, Finance & Technical Guidance',
        description: 'Strategic resources for financial and organisational growth.',
        tone: 'amber',
        projects: [
            {
                id: 'microfinance',
                title: 'Microfinance Strengthening (Indonesia & Philippines)',
                role: 'Technical Advisor',
                period: '2022 – 2023',
                location: 'Indonesia, Philippines',
                countries: ['Indonesia', 'Philippines'],
                desc: 'Built digital platforms and resources helping microfinance institutions integrate disaster prevention into lending, including product design, builder guides and supervision and reporting workflows.',
                impact: 'Enabled lenders to offer affordable home-strengthening loans, so families can improve safety before disasters strike.',
                stats: [
                    { label: 'Institutions', value: '25+' },
                    { label: 'Products', value: '8' },
                    { label: 'Countries', value: '2' },
                ],
                tags: ['Microfinance', 'Policy', 'Strategy'],
                icon: Landmark,
            },
            {
                id: 'website',
                title: 'Build Change Website Redesign',
                role: 'Product Manager',
                period: '2022 – 2023',
                location: 'Global',
                countries: ['Global'],
                desc: 'Managed the complete redesign of buildchange.org with a refreshed identity, responsive design and a rich resource library.',
                impact: 'Improved discovery of resources and strengthened the organisation\'s global digital presence and storytelling.',
                stats: [
                    { label: 'Pages', value: '50+' },
                    { label: 'Resources', value: '200+' },
                    { label: 'Languages', value: '3' },
                ],
                tags: ['Product Mgmt', 'Web Design', 'Branding'],
                icon: Globe,
                website: [{ label: 'buildchange.org', url: 'https://buildchange.org/' }],
            },
        ],
    },
];

export const allProjects = projectCategories.flatMap((c) => c.projects.map((p) => ({ ...p, category: c })));

export const projectCountries = Array.from(new Set(allProjects.flatMap((p) => p.countries)))
    .sort((a, b) => (a === 'Global' ? 1 : b === 'Global' ? -1 : a.localeCompare(b)));
