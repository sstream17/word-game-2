import 'package:flutter/material.dart';
import 'package:word_game/game_app_bar.dart';
import 'package:word_game/stats_row.dart';

class Stats extends StatelessWidget {
  const Stats({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: GameAppBar(
        title: "Stats",
      ),
      body: Column(
        children: [
          for (final gameMode in [1, 2, 4])
            StatsRow(numberOfGames: gameMode)
        ],
      ),
    );
  }
}
