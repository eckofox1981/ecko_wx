import { View } from "react-native";
import Svg, { G, Path } from "react-native-svg";

/**
 * uses two svg superimposed (through margins set to negative)
 * the second SVG is an arrow rotating to show the direction the wind is pointing at
 * @param degree (will rotate arrow after adding 180deg since wind)
 * @returns a SVG circle with a arrow pointing at where the wind is blowing to
 */
export function WindCompass({
  degree,
  size,
}: {
  degree: number;
  size: number;
}) {
  const SvgCircle = () => {
    return (
      <Svg width={size} height={size} viewBox="0 0 24 24">
        <Path
          fill="#3300FF"
          d="M12 1.2A10.8 10.8 0 1 0 22.8 12 10.812 10.812 0 0 0 12 1.2zm0 20.6a9.8 9.8 0 1 1 9.8-9.8 9.811 9.811 0 0 1-9.8 9.8z"
        />
        <Path fill="none" d="M0 0h24v24H0z" />
      </Svg>
    );
  };

  const windDirection = (deg: number) => {
    return (
      <Svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        style={{ marginTop: `${-size}` }}
      >
        <G transform={`rotate(${deg} 12 12)`}>
          <Path
            fill="#3300FF"
            d="M12 4L6 17.5l6-3 6 3zm0 9.5a1 1 0 0 0-.447.105L8.046 15.36 12 6.462l3.954 8.897-3.507-1.754A1 1 0 0 0 12 13.5z"
          />
          <Path fill="none" d="M0 0h24v24H0z" />
        </G>
      </Svg>
    );
  };

  return (
    <View>
      <SvgCircle />
      {windDirection(degree + 180)}
    </View>
  );
}
