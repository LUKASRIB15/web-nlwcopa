/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/**/*.tsx',
    ],
    theme: {
        extend: {
            backgroundImage: {
                app: 'url(/BG-effects.png)'
            },
            fontFamily: {
                sans: 'Roboto, sans-serif',
            },
            colors: {
                yellow: {
                    500: '#f7dd43',
                    700: '#fdde29',
                },
                green: {
                    700: '#129e57',
                },
                gray: {
                    100: '#e1e1e6',
                    300: '#c4c4cc',
                    500: '#8d8d99',
                    600: '#323238',
                    800: '#202024',
                    900: '#121214',
                },
                white: '#ffffff',
            }
        },
    },
    plugins: [],
}