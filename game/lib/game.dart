import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:provider/provider.dart';
import 'package:word_game/game_board.dart';
import 'package:word_game/game_model.dart';
import 'package:word_game/keyboard.dart';

class Game extends StatelessWidget {
  Game({Key? key, this.numberOfGames = 1}) : super(key: key);

  final int numberOfGames;
  final FocusNode _focusNode = FocusNode();

  @override
  Widget build(BuildContext context) {
    return ChangeNotifierProvider(
      create: (context) => GameModel(numberOfGames),
      builder: (context, _) {
        return KeyboardListener(
          focusNode: _focusNode,
          autofocus: true,
          onKeyEvent: (event) {
            if (event is! KeyDownEvent) {
              return;
            }

            var game = context.read<GameModel>();
            var key = event.logicalKey;

            if (key == LogicalKeyboardKey.enter ||
                key == LogicalKeyboardKey.backspace ||
                (event.character != null &&
                    event.character!.contains(RegExp(r'^[a-zA-Z]$')))) {
              var keyLabel = key.keyLabel.toLowerCase();
              switch (keyLabel) {
                case "enter":
                  game.submitGuess();
                  break;
                default:
                  game.updateGuess(keyLabel);
                  break;
              }
            }
          },
          child: Scaffold(
            body: Center(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                crossAxisAlignment: CrossAxisAlignment.center,
                children: <Widget>[
                  Expanded(
                    child: GridView.count(
                      padding: const EdgeInsets.all(16.0),
                      crossAxisSpacing: 16,
                      mainAxisSpacing: 16,
                      crossAxisCount: 2,
                      children: [
                        for (var i = 0; i < numberOfGames; i++)
                          GameBoard(gameIndex: i)
                      ],
                    ),
                  ),
                  const Center(
                    child: Keyboard(),
                  ),
                ],
              ),
            ),
          ),
        );
      },
    );
  }
}
