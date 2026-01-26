
import { writeFileSync } from 'fs';
import { resolve } from 'path';

const BASE_URL = 'https://nirmalad.com.np';
const OUTPUT_FILE = resolve('public', 'sitemap.xml');

const routes = [
    '/',
    '/academic',
    '/publications',
    '/projects',
    '/volunteer',
    '/blog',
    '/recognition',
    '/contact',
    '/cv'
];

const generateSitemap = () => {
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${routes
            .map((route) => {
                return `
    <url>
        <loc>${BASE_URL}${route}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>${route === '/' ? '1.0' : '0.8'}</priority>
    </url>`;
            })
            .join('')}
</urlset>`;

    writeFileSync(OUTPUT_FILE, sitemap);
    console.log(`Sitemap generated at ${OUTPUT_FILE}`);
};

generateSitemap();
