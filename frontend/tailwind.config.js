/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class',
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                primary: '#635FC7',
                'primary-lighter': '#A8A4FF',
                dark: '#000112',
                'dark-lighter': '#20212C',
                gray: '#2B2C37',
                'gray-lighter': '#3E3F4E',
                'medium-gray': '#828FA3',
                'medium-gray-lighter': '#E4EBFA',
                'light-gray': '#F4F7FD',
                white: '#FFFFFF',
                danger: '#EA5555',
                'danger-lighter': '#FF9898',
                secondary: 'rgba(99, 95, 199, 0.10)',
                'secondary-active': 'rgba(99, 95, 199, 0.25)',
                'input-border': 'rgba(130, 143, 163, 0.25)',
            },
        },
    },

    plugins: [],
};
