import { Component, type ErrorInfo, type ReactNode } from 'react';
import { RefreshCw } from 'lucide-react';

interface Props {
    children: ReactNode;
    /** Reset the boundary when the route changes */
    resetKey: string;
}

interface State {
    error: Error | null;
}

const RELOAD_FLAG = 'chunk-reload-attempted';

/**
 * Catches render errors in a page. After a redeploy, old lazy-loaded chunks disappear, so a
 * failed dynamic import triggers one automatic reload to fetch the new build.
 */
export default class RouteErrorBoundary extends Component<Props, State> {
    state: State = { error: null };

    static getDerivedStateFromError(error: Error): State {
        return { error };
    }

    componentDidCatch(error: Error, info: ErrorInfo) {
        const isChunkError = /dynamically imported module|Loading chunk|Importing a module script failed/i.test(error.message);
        let alreadyTried = false;
        try {
            alreadyTried = sessionStorage.getItem(RELOAD_FLAG) === '1';
            if (isChunkError && !alreadyTried) sessionStorage.setItem(RELOAD_FLAG, '1');
        } catch {
            /* storage unavailable */
        }
        if (isChunkError && !alreadyTried) {
            window.location.reload();
            return;
        }
        console.error('Page failed to render', error, info.componentStack);
    }

    componentDidUpdate(prev: Props) {
        if (prev.resetKey !== this.props.resetKey && this.state.error) this.setState({ error: null });
    }

    render() {
        if (!this.state.error) return this.props.children;
        return (
            <div className="min-h-[70vh] flex items-center justify-center px-4">
                <div className="max-w-md text-center rounded-3xl bg-white/85 border border-sand-200 p-8">
                    <h1 className="font-display font-bold text-2xl text-charcoal-900 mb-2">This page didn't load</h1>
                    <p className="text-charcoal-600 mb-6">The site may have just been updated. Reloading usually fixes it.</p>
                    <button
                        onClick={() => {
                            try { sessionStorage.removeItem(RELOAD_FLAG); } catch { /* ignore */ }
                            window.location.reload();
                        }}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-charcoal-900 text-white font-semibold hover:bg-teal-700"
                    >
                        <RefreshCw size={16} /> Reload
                    </button>
                </div>
            </div>
        );
    }
}
