import 'package:flutter/material.dart';
import 'package:word_game/colors.dart';
import 'package:word_game/constants/game.dart';

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
