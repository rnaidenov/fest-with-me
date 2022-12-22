import { Options } from "$fresh/plugins/twind.ts";
import animationDelayPlugin from "tailwindcss-animation-delay";

export default {
  selfURL: import.meta.url,
  plugins: [
    animationDelayPlugin,
  ],
  theme: {
    extend: {
      animation: {
        "in-from-left": "in-from-left 2s cubic-bezier(.19,1,.22,1) backwards",
        "fly": "fly 3s ease-in-out 0s infinite alternate",
      },
      keyframes: {
        ["in-from-left"]: {
          "0%": { transform: "translateX(-100vw)" },
          "100%": { transform: "translateX(0%)" },
        },
        ["fly"]: {
          "0%": { transform: "translate(5px, 5px) rotate(-1.25deg)" },
          "100%": { transform: "translate(-5px,-5px) rotate(1.25deg)" },
        },
      },
      backgroundImage: {
        "hero-festival": "url('/half-bg.jpeg')",
      },
      colors: {
        "eggplant": "#5E4352",
      },
    },
  },
} as Options;
