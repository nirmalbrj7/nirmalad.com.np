/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                serif: ['"Playfair Display"', 'serif'],
                sans: ['Inter', 'sans-serif'],
            },
            colors: {
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
                    950: '#020617', // Main dark background
                },
                cream: {
                    50: '#fdfbf7', // Main light background
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
                    50: '#eef2ff',
                    100: '#e0e7ff',
                    200: '#c7d2fe',
                    300: '#a5b4fc',
                    400: '#818cf8',
                    500: '#6366f1',
                    600: '#4f46e5',
                    700: '#4338ca',
                    800: '#3730a3',
                    900: '#312e81',
                    950: '#1e1b4b',
                },
            },
            animation: {
                'blob': 'blob 7s infinite',
                'fade-in': 'fadeIn 1s ease-out forwards',
                'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
                'float': 'float 6s ease-in-out infinite',
            },
            keyframes: {
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
                    '0%': { opacity: '0', transform: 'translateY(20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-20px)' },
                },
            },
        },
    },
    plugins: [],
}
