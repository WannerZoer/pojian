/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#1B2B4C',
          dark: '#3B82F6'
        },
        dark: {
          primary: '#111827',    // 主背景色
          secondary: '#1F2937',  // 次要背景色
          tertiary: '#374151',   // 第三级背景色
          hover: '#4B5563',      // 悬停背景色
          border: '#374151',     // 边框颜色
          text: {
            primary: '#F9FAFB',   // 主要文本
            secondary: '#E5E7EB', // 次要文本
            muted: '#9CA3AF'      // 弱化文本
          }
        }
      }
    }
  },
  plugins: [
    require('@tailwindcss/typography')
  ]
}