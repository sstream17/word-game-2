import 'dart:math';

import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:word_game/colors.dart';
import 'package:word_game/game_model.dart';
import 'package:word_game/keyboard_key.dart' as game_key;

class Keyboard extends StatelessWidget {
  const Keyboard({
    super.key,
    required this.game,
    required this.appColors,
  });

  final AppColors appColors;

  final GameModel game;

  @override
  Widget build(BuildContext context) {
    const keyGap = 4.0;
    var screenWidth = MediaQuery.of(context).size.width;
    var maxWidth = min(screenWidth, 500.0);
    var keyWidth = (maxWidth - keyGap * 13) / 10;
    var keyHeight = 50.0;

    return SizedBox(
      width: maxWidth,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceEvenly,
            children: [
              for (final letter in "qwertyuiop".characters)
                SizedBox(
                  width: keyWidth,
                  height: keyHeight,
                  child: game_key.KeyboardKey(
                    letter: letter,
                    hints: game.keyHints[letter],
                    onPressed: game.updateGuess,
                    appColors: appColors,
                  ),
                ),
            ],
          ),
          const SizedBox(height: keyGap),
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              for (final letter in "asdfghjkl".characters)
                Row(children: [
                  SizedBox(
                    width: keyWidth,
                    height: keyHeight,
                    child: game_key.KeyboardKey(
                      letter: letter,
                      hints: game.keyHints[letter],
                      onPressed: game.updateGuess,
                      appColors: appColors,
                    ),
                  ),
                  if (letter != "l") const SizedBox(width: keyGap),
                ]),
            ],
          ),
          const SizedBox(height: keyGap),
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              SizedBox(
                width: keyWidth * 1.5,
                height: keyHeight,
                child: TextButton(
                  style: TextButton.styleFrom(
                    padding: const EdgeInsets.symmetric(
                      vertical: 12,
                    ),
                  ),
                  onPressed: () {
                    game.updateGuess("backspace");
                    HapticFeedback.lightImpact();
                  },
                  child: const Icon(
                    Icons.backspace_outlined,
                  ),
                ),
              ),
              const SizedBox(width: keyGap),
              for (final letter in "zxcvbnm".characters)
                Row(children: [
                  SizedBox(
                    width: keyWidth,
                    height: keyHeight,
                    child: game_key.KeyboardKey(
                      letter: letter,
                      hints: game.keyHints[letter],
                      onPressed: game.updateGuess,
                      appColors: appColors,
                    ),
                  ),
                  const SizedBox(width: keyGap),
                ]),
              SizedBox(
                width: keyWidth * 1.5,
                height: keyHeight,
                child: TextButton(
                  style: TextButton.styleFrom(
                    padding: const EdgeInsets.symmetric(
                      vertical: 12,
                    ),
                  ),
                  onPressed: () {
                    game.submitGuess();
                    HapticFeedback.lightImpact();
                  },
                  child: const Icon(
                    Icons.send_outlined,
                  ),
                ),
              ),
            ],
          ),
          const SizedBox(height: 24),
        ],
      ),
    );
  }
}
