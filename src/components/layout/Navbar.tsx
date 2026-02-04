import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Academic', path: '/academic' },
    { name: 'Publications', path: '/publications' },
    { name: 'Projects', path: '/projects' },
    { name: 'Open Source', path: '/open-source' },
    { name: 'Volunteer', path: '/volunteer' },
    { name: 'Blog', path: '/blog' },
    { name: 'Recognition', path: '/recognition' },
    { name: 'Contact', path: '/contact' },
    { name: 'CV', path: '/cv' },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu on route change
    useEffect(() => {
        setIsOpen(false);
    }, [location.pathname]);

    return (
        <>
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.6 }}
                className={cn(
                    'fixed inset-x-0 z-50 transition-all duration-500 ease-in-out',
                    scrolled ? 'top-4 md:top-6' : 'top-0'
                )}
            >
                <div className={cn(
                    "mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-500",
                    scrolled
                        ? "max-w-7xl bg-white/70 backdrop-blur-xl border border-white/20 shadow-lg rounded-2xl md:mx-auto mx-4"
                        : "max-w-7xl bg-transparent border-transparent"
                )}>
                    <div className={cn("flex justify-between items-center transition-all duration-500", scrolled ? "h-16" : "h-24")}>
                        {/* Logo */}
                        <Link to="/" className="flex-shrink-0 flex items-center group relative">
                            <span className={cn(
                                "font-serif text-xl font-black tracking-tight transition-colors duration-300 relative z-10",
                                scrolled ? "text-midnight-900" : "text-midnight-900"
                            )}>
                                Nirmal Adhikari
                            </span>
                            <span className="absolute -bottom-1 left-0 w-0 h-1 bg-royal-500 transition-all group-hover:w-full"></span>
                        </Link>

                        {/* Desktop Menu */}
                        <div className="hidden lg:flex items-center space-x-1">
                            {navItems.map((item) => {
                                const isActive = location.pathname === item.path;
                                return (
                                    <Link
                                        key={item.name}
                                        to={item.path}
                                        className={cn(
                                            "px-4 py-2 rounded-full text-sm font-medium transition-all relative group",
                                            isActive
                                                ? "text-royal-600 bg-royal-50/50"
                                                : "text-midnight-600 hover:text-midnight-900 hover:bg-white/50"
                                        )}
                                    >
                                        <span className="relative z-10">{item.name}</span>
                                        {isActive && (
                                            <motion.div
                                                layoutId="navbar-indicator"
                                                className="absolute inset-0 rounded-full bg-royal-50 border border-royal-100"
                                                initial={false}
                                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                                style={{ zIndex: 0 }}
                                            />
                                        )}
                                    </Link>
                                );
                            })}
                        </div>

                        {/* Mobile Menu Button */}
                        <div className="flex lg:hidden">
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                className="inline-flex items-center justify-center p-2 rounded-md text-midnight-600 hover:text-midnight-900 focus:outline-none"
                            >
                                <span className="sr-only">Open main menu</span>
                                {isOpen ? <X size={24} /> : <Menu size={24} />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0, y: -20 }}
                            animate={{ opacity: 1, height: 'auto', y: 0 }}
                            exit={{ opacity: 0, height: 0, y: -20 }}
                            className="lg:hidden absolute top-full left-0 right-0 mt-2 mx-4 bg-white/90 backdrop-blur-xl border border-white/20 shadow-xl rounded-2xl overflow-hidden"
                        >
                            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                                {navItems.map((item) => (
                                    <Link
                                        key={item.name}
                                        to={item.path}
                                        className={cn(
                                            "block px-3 py-3 rounded-xl text-base font-medium transition-colors",
                                            location.pathname === item.path
                                                ? "text-royal-600 bg-royal-50"
                                                : "text-midnight-600 hover:text-midnight-900 hover:bg-midnight-50/50"
                                        )}
                                    >
                                        {item.name}
                                    </Link>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.nav>
        </>
    );
}
