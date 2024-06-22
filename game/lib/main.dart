import 'package:flutter/material.dart';
import 'package:url_strategy/url_strategy.dart';

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
      theme: ThemeData(primarySwatch: Colors.teal),
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
      body: Center(
        child: Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            Expanded(
              child: ElevatedButton(
                style: ElevatedButton.styleFrom(backgroundColor: Colors.grey[100]),
                child: const Text('Classic'),
                onPressed: () {
                  Navigator.pushNamed(context, '/1');
                },
              ),
            ),
            Expanded(
              child: ElevatedButton(
                style: ElevatedButton.styleFrom(backgroundColor: Colors.grey[100]),
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
