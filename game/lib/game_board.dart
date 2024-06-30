import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:word_game/colors.dart';
import 'package:word_game/constants.dart';
import 'package:word_game/game_model.dart';

class GameBoard extends StatelessWidget {
  const GameBoard({Key? key, required this.gameIndex}) : super(key: key);

  final int gameIndex;

  @override
  Widget build(BuildContext context) {
    return Consumer<GameModel>(
      builder: (context, game, child) => Table(
        defaultColumnWidth: FixedColumnWidth(
          (MediaQuery.of(context).size.width - 24) /
              (game.numberOfGames == 1 ? wordLength : wordLength * 2),
        ),
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
                  buildTableCell(
                    game,
                    gameIndex,
                    currentRow,
                    currentLetter,
                  ),
              ],
            ),
        ],
      ),
    );
  }
}

TableCell buildTableCell(
  GameModel game,
  int gameIndex,
  int currentRow,
  int currentLetter,
) {
  Color textColor = game.guessIndex == currentRow && game.invalidGuess
      ? Colors.red
      : Colors.black;

  String text = currentLetter < game.guesses[currentRow].length
      ? game.guesses[currentRow][currentLetter]
      : "";

  if (game.winIndexes[gameIndex] != -1 &&
      currentRow > game.winIndexes[gameIndex]) {
    text = "";
  }

  return TableCell(
    child: Card(
      color: getBackgroundColor(
        game.hints[gameIndex][currentRow][currentLetter],
      ),
      child: Center(
        child: Text(
          text,
          style: TextStyle(
            color: textColor,
            fontSize: 24,
          ),
        ),
      ),
    ),
  );
}
