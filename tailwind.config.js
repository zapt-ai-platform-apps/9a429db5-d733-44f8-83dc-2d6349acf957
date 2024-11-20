export default {
  content: ["./index.html","./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#1E40AF', // Blue for primary actions
        secondary: '#F97316', // Orange for accents
        success: '#10B981', // Green for success messages
        error: '#EF4444', // Red for error messages
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};