import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowUpRight, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { OPEN_PALETTE_EVENT } from '../ui/CommandPalette';

const openSearch = () => window.dispatchEvent(new Event(OPEN_PALETTE_EVENT));

const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Research', path: '/research' },
    { name: 'Projects', path: '/projects' },
    { name: 'Open Source', path: '/open-source' },
    { name: 'Publications', path: '/publications' },
    { name: 'Academic', path: '/academic' },
    { name: 'Blog', path: '/blog' },
    { name: 'CV', path: '/cv' },
];

const ctaItem = { name: 'Contact', path: '/contact' };

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        setIsOpen(false);
    }, [location.pathname]);

    const isActive = (path: string) => location.pathname === path;

    return (
        <>
            <motion.nav
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
                className={cn(
                    'fixed inset-x-0 z-50 transition-all duration-500 ease-out',
                    scrolled ? 'top-4 md:top-6' : 'top-0 md:top-4'
                )}
            >
                <div className={cn(
                    "mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-500",
                    scrolled
                        ? "max-w-6xl bg-white/80 backdrop-blur-xl border border-white/60 shadow-xl rounded-full md:mx-auto mx-4"
                        : "max-w-7xl bg-transparent"
                )}>
                    <div className={cn(
                        "flex justify-between items-center transition-all duration-500",
                        scrolled ? "h-14 md:h-16" : "h-20 md:h-24"
                    )}>
                        {/* Logo */}
                        <Link to="/" className="flex-shrink-0 flex items-center group relative">
                            <motion.span
                                className={cn(
                                    "font-display text-lg md:text-xl font-bold tracking-tight transition-all duration-300 relative z-10",
                                    scrolled ? "text-charcoal-900" : "text-charcoal-900"
                                )}
                                whileHover={{ scale: 1.02 }}
                            >
                                Nirmal Adhikari
                                <span className="text-teal-600">.</span>
                            </motion.span>
                            {/* Animated underline */}
                            <motion.span
                                className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-teal-500 to-coral-500"
                                initial={{ width: 0 }}
                                whileHover={{ width: '100%' }}
                                transition={{ duration: 0.3 }}
                            />
                        </Link>

                        {/* Desktop Menu */}
                        <div className="hidden lg:flex items-center space-x-1">
                            {navItems.map((item, index) => (
                                <motion.div
                                    key={item.name}
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 + index * 0.05 }}
                                >
                                    <Link
                                        to={item.path}
                                        className={cn(
                                            "relative px-2.5 xl:px-4 py-2 text-[13px] xl:text-sm font-medium whitespace-nowrap transition-colors group",
                                            isActive(item.path)
                                                ? "text-teal-600"
                                                : "text-charcoal-600 hover:text-teal-600"
                                        )}
                                    >
                                        <span className="relative z-10">{item.name}</span>

                                        {/* Active indicator */}
                                        {isActive(item.path) && (
                                            <motion.div
                                                layoutId="nav-indicator"
                                                className="absolute inset-0 bg-teal-50 rounded-full"
                                                initial={false}
                                                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                            />
                                        )}

                                        {/* Hover underline */}
                                        <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-teal-500 to-coral-500 rounded-full group-hover:w-1/2 transition-all duration-300" />
                                    </Link>
                                </motion.div>
                            ))}

                            {/* Search */}
                            <motion.button
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.45 }}
                                onClick={openSearch}
                                className="ml-1 xl:ml-2 p-2.5 rounded-full text-charcoal-600 hover:text-teal-700 hover:bg-teal-50 transition-colors"
                                aria-label="Search the site (Ctrl+K)"
                                title="Search (Ctrl+K or /)"
                            >
                                <Search size={18} />
                            </motion.button>

                            {/* CTA Button */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.5 }}
                            >
                                <Link
                                    to={ctaItem.path}
                                    className={cn(
                                        "ml-2 xl:ml-4 px-4 xl:px-6 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-300 flex items-center gap-1.5",
                                        isActive(ctaItem.path)
                                            ? "bg-teal-600 text-white shadow-lg"
                                            : "bg-charcoal-900 text-white hover:bg-teal-600 hover:shadow-lg hover:shadow-teal-500/25"
                                    )}
                                >
                                    {ctaItem.name}
                                    <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                                </Link>
                            </motion.div>
                        </div>

                        {/* Mobile Menu Button */}
                        <div className="lg:hidden flex items-center gap-1">
                        <button
                            onClick={openSearch}
                            className="p-2 rounded-xl text-charcoal-700 hover:bg-charcoal-100 transition-colors"
                            aria-label="Search the site"
                        >
                            <Search size={22} />
                        </button>
                        <motion.button
                            onClick={() => setIsOpen(!isOpen)}
                            aria-label={isOpen ? 'Close menu' : 'Open menu'}
                            aria-expanded={isOpen}
                            className="relative p-2 rounded-xl text-charcoal-700 hover:bg-charcoal-100 transition-colors z-50"
                            whileTap={{ scale: 0.95 }}
                        >
                            <AnimatePresence mode="wait">
                                {isOpen ? (
                                    <motion.div
                                        key="close"
                                        initial={{ rotate: -90, opacity: 0 }}
                                        animate={{ rotate: 0, opacity: 1 }}
                                        exit={{ rotate: 90, opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <X size={24} />
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="menu"
                                        initial={{ rotate: 90, opacity: 0 }}
                                        animate={{ rotate: 0, opacity: 1 }}
                                        exit={{ rotate: -90, opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <Menu size={24} />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="lg:hidden fixed inset-0 z-40"
                        >
                            {/* Backdrop */}
                            <motion.div
                                className="absolute inset-0 bg-charcoal-950/20 backdrop-blur-sm"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setIsOpen(false)}
                            />

                            {/* Menu panel */}
                            <motion.div
                                className="absolute top-20 left-4 right-4 bg-white rounded-3xl shadow-2xl border border-sand-200 overflow-hidden"
                                initial={{ opacity: 0, y: -20, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                                transition={{ duration: 0.3, ease: [0.33, 1, 0.68, 1] }}
                            >
                                <div className="p-6 space-y-2">
                                    {navItems.map((item, index) => (
                                        <motion.div
                                            key={item.name}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.05 }}
                                        >
                                            <Link
                                                to={item.path}
                                                className={cn(
                                                    "block px-4 py-3 rounded-xl text-base font-medium transition-all",
                                                    isActive(item.path)
                                                        ? "text-teal-600 bg-teal-50"
                                                        : "text-charcoal-700 hover:text-teal-600 hover:bg-sand-50"
                                                )}
                                            >
                                                {item.name}
                                            </Link>
                                        </motion.div>
                                    ))}

                                    <motion.div
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: navItems.length * 0.05 }}
                                        className="pt-4 border-t border-sand-100"
                                    >
                                        <Link
                                            to={ctaItem.path}
                                            className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-teal-600 text-white font-semibold hover:bg-teal-700 transition-colors"
                                        >
                                            {ctaItem.name}
                                            <ArrowUpRight size={18} />
                                        </Link>
                                    </motion.div>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.nav>
        </>
    );
}
