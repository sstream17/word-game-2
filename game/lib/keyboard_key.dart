import 'package:flutter/material.dart';

class KeyboardKey extends StatelessWidget {
  const KeyboardKey({
    Key? key,
    required this.letter,
    required this.onPressed,
  }) : super(key: key);

  final String letter;
  final Function(String) onPressed;

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        gradient: const SweepGradient(
          center: FractionalOffset.center,
          colors: <Color>[
            Color(0xFF4285F4), // game 4
            Color(0xFF4285F4), // game 4
            Color(0xFF34A853), // game 3
            Color(0xFF34A853), // game 3
            Color(0xFFFBBC05), // game 1
            Color(0xFFFBBC05), // game 1
            Color(0xFFEA4335), // game 2
            Color(0xFFEA4335), // game 2
          ],
          stops: <double>[
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
        borderRadius: BorderRadius.circular(8),
      ),
      child: ElevatedButton(
        style: ElevatedButton.styleFrom(
          backgroundColor: Colors.transparent,
          shadowColor: Colors.transparent,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(8),
          ),
        ),
        onPressed: () {
          onPressed(letter);
        },
        child: Text(letter),
      ),
    );
  }
}
