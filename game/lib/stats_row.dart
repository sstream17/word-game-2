import 'package:flutter/material.dart';
import 'package:hive/hive.dart';
import 'package:word_game/constants/game.dart';
import 'package:word_game/constants/store.dart';
import 'package:word_game/stats_graph.dart';

class StatsRow extends StatelessWidget {
  const StatsRow({super.key, required this.numberOfGames});

  final int numberOfGames;

  @override
  Widget build(BuildContext context) {
    var box = Hive.box(storeNameStats);
    var gamesPlayed = box.get(
      "$numberOfGames-$storeKeyNumberPlayed",
      defaultValue: 0,
    );
    var winPercentage = gamesPlayed != 0
        ? box.get("$numberOfGames-$storeKeyNumberWon") / gamesPlayed * 100
        : 0.0;
    var streak = box.get(
      "$numberOfGames-$storeKeyStreak",
      defaultValue: 0,
    );
    var maxStreak = box.get(
      "$numberOfGames-$storeKeyMaxStreak",
      defaultValue: 0,
    );
    var storedFinishes = box.get(
      "$numberOfGames-$storeKeyFinishes",
      defaultValue: <int, int>{},
    );
    var finishes = Map<int, int>.from(storedFinishes);
    var avgNumerator = finishes.entries.fold(0, (total, entry) {
      var finishValue = entry.key == -1 ? numberOfGames + numberOfTries : entry.key;
      return total + ((finishValue + 1) * entry.value);
    });
    var avgDenominator = finishes.values.fold(0, (sum, value) => sum + value);
    var averageGuess =
        finishes.isNotEmpty ? avgNumerator / avgDenominator : 0.0;
    return Column(
      children: [
        Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Column(
              children: [
                const Text("Played"),
                Text(
                  "$gamesPlayed",
                ),
              ],
            ),
            Column(
              children: [
                const Text("Won"),
                Text(
                  "${formatDecimal(winPercentage)}%",
                ),
              ],
            ),
            Column(
              children: [
                const Text("Avg Guess"),
                Text(
                  formatDecimal(averageGuess),
                ),
              ],
            ),
            Column(
              children: [
                const Text("Streak"),
                Text(
                  "$streak",
                ),
              ],
            ),
            Column(
              children: [
                const Text("Max Streak"),
                Text(
                  "$maxStreak",
                ),
              ],
            ),
          ],
        ),
        SizedBox(
          width: 400.0,
          height: 400.0,
          child: StatsGraph(
            numberOfGames: numberOfGames,
            finishes: finishes,
          ),
        ),
      ],
    );
  }
}

String formatDecimal(double number) {
  String formatted = number.toStringAsFixed(2);

  // Remove trailing zeros and the decimal point if there are no fractional digits
  formatted = formatted.replaceAll(RegExp(r'(\.0+|(?<=\.\d)0+)$'), '');

  return formatted;
}
