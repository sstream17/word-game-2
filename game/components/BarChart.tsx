import { Colors } from "@/constants/Colors";
import { StyleSheet, View } from "react-native";

import Svg, { G, Rect, Text } from "react-native-svg";

export interface IChartData {
  labels: string[];
  data: number[];
}

interface IProps {
  data: IChartData;
  width: number;
  height: number;
}

export function BarChart(props: IProps) {
  const { data, width, height } = props;

  const barWidth = width * 0.05;
  const maxValue = Math.max(...data.data);
  const maxHeight = height - height * 0.3;

  return (
    <View style={styles.container}>
      <Svg width={width} height={height}>
        {data.labels.map((label, index) => {
          const x =
            (width / data.labels.length) * index +
            width / (2 * data.labels.length);

          const barValue = data.data[index];
          const barHeight =
            maxValue === 0 ? 0 : (barValue / maxValue) * maxHeight;

          return (
            <G key={label}>
              <Text
                fontFamily="Nunito_400Regular"
                x={x}
                y={height}
                textAnchor="middle"
              >
                {label}
              </Text>
              <Rect
                x={x - barWidth / 2}
                y={height - barHeight - height * 0.1}
                rx={barWidth / 2}
                height={barHeight}
                width={barWidth}
                fill={Colors.light.exact}
              />
              {barValue === 0 ? null : (
                <Text
                  fontFamily="Nunito_400Regular"
                  x={x}
                  y={height - barHeight - height * 0.14}
                  textAnchor="middle"
                >
                  {barValue}
                </Text>
              )}
            </G>
          );
        })}
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { display: "flex", flexDirection: "column", alignItems: "center" },
  heading: { fontSize: 24, fontWeight: "bold" },
});
