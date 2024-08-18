import 'dart:math';

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

  final defaultKeyWidth = 108;
  final defaultKeyHeight = 144;
  final defaultGap = 9;

  @override
  Widget build(BuildContext context) {
    final screenWidth = MediaQuery.of(context).size.width;
    final maxWidth = min(screenWidth, 500.0);
    final scaleFactor = maxWidth / (10 * defaultKeyWidth);

    final touchTargetWidth = defaultKeyWidth * scaleFactor;
    final touchTargetHeight = defaultKeyHeight * scaleFactor;
    final keyGap = defaultGap * scaleFactor;

    final keyboardHeight = touchTargetHeight * 3 + keyGap * 2 + 36;

    return SizedBox(
      height: keyboardHeight,
      child: Consumer<GameModel>(
        builder: (context, game, child) => game.gameOver
            ? EndGame(
                game: game,
                appColors: appColors,
              )
            : Keyboard(
                game: game,
                appColors: appColors,
                touchTargetWidth: touchTargetWidth,
                touchTargetHeight: touchTargetHeight,
                keyGap: keyGap,
                maxWidth: maxWidth,
              ),
      ),
    );
  }
}
