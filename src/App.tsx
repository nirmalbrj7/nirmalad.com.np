import { type ReactNode, Suspense, lazy, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Layout from './components/layout/Layout';
import RouteErrorBoundary from './components/layout/RouteErrorBoundary';
import { LightboxProvider } from './components/media/Lightbox';

// Route-level code splitting: each page (and its heavy dependencies) loads on demand.
const Home = lazy(() => import('./pages/Home'));
const Academic = lazy(() => import('./pages/Academic'));
const Publications = lazy(() => import('./pages/Publications'));
const KeyProjects = lazy(() => import('./pages/KeyProjects'));
const Blog = lazy(() => import('./pages/Blog'));
const Recognition = lazy(() => import('./pages/Recognition'));
const Contact = lazy(() => import('./pages/Contact'));
const CV = lazy(() => import('./pages/CV'));
const OpenSource = lazy(() => import('./pages/OpenSource'));
const Research = lazy(() => import('./pages/Research'));
const ResearchDetail = lazy(() => import('./pages/ResearchDetail'));

const PageFallback = () => (
    <div className="min-h-screen flex items-center justify-center" role="status" aria-label="Loading page">
        <span className="w-10 h-10 rounded-full border-4 border-teal-100 border-t-teal-600 animate-spin" />
    </div>
);

// Rendered only once the lazy page has loaded, so a failed chunk can't cause a reload loop.
const PageLoaded = () => {
    useEffect(() => {
        try { sessionStorage.removeItem('chunk-reload-attempted'); } catch { /* ignore */ }
    }, []);
    return null;
};

const PageTransition = ({ children }: { children: ReactNode }) => {
    const { pathname } = useLocation();
    return (
        <motion.div
            initial={{ opacity: 0, y: 20, filter: 'blur(5px)' }}
            // Clear the filter afterwards: any filter makes position:fixed children use this div, not the viewport.
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)', transitionEnd: { filter: 'none' } }}
            exit={{ opacity: 0, y: -20, filter: 'blur(5px)' }}
            transition={{ duration: 0.4, ease: "easeOut" }}
        >
            <RouteErrorBoundary resetKey={pathname}>
                <Suspense fallback={<PageFallback />}>
                    {children}
                    <PageLoaded />
                </Suspense>
            </RouteErrorBoundary>
        </motion.div>
    );
};

function AnimatedRoutes() {
    const location = useLocation();

    // Scroll to top on route change
    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
    }, [location.pathname]);

    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<PageTransition><Home /></PageTransition>} />
                <Route path="/academic" element={<PageTransition><Academic /></PageTransition>} />
                <Route path="/publications" element={<PageTransition><Publications /></PageTransition>} />
                <Route path="/projects" element={<PageTransition><KeyProjects /></PageTransition>} />
                <Route path="/blog" element={<PageTransition><Blog /></PageTransition>} />
                <Route path="/recognition" element={<PageTransition><Recognition /></PageTransition>} />
                <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
                <Route path="/cv" element={<PageTransition><CV /></PageTransition>} />
                <Route path="/research" element={<PageTransition><Research /></PageTransition>} />
                <Route path="/research/:projectId" element={<PageTransition><ResearchDetail /></PageTransition>} />
                <Route path="/open-source" element={<PageTransition><OpenSource /></PageTransition>} />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </AnimatePresence>
    );
}

function App() {
    return (
        <Router>
            <LightboxProvider>
                <Layout>
                    <AnimatedRoutes />
                </Layout>
            </LightboxProvider>
        </Router>
    )
}

export default App

