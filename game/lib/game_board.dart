import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:word_game/colors.dart';
import 'package:word_game/constants/game.dart';
import 'package:word_game/game_model.dart';

class GameBoard extends StatelessWidget {
  const GameBoard({Key? key, required this.gameIndex}) : super(key: key);

  final int gameIndex;

  @override
  Widget build(BuildContext context) {
    final appColors = Theme.of(context).extension<AppColors>()!;
    return Consumer<GameModel>(
      builder: (context, game, child) => Table(
        defaultColumnWidth: FixedColumnWidth(
          (MediaQuery.of(context).size.width - 24) / (wordLength * 2),
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
                    appColors,
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
  AppColors appColors,
) {
  Color textColor = game.guessIndex == currentRow && game.invalidGuess
      ? appColors.textColorInvalid
      : appColors.textColor;

  String text = currentLetter < game.guesses[currentRow].length
      ? game.guesses[currentRow][currentLetter]
      : "";

  // TODO: Fix this for games that have already been won.
  // Currently the row will continue to change size, but it should stay on the row that was won.
  double fontSize = game.guessIndex == currentRow ? 36 : 24;

  if (game.winIndexes[gameIndex] != -1 &&
      currentRow > game.winIndexes[gameIndex]) {
    text = "";
  }

  return TableCell(
    child: Card(
      color: getBackgroundColor(
        game.hints[gameIndex][currentRow][currentLetter],
        appColors,
      ),
      child: Center(
        child: Text(
          text,
          style: TextStyle(
            color: textColor,
            fontSize: fontSize,
          ),
        ),
      ),
    ),
  );
}
