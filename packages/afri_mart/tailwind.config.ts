import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
      xsm: { max: "320px" },
      mobile: { max: "480px" },
      smx: { max: "645px" },
      lmx: { max: "1227px" },
      xlg: { max: "1431px" },
      mmx: { max: "1430px" },
    },
    extend: {
      backgroundImage: {
        'grainny-pattern': "url('https://assets-global.website-files.com/61a2afe49efe185eaee53f8c/61a2afe49efe180a42e53fe2_grain.gif')",
        'grainy-pattern': "url('https://assets-global.website-files.com/61a2afe49efe185eaee53f8c/61eae0cf324b9d2c23e76cee_noise.png')",
        'hero-pattern': "url('/img/hero-pattern.svg')",
        'footer-texture': "url('/img/footer-texture.png')",
        'art-bg': "url('https://assets-global.website-files.com/61a2afe49efe185eaee53f8c/61e28a5351c9209d4c8b84dd_ORANGE%20TEXTURE-18.png')",
        'art-graphics': "url('https://assets-global.website-files.com/61a2afe49efe185eaee53f8c/61ed0a6890948f44adf947b2_GRAPHIC%20BG-20.png')",
      }
    },
    fontFamily: {
      'sans': ['ui-sans-serif', 'system-ui',],
      'serif': ['BN Norplay', 'Georgia', ],
      'mono': ['ui-monospace', 'SFMono-Regular',],
      'display': ['Oswald',],
      'body': ['"Open Sans"',],
    }
},
  plugins: [
  ],
};
export default config;
