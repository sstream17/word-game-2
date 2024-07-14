import 'package:flutter/material.dart';
import 'package:word_game/constants/game.dart';

class StatsGraph extends StatelessWidget {
  const StatsGraph({
    super.key,
    required this.numberOfGames,
    required this.finishes,
  });

  final int numberOfGames;
  final Map<int, int> finishes;

  @override
  Widget build(BuildContext context) {
    var numberOfGuesses = [...List.generate(numberOfTries + 1, (i) => i), -1];
    return Row(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        for (final winIndex in numberOfGuesses)
          Column(
            children: [
              Text("${finishes[winIndex] ?? ""}"),
              Text(
                "${winIndex == -1 ? "L" : winIndex + numberOfGames}",
              ),
            ],
          )
      ],
    );
  }
}
