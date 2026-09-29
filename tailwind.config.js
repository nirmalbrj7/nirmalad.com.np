/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                display: ['"Space Grotesk"', 'sans-serif'],
                sans: ['"Inter"', 'sans-serif'],
                body: ['"Inter"', 'sans-serif'],
                mono: ['"JetBrains Mono"', 'monospace'],
                handwritten: ['"Caveat"', 'cursive'],
            },
            colors: {
                // Primary Palette - Deep Teal/Emerald
                teal: {
                    50: '#f0fdfa',
                    100: '#ccfbf1',
                    200: '#99f6e4',
                    300: '#5eead4',
                    400: '#2dd4bf',
                    500: '#14b8a6',
                    600: '#0d9488',
                    700: '#0f766e',
                    800: '#115e59',
                    900: '#134e4a',
                    950: '#0d7377', // Primary brand color
                },
                // Secondary - Warm Sand/Beige
                sand: {
                    50: '#fdfcf9',
                    100: '#f4f1de', // Main light background
                    200: '#e8e3cc',
                    300: '#d4cdb0',
                    400: '#b8ad8a',
                    500: '#9c8f6a',
                    600: '#7f7352',
                    700: '#665b42',
                    800: '#554b38',
                    900: '#4a4232',
                    950: '#282417',
                },
                // Accent - Coral/Sunset
                coral: {
                    50: '#fdf4f1',
                    100: '#fbe6df',
                    200: '#f6cfc1',
                    300: '#eeac96',
                    400: '#e07a5f', // Accent color
                    500: '#d55d3f',
                    600: '#c3482d',
                    700: '#a23826',
                    800: '#872f24',
                    900: '#702b23',
                    950: '#3d140f',
                },
                // Dark Mode - Deep Charcoal
                charcoal: {
                    50: '#f6f6f8',
                    100: '#ececf1',
                    200: '#d5d5e0',
                    300: '#b0b0c5',
                    400: '#8585a5',
                    500: '#65658a',
                    600: '#515171',
                    700: '#42425c',
                    800: '#3a3a4d',
                    900: '#323242',
                    950: '#1a1a2e', // Dark background
                },
                // Legacy colors (for backward compatibility)
                midnight: {
                    50: '#f4f6fb',
                    100: '#e5eaf5',
                    200: '#cedae8',
                    300: '#aabed7',
                    400: '#809dc1',
                    500: '#5f80a9',
                    600: '#48648c',
                    700: '#3a5173',
                    800: '#324560',
                    900: '#2d3b50',
                    950: '#1a1a2e', // Updated to match charcoal
                },
                cream: {
                    50: '#f4f1de', // Updated to match sand
                    100: '#f7f3eb',
                    200: '#ebe3d3',
                    300: '#dbcaaf',
                    400: '#c7a985',
                    500: '#b88d61',
                    600: '#ab764f',
                    700: '#8e5e40',
                    800: '#754e39',
                    900: '#604132',
                    950: '#332119',
                },
                royal: {
                    50: '#f0fdfa',
                    100: '#ccfbf1',
                    200: '#99f6e4',
                    300: '#5eead4',
                    400: '#2dd4bf',
                    500: '#14b8a6',
                    600: '#0d9488',
                    700: '#0f766e',
                    800: '#115e59',
                    900: '#0d7377',
                    950: '#0a5a5e',
                },
            },
            animation: {
                'blob': 'blob 7s infinite',
                'blob-slow': 'blob 15s infinite',
                'fade-in': 'fadeIn 1s ease-out forwards',
                'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
                'float': 'float 6s ease-in-out infinite',
                'float-slow': 'float 10s ease-in-out infinite',
                'pulse-slow': 'pulse 4s ease-in-out infinite',
                'shimmer': 'shimmer 2.5s ease-in-out infinite',
                'gradient-shift': 'gradientShift 8s ease infinite',
                'draw-line': 'drawLine 1.5s ease-out forwards',
                'count-up': 'countUp 2s ease-out forwards',
                'scale-in': 'scaleIn 0.5s ease-out forwards',
                'slide-up': 'slideUp 0.6s ease-out forwards',
                'resilience-pulse': 'resiliencePulse 3s ease-in-out infinite',
                'grain': 'grain 8s steps(10) infinite',
                'marquee': 'marquee 45s linear infinite',
            },
            keyframes: {
                marquee: {
                    '0%': { transform: 'translateX(0)' },
                    '100%': { transform: 'translateX(-50%)' },
                },
                blob: {
                    '0%': { transform: 'translate(0px, 0px) scale(1)' },
                    '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
                    '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
                    '100%': { transform: 'translate(0px, 0px) scale(1)' },
                },
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                fadeInUp: {
                    '0%': { opacity: '0', transform: 'translateY(30px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-20px)' },
                },
                shimmer: {
                    '0%': { backgroundPosition: '0% 50%' },
                    '100%': { backgroundPosition: '100% 50%' },
                },
                gradientShift: {
                    '0%, 100%': { backgroundPosition: '0% 50%' },
                    '50%': { backgroundPosition: '100% 50%' },
                },
                drawLine: {
                    '0%': { strokeDashoffset: '1000' },
                    '100%': { strokeDashoffset: '0' },
                },
                countUp: {
                    '0%': { opacity: '0', transform: 'translateY(20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                scaleIn: {
                    '0%': { opacity: '0', transform: 'scale(0.9)' },
                    '100%': { opacity: '1', transform: 'scale(1)' },
                },
                slideUp: {
                    '0%': { opacity: '0', transform: 'translateY(50px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                resiliencePulse: {
                    '0%, 100%': { opacity: '1', transform: 'scale(1)' },
                    '50%': { opacity: '0.8', transform: 'scale(1.02)' },
                },
                grain: {
                    '0%, 100%': { transform: 'translate(0, 0)' },
                    '10%': { transform: 'translate(-5%, -10%)' },
                    '20%': { transform: 'translate(-15%, 5%)' },
                    '30%': { transform: 'translate(7%, -25%)' },
                    '40%': { transform: 'translate(-5%, 25%)' },
                    '50%': { transform: 'translate(-15%, 10%)' },
                    '60%': { transform: 'translate(15%, 0%)' },
                    '70%': { transform: 'translate(0%, 15%)' },
                    '80%': { transform: 'translate(3%, 35%)' },
                    '90%': { transform: 'translate(-10%, 10%)' },
                },
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-teal-coral': 'linear-gradient(135deg, #0d7377 0%, #e07a5f 100%)',
                'gradient-mesh': 'radial-gradient(at 40% 20%, hsla(175,60%,35%,0.1) 0px, transparent 50%), radial-gradient(at 80% 0%, hsla(12,70%,62%,0.1) 0px, transparent 50%), radial-gradient(at 0% 50%, hsla(175,60%,35%,0.1) 0px, transparent 50%)',
            },
        },
    },
    plugins: [],
}
