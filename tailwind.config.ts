import type { Config } from "tailwindcss"

const config = {
  darkMode: ["selector", "data-theme='dark'"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-inter,sans-serif)"],
        display: ["var(--font-dystopian,sans-serif)"],
      },
      colors: {
        border: "hsl(var(--border))",
        "border-secondary": "hsl(var(--border-secondary))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          hover: "hsl(var(--primary-hover))",
          active: "hsl(var(--primary-active))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsla(var(--secondary))",
          hover: "hsla(var(--secondary-hover))",
          active: "hsla(var(--secondary-active))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          hover: "hsl(var(--destructive-hover))",
          active: "hsl(var(--destructive-active))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        "destructive-ghost": {
          hover: "hsl(var(--destructive-ghost-hover))",
          active: "hsl(var(--destructive-ghost-active))",
          foreground: "hsl(var(--destructive-ghost-foreground))",
        },
        success: {
          DEFAULT: "hsl(var(--success))",
          hover: "hsl(var(--success-hover))",
          active: "hsl(var(--success-active))",
          foreground: "hsl(var(--success-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        tooltip: {
          DEFAULT: "hsl(var(--tooltip))",
          foreground: "hsl(var(--tooltip-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          secondary: "hsl(var(--card-secondary))",
          foreground: "hsl(var(--card-foreground))",
        },
        toast: {
          success: "hsla(var(--toast-success))",
          error: "hsla(var(--toast-error))",
          warning: "hsla(var(--toast-warning))",
          info: "hsla(var(--toast-info))",
        },
        // Platforms
        discord: {
          DEFAULT: "hsl(var(--discord))",
        },
        telegram: {
          DEFAULT: "hsl(var(--telegram))",
        },
        twitter: {
          DEFAULT: "hsl(var(--twitter))",
        },
        github: {
          DEFAULT: "hsl(var(--github))",
        },
        farcaster: {
          DEFAULT: "hsl(var(--farcaster))",
          hover: "hsl(var(--farcaster-hover))",
          active: "hsl(var(--farcaster-active))",
        },
        polygonid: {
          DEFAULT: "hsl(var(--polygonid))",
        },
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        // Copied from our old styles.ts
        "fade-in": { from: { opacity: "0" }, to: { opacity: "1" } },
        "slide-fade-in": {
          from: { opacity: "0", transform: "translateY(10px)" },
          to: { opacity: "1", transform: "translateY(0px)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        // Copied from where we used these animations
        "fade-in": "fade-in .3s .1s both",
        "slide-fade-in": "fade-in .2s",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
