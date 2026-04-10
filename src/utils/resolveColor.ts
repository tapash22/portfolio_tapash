import { themeColors, type ThemeColorKey } from "../storage/type/color-type";

export const resolveColor = (color?: ThemeColorKey | string) => {
  if (!color) return themeColors.foreground;
  if (color.startsWith("var(") || color.startsWith("#")) return color;

  return themeColors[color as ThemeColorKey] ?? themeColors.foreground;
};
