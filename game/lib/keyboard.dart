import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:word_game/game_model.dart';

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
                ElevatedButton(
                  onPressed: () {
                    game.updateGuess(letter);
                  },
                  child: Text(letter),
                ),
            ],
          ),
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              for (final letter in "asdfghjkl".characters)
                ElevatedButton(
                  onPressed: () {
                    game.updateGuess(letter);
                  },
                  child: Text(letter),
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
                ElevatedButton(
                  onPressed: () {
                    game.updateGuess(letter);
                  },
                  child: Text(letter),
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
