/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./app/**/*.{js,jsx}",
    "./src/**/*.{js,jsx}",
  ],
  prefix: "",
  theme: {
    // screens: {
    //   sm: "480px",
    //   md: "768px",
    //   lg: "1024px",
    //   xl: "1280px",
    // },
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        backLayout: "#F2F2F2",
        "text-delete-form": "rgba(199, 56, 62, 0.90)",
        "bg-delete-form": "rgba(199, 56, 62, 0.30)",
        "table-bg": "#FFF",
        "label-bg": "rgba(51, 51, 51, 0.70)",
        "form-bg": "#F2F2F2",
        "border-input": "#94A3B8",
        "border-body-form": "rgba(37, 47, 74, 0.10)",
        "text-button-logout": "#4680FF",
        "bg-button-logout": "rgba(70, 128, 255, 0.20)",
        "bg-button-add": "rgba(22, 163, 74, 0.30)",
        "header-text": "#99A1B7",
        "custom-text-notActive-nav": "color: #5B6B79",
        "custom-text-active-nav": "rgba(199, 56, 62, 0.9)",
        "custom-bg-notActive-nav": "#E8EBED;",
        "custom-bg-active-nav": "rgba(199, 56, 62, 0.2)",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
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
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },

        // My customs
        "primary-0.9": "rgba(199, 56, 62, 0.9)",
      },

      fontSize: {
        iconHeader: "26px",
      },

      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
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
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
