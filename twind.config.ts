import { Options } from "$fresh/plugins/twind.ts";
import animationDelayPlugin from "tailwindcss-animation-delay";

export default {
  selfURL: import.meta.url,
  plugins: [
    animationDelayPlugin,
  ],
  theme: {
    extend: {
      fontSize: {
        sm: "0.95rem",
        base: "1.25rem",
        lg: "1.65rem",
        xl: "2rem",
      },
      fontFamily: {
        teko: ["Teko", "sans-serif"],
        oswald: ["Oswald", "sans-serif"],
        barlow: ["Barlow Condensed", "sans-serif"],
      },
      boxShadow: {
        "3xl": "0px 4px 4px rgba(0, 0, 0, 0.25)",
        "4xl": "0px 4px 10px rgba(0, 0, 0, 0.25)",
      },
      animation: {
        "in-from-left": "in-from-left 2s cubic-bezier(.19,1,.22,1) backwards",
        "fly": "fly 3s ease-in-out 0s infinite alternate",
        "flicker": "flicker 300ms linear",
        "fade-in": "fade-in 750ms ease-in-out",
        "fade-in-up": "fade-in-up 1250ms ease-in-out",
        "flashlight": "flashlight 2.4s infinite linear",
        "flashlight-pseudo": "flashlight-pseudo 1.5s infinite ease",
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
        ["fade-in-up"]: {
          "0%": {
            opacity: 0,
            transform: "translateY(1rem)",
          },
          "100%": {
            opacity: 1,
            transform: "translateY(0)",
          },
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
        ["flashlight"]: {
          "to": {
            transform: "rotate(360deg)",
          },
        },
        ["flashlight-pseudo"]: {
          "0%, 100%": {
            transform: "translate(-50%, -50%) scale(1)",
          },
          "50%": {
            transform: "translate(-50%, -50%) scale(0)",
          },
        },
      },
      backgroundImage: {
        "hero-festival": "url('/half-bg.jpeg')",
      },
      colors: {
        "eggplant": "#5E4352",
        "forest": "#283c2c",
        "melon": "#a4c3b2",
        "pink-gin": "#F2D6D6",
        "pink-gin-darker": "#E6C2C2",
      },
    },
  },
} as Options;
