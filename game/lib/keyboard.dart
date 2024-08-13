import 'package:flutter/material.dart';
import 'package:word_game/colors.dart';
import 'package:word_game/game_model.dart';
import 'package:word_game/keyboard_key.dart';

class Keyboard extends StatelessWidget {
  const Keyboard({
    super.key,
    required this.game,
    required this.appColors,
    required this.touchTargetWidth,
    required this.touchTargetHeight,
    required this.keyGap,
    required this.maxWidth,
  });

  final AppColors appColors;

  final GameModel game;

  final double touchTargetWidth;
  final double touchTargetHeight;
  final double keyGap;
  final double maxWidth;

  @override
  Widget build(BuildContext context) {
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
                  top: keyGap / 2,
                  right: keyGap / 2,
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
              KeyboardKey(
                letter: "a",
                touchWidth: touchTargetWidth * 1.4,
                touchHeight: touchTargetHeight,
                keyHeight: keyHeight,
                keyWidth: keyWidth,
                top: keyGap / 2,
                right: keyGap / 2,
                hints: game.keyHints["a"],
                onPressed: game.updateGuess,
                appColors: appColors,
              ),
              for (final letter in "sdfghjk".characters)
                KeyboardKey(
                  letter: letter,
                  touchWidth: touchTargetWidth,
                  touchHeight: touchTargetHeight,
                  keyHeight: keyHeight,
                  keyWidth: keyWidth,
                  top: keyGap / 2,
                  right: keyGap / 2,
                  hints: game.keyHints[letter],
                  onPressed: game.updateGuess,
                  appColors: appColors,
                ),
              KeyboardKey(
                letter: "l",
                touchWidth: touchTargetWidth * 1.4,
                touchHeight: touchTargetHeight,
                keyHeight: keyHeight,
                keyWidth: keyWidth,
                top: keyGap / 2,
                left: keyGap / 2,
                hints: game.keyHints["l"],
                onPressed: game.updateGuess,
                appColors: appColors,
              ),
            ],
          ),
          SizedBox(height: keyGap), // Row gap
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              KeyboardKey(
                letter: "backspace",
                icon: Icons.backspace_outlined,
                touchWidth: touchTargetWidth * 1.5,
                touchHeight: touchTargetHeight * 1.2,
                keyHeight: keyHeight,
                keyWidth: keyWidth * 1.5,
                top: keyGap / 2,
                right: keyGap / 2,
                hints: null,
                onPressed: game.updateGuess,
                appColors: appColors,
              ),
              for (final letter in "zxcvbnm".characters)
                KeyboardKey(
                  letter: letter,
                  touchWidth: touchTargetWidth,
                  touchHeight: touchTargetHeight,
                  keyHeight: keyHeight,
                  keyWidth: keyWidth,
                  top: keyGap / 2,
                  right: keyGap / 2,
                  hints: game.keyHints[letter],
                  onPressed: game.updateGuess,
                  appColors: appColors,
                ),
              KeyboardKey(
                letter: "enter",
                icon: Icons.send_outlined,
                touchWidth: touchTargetWidth * 1.5,
                touchHeight: touchTargetHeight * 1.2,
                keyHeight: keyHeight,
                keyWidth: keyWidth * 1.5,
                top: keyGap / 2,
                left: keyGap / 2,
                hints: null,
                onPressed: game.submitGuess,
                appColors: appColors,
              ),
            ],
          ),
        ],
      ),
    );
  }
}
