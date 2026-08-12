/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,md,mdx,ts}"],
  theme: {
    extend: {
      colors: {
        brand: {
          ink: "var(--color-ink)",
          deep: "var(--color-brand-deep)",
          DEFAULT: "var(--color-brand)",
          bright: "var(--color-brand-bright)",
          pale: "var(--color-brand-pale)",
          orange: "var(--color-accent)",
          "orange-text": "var(--color-accent-text)",
          "orange-pale": "var(--color-accent-pale)",
        },
        surface: {
          DEFAULT: "var(--color-surface)",
          paper: "var(--color-paper)",
          muted: "var(--color-surface-muted)",
          dark: "var(--color-surface-dark)",
          border: "var(--color-border)",
        },
        text: {
          DEFAULT: "var(--color-text)",
          muted: "var(--color-text-muted)",
          faint: "var(--color-text-faint)",
          inverted: "var(--color-text-inverted)",
        },
      },
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "sans-serif",
        ],
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "Consolas", "monospace"],
      },
      maxWidth: {
        reading: "44rem",
      },
      boxShadow: {
        soft: "0 18px 50px rgba(8, 31, 63, 0.08)",
      },
    },
  },
  plugins: [],
};
