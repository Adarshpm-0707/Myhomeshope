/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-brown': '#7C4A2D',
        'brand-brown-dark': '#5C3418',
        'brand-cream': '#FDF5EE',
        'brand-beige': '#F5EDE3',
        'brand-light': '#FAF6F2',
        'brand-text': '#2C1A0E',
        'brand-muted': '#9A7B6B',
        'brand-accent': '#C17A3A',
      },
      fontFamily: {
        'sans': ['Outfit', 'Inter', 'sans-serif'],
        'serif': ['Playfair Display', 'Georgia', 'serif'],
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotateX(0deg)' },
          '50%': { transform: 'translateY(-12px) rotateX(3deg)' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-40px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        fadeInRight: {
          '0%': { opacity: '0', transform: 'translateX(40px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        rotateY: {
          '0%': { transform: 'rotateY(0deg)' },
          '100%': { transform: 'rotateY(360deg)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        slideIn: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        pulse3d: {
          '0%, 100%': { transform: 'scale(1) rotateZ(0deg)', boxShadow: '0 0 20px rgba(124,74,45,0.3)' },
          '50%': { transform: 'scale(1.05) rotateZ(1deg)', boxShadow: '0 0 40px rgba(124,74,45,0.6)' },
        },
      },
      animation: {
        'float': 'float 4s ease-in-out infinite',
        'fadeInUp': 'fadeInUp 0.8s ease-out forwards',
        'fadeInLeft': 'fadeInLeft 0.8s ease-out forwards',
        'fadeInRight': 'fadeInRight 0.8s ease-out forwards',
        'scaleIn': 'scaleIn 0.6s ease-out forwards',
        'shimmer': 'shimmer 3s linear infinite',
        'slideIn': 'slideIn 0.5s ease-out',
        'pulse3d': 'pulse3d 3s ease-in-out infinite',
      },
      perspective: {
        '1000': '1000px',
        '1500': '1500px',
      },
      boxShadow: {
        '3d': '0 20px 60px -10px rgba(124,74,45,0.3), 0 10px 30px -5px rgba(0,0,0,0.1)',
        '3d-hover': '0 30px 80px -10px rgba(124,74,45,0.4), 0 20px 40px -5px rgba(0,0,0,0.15)',
        'card': '0 4px 20px rgba(0,0,0,0.08)',
        'card-hover': '0 15px 40px rgba(124,74,45,0.2)',
      },
    },
  },
  plugins: [],
};
