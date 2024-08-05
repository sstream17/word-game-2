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
      var finishValue = entry.key == -1 ? numberOfTries + 1 : entry.key;
      return total + ((numberOfGames + finishValue) * entry.value);
    });
    var avgDenominator = finishes.values.fold(0, (sum, value) => sum + value);
    var averageGuess =
        finishes.isNotEmpty ? avgNumerator / avgDenominator : 0.0;

    return Column(
      children: [
        _getStatsTitle(context, numberOfGames),
        Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Column(
              children: [
                const Text(
                  "Played",
                  style: TextStyle(fontWeight: FontWeight.bold),
                ),
                Text(
                  "$gamesPlayed",
                ),
              ],
            ),
            const SizedBox(width: 16),
            Column(
              children: [
                const Text(
                  "Won",
                  style: TextStyle(fontWeight: FontWeight.bold),
                ),
                Text(
                  "${formatDecimal(winPercentage)}%",
                ),
              ],
            ),
            const SizedBox(width: 16),
            Column(
              children: [
                const Text(
                  "Avg Guess",
                  style: TextStyle(fontWeight: FontWeight.bold),
                ),
                Text(
                  formatDecimal(averageGuess),
                ),
              ],
            ),
            const SizedBox(width: 16),
            Column(
              children: [
                const Text(
                  "Streak",
                  style: TextStyle(fontWeight: FontWeight.bold),
                ),
                Text(
                  "$streak",
                ),
              ],
            ),
            const SizedBox(width: 16),
            Column(
              children: [
                const Text(
                  "Max Streak",
                  style: TextStyle(fontWeight: FontWeight.bold),
                ),
                Text(
                  "$maxStreak",
                ),
              ],
            ),
          ],
        ),
        SizedBox(
          height: 350,
          width: 400,
          child: StatsGraph(
            numberOfGames: numberOfGames,
            finishes: finishes,
          ),
        ),
      ],
    );
  }

  Text _getStatsTitle(BuildContext context, int numberOfGames) {
    const titles = {
      1: "Classic",
      2: "Duo",
      4: "Quad",
    };

    return Text(
      titles[numberOfGames] ?? "",
      style: Theme.of(context).textTheme.titleLarge,
    );
  }
}

String formatDecimal(double number) {
  String formatted = number.toStringAsFixed(2);

  // Remove trailing zeros and the decimal point if there are no fractional digits
  formatted = formatted.replaceAll(RegExp(r'(\.0+|(?<=\.\d)0+)$'), '');

  return formatted;
}
