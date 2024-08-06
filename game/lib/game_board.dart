import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:word_game/colors.dart';
import 'package:word_game/constants/game.dart';
import 'package:word_game/game_model.dart';

class GameBoard extends StatelessWidget {
  const GameBoard({
    Key? key,
    required this.gameIndex,
    required this.appColors,
  }) : super(key: key);

  final AppColors appColors;

  final int gameIndex;

  @override
  Widget build(BuildContext context) {
    return Consumer<GameModel>(
      builder: (context, game, child) {
        final columnWidth =
            (MediaQuery.of(context).size.width - 24) / (wordLength * 2);
        return Table(
          defaultColumnWidth: FixedColumnWidth(columnWidth),
          defaultVerticalAlignment: TableCellVerticalAlignment.middle,
          children: _buildTableRows(game),
        );
      },
    );
  }

  List<TableRow> _buildTableRows(GameModel game) {
    return List.generate(game.guesses.length, (currentRow) {
      final isCurrentGuess = game.guessIndex == currentRow;
      final winIndex = game.winIndexes[gameIndex];
      final textStyle =
          _getTextStyle(game, currentRow, isCurrentGuess, winIndex);
      return TableRow(
        children: List.generate(wordLength, (currentLetter) {
          return _buildTableCell(
            game,
            gameIndex,
            currentRow,
            currentLetter,
            isCurrentGuess,
            winIndex,
            textStyle,
            appColors,
          );
        }),
      );
    });
  }

  TableCell _buildTableCell(
    GameModel game,
    int gameIndex,
    int currentRow,
    int currentLetter,
    bool isCurrentGuess,
    int winIndex,
    TextStyle textStyle,
    AppColors appColors,
  ) {
    final boardFinished = winIndex != -1;

    if (boardFinished && currentRow > winIndex) {
      return TableCell(
        child: Card(
          elevation: 0,
          color: appColors.contentColorMissing,
          child: const Text(
            "",
            style: TextStyle(
              fontSize: 24.0,
            ),
          ),
        ),
      );
    }

    final text = currentLetter < game.guesses[currentRow].length
        ? game.guesses[currentRow][currentLetter]
        : "";

    final elevation = boardFinished
        ? 0.0
        : isCurrentGuess
            ? 4.0
            : 1.0;

    return TableCell(
      child: Card(
        color: getBackgroundColor(
          game.hints[gameIndex][currentRow][currentLetter],
          appColors,
        ),
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(4),
          side: BorderSide(
            color: getBackgroundColor(
              game.hints[gameIndex][currentRow][currentLetter],
              appColors,
              isBorder: true,
            ),
            width: 4,
          ),
        ),
        elevation: elevation,
        child: Center(
          child: Text(
            text,
            style: textStyle,
          ),
        ),
      ),
    );
  }

  TextStyle _getTextStyle(
      GameModel game, int currentRow, bool isCurrentGuess, int winIndex) {
    final textColor = isCurrentGuess && game.invalidGuess
        ? appColors.textColorInvalid
        : appColors.textColor;
    final fontSize = isCurrentGuess || currentRow == winIndex ? 36.0 : 24.0;

    return TextStyle(
      color: textColor,
      fontSize: fontSize,
    );
  }
}
