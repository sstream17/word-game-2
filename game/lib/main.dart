import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:url_strategy/url_strategy.dart';
import 'package:word_game/colors.dart';

import 'game.dart';

void main() {
  setPathUrlStrategy();
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      theme: ThemeData(
        textTheme: GoogleFonts.nunitoTextTheme(),
        colorScheme: lightScheme,
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
              borderRadius: BorderRadius.circular(8),
            ),
          ),
        ),
      ),
      initialRoute: '/',
      routes: {
        '/': (context) => const MyHomePage(),
        '/1': (context) => Game(),
        '/2': (context) => Game(numberOfGames: 2),
      },
    );
  }
}

class MyHomePage extends StatelessWidget {
  const MyHomePage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("Word Game"),
        actions: const [
          MenuAnchor(
            menuChildren: [
              MenuItemButton(
                child: Text("Menu item"),
              ),
            ],
          )
        ],
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
                  Navigator.pushNamed(context, '/1');
                },
              ),
            ),
            Expanded(
              child: ElevatedButton(
                style:
                    ElevatedButton.styleFrom(backgroundColor: Colors.grey[100]),
                child: const Text('Duo'),
                onPressed: () {
                  Navigator.pushNamed(context, '/2');
                },
              ),
            ),
          ],
        ),
      ),
    );
  }
}
