import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

const hsl = (token: string) => `hsl(var(--${token}) / <alpha-value>)`;

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: hsl("background"),
        foreground: hsl("foreground"),
        border: hsl("border"),
        input: hsl("input"),
        ring: hsl("ring"),
        card: { DEFAULT: hsl("card"), foreground: hsl("card-foreground") },
        muted: { DEFAULT: hsl("muted"), foreground: hsl("muted-foreground") },
        primary: { DEFAULT: hsl("primary"), foreground: hsl("primary-foreground") },
        secondary: { DEFAULT: hsl("secondary"), foreground: hsl("secondary-foreground") },
        accent: { DEFAULT: hsl("accent"), foreground: hsl("accent-foreground"), deep: hsl("accent-deep") },
        destructive: { DEFAULT: hsl("destructive"), foreground: hsl("destructive-foreground") },
        // Brand aliases — same tokens, named the way the brand talks about them.
        indigo: { DEFAULT: hsl("primary"), soft: hsl("indigo-soft") },
        navy: { DEFAULT: hsl("secondary"), deep: hsl("navy-deep") },
        lime: { DEFAULT: hsl("accent"), soft: hsl("lime-soft"), deep: hsl("accent-deep") },
        royal: hsl("royal"),
        leaf: hsl("leaf"),
      },
      fontFamily: {
        sans: ["'Source Serif 4 Variable'", "Georgia", "serif"],
        heading: ["'Outfit Variable'", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 6px)",
        sm: "calc(var(--radius) - 12px)",
      },
      maxWidth: {
        content: "1200px",
      },
      keyframes: {
        "fade-up": {
          from: { opacity: "0", transform: "translateY(30px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": { from: { opacity: "0" }, to: { opacity: "1" } },
        "scale-in": {
          from: { opacity: "0", transform: "scale(0.94)" },
          to: { opacity: "1", transform: "scale(1)" },
        },
        "slide-right": {
          from: { opacity: "0", transform: "translateX(-30px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        marquee: { from: { transform: "translateX(0)" }, to: { transform: "translateX(-50%)" } },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s ease-out both",
        "fade-up-delay-1": "fade-up 0.7s ease-out 0.15s both",
        "fade-up-delay-2": "fade-up 0.7s ease-out 0.3s both",
        "fade-up-delay-3": "fade-up 0.7s ease-out 0.45s both",
        "fade-in": "fade-in 0.9s ease-out both",
        "scale-in": "scale-in 0.7s ease-out both",
        "slide-right": "slide-right 0.7s ease-out both",
        marquee: "marquee 28s linear infinite",
        float: "float 5s ease-in-out infinite",
        "accordion-down": "accordion-down 0.3s ease-out",
        "accordion-up": "accordion-up 0.3s ease-out",
      },
    },
  },
  plugins: [animate],
};

export default config;
