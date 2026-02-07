import { ReactNode } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

interface LayoutProps {
    children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
    return (
        <div className="min-h-screen flex flex-col font-sans bg-cream-50 text-midnight-900 relative">
            <a
                href="#content"
                className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:px-4 focus:py-2 focus:rounded-full focus:bg-midnight-900 focus:text-white"
            >
                Skip to content
            </a>
            <div className="bg-radial-sheen fixed inset-0 pointer-events-none -z-10" />
            <div className="bg-grid fixed inset-0 opacity-40 pointer-events-none -z-10" />
            <div className="bg-noise opacity-[0.07]" />
            <Navbar />
            <main id="content" className="flex-grow pt-24">
                {children}
            </main>
            <Footer />
        </div>
    );
}
