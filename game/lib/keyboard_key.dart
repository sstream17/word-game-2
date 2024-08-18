import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:word_game/colors.dart';

class KeyboardKey extends StatelessWidget {
  const KeyboardKey({
    Key? key,
    required this.letter,
    required this.touchWidth,
    required this.touchHeight,
    required this.keyWidth,
    required this.keyHeight,
    this.left,
    this.top,
    this.right,
    this.hints,
    this.icon,
    required this.onPressed,
    required this.appColors,
  }) : super(key: key);

  final AppColors appColors;

  final String letter;
  final IconData? icon;

  final double touchWidth;
  final double touchHeight;
  final double keyWidth;
  final double keyHeight;

  final double? left;
  final double? top;
  final double? right;

  final List<String>? hints;
  final Function(String) onPressed;

  @override
  Widget build(BuildContext context) {
    final keyColors = getKeyColor(hints ?? [], appColors);

    return Stack(
      children: [
        GestureDetector(
          onTap: () {
            onPressed(letter);
            HapticFeedback.lightImpact();
          },
          behavior: HitTestBehavior.translucent,
          child: SizedBox(
            height: touchHeight,
            width: touchWidth,
          ),
        ),
        Positioned(
          top: top,
          right: right,
          left: left,
          height: keyHeight,
          width: keyWidth,
          child: Material(
            borderRadius: BorderRadius.circular(4),
            clipBehavior: Clip.antiAlias,
            child: InkResponse(
              onTap: () {
                onPressed(letter);
                HapticFeedback.lightImpact();
              },
              highlightShape: BoxShape.rectangle,
              containedInkWell: true,
              child: Stack(
                alignment: Alignment.center,
                children: [
                  Ink(
                    height: keyHeight,
                    width: keyWidth,
                    decoration: BoxDecoration(
                      gradient: SweepGradient(
                        center: FractionalOffset.center,
                        colors: keyColors.borderColors,
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
                  ),
                  Ink(
                    height: keyHeight - 6,
                    width: keyWidth - 6,
                    decoration: BoxDecoration(
                      gradient: SweepGradient(
                        center: FractionalOffset.center,
                        colors: keyColors.colors,
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
                    ),
                  ),
                  Center(
                    child: icon != null
                        ? Icon(icon)
                        : Text(
                            letter,
                            textAlign: TextAlign.center,
                            style: const TextStyle(
                              fontSize: 20,
                            ),
                          ),
                  ),
                ],
              ),
            ),
          ),
        ),
      ],
    );
  }
}
