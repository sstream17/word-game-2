import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:word_game/colors.dart';

class KeyboardKey extends StatelessWidget {
  const KeyboardKey({
    Key? key,
    required this.letter,
    this.hints,
    required this.onPressed,
  }) : super(key: key);

  final String letter;
  final List<String>? hints;
  final Function(String) onPressed;

  @override
  Widget build(BuildContext context) {
    final appColors = Theme.of(context).extension<AppColors>()!;
    return Container(
      decoration: BoxDecoration(
        gradient: SweepGradient(
          center: FractionalOffset.center,
          colors: getKeyColor(
            hints ?? [],
            appColors,
          ),
          stops: const <double>[
            0.0,
            0.25,
            0.25,
            0.5,
            0.5,
            0.75,
            0.75,
            1.0,
          ],
        ),
        borderRadius: BorderRadius.circular(4),
      ),
      child: TextButton(
        style: TextButton.styleFrom(
          backgroundColor: Colors.transparent,
          shadowColor: Colors.transparent,
          padding: const EdgeInsets.symmetric(
            vertical: 12,
          ),
        ),
        onPressed: () {
          onPressed(letter);
          HapticFeedback.lightImpact();
        },
        child: Text(
          letter,
          textAlign: TextAlign.center,
          style: const TextStyle(
            fontSize: 20,
          ),
        ),
      ),
    );
  }
}
