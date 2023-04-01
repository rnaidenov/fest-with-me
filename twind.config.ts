import { Options } from "$fresh/plugins/twind.ts";
import animationDelayPlugin from "tailwindcss-animation-delay";

export default {
  selfURL: import.meta.url,
  plugins: [
    animationDelayPlugin,
  ],
  theme: {
    extend: {
      boxShadow: {
        "3xl": "0px 4px 4px rgba(0, 0, 0, 0.25)",
        "4xl": "0px 4px 10px rgba(0, 0, 0, 0.25)",
      },
      animation: {
        "in-from-left": "in-from-left 2s cubic-bezier(.19,1,.22,1) backwards",
        "fly": "fly 3s ease-in-out 0s infinite alternate",
        "flicker": "flicker 300ms linear",
        "fade-in": "fade-in 750ms ease-in-out",
      },
      keyframes: {
        ["in-from-left"]: {
          "0%": { transform: "translateX(-100vw)" },
          "100%": { transform: "translateX(0%)" },
        },
        ["fade-in"]: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        ["fly"]: {
          "0%": { transform: "translate(5px, 5px) rotate(-1.25deg)" },
          "100%": { transform: "translate(-5px,-5px) rotate(1.25deg)" },
        },
        ["flicker"]: {
          "0%": {
            opacity: 0.1,
          },
          "2%": {
            opacity: 1,
          },
          "8%": {
            opacity: 0.1,
          },
          "9%": {
            opacity: 1,
          },
          "12%": {
            opacity: 0.1,
          },
          "20%": {
            opacity: 1,
          },
          "25%": {
            opacity: 0.3,
          },
          "30%": {
            opacity: 1,
          },
          "70%": {
            opacity: 0.7,
          },
          "72%": {
            opacity: 0.2,
          },
          "77%": {
            opacity: .9,
          },
          "100%": {
            opacity: 1,
          },
        },
      },
      backgroundImage: {
        "hero-festival": "url('/half-bg.jpeg')",
      },
      colors: {
        "eggplant": "#5E4352",
        "pink-gin": "#F2D6D6",
        "pink-gin-darker": "#E6C2C2",
      },
    },
  },
} as Options;
