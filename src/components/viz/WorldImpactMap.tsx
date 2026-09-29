import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { geoGraticule10, geoInterpolate, geoNaturalEarth1, geoPath } from 'd3';
import { feature } from 'topojson-client';
import type { FeatureCollection, Geometry } from 'geojson';
import type { Topology, GeometryCollection } from 'topojson-specification';
import { ArrowRight, Globe2, MapPin, Pause, Play } from 'lucide-react';
import { cn } from '@/lib/utils';
import { imageSrc, photos, type Photo } from '@/data/media';
import { creditText } from '@/components/media/lightboxContext';

type Group = 'field' | 'research' | 'teaching';

interface Place {
    id: string;
    city: string;
    country: string;
    /** ISO 3166 numeric code used by Natural Earth; omitted for islands too small at this scale */
    iso?: string;
    /** [longitude, latitude] */
    coords: [number, number];
    group: Group;
    years: string;
    role: string;
    work: { label: string; to: string }[];
    photo?: Photo;
    labelSide?: 'left' | 'right';
}

const places: Place[] = [
    {
        id: 'kathmandu', city: 'Kathmandu & Nuwakot', country: 'Nepal', iso: '524', coords: [85.32, 27.72], group: 'field', years: '2015–2023',
        role: 'IT project manager, then Build Change\'s technology lead in Nepal after the 2015 earthquake.',
        work: [
            { label: 'PD3R: Call for Code 2nd place', to: '/research/pd3r' },
            { label: 'Nuwakot STFC: 23,088 households', to: '/projects' },
            { label: 'Lecturer, ICMS (GIS & Remote Sensing)', to: '/academic' },
        ],
        photo: photos.nuwakotAfterQuake,
    },
    {
        id: 'roseau', city: 'Roseau', country: 'Dominica', coords: [-61.39, 15.3], group: 'field', years: '2019–2022',
        role: 'Technology lead for the Housing Recovery Project MIS after Hurricane Maria.',
        work: [{ label: 'Housing Recovery Project MIS', to: '/projects' }],
        photo: photos.roseauAerial, labelSide: 'right',
    },
    {
        id: 'bogota', city: 'Bogotá & Medellín', country: 'Colombia', iso: '170', coords: [-74.07, 4.71], group: 'field', years: '2018–2022',
        role: 'Technical advisor to Casa Digna, Vida Digna; PD3R and ISAC-SIMO teammates were based here.',
        work: [
            { label: 'Casa Digna, Vida Digna', to: '/projects' },
            { label: 'ISAC-SIMO', to: '/research/isac-simo' },
        ],
        photo: photos.bogota, labelSide: 'left',
    },
    {
        id: 'manila', city: 'Manila', country: 'Philippines', iso: '608', coords: [120.98, 14.6], group: 'field', years: '2018–2023',
        role: 'Construction guidelines system, the Tibay Balay app and microfinance platforms.',
        work: [{ label: 'Field systems & awareness apps', to: '/projects' }],
    },
    {
        id: 'jakarta', city: 'Jakarta', country: 'Indonesia', iso: '360', coords: [106.85, -6.21], group: 'field', years: '2018–2023',
        role: 'The Rumah Aman awareness app and microfinance strengthening platforms.',
        work: [{ label: 'Microfinance strengthening', to: '/projects' }],
    },
    {
        id: 'denver', city: 'Denver', country: 'United States', iso: '840', coords: [-104.99, 39.74], group: 'field', years: '2022–2023',
        role: 'Technology Program Manager at Build Change (headquartered in Denver): BCtap and Resilient Housing in a Box.',
        work: [{ label: 'BCtap platform', to: '/research/bctap' }],
        labelSide: 'left',
    },
    {
        id: 'halifax', city: 'Halifax', country: 'Canada', iso: '124', coords: [-63.58, 44.65], group: 'research', years: '2023–present',
        role: 'PhD researcher in the GEM Lab at Dalhousie University and teaching assistant.',
        work: [
            { label: 'Locative AR narratives', to: '/research/ar-narratives' },
            { label: 'Teaching at Dalhousie', to: '/academic' },
        ],
        photo: photos.dalhousie, labelSide: 'right',
    },
    {
        id: 'kabul', city: 'AUAF (online)', country: 'Afghanistan', iso: '004', coords: [69.17, 34.53], group: 'teaching', years: '2026–present',
        role: 'Adjunct Lecturer at the American University of Afghanistan, teaching remotely.',
        work: [{ label: 'Programming languages, web, networking', to: '/academic' }],
        photo: photos.auaf, labelSide: 'left',
    },
    {
        id: 'uopeople', city: 'UoPeople (online)', country: 'United States', coords: [-118.14, 34.15], group: 'teaching', years: '2025–present',
        role: 'Volunteer instructor at University of the People, a tuition-free online university.',
        work: [{ label: 'CS, AI and networking courses', to: '/academic' }],
        labelSide: 'left',
    },
];

const byId = Object.fromEntries(places.map((p) => [p.id, p])) as Record<string, Place>;

const routes: { from: string; to: string; kind: 'managed' | 'move' | 'online' }[] = [
    { from: 'kathmandu', to: 'roseau', kind: 'managed' },
    { from: 'kathmandu', to: 'bogota', kind: 'managed' },
    { from: 'kathmandu', to: 'manila', kind: 'managed' },
    { from: 'kathmandu', to: 'jakarta', kind: 'managed' },
    { from: 'kathmandu', to: 'denver', kind: 'managed' },
    { from: 'kathmandu', to: 'halifax', kind: 'move' },
    { from: 'halifax', to: 'kabul', kind: 'online' },
    { from: 'halifax', to: 'uopeople', kind: 'online' },
];

const groupMeta: Record<Group, { label: string; color: string; dot: string }> = {
    field: { label: 'Field projects', color: '#0d9488', dot: 'bg-teal-600' },
    research: { label: 'Research', color: '#e07a5f', dot: 'bg-coral-400' },
    teaching: { label: 'Online teaching', color: '#6366f1', dot: 'bg-indigo-500' },
};

const W = 960;
const H = 500;

export default function WorldImpactMap() {
    const [countries, setCountries] = useState<FeatureCollection<Geometry, { name: string }> | null>(null);
    const [active, setActive] = useState('kathmandu');
    const [filter, setFilter] = useState<Group | 'all'>('all');
    const [autoplay, setAutoplay] = useState(true);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let cancelled = false;
        import('world-atlas/countries-110m.json').then((mod) => {
            if (cancelled) return;
            const topo = mod.default as unknown as Topology<{ countries: GeometryCollection<{ name: string }> }>;
            setCountries(feature(topo, topo.objects.countries) as FeatureCollection<Geometry, { name: string }>);
        });
        return () => { cancelled = true; };
    }, []);

    const visible = places.filter((p) => filter === 'all' || p.group === filter);

    // Cycle through places until the visitor interacts.
    useEffect(() => {
        if (!autoplay) return;
        const t = setInterval(() => {
            setActive((cur) => {
                const list = places.filter((p) => filter === 'all' || p.group === filter);
                const i = list.findIndex((p) => p.id === cur);
                return list[(i + 1) % list.length].id;
            });
        }, 4200);
        return () => clearInterval(t);
    }, [autoplay, filter]);

    const { path, project, graticule } = useMemo(() => {
        const projection = geoNaturalEarth1().scale(172).translate([W / 2 - 10, H / 2 + 28]);
        return { path: geoPath(projection), project: projection, graticule: geoGraticule10() };
    }, []);

    const workedIso = new Set(places.map((p) => p.iso).filter(Boolean));

    const arc = (a: Place, b: Place) => {
        const interp = geoInterpolate(a.coords, b.coords);
        const coordinates = Array.from({ length: 48 }, (_, i) => interp(i / 47));
        return path({ type: 'LineString', coordinates }) ?? '';
    };

    const current = byId[active];
    const pick = (id: string) => { setActive(id); setAutoplay(false); };
    // Online teaching is remote, so it doesn't add to the countries worked in.
    const countryCount = new Set(places.filter((p) => p.group !== 'teaching').map((p) => p.country)).size;

    return (
        <div ref={containerRef} className="relative min-w-0 w-full">
            <div className="flex flex-wrap items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center">
                    <Globe2 size={20} className="text-teal-600" />
                </div>
                <div className="mr-auto">
                    <h3 className="font-bold text-charcoal-900">Where the work happened</h3>
                    <p className="text-sm text-charcoal-500">{countryCount} countries · 2 universities online · 2015–today</p>
                </div>
                <button
                    onClick={() => setAutoplay((a) => !a)}
                    className="p-2 rounded-full text-charcoal-500 hover:bg-sand-100"
                    aria-label={autoplay ? 'Pause tour' : 'Play tour'}
                    title={autoplay ? 'Pause tour' : 'Play tour'}
                >
                    {autoplay ? <Pause size={16} /> : <Play size={16} />}
                </button>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
                {(['all', 'field', 'research', 'teaching'] as const).map((g) => (
                    <button
                        key={g}
                        onClick={() => { setFilter(g); setAutoplay(false); const first = places.find((p) => g === 'all' || p.group === g); if (first) setActive(first.id); }}
                        aria-pressed={filter === g}
                        className={cn(
                            'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors',
                            filter === g ? 'bg-charcoal-900 border-charcoal-900 text-white' : 'bg-white border-sand-200 text-charcoal-600 hover:border-charcoal-300',
                        )}
                    >
                        {g !== 'all' && <span className={cn('w-2 h-2 rounded-full', groupMeta[g].dot)} />}
                        {g === 'all' ? 'Everything' : groupMeta[g].label}
                    </button>
                ))}
            </div>

            <div className="relative rounded-3xl overflow-hidden border border-sand-200 bg-gradient-to-b from-sky-50 via-white to-teal-50/40">
                <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto block" role="img" aria-label="World map of places Nirmal has worked and taught">
                    <path d={path(graticule) ?? ''} fill="none" stroke="#0d7377" strokeOpacity={0.06} strokeWidth={0.6} />
                    {countries?.features.map((f, i) => {
                        const worked = workedIso.has(String(f.id));
                        return (
                            <path
                                key={i}
                                d={path(f) ?? ''}
                                fill={worked ? '#99f6e4' : '#e8e3cc'}
                                fillOpacity={worked ? 0.85 : 0.7}
                                stroke="#fff"
                                strokeWidth={0.5}
                            >
                                <title>{f.properties.name}</title>
                            </path>
                        );
                    })}
                    {!countries && <text x={W / 2} y={H / 2} textAnchor="middle" className="fill-charcoal-400 text-sm">Loading map…</text>}

                    {routes.map((r) => {
                        const a = byId[r.from];
                        const b = byId[r.to];
                        const shown = filter === 'all' || a.group === filter || b.group === filter;
                        const highlighted = active === r.from || active === r.to;
                        const color = r.kind === 'online' ? groupMeta.teaching.color : r.kind === 'move' ? groupMeta.research.color : groupMeta.field.color;
                        return (
                            <motion.path
                                key={`${r.from}-${r.to}`}
                                d={arc(a, b)}
                                fill="none"
                                stroke={color}
                                strokeWidth={highlighted ? 2.2 : 1.2}
                                strokeDasharray={r.kind === 'online' ? '5 5' : undefined}
                                strokeLinecap="round"
                                initial={{ pathLength: 0, opacity: 0 }}
                                animate={{ pathLength: 1, opacity: shown ? (highlighted ? 0.95 : 0.45) : 0.06 }}
                                transition={{ pathLength: { duration: 1.6, ease: 'easeInOut' }, opacity: { duration: 0.4 } }}
                            />
                        );
                    })}

                    {places.map((p) => {
                        const [x, y] = project(p.coords) ?? [0, 0];
                        const shown = filter === 'all' || p.group === filter;
                        const isActive = p.id === active;
                        const color = groupMeta[p.group].color;
                        const side = p.labelSide ?? 'right';
                        return (
                            <g
                                key={p.id}
                                transform={`translate(${x},${y})`}
                                opacity={shown ? 1 : 0.25}
                                className="cursor-pointer focus:outline-none"
                                role="button"
                                tabIndex={0}
                                aria-label={`${p.city}, ${p.country}`}
                                aria-pressed={isActive}
                                onMouseEnter={() => pick(p.id)}
                                onFocus={() => pick(p.id)}
                                onClick={() => pick(p.id)}
                                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); pick(p.id); } }}
                            >
                                <circle r={14} fill="transparent" />
                                {isActive && (
                                    <circle r={6} fill={color} opacity={0.35}>
                                        <animate attributeName="r" values="6;18;6" dur="2s" repeatCount="indefinite" />
                                        <animate attributeName="opacity" values="0.4;0;0.4" dur="2s" repeatCount="indefinite" />
                                    </circle>
                                )}
                                <circle r={isActive ? 6.5 : 4.5} fill={color} stroke="#fff" strokeWidth={2} />
                                {(isActive || p.id === 'kathmandu' || p.id === 'halifax') && (
                                    <text
                                        x={side === 'right' ? 10 : -10}
                                        y={4}
                                        textAnchor={side === 'right' ? 'start' : 'end'}
                                        className="text-[13px] font-semibold"
                                        fill="#1a1a2e"
                                        stroke="#fff"
                                        strokeWidth={3.5}
                                        paintOrder="stroke"
                                    >
                                        {p.city}
                                    </text>
                                )}
                            </g>
                        );
                    })}
                </svg>

                {/* Legend */}
                <div className="absolute left-3 bottom-3 hidden sm:flex items-center gap-3 px-3 py-2 rounded-xl bg-white/85 backdrop-blur border border-sand-200 text-[11px] text-charcoal-600">
                    <span className="flex items-center gap-1.5"><span className="w-4 h-0.5 bg-teal-600" /> Led from Kathmandu</span>
                    <span className="flex items-center gap-1.5"><span className="w-4 h-0.5 bg-coral-400" /> Moved 2023</span>
                    <span className="flex items-center gap-1.5"><span className="w-4 border-t-2 border-dashed border-indigo-500" /> Online</span>
                </div>
            </div>

            {/* Detail card */}
            <AnimatePresence mode="wait">
                {current && (
                    <motion.div
                        key={current.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.25 }}
                        className="mt-4 rounded-2xl bg-white border border-sand-200 overflow-hidden flex flex-col sm:flex-row"
                    >
                        {current.photo && (
                            <div className="relative sm:w-44 shrink-0 aspect-[16/9] sm:aspect-auto bg-sand-100">
                                <img src={imageSrc(current.photo.id, true)} alt={current.photo.alt} className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
                                <a
                                    href={current.photo.credit.source}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="absolute left-0 right-0 bottom-0 px-2 py-1 bg-charcoal-950/60 text-[9px] text-white/80 truncate hover:text-white"
                                >
                                    {creditText(current.photo)}
                                </a>
                            </div>
                        )}
                        <div className="p-4 sm:p-5 flex-1 min-w-0">
                            <p className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest mb-1" style={{ color: groupMeta[current.group].color }}>
                                <MapPin size={12} /> {current.country} · {current.years}
                            </p>
                            <h4 className="font-display font-bold text-lg text-charcoal-900">{current.city}</h4>
                            <p className="text-sm text-charcoal-600 mb-3">{current.role}</p>
                            <div className="flex flex-wrap gap-2">
                                {current.work.map((w) => (
                                    <Link
                                        key={w.label}
                                        to={w.to}
                                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-sand-50 border border-sand-200 text-xs font-semibold text-charcoal-700 hover:border-teal-300 hover:text-teal-700"
                                    >
                                        {w.label} <ArrowRight size={12} />
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Place list for keyboard and touch; wraps so every place stays visible */}
            <div className="mt-3 flex flex-wrap gap-1.5">
                {visible.map((p) => (
                    <button
                        key={p.id}
                        onClick={() => pick(p.id)}
                        className={cn(
                            'shrink-0 px-2.5 py-1 rounded-full text-[11px] font-semibold border transition-colors',
                            p.id === active ? 'bg-teal-600 border-teal-600 text-white' : 'bg-white/70 border-sand-200 text-charcoal-600 hover:border-teal-300',
                        )}
                    >
                        {p.city.replace(' (online)', '')}
                    </button>
                ))}
            </div>
        </div>
    );
}
