import 'package:flutter/material.dart';
import 'package:word_game/game_app_bar.dart';

class HowToPlay extends StatelessWidget {
  const HowToPlay({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: GameAppBar(
        title: "How to play",
      ),
      body: const Placeholder(),
    );
  }
}
