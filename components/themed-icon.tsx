import { useThemeColor } from "@/hooks/use-theme-color";
import { IconSymbol } from "./ui/icon-symbol";

export type otherProps = {
  lightColor?: string;
  darkColor?: string;
  size?: number;
  name?: string;
};

export function ThemedIcon({
  size,
  name,
  lightColor,
  darkColor,
  ...rest
}: otherProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "icon");

  return <IconSymbol size={size} name={name} color={color} {...rest} />;
}
