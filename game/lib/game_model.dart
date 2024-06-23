import 'package:collection/collection.dart';
import 'package:flutter/material.dart';
import 'package:word_game/constants.dart';
import 'package:word_game/words.dart';

class GameModel with ChangeNotifier {
  int numberOfGames = 1;
  List<String> guesses = [];
  int guessIndex = 0;
  String get currentGuess => guesses[guessIndex];

  List<String> answers = [];
  List<List<String>> hints = [];
  Map<String, String> keyHints = {};

  void initializeGame(int numberOfGames) {
    this.numberOfGames = numberOfGames;
    var numberOfGuesses = numberOfGames + numberOfTries;

    guesses = List.filled(numberOfGuesses, "");
    answers = words.sample(numberOfGames);

    var emptyHint = "".padRight(wordLength, "_");
    hints = [
      for (var i = 0; i < numberOfGames; i++)
        List.filled(numberOfGuesses, emptyHint)
    ];

    keyHints = {};
  }

  GameModel(int numberOfGames) {
    initializeGame(numberOfGames);
  }

  void triedBadGuess() {}

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
      triedBadGuess();
    }

    notifyListeners();
  }

  void revealHints() {
    for (var (gameIndex, answer) in answers.indexed) {
      var available = List.from(answer.characters);
      var hint = List.filled(wordLength, "m");

      // First, find exact matches
      for (var i = 0; i < wordLength; i++) {
        if (currentGuess[i] == available[i]) {
          hint[i] = "x";
          available[i] = " ";
        }
      }

      // Then find close matches (this has to happen
      // in a second step, otherwise an early close
      // match can prevent a later exact match)
      for (var i = 0; i < wordLength; i += 1) {
        if (hint[i] == "m") {
          var index = available.indexOf(currentGuess[i]);
          if (index != -1) {
            hint[i] = "c";
            available[index] = " ";
          }
        }
      }

      hints[gameIndex][guessIndex] = hint.join("");
    }
  }

  void submitGuess() {
    if (currentGuess.length < wordLength) {
      triedBadGuess();
      return;
    }

    revealHints();
    guessIndex = guessIndex + 1;

    notifyListeners();
  }
}
