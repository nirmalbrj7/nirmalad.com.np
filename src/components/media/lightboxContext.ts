import { createContext, useContext } from 'react';
import { imageSrc, type Photo } from '@/data/media';

export interface LightboxItem {
    src: string;
    thumb?: string;
    alt: string;
    /** Short line above the image, e.g. place and year */
    eyebrow?: string;
    caption?: string;
    credit?: { text: string; href?: string; licenseHref?: string };
}

export interface LightboxApi {
    open: (items: LightboxItem[], index?: number) => void;
}

export const LightboxContext = createContext<LightboxApi>({ open: () => {} });

export const useLightbox = () => useContext(LightboxContext);

export function creditText(p: Photo) {
    return `${p.credit.author} · ${p.credit.license}`;
}

export function photoToItem(p: Photo): LightboxItem {
    return {
        src: imageSrc(p.id),
        thumb: imageSrc(p.id, true),
        alt: p.alt,
        eyebrow: [p.place, p.year].filter(Boolean).join(' · '),
        caption: p.caption,
        credit: { text: creditText(p), href: p.credit.source, licenseHref: p.credit.licenseUrl },
    };
}
