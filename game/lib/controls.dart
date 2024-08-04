import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:word_game/colors.dart';
import 'package:word_game/end_game.dart';
import 'package:word_game/game_model.dart';
import 'package:word_game/keyboard.dart';

class Controls extends StatelessWidget {
  const Controls({
    super.key,
    required this.appColors,
  });

  final AppColors appColors;

  @override
  Widget build(BuildContext context) {
    return Consumer<GameModel>(
      builder: (context, game, child) => game.gameOver
          ? EndGame(game: game)
          : Keyboard(
              game: game,
              appColors: appColors,
            ),
    );
  }
}
