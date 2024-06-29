import 'package:flutter/material.dart';
import 'package:word_game/game_model.dart';

class EndGame extends StatelessWidget {
  const EndGame({super.key, required this.game});

  final GameModel game;

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Text("${game.answers}"),
        Text("${game.winIndexes.map((index) => index + 1)}"),
        ElevatedButton(
          onPressed: () {
            game.restart();
          },
          child: const Text("Restart"),
        )
      ],
    );
  }
}
