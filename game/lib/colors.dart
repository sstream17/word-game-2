import 'package:flutter/material.dart';

var lightScheme = const ColorScheme(
  brightness: Brightness.light,
  primary: Color(0xff56b4e9),
  onPrimary: Color(0xde000000),
  secondary: Color(0xfff0e442),
  onSecondary: Color(0xde000000),
  error: Color(0xfff33e48),
  onError: Color(0xfff33e48),
  surface: Color(0xffcad8e4),
  onSurface: Color(0xde000000),
);

Color getBackgroundColor(String hint) {
  switch (hint) {
    case "m":
      return Colors.white10;
    case "x":
      return Colors.blueAccent;
    case "c":
      return Colors.yellow;
    default:
      return Colors.white;
  }
}

List<Color> getKeyColor(List<String> hints) {
  if (hints.length == 4) {
    return [
      getBackgroundColor(hints[3]), // game 4
      getBackgroundColor(hints[3]), // game 4
      getBackgroundColor(hints[2]), // game 3
      getBackgroundColor(hints[2]), // game 3
      getBackgroundColor(hints[0]), // game 1
      getBackgroundColor(hints[0]), // game 1
      getBackgroundColor(hints[1]), // game 2
      getBackgroundColor(hints[1]), // game 2
    ];
  } else if (hints.length == 2) {
    return getKeyColor(
      [
        hints[0],
        hints[1],
        hints[0],
        hints[1],
      ],
    );
  } else if (hints.length == 1) {
    return getKeyColor(List.filled(2, hints[0]));
  } else {
    return getKeyColor(List.filled(4, "_"));
  }
}
