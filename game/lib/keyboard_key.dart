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
            clipBehavior: Clip.hardEdge,
            child: InkResponse(
              onTap: () {
                onPressed(letter);
                HapticFeedback.lightImpact();
              },
              highlightShape: BoxShape.rectangle,
              containedInkWell: true,
              child: Ink(
                height: keyHeight,
                width: keyWidth,
                color: Colors.white,
                child: icon != null ? Icon(icon) : Text(letter),
              ),
            ),
          ),
        ),
      ],
    );
  }
  // return SizedBox(
  //   height: height - padding,
  //   width: width - padding,
  //   child: Material(
  //     child: InkResponse(
  //       onTap: () {
  //         onPressed(letter);
  //         HapticFeedback.lightImpact();
  //       },
  //       highlightShape: BoxShape.rectangle,
  //       containedInkWell: true,
  //       child: Ink(
  //         height: height - padding * 8,
  //         width: width - padding * 8,
  //         color: Colors.white,
  //         child: Text(letter),
  //       ),
  //     ),
  //   ),
  // );

  //   return GestureDetector(
  //     onTap: () {
  //       onPressed(letter);
  //       HapticFeedback.lightImpact();
  //     },
  //     child: Container(
  //       decoration: BoxDecoration(
  //         gradient: SweepGradient(
  //           center: FractionalOffset.center,
  //           colors: getKeyColor(
  //             hints ?? [],
  //             appColors,
  //             isBorder: true,
  //           ),
  //           stops: const <double>[
  //             0.0,
  //             0.25,
  //             0.25,
  //             0.5,
  //             0.5,
  //             0.75,
  //             0.75,
  //             1.0,
  //           ],
  //         ),
  //         borderRadius: BorderRadius.circular(4),
  //       ),
  //       child: Padding(
  //         padding: const EdgeInsets.all(3),
  //         child: Container(
  //           decoration: BoxDecoration(
  //             gradient: SweepGradient(
  //               center: FractionalOffset.center,
  //               colors: getKeyColor(
  //                 hints ?? [],
  //                 appColors,
  //               ),
  //               stops: const <double>[
  //                 0.0,
  //                 0.25,
  //                 0.25,
  //                 0.5,
  //                 0.5,
  //                 0.75,
  //                 0.75,
  //                 1.0,
  //               ],
  //             ),
  //           ),
  //           child: Center(
  //             child: Text(
  //               letter,
  //               textAlign: TextAlign.center,
  //               style: const TextStyle(
  //                 fontSize: 20,
  //               ),
  //             ),
  //           ),
  //         ),
  //       ),
  //     ),
  //   );
  // }
}
