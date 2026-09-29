import { useEffect, useState } from 'react';
import type { Publication } from '@/data/publications';

const CACHE_KEY = 'crossref-citations-v1';

type Counts = Record<string, number>;

function readCache(): Counts | null {
    try {
        const raw = sessionStorage.getItem(CACHE_KEY);
        return raw ? (JSON.parse(raw) as Counts) : null;
    } catch {
        return null;
    }
}

/**
 * Citation counts per publication id. Starts from the bundled snapshot and
 * upgrades to live Crossref counts (cached for the browser session).
 */
export function useCrossrefCitations(pubs: Publication[]) {
    const snapshot = Object.fromEntries(pubs.filter((p) => p.citations != null).map((p) => [p.id, p.citations!]));
    const cached = readCache();
    const [counts, setCounts] = useState<Counts>(cached ?? snapshot);
    const [live, setLive] = useState(Boolean(cached));

    useEffect(() => {
        if (cached) return;
        const controller = new AbortController();
        const withDoi = pubs.filter((p) => p.doi);

        Promise.all(
            withDoi.map((p) =>
                fetch(`https://api.crossref.org/works/${encodeURIComponent(p.doi!)}`, { signal: controller.signal })
                    .then((r) => (r.ok ? r.json() : null))
                    .then((json) => [p.id, json?.message?.['is-referenced-by-count']] as const)
                    .catch(() => [p.id, undefined] as const),
            ),
        ).then((results) => {
            if (controller.signal.aborted) return;
            const next: Counts = { ...snapshot };
            let gotAny = false;
            for (const [id, n] of results) {
                if (typeof n === 'number') {
                    next[id] = n;
                    gotAny = true;
                }
            }
            if (!gotAny) return;
            setCounts(next);
            setLive(true);
            try {
                sessionStorage.setItem(CACHE_KEY, JSON.stringify(next));
            } catch {
                /* storage unavailable: keep in memory only */
            }
        });

        return () => controller.abort();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return { counts, live };
}

export function hIndex(values: number[]): number {
    const sorted = [...values].sort((a, b) => b - a);
    let h = 0;
    while (h < sorted.length && sorted[h] >= h + 1) h++;
    return h;
}
