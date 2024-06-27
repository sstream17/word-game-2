import 'dart:math';

import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:word_game/game_model.dart';
import 'package:word_game/keyboard_key.dart';

class Keyboard extends StatelessWidget {
  const Keyboard({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    const keyGap = 4.0;
    var screenWidth = MediaQuery.of(context).size.width;
    var maxWidth = min(screenWidth, 500.0);
    var keyWidth = (maxWidth - keyGap * 13) / 10;
    return Consumer<GameModel>(
      builder: (context, game, child) => SizedBox(
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
                    child: KeyboardKey(
                      letter: letter,
                      hints: game.keyHints[letter],
                      onPressed: game.updateGuess,
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
                      child: KeyboardKey(
                        letter: letter,
                        hints: game.keyHints[letter],
                        onPressed: game.updateGuess,
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
                  child: TextButton(
                    onPressed: () {
                      game.updateGuess("backspace");
                    },
                    child: const Icon(Icons.backspace_outlined),
                  ),
                ),
                const SizedBox(width: keyGap),
                for (final letter in "zxcvbnm".characters)
                  Row(children: [
                    SizedBox(
                      width: keyWidth,
                      child: KeyboardKey(
                        letter: letter,
                        hints: game.keyHints[letter],
                        onPressed: game.updateGuess,
                      ),
                    ),
                    const SizedBox(width: keyGap),
                  ]),
                SizedBox(
                  width: keyWidth * 1.5,
                  child: TextButton(
                    onPressed: () {
                      game.submitGuess();
                    },
                    child: const Icon(Icons.send_outlined),
                  ),
                ),
              ],
            ),
            const SizedBox(height: 24),
          ],
        ),
      ),
    );
  }
}
