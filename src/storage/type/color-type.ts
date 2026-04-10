export const themeColors = {
  foreground: "var(--foreground)",
  neon: "var(--neon)",
  muted: "var(--muted)",
  sidebar: "var(--sidebar)",
  background: "var(--background)",
} as const;

export type ThemeColorKey = keyof typeof themeColors;
