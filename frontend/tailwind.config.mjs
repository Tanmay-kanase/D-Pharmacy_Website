import { defineConfig } from "tailwindcss";

export default defineConfig({
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      animation: {
        'slide-in': 'slide-in 0.3s ease-out forwards',
      },
      keyframes: {
        'slide-in': {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
      },
    },
  },
  plugins: [],
});

