import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Academic from './pages/Academic';
import Publications from './pages/Publications';
import KeyProjects from './pages/KeyProjects';
import Volunteer from './pages/Volunteer';
import Blog from './pages/Blog';
import Recognition from './pages/Recognition';
import Contact from './pages/Contact';
import CV from './pages/CV';
import OpenSource from './pages/OpenSource';

const PageTransition = ({ children }: { children: React.ReactNode }) => (
    <motion.div
        initial={{ opacity: 0, y: 20, filter: 'blur(5px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        exit={{ opacity: 0, y: -20, filter: 'blur(5px)' }}
        transition={{ duration: 0.4, ease: "easeOut" }}
    >
        {children}
    </motion.div>
);

function AnimatedRoutes() {
    const location = useLocation();

    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<PageTransition><Home /></PageTransition>} />
                <Route path="/academic" element={<PageTransition><Academic /></PageTransition>} />
                <Route path="/publications" element={<PageTransition><Publications /></PageTransition>} />
                <Route path="/projects" element={<PageTransition><KeyProjects /></PageTransition>} />
                <Route path="/volunteer" element={<PageTransition><Volunteer /></PageTransition>} />
                <Route path="/blog" element={<PageTransition><Blog /></PageTransition>} />
                <Route path="/recognition" element={<PageTransition><Recognition /></PageTransition>} />
                <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
                <Route path="/cv" element={<PageTransition><CV /></PageTransition>} />
                <Route path="/open-source" element={<PageTransition><OpenSource /></PageTransition>} />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </AnimatePresence>
    );
}

function App() {
    return (
        <Router>
            <Layout>
                <AnimatedRoutes />
            </Layout>
        </Router>
    )
}

export default App

