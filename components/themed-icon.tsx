import { useThemeColor } from "@/hooks/use-theme-color";
import { IconSymbol } from "./ui/icon-symbol";

export type otherProps = {
  lightColor?: string;
  darkColor?: string;
  size?: number;
  name?: string;
};

/**
 * used to change color of icon depending on theme
 * unfortunately only used for gps icon gpsSearch.ts
 * @returns an Icon adapted to theme
 */
export function ThemedIcon({
  size,
  name,
  lightColor,
  darkColor,
  ...rest
}: otherProps) {
  const color = useThemeColor({ light: darkColor, dark: lightColor }, "text");

  return <IconSymbol size={size} name={name} color={color} {...rest} />;
}
