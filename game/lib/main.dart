import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:hive_flutter/hive_flutter.dart';
import 'package:url_strategy/url_strategy.dart';
import 'package:word_game/colors.dart';
import 'package:word_game/constants/routes.dart';
import 'package:word_game/constants/store.dart';
import 'package:word_game/game_app_bar.dart';
import 'package:word_game/how_to_play.dart';
import 'package:word_game/stats.dart';

import 'game.dart';

void main() async {
  setPathUrlStrategy();
  await Hive.initFlutter();
  await Hive.openBox(storeNameStats);
  runApp(const WordGameApp());
}

class WordGameApp extends StatelessWidget {
  const WordGameApp({Key? key}) : super(key: key);

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      theme: ThemeData(
        textTheme: GoogleFonts.nunitoTextTheme(),
        colorScheme: lightScheme,
        extensions: [
          AppColors(
            contentColorExact: ColorsLight.colorExact,
            contentColorClose: ColorsLight.colorClose,
            contentColorCloseBorder: ColorsLight.colorCloseBorder,
            contentColorMissing: ColorsLight.colorMissing,
            contentColorUnguessed: ColorsLight.colorUnguessed,
            textColor: ColorsLight.colorText,
            textColorMissing: ColorsLight.colorTextMissing,
            textColorInvalid: ColorsLight.colorTextInvalid,
          ),
        ],
        elevatedButtonTheme: ElevatedButtonThemeData(
          style: ElevatedButton.styleFrom(
            backgroundColor: Colors.white,
            foregroundColor: Colors.black,
          ),
        ),
        textButtonTheme: TextButtonThemeData(
          style: ElevatedButton.styleFrom(
            backgroundColor: Colors.white,
            foregroundColor: Colors.black,
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(4),
            ),
          ),
        ),
        cardTheme: CardTheme(
          margin: const EdgeInsets.all(2),
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(2),
          ),
        ),
        menuTheme: const MenuThemeData(
          style: MenuStyle(
            backgroundColor:
                WidgetStatePropertyAll<Color>(ColorsLight.colorMenuBg),
          ),
        ),
      ),
      initialRoute: routeHome,
      routes: {
        routeHome: (context) => const HomePage(),
        routeGame1: (context) => Game(),
        routeGame2: (context) => Game(numberOfGames: 2),
        routeGame4: (context) => Game(numberOfGames: 4),
        routeHowToPlay: (context) => const HowToPlay(),
        routeStats: (context) => const Stats(),
      },
    );
  }
}

class HomePage extends StatelessWidget {
  const HomePage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: GameAppBar(
        title: "Word Game",
      ),
      body: Center(
        child: Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            Expanded(
              child: ElevatedButton(
                style:
                    ElevatedButton.styleFrom(backgroundColor: Colors.grey[100]),
                child: const Text('Classic'),
                onPressed: () {
                  Navigator.pushNamed(context, routeGame1);
                },
              ),
            ),
            Expanded(
              child: ElevatedButton(
                style:
                    ElevatedButton.styleFrom(backgroundColor: Colors.grey[100]),
                child: const Text('Duo'),
                onPressed: () {
                  Navigator.pushNamed(context, routeGame2);
                },
              ),
            ),
            Expanded(
              child: ElevatedButton(
                style:
                    ElevatedButton.styleFrom(backgroundColor: Colors.grey[100]),
                child: const Text('Quad'),
                onPressed: () {
                  Navigator.pushNamed(context, routeGame4);
                },
              ),
            ),
          ],
        ),
      ),
    );
  }
}
