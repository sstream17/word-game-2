import 'package:flutter/material.dart';
import 'package:word_game/game_app_bar.dart';

class Stats extends StatelessWidget {
  const Stats({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: GameAppBar(
        title: "Word Game",
      ),
      body: const Placeholder(),
    );
  }
}
