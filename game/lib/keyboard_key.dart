import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:word_game/colors.dart';

class KeyboardKey extends StatelessWidget {
  const KeyboardKey({
    Key? key,
    required this.letter,
    this.hints,
    required this.onPressed,
    required this.appColors,
  }) : super(key: key);

  final AppColors appColors;

  final String letter;
  final List<String>? hints;
  final Function(String) onPressed;

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        gradient: SweepGradient(
          center: FractionalOffset.center,
          colors: getKeyColor(
            hints ?? [],
            appColors,
            isBorder: true,
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
      child: Padding(
        padding: const EdgeInsets.all(3),
        child: Container(
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
                vertical: 8,
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
        ),
      ),
    );
  }
}
