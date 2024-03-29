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
        "side7-color" :"#0d1420",
        "side8-color" :"#f8d7da",
        "side9-color" :"#1a1d1e",
        "side10-color" :"#131c2b",
        "side11-color" :"#003de8",
        "side12-color" :"#faca15",
        "side13-color" :"#f1e56a",
        "side14-color" :"#0e1521",
        "color-text" : "#00ffe5",
        "color-text2" : "#dd7a51",
        "color-text3" : "#31c48d",
        "color-text4" : "#f98080",
        "color-red" : "#ff0000",
        "color-aqua" : "#00ffff",
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
