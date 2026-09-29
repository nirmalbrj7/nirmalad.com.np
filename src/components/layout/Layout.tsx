import { ReactNode } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import ScrollProgress from '../ui/ScrollProgress';
import CommandPalette from '../ui/CommandPalette';

interface LayoutProps {
    children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
    return (
        <div className="min-h-screen flex flex-col font-body bg-sand-50 text-charcoal-900 relative overflow-x-clip">
            {/* Skip to content link for accessibility */}
            <a
                href="#content"
                className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:px-4 focus:py-2 focus:rounded-full focus:bg-teal-600 focus:text-white focus:shadow-lg"
            >
                Skip to content
            </a>

            {/* Scroll progress indicator */}
            <ScrollProgress />

            {/* Background gradient */}
            <div className="fixed inset-0 bg-gradient-to-br from-sand-50 via-white to-sand-100 -z-20" />
            
            {/* Subtle radial glow */}
            <div 
                className="fixed inset-0 pointer-events-none -z-10"
                style={{
                    background: `
                        radial-gradient(ellipse at 20% 30%, rgba(13, 115, 119, 0.05) 0%, transparent 50%),
                        radial-gradient(ellipse at 80% 70%, rgba(224, 122, 95, 0.03) 0%, transparent 50%)
                    `,
                }}
            />

            {/* Grid pattern */}
            <div 
                className="fixed inset-0 opacity-[0.02] pointer-events-none -z-10"
                style={{
                    backgroundImage: `
                        linear-gradient(to right, #0d7377 1px, transparent 1px),
                        linear-gradient(to bottom, #0d7377 1px, transparent 1px)
                    `,
                    backgroundSize: '60px 60px',
                }}
            />

            <Navbar />
            <CommandPalette />
            
            <main id="content" className="flex-grow">
                {children}
            </main>
            
            <Footer />
        </div>
    );
}
