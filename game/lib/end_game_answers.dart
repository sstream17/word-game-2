import "package:flutter/material.dart";
import "package:word_game/colors.dart";

class EndGameAnswers extends StatelessWidget {
  const EndGameAnswers({
    super.key,
    required this.words,
    required this.winIndexes,
    required this.appColors,
  });

  final AppColors appColors;

  final List<String> words;
  final List<int> winIndexes;

  @override
  Widget build(BuildContext context) {
    List<Widget> items = [];
    for (int i = 0; i < words.length; i++) {
      var lost = winIndexes[i] == -1;

      var word = Text(words[i]);
      var winIndex = Container(
        width: 24,
        alignment: Alignment.center,
        padding: const EdgeInsets.all(4),
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(4),
          color:
              lost ? appColors.textColorInvalid : appColors.contentColorExact,
        ),
        child: Text(
          lost ? "" : "${winIndexes[i] + 1}",
        ),
      );

      items.add(
        SizedBox(
          width: (MediaQuery.of(context).size.width / 2 - 10),
          child: _buildRow(word, winIndex, i.isOdd),
        ),
      );
    }

    return DefaultTextStyle(
      style: Theme.of(context).textTheme.titleLarge!,
      child: Wrap(
        spacing: 16,
        runSpacing: 16,
        children: items,
      ),
    );
  }

  Row _buildRow(Widget word, Widget winIndex, bool winIndexFirst) {
    return Row(
      mainAxisSize: MainAxisSize.min,
      mainAxisAlignment:
          winIndexFirst ? MainAxisAlignment.start : MainAxisAlignment.end,
      children: winIndexFirst
          ? [winIndex, const SizedBox(width: 8), word]
          : [word, const SizedBox(width: 8), winIndex],
    );
  }
}
