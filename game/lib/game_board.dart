import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:word_game/colors.dart';
import 'package:word_game/constants/game.dart';
import 'package:word_game/game_model.dart';

const emptyChar = " ";

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
    final winIndex = game.winIndexes[gameIndex];
    final isInvalidGuess = game.invalidGuess;

    return List.generate(
      game.guesses.length,
      (currentRow) {
        final isCurrentGuess = game.guessIndex == currentRow;

        return TableRow(
          children: List.generate(wordLength, (currentLetter) {
            final text = currentLetter < game.guesses[currentRow].length
                ? game.guesses[currentRow][currentLetter]
                : emptyChar;
            final color = getBackgroundColor(
              game.hints[gameIndex][currentRow][currentLetter],
              appColors,
            );
            final borderColor = getBackgroundColor(
              game.hints[gameIndex][currentRow][currentLetter],
              appColors,
              isBorder: true,
            );

            return TableCell(
              child: Padding(
                padding: const EdgeInsets.all(2.0),
                child: LetterCard(
                  color: color,
                  borderColor: borderColor,
                  text: text,
                  winIndex: winIndex,
                  currentRow: currentRow,
                  isCurrentGuess: isCurrentGuess,
                  isInvalidGuess: isInvalidGuess,
                  appColors: appColors,
                ),
              ),
            );
          }),
        );
      },
    );
  }
}

class LetterCard extends StatelessWidget {
  const LetterCard({
    super.key,
    required this.color,
    required this.borderColor,
    required this.text,
    required this.winIndex,
    required this.currentRow,
    required this.isCurrentGuess,
    required this.appColors,
    required this.isInvalidGuess,
  });

  final Color color;
  final Color borderColor;
  final String text;
  final int winIndex;
  final int currentRow;
  final bool isCurrentGuess;
  final bool isInvalidGuess;

  final AppColors appColors;

  @override
  Widget build(BuildContext context) {
    final boardFinished = winIndex != -1;

    if (boardFinished && currentRow > winIndex) {
      return Material(
        color: appColors.contentColorMissing,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(4),
        ),
        elevation: 0,
        child: Center(
          child: Text(
            emptyChar,
            style: TextStyle(
              color: appColors.textColorMissing,
              fontSize: 24,
            ),
          ),
        ),
      );
    }

    final double elevation = boardFinished
        ? 0
        : isCurrentGuess
            ? 4
            : 1;

    return Material(
      color: color,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(4),
        side: BorderSide(
          color: borderColor,
          width: 3,
        ),
      ),
      elevation: elevation,
      child: Center(
        child: Text(
          text,
          style: getTextStyle(
            isInvalidGuess,
            currentRow,
            isCurrentGuess,
            winIndex,
            appColors,
          ),
        ),
      ),
    );
  }
}

TextStyle getTextStyle(
  bool isInvalidGuess,
  int currentRow,
  bool isCurrentGuess,
  int winIndex,
  AppColors appColors,
) {
  final fontSize = isCurrentGuess || currentRow == winIndex ? 36.0 : 24.0;

  TextStyle textStyle = TextStyle(
    color: appColors.textColor,
    fontSize: fontSize,
  );

  if (isCurrentGuess && isInvalidGuess) {
    textStyle = textStyle.copyWith(
      color: appColors.textColorInvalid,
      decoration: TextDecoration.underline,
      decorationStyle: TextDecorationStyle.wavy,
      decorationColor: appColors.textColorInvalid,
      decorationThickness: 2,
    );
  }

  return textStyle;
}
