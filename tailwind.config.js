/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: () => ({
        "bg-desktop-day": "url('/assets/desktop/bg-image-daytime.jpg')",
        "bg-tablet-day": "url('/assets/tablet/bg-image-daytime.jpg')",
        "bg-mobile-day": "url('/assets/mobile/bg-image-daytime.jpg')",
        "bg-desktop-night": "url('/assets/desktop/bg-image-nighttime.jpg')",
        "bg-tablet-night": "url('/assets/tablet/bg-image-nighttime.jpg')",
        "bg-mobile-night": "url('/assets/mobile/bg-image-nighttime.jpg')",
      }),
    },
  },
  plugins: [],
};
