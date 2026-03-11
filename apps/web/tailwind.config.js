/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primaria: '#10b981',
        'primaria-escura': '#059669',
        secundaria: '#f43f5e',
        roxo: '#8b5cf6',
        fundo: '#f8fafc',
        texto: '#1e293b',
        'texto-suave': '#64748b',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
