import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:word_game/game_model.dart';
import 'package:word_game/keyboard_key.dart';

class Keyboard extends StatelessWidget {
  const Keyboard({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Consumer<GameModel>(
      builder: (context, game, child) => Column(
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              for (final letter in "qwertyuiop".characters)
                KeyboardKey(
                  letter: letter,
                  onPressed: game.updateGuess,
                ),
            ],
          ),
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              for (final letter in "asdfghjkl".characters)
                KeyboardKey(
                  letter: letter,
                  onPressed: game.updateGuess,
                ),
            ],
          ),
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              ElevatedButton(
                onPressed: () {
                  game.updateGuess("backspace");
                },
                child: const Icon(Icons.backspace_outlined),
              ),
              for (final letter in "zxcvbnm".characters)
                KeyboardKey(
                  letter: letter,
                  onPressed: game.updateGuess,
                ),
              ElevatedButton(
                onPressed: () {
                  game.submitGuess();
                },
                child: const Icon(Icons.send_outlined),
              ),
            ],
          ),
        ],
      ),
    );
  }
}
