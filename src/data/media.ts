// Real photographs and project imagery used across the site.
// Files live in /public/images/<id>.webp with a <id>-thumb.webp companion.
// Every third-party image carries the credit its licence requires.

export interface Credit {
    author: string;
    license: string;
    licenseUrl?: string;
    /** Page the image was obtained from */
    source: string;
}

export interface Photo {
    id: string;
    alt: string;
    caption: string;
    place?: string;
    year?: string;
    credit: Credit;
    /** Portrait images get a taller tile */
    portrait?: boolean;
    /** Diagrams and renders are fitted inside the tile instead of cropped */
    contain?: boolean;
}

const commons = (file: string) => `https://commons.wikimedia.org/wiki/File:${encodeURIComponent(file.replace(/ /g, '_'))}`;
const CC_BY_2 = 'https://creativecommons.org/licenses/by/2.0/';
const CC_BY_SA_2 = 'https://creativecommons.org/licenses/by-sa/2.0/';
const CC_BY_SA_4 = 'https://creativecommons.org/licenses/by-sa/4.0/';
const APACHE = 'https://www.apache.org/licenses/LICENSE-2.0';

const pd3rRepo: Credit = { author: 'PD3R authors, Call for Code', license: 'Apache-2.0', licenseUrl: APACHE, source: 'https://github.com/Call-for-Code/PD3R' };
const isacRepo: Credit = { author: 'ISAC-SIMO project, Build Change', license: 'Apache-2.0', licenseUrl: APACHE, source: 'https://github.com/ISAC-SIMO/ISAC-SIMO/tree/master/Images' };

export const photos = {
    nuwakotAfterQuake: {
        id: 'nepal-nuwakot-after-earthquake-2015',
        alt: 'Collapsed buildings and rubble around Nuwakot Durbar after the 2015 earthquake',
        caption: 'Nuwakot, two weeks after the April 2015 Gorkha earthquake. Later, Build Change\'s STFC programme supported 23,088 households in this district.',
        place: 'Nuwakot, Nepal',
        year: '2015',
        credit: { author: 'SusantBasnet14', license: 'CC BY-SA 4.0', licenseUrl: CC_BY_SA_4, source: commons('Nuwakot Durbar after Earthquake.jpg') },
    },
    nuwakotRebuild: {
        id: 'nepal-nuwakot-reconstruction-2016',
        alt: 'Homeowners discussing timber for a new earthquake-resistant house in Nuwakot',
        caption: 'Owner-driven reconstruction in Nuwakot: homeowners discuss using timber in a new house.',
        place: 'Nuwakot, Nepal',
        year: '2016',
        portrait: true,
        credit: { author: 'Bhawana Gurung', license: 'CC BY-SA 4.0', licenseUrl: CC_BY_SA_4, source: commons('Talking about use of wood in new house.jpg') },
    },
    roseauAerial: {
        id: 'dominica-roseau-aerial-2017',
        alt: 'Aerial view of roofless houses in Roseau, Dominica, the day after Hurricane Maria',
        caption: 'Roseau from a relief helicopter, 20 September 2017. Maria affected about 90% of Dominica\'s housing.',
        place: 'Roseau, Dominica',
        year: '2017',
        credit: { author: 'UK Department for International Development', license: 'CC BY 2.0', licenseUrl: CC_BY_2, source: commons('View of Roseau, Dominica, through the window of an RAF Chinook helicoter, 20 Sept 2017 (37188494722).jpg') },
    },
    roseauStreet: {
        id: 'dominica-roseau-street-2017',
        alt: 'Damaged buildings and debris on a street in Roseau after Hurricane Maria',
        caption: 'A street in Roseau the day after Hurricane Maria.',
        place: 'Roseau, Dominica',
        year: '2017',
        credit: { author: 'UK Department for International Development', license: 'CC BY 2.0', licenseUrl: CC_BY_2, source: commons('View of a street in Roseau, the capital city of Dominica, 20 Sept 2017, the day after hurricane Maria caused widespread devastation across the island (37360926485).jpg') },
    },
    bogota: {
        id: 'colombia-bogota-ciudad-bolivar',
        alt: 'Self-built brick houses on a hillside in Ciudad Bolívar, Bogotá',
        caption: 'Self-built hillside housing in Ciudad Bolívar, Bogotá: the kind of homes Colombia\'s improvement programmes set out to strengthen.',
        place: 'Bogotá, Colombia',
        portrait: true,
        credit: { author: 'Alison McKellar', license: 'CC BY 2.0', licenseUrl: CC_BY_2, source: commons('Bogota Ciudad Bolivar 01.jpg') },
    },
    halifax: {
        id: 'canada-halifax-waterfront',
        alt: 'Halifax waterfront with boats and downtown towers',
        caption: 'Halifax, Nova Scotia: home base since 2023.',
        place: 'Halifax, Canada',
        credit: { author: 'daryl_mitchell', license: 'CC BY-SA 2.0', licenseUrl: CC_BY_SA_2, source: commons('Halifax Waterfront (41039142235).jpg') },
    },
    dalhousie: {
        id: 'dalhousie-goldberg-cs-building',
        alt: 'Glass facade of the Goldberg Computer Science Building at Dalhousie University',
        caption: 'Goldberg Computer Science Building, Dalhousie University, home of the GEM Lab.',
        place: 'Halifax, Canada',
        credit: { author: 'Ryan Sharpe', license: 'CC BY-SA 4.0', licenseUrl: CC_BY_SA_4, source: commons('Goldberg Computer Science Building, Dalhousie University – Halifax, NS – (2018-08-26).jpg') },
    },
    auaf: {
        id: 'auaf-saleha-bayat-building',
        alt: 'Entrance of the Saleha Bayat Building at the American University of Afghanistan',
        caption: 'The American University of Afghanistan\'s Kabul campus (2011). AUAF has taught fully online since 2021.',
        place: 'Kabul, Afghanistan',
        year: '2011',
        credit: { author: 'USAID Afghanistan', license: 'Public domain', source: commons('Saleha Bayat Building at AUAF in Kabul.jpg') },
    },
    pd3rFieldFront: {
        id: 'pd3r-field-house-front',
        alt: 'Two-storey stone masonry house in Nepal photographed for the PD3R dataset',
        caption: 'Field photo from the PD3R dataset: a stone-masonry house of the type the model assesses.',
        place: 'Nepal',
        year: '2018',
        credit: pd3rRepo,
    },
    pd3rFieldSide: {
        id: 'pd3r-field-house-side',
        alt: 'Side wall of a stone masonry house photographed for the PD3R dataset',
        caption: 'Side-wall photo from the PD3R dataset.',
        place: 'Nepal',
        year: '2018',
        portrait: true,
        credit: pd3rRepo,
    },
    pd3rRender1: {
        id: 'pd3r-render-1',
        contain: true,
        alt: 'Synthetic render of a house facade generated for PD3R training',
        caption: 'Synthetic training image rendered from a BIM model in Revit and Dynamo.',
        year: '2018',
        credit: pd3rRepo,
    },
    pd3rRender2: {
        id: 'pd3r-render-2',
        contain: true,
        alt: 'Synthetic render of a house facade with a different window layout',
        caption: 'Varying opening sizes and positions teaches the model what makes a house retrofittable.',
        year: '2018',
        credit: pd3rRepo,
    },
    pd3rRender3: {
        id: 'pd3r-render-3',
        contain: true,
        alt: 'Synthetic render of a third house facade variation',
        caption: 'One of hundreds of generated facades used to train the classifier.',
        year: '2018',
        credit: pd3rRepo,
    },
    isacOverview: {
        id: 'isac-overview',
        contain: true,
        alt: 'ISAC-SIMO system overview diagram: mobile app, web dashboard and ML pipeline',
        caption: 'ISAC-SIMO architecture: the mobile app sends photos through a configurable image-processing and ML pipeline.',
        credit: isacRepo,
    },
    isacRebarShape: {
        id: 'isac-rebar-shape-go',
        contain: true,
        alt: 'Example of correctly bent rebar stirrup shape accepted by ISAC-SIMO',
        caption: 'Rebar shape check: a compliant (GO) stirrup.',
        credit: isacRepo,
    },
    isacRebarTexture: {
        id: 'isac-rebar-texture-go',
        contain: true,
        alt: 'Close-up of ribbed, corrosion-free rebar',
        caption: 'Rebar texture check: ribs present, no corrosion.',
        credit: isacRepo,
    },
    isacRebarCage: {
        id: 'isac-rebar-cage-go',
        contain: true,
        alt: 'Rebar cage with evenly spaced stirrups',
        caption: 'Cage spacing check on a column reinforcement cage.',
        portrait: true,
        credit: isacRepo,
    },
    isacBond: {
        id: 'isac-bond-pattern-check',
        contain: true,
        alt: 'Brick wall with detected mortar joints overlaid',
        caption: 'Wall check: contour extraction finds bricks and mortar joints to test the bond pattern.',
        credit: isacRepo,
    },
    isacBondGoNoGo: {
        id: 'isac-bond-pattern-check-gonogo',
        contain: true,
        alt: 'Side-by-side GO and NO-GO brick bond pattern results',
        caption: 'The GO / NO-GO result a builder sees for a wall bond pattern.',
        credit: isacRepo,
    },
} satisfies Record<string, Photo>;

export const imageSrc = (id: string, thumb = false) => `/images/${id}${thumb ? '-thumb' : ''}.webp`;

export type PhotoKey = keyof typeof photos;
