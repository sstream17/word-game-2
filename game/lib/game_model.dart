import 'package:flutter/material.dart';
import 'package:word_game/constants.dart';

class GameModel with ChangeNotifier {
  int numberOfGames = 1;
  var guesses = [];
  int guessIndex = 0;
  String get currentGuess => guesses[guessIndex];

  GameModel(int _numberOfGames) {
    numberOfGames = _numberOfGames;
    guesses = [for (var i = 0; i < _numberOfGames + numberOfTries; i++) ""];
  }

  void updateGuess(String letter) {
    var lowerLetter = letter.toLowerCase();
    if (lowerLetter == "backspace") {
      if (currentGuess.isNotEmpty) {
        guesses[guessIndex] =
            currentGuess.substring(0, currentGuess.length - 1);
      }
    } else if (currentGuess.length < wordLength) {
      guesses[guessIndex] += lowerLetter;
    } else {
      // tried bad guess
    }

    notifyListeners();
  }

  void submitGuess() {
    if (currentGuess.length < wordLength) {
      return;
    }

    guessIndex = guessIndex + 1;

    notifyListeners();
  }
}
