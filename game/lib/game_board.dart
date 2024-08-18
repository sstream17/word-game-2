import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:word_game/colors.dart';
import 'package:word_game/constants/game.dart';
import 'package:word_game/game_model.dart';
import 'package:word_game/letter_card.dart';

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
