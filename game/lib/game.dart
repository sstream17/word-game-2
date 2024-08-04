import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:provider/provider.dart';
import 'package:word_game/colors.dart';
import 'package:word_game/controls.dart';
import 'package:word_game/game_app_bar.dart';
import 'package:word_game/game_board.dart';
import 'package:word_game/game_model.dart';

class Game extends StatelessWidget {
  Game({Key? key, this.numberOfGames = 1}) : super(key: key);

  final int numberOfGames;
  final FocusNode _focusNode = FocusNode();

  @override
  Widget build(BuildContext context) {
    final appColors = Theme.of(context).extension<AppColors>()!;
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
            appBar: GameAppBar(),
            body: Center(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                crossAxisAlignment: CrossAxisAlignment.center,
                children: <Widget>[
                  Expanded(
                    child: Padding(
                      padding: const EdgeInsets.all(8),
                      child: Center(
                        child: SingleChildScrollView(
                          child: Wrap(
                            runSpacing: 16,
                            spacing: 8,
                            children: [
                              for (var i = 0; i < numberOfGames; i++)
                                GameBoard(
                                  gameIndex: i,
                                  appColors: appColors,
                                )
                            ],
                          ),
                        ),
                      ),
                    ),
                  ),
                  Center(
                    child: Controls(
                      appColors: appColors,
                    ),
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
