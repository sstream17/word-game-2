import 'package:flutter/material.dart';
import 'package:word_game/colors.dart';
import 'package:word_game/constants/game.dart';
import 'package:word_game/game_app_bar.dart';
import 'package:word_game/letter_card.dart';

class HowToPlay extends StatelessWidget {
  const HowToPlay({
    super.key,
  });

  @override
  Widget build(BuildContext context) {
    final appColors = Theme.of(context).extension<AppColors>()!;
    final columnWidth =
        (MediaQuery.of(context).size.width - 24) / (wordLength * 2);
    return Scaffold(
      appBar: GameAppBar(
        title: "How to play",
      ),
      body: Center(
        child: Table(
          defaultColumnWidth: FixedColumnWidth(columnWidth),
          defaultVerticalAlignment: TableCellVerticalAlignment.middle,
          children: [
            TableRow(
              children: [
                TableCell(
                  child: Padding(
                    padding: const EdgeInsets.all(2.0),
                    child: LetterCard(
                      color: appColors.contentColorClose,
                      borderColor: appColors.contentColorCloseBorder,
                      text: "t",
                      winIndex: -1,
                      currentRow: 2,
                      isCurrentGuess: false,
                      isInvalidGuess: false,
                      appColors: appColors,
                    ),
                  ),
                ),
                TableCell(
                  child: Padding(
                    padding: const EdgeInsets.all(2.0),
                    child: LetterCard(
                      color: appColors.contentColorMissing,
                      borderColor: appColors.contentColorMissing,
                      text: "h",
                      winIndex: -1,
                      currentRow: 2,
                      isCurrentGuess: false,
                      isInvalidGuess: false,
                      appColors: appColors,
                    ),
                  ),
                ),
                TableCell(
                  child: Padding(
                    padding: const EdgeInsets.all(2.0),
                    child: LetterCard(
                      color: appColors.contentColorClose,
                      borderColor: appColors.contentColorCloseBorder,
                      text: "i",
                      winIndex: -1,
                      currentRow: 2,
                      isCurrentGuess: false,
                      isInvalidGuess: false,
                      appColors: appColors,
                    ),
                  ),
                ),
                TableCell(
                  child: Padding(
                    padding: const EdgeInsets.all(2.0),
                    child: LetterCard(
                      color: appColors.contentColorClose,
                      borderColor: appColors.contentColorCloseBorder,
                      text: "n",
                      winIndex: -1,
                      currentRow: 2,
                      isCurrentGuess: false,
                      isInvalidGuess: false,
                      appColors: appColors,
                    ),
                  ),
                ),
                TableCell(
                  child: Padding(
                    padding: const EdgeInsets.all(2.0),
                    child: LetterCard(
                      color: appColors.contentColorMissing,
                      borderColor: appColors.contentColorMissing,
                      text: "k",
                      winIndex: -1,
                      currentRow: 2,
                      isCurrentGuess: false,
                      isInvalidGuess: false,
                      appColors: appColors,
                    ),
                  ),
                ),
              ],
            ),
            TableRow(
              children: [
                TableCell(
                  child: Padding(
                    padding: const EdgeInsets.all(2.0),
                    child: LetterCard(
                      color: appColors.contentColorExact,
                      borderColor: appColors.contentColorExact,
                      text: "i",
                      winIndex: -1,
                      currentRow: 2,
                      isCurrentGuess: false,
                      isInvalidGuess: false,
                      appColors: appColors,
                    ),
                  ),
                ),
                TableCell(
                  child: Padding(
                    padding: const EdgeInsets.all(2.0),
                    child: LetterCard(
                      color: appColors.contentColorExact,
                      borderColor: appColors.contentColorExact,
                      text: "n",
                      winIndex: -1,
                      currentRow: 2,
                      isCurrentGuess: false,
                      isInvalidGuess: false,
                      appColors: appColors,
                    ),
                  ),
                ),
                TableCell(
                  child: Padding(
                    padding: const EdgeInsets.all(2.0),
                    child: LetterCard(
                      color: appColors.contentColorExact,
                      borderColor: appColors.contentColorExact,
                      text: "p",
                      winIndex: -1,
                      currentRow: 2,
                      isCurrentGuess: false,
                      isInvalidGuess: false,
                      appColors: appColors,
                    ),
                  ),
                ),
                TableCell(
                  child: Padding(
                    padding: const EdgeInsets.all(2.0),
                    child: LetterCard(
                      color: appColors.contentColorExact,
                      borderColor: appColors.contentColorExact,
                      text: "u",
                      winIndex: -1,
                      currentRow: 2,
                      isCurrentGuess: false,
                      isInvalidGuess: false,
                      appColors: appColors,
                    ),
                  ),
                ),
                TableCell(
                  child: Padding(
                    padding: const EdgeInsets.all(2.0),
                    child: LetterCard(
                      color: appColors.contentColorExact,
                      borderColor: appColors.contentColorExact,
                      text: "t",
                      winIndex: -1,
                      currentRow: 2,
                      isCurrentGuess: false,
                      isInvalidGuess: false,
                      appColors: appColors,
                    ),
                  ),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}
