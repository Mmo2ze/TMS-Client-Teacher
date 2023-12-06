/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      screens : {
        '2sm': {'max': '768px'},
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors : {
        "web-color":"#18181b",
        "main-color" : "#111928",
        "nav-color" : "#111928c7",
        "side-color" : "#374151",
        "side2-color":"#27272a",
        "side3-color" :"#1f2937",
        "side4-color" :"#1a212c",
        "side5-color" :"#1a978b",
        "side6-color" :"#146262",
        "color-text" : "#00ffe5",
        "blue-color": "#1976d2" ,
        "button-color":"#1A56DB",
        "button-color2":"#0891b2",
        "button-color2-hover":"#08cfff",
        "button-color3":"#10845f",

      }
    },
  },
  plugins: [
    require('flowbite/plugin')
]
}
