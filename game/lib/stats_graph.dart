import 'package:flutter/material.dart';
import 'package:word_game/constants.dart';

class StatsGraph extends StatelessWidget {
  const StatsGraph({super.key, required this.numberOfGames});

  final int numberOfGames;

  @override
  Widget build(BuildContext context) {
    var numberOfGuesses = [...List.generate(numberOfTries + 1, (i) => i), -1];
    return Row(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        for (final winIndex in numberOfGuesses)
          Text("${winIndex == -1 ? "L" : winIndex + numberOfGames}")
      ],
    );
  }
}
