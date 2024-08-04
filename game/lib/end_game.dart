import 'package:flutter/material.dart';
import 'package:word_game/colors.dart';
import 'package:word_game/end_game_answers.dart';
import 'package:word_game/game_model.dart';

class EndGame extends StatelessWidget {
  const EndGame({
    super.key,
    required this.game,
    required this.appColors,
  });

  final AppColors appColors;

  final GameModel game;

  @override
  Widget build(BuildContext context) {
    return Column(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        EndGameAnswers(
          words: game.answers,
          winIndexes: game.winIndexes,
          appColors: appColors,
        ),
        const SizedBox(height: 16),
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
