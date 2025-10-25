import type { Config } from 'tailwindcss'

export default {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: '#4CAF50',
        secondary: '#FF9800',
        gray900: '#1f2937',
        gray700: '#374151',
        gray500: '#6b7280',
        gray300: '#d1d5db',
        gray100: '#f3f4f6'
      },
      borderRadius: {
        xl: '12px'
      }
    }
  },
  plugins: []
} satisfies Config
