import 'package:flutter/material.dart';

class ColorsLight {
  static const Color colorBgGrad0 = Color.fromRGBO(255, 255, 255, 0.75);
  static const Color colorBgGrad1 = Color.fromRGBO(255, 255, 255, 0.0);
  static const Color colorBg0 = Color(0xFFCAD8E4);
  static const Color colorBg1 = Color(0xFFCEDCE8);
  static const Color colorMenuBg = Color(0xFFFFFFFF);
  static const Color colorTheme1 = Color(0xFFFF3E00);
  static const Color colorTheme2 = Color(0xFF4075A6);
  static const Color colorUnguessed = Color(0xFFFFFFFF);
  static const Color colorMissing = Color(0xFFE6EDF3);
  static const Color colorClose = Color(0xFFF0E442);
  static const Color colorCloseBorder = Color(0xFFA89F2E);
  static const Color colorExact = Color(0xFF56B4E9);
  static const Color colorText = Color(0xDE000000);
  static const Color colorTextMissing = Color(0x80000000);
  static const Color colorTextExact = colorText;
  static const Color colorTextInvalid = Color(0xFFF33E48);
}

class ColorsDark {
  static const Color colorBgGrad0 = Color.fromRGBO(29, 33, 36, 0.749);
  static const Color colorBgGrad1 = Color.fromRGBO(255, 255, 255, 0.0);
  static const Color colorBg0 = Color(0xFF0F171F);
  static const Color colorBg1 = Color(0xFF121D26);
  static const Color colorMenuBg = Color(0xFF2D3943);
  static const Color colorTheme1 = Color(0xFFFF3E00);
  static const Color colorTheme2 = Color(0xFF4075A6);
  static const Color colorUnguessed = Color(0xFF232C34);
  static const Color colorMissing = Color(0xFF17222B);
  static const Color colorClose = Color(0xFF394E60);
  static const Color colorCloseBorder = Color(0xFFCCC566);
  static const Color colorExact = Color(0xFF7BABC6);
  static const Color colorText = Color(0xDEFFFFFF);
  static const Color colorTextMissing = Color(0xB3FFFFFF);
  static const Color colorTextExact = Color(0xDE000000);
  static const Color colorTextInvalid = Color(0xFFD65C62);
}

var lightScheme = const ColorScheme(
  brightness: Brightness.light,
  primary: ColorsLight.colorExact,
  onPrimary: ColorsLight.colorText,
  secondary: ColorsLight.colorClose,
  onSecondary: ColorsLight.colorText,
  error: ColorsLight.colorTextInvalid,
  onError: ColorsLight.colorTextInvalid,
  surface: ColorsLight.colorBg0,
  onSurface: ColorsLight.colorText,
);

var darkScheme = const ColorScheme(
  brightness: Brightness.dark,
  primary: ColorsDark.colorExact,
  onPrimary: ColorsDark.colorText,
  secondary: ColorsDark.colorClose,
  onSecondary: ColorsDark.colorText,
  error: ColorsDark.colorTextInvalid,
  onError: ColorsDark.colorTextInvalid,
  surface: ColorsDark.colorBg0,
  onSurface: ColorsDark.colorText,
);

class AppColors extends ThemeExtension<AppColors> {
  final Color contentColorExact;
  final Color contentColorClose;
  final Color contentColorMissing;
  final Color contentColorUnguessed;

  final Color textColor;
  final Color textColorMissing;
  final Color textColorInvalid;

  AppColors({
    required this.contentColorExact,
    required this.contentColorClose,
    required this.contentColorMissing,
    required this.contentColorUnguessed,
    required this.textColor,
    required this.textColorMissing,
    required this.textColorInvalid,
  });

  @override
  AppColors copyWith(
      {Color? colorExact,
      Color? colorClose,
      Color? colorMissing,
      Color? colorUnguessed,
      Color? colorText,
      Color? colorTextMissing,
      Color? colorTextInvalid}) {
    return AppColors(
      contentColorExact: colorExact ?? contentColorExact,
      contentColorClose: colorClose ?? contentColorClose,
      contentColorMissing: colorMissing ?? contentColorMissing,
      contentColorUnguessed: colorUnguessed ?? contentColorUnguessed,
      textColor: colorText ?? textColor,
      textColorMissing: colorTextMissing ?? textColorMissing,
      textColorInvalid: colorTextInvalid ?? textColorInvalid,
    );
  }

  @override
  AppColors lerp(ThemeExtension<AppColors>? other, double t) {
    if (other is! AppColors) return this;
    return AppColors(
      contentColorExact:
          Color.lerp(contentColorExact, other.contentColorExact, t)!,
      contentColorClose:
          Color.lerp(contentColorClose, other.contentColorClose, t)!,
      contentColorMissing:
          Color.lerp(contentColorMissing, other.contentColorMissing, t)!,
      contentColorUnguessed:
          Color.lerp(contentColorUnguessed, other.contentColorUnguessed, t)!,
      textColor: Color.lerp(textColor, other.textColor, t)!,
      textColorMissing:
          Color.lerp(textColorMissing, other.textColorMissing, t)!,
      textColorInvalid:
          Color.lerp(textColorInvalid, other.textColorInvalid, t)!,
    );
  }
}

Color getBackgroundColor(
  String hint,
  AppColors appColors,
) {
  switch (hint) {
    case "m":
      return appColors.contentColorMissing;
    case "x":
      return appColors.contentColorExact;
    case "c":
      return appColors.contentColorClose;
    default:
      return appColors.contentColorUnguessed;
  }
}

List<Color> getKeyColor(
  List<String> hints,
  AppColors appColors,
) {
  if (hints.length == 4) {
    return [
      getBackgroundColor(hints[3], appColors), // game 4
      getBackgroundColor(hints[3], appColors), // game 4
      getBackgroundColor(hints[2], appColors), // game 3
      getBackgroundColor(hints[2], appColors), // game 3
      getBackgroundColor(hints[0], appColors), // game 1
      getBackgroundColor(hints[0], appColors), // game 1
      getBackgroundColor(hints[1], appColors), // game 2
      getBackgroundColor(hints[1], appColors), // game 2
    ];
  } else if (hints.length == 2) {
    return getKeyColor(
      [
        hints[0],
        hints[1],
        hints[0],
        hints[1],
      ],
      appColors,
    );
  } else if (hints.length == 1) {
    return getKeyColor(
      List.filled(2, hints[0]),
      appColors,
    );
  } else {
    return getKeyColor(
      List.filled(4, "_"),
      appColors,
    );
  }
}
