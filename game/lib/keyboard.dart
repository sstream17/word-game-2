import 'dart:math';

import 'package:flutter/material.dart';
import 'package:word_game/colors.dart';
import 'package:word_game/game_model.dart';
import 'package:word_game/keyboard_key.dart';

class Keyboard extends StatelessWidget {
  const Keyboard({
    super.key,
    required this.game,
    required this.appColors,
  });

  final AppColors appColors;

  final GameModel game;

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

    final keyWidth = touchTargetWidth - keyGap;
    final keyHeight = touchTargetHeight - keyGap;

    return SizedBox(
      width: maxWidth,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceEvenly,
            children: [
              for (final letter in "qwertyuiop".characters)
                KeyboardKey(
                  letter: letter,
                  touchWidth: touchTargetWidth,
                  touchHeight: touchTargetHeight,
                  keyHeight: keyHeight,
                  keyWidth: keyWidth,
                  hints: game.keyHints[letter],
                  onPressed: game.updateGuess,
                  appColors: appColors,
                ),
            ],
          ),
          SizedBox(height: keyGap), // Row gap
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              for (final letter in "asdfghjkl".characters)
                Row(children: [
                  KeyboardKey(
                    letter: letter,
                    touchWidth: touchTargetWidth,
                    touchHeight: touchTargetHeight,
                    keyHeight: keyHeight,
                    keyWidth: keyWidth,
                    hints: game.keyHints[letter],
                    onPressed: game.updateGuess,
                    appColors: appColors,
                  ),
                ]),
            ],
          ),
          SizedBox(height: keyGap), // Row gap
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              KeyboardKey(
                letter: "backspace",
                icon: Icons.backspace_outlined,
                touchWidth: touchTargetWidth,
                touchHeight: touchTargetHeight,
                keyHeight: keyHeight,
                keyWidth: keyWidth * 1.5,
                hints: null,
                onPressed: game.updateGuess,
                appColors: appColors,
              ),
              SizedBox(width: keyGap), // Gap before letter keys
              for (final letter in "zxcvbnm".characters)
                Row(children: [
                  KeyboardKey(
                    letter: letter,
                    touchWidth: touchTargetWidth,
                    touchHeight: touchTargetHeight,
                    keyHeight: keyHeight,
                    keyWidth: keyWidth,
                    hints: game.keyHints[letter],
                    onPressed: game.updateGuess,
                    appColors: appColors,
                  ),
                ]),
              KeyboardKey(
                letter: "enter",
                icon: Icons.send_outlined,
                touchWidth: touchTargetWidth,
                touchHeight: touchTargetHeight,
                keyHeight: keyHeight,
                keyWidth: keyWidth * 1.5,
                hints: null,
                onPressed: game.submitGuess,
                appColors: appColors,
              ),
            ],
          ),
          const SizedBox(height: 20),
        ],
      ),
    );
  }
}
