import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:word_game/constants.dart';
import 'package:word_game/game_model.dart';

class GameBoard extends StatelessWidget {
  const GameBoard({Key? key, required this.gameIndex}) : super(key: key);

  final int gameIndex;

  @override
  Widget build(BuildContext context) {
    return Consumer<GameModel>(
      builder: (context, game, child) => Table(
        defaultVerticalAlignment: TableCellVerticalAlignment.middle,
        children: [
          for (var currentRow = 0;
              currentRow < game.guesses.length;
              currentRow++)
            TableRow(
              children: [
                for (var currentLetter = 0;
                    currentLetter < wordLength;
                    currentLetter++)
                  TableCell(
                    child: Card(
                      color: getBackgroundColor(
                        game.hints[gameIndex][currentRow][currentLetter],
                      ),
                      child: Center(
                        child: currentLetter < game.guesses[currentRow].length
                            ? Text(game.guesses[currentRow][currentLetter])
                            : const Text(""),
                      ),
                    ),
                  ),
              ],
            ),
        ],
      ),
    );
  }
}

Color getBackgroundColor(String hint) {
  switch (hint) {
    case "m":
      return Colors.white10;
    case "x":
      return Colors.blueAccent;
    case "c":
      return Colors.yellow;
    default:
      return Colors.white;
  }
}
