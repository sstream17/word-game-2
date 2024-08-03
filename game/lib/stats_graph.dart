import 'package:collection/collection.dart';
import 'package:fl_chart/fl_chart.dart';
import 'package:flutter/material.dart';
import 'package:word_game/constants/game.dart';

class StatsGraph extends StatelessWidget {
  StatsGraph({
    super.key,
    required this.numberOfGames,
    required this.finishes,
  });

  final int numberOfGames;
  final Map<int, int> finishes;
  final numberOfGuesses = [...List.generate(numberOfTries + 1, (i) => i), -1];

  @override
  Widget build(BuildContext context) {
    return BarChart(
      BarChartData(
        titlesData: titlesData,
        borderData: borderData,
        barGroups: barGroups,
        barTouchData: barTouchData,
        gridData: const FlGridData(show: false),
        alignment: BarChartAlignment.spaceAround,
        maxY: 1.5 * (finishes.values.maxOrNull?.toDouble() ?? 0),
      ),
    );
  }

  Widget getTitles(double value, TitleMeta meta) {
    const style = TextStyle(
      fontWeight: FontWeight.bold,
      fontSize: 14,
    );

    var text = value == 6 ? "L" : "${numberOfGames + value}";

    return SideTitleWidget(
      axisSide: meta.axisSide,
      space: 4,
      child: Text(text, style: style),
    );
  }

  FlTitlesData get titlesData => FlTitlesData(
        show: true,
        bottomTitles: AxisTitles(
          sideTitles: SideTitles(
            showTitles: true,
            reservedSize: 30,
            getTitlesWidget: getTitles,
          ),
        ),
        leftTitles: const AxisTitles(
          sideTitles: SideTitles(showTitles: false),
        ),
        topTitles: const AxisTitles(
          sideTitles: SideTitles(showTitles: false),
        ),
        rightTitles: const AxisTitles(
          sideTitles: SideTitles(showTitles: false),
        ),
      );

  FlBorderData get borderData => FlBorderData(
        show: false,
      );

  List<BarChartGroupData> get barGroups => numberOfGuesses
      .mapIndexed(
        (index, winIndex) => BarChartGroupData(
          x: index,
          barRods: [
            BarChartRodData(
              toY: finishes[winIndex]?.toDouble() ?? 0,
              color: Colors.amber,
              width: 16,
            )
          ],
          showingTooltipIndicators: [0],
        ),
      )
      .toList();

  BarTouchData get barTouchData => BarTouchData(
        enabled: false,
        touchTooltipData: BarTouchTooltipData(
            getTooltipColor: (_) => Colors.transparent,
            getTooltipItem: (_g, _gi, rodData, _ri) {
              var text = rodData.toY == 0 ? "" : rodData.toY;
              return BarTooltipItem(
                "$text",
                const TextStyle(
                  color: Colors.black,
                ),
              );
            }),
      );
}
