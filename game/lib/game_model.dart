import 'package:collection/collection.dart';
import 'package:flutter/material.dart';
import 'package:word_game/constants.dart';
import 'package:word_game/words.dart';

class GameModel with ChangeNotifier {
  int numberOfGames = 1;
  int get numberOfGuesses => numberOfGames + numberOfTries;

  List<String> guesses = [];
  int guessIndex = 0;
  String get currentGuess => guesses[guessIndex];
  bool invalidGuess = false;

  List<String> answers = [];
  List<List<String>> hints = [];
  Map<String, List<String>> keyHints = {};
  List<int> winIndexes = [];

  bool gameOver = false;
  bool gameWon = false;

  void initializeKeyHints(int numberOfGames) {
    keyHints.clear();
    for (var letter in "abcdefghijklmnopqrstuvwxyz".characters) {
      keyHints[letter] = List.filled(numberOfGames, "_");
    }
  }

  void initializeGame(int numberOfGames) {
    this.numberOfGames = numberOfGames;

    guessIndex = 0;
    invalidGuess = false;

    guesses = List.filled(numberOfGuesses, "");
    answers = words.sample(numberOfGames);

    var emptyHint = "".padRight(wordLength, "_");
    hints = [
      for (var i = 0; i < numberOfGames; i++)
        List.filled(numberOfGuesses, emptyHint)
    ];

    initializeKeyHints(numberOfGames);
    winIndexes = List.filled(numberOfGames, -1);

    gameOver = false;
    gameWon = false;
  }

  GameModel(int numberOfGames) {
    initializeGame(numberOfGames);
  }

  bool validate(String word) {
    return allowed.contains(word);
  }

  void triedBadGuess() {}

  void updateGuess(String letter) {
    if (gameOver) {
      return;
    }

    if (invalidGuess) {
      invalidGuess = false;
    }

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

    // After adding the letter check if the word is long enough and valid
    if (currentGuess.length == wordLength) {
      invalidGuess = !validate(currentGuess);
    }

    notifyListeners();
  }

  void revealHints() {
    for (var (gameIndex, answer) in answers.indexed) {
      if (winIndexes[gameIndex] != -1) {
        continue;
      }

      var available = List.from(answer.characters);
      var hint = List.filled(wordLength, "m");

      // First, find exact matches
      for (var i = 0; i < wordLength; i++) {
        if (currentGuess[i] == available[i]) {
          hint[i] = "x";
          available[i] = " ";
          keyHints.update(
            currentGuess[i],
            (list) {
              list[gameIndex] = "x";
              return list;
            },
          );
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
            keyHints.update(
              currentGuess[i],
              (list) {
                if (list[gameIndex] != "x") {
                  list[gameIndex] = "c";
                }
                return list;
              },
            );
          }
        }
      }

      // Finally, mark missing letters in the key hints
      for (var i = 0; i < wordLength; i++) {
        if (hint[i] == "m") {
          keyHints.update(
            currentGuess[i],
            (list) {
              list[gameIndex] = "m";
              return list;
            },
          );
        }
      }

      hints[gameIndex][guessIndex] = hint.join("");

      // Every character matched, so this game won
      if (hint.every((character) => character == "x")) {
        winIndexes[gameIndex] = guessIndex;

        // Since this game has been won, show all letters as missing
        //so it doesn't clutter the other games
        keyHints.forEach((_, list) {
          list[gameIndex] = "m";
        });
      }
    }
  }

  bool wonAllGames() {
    return winIndexes.none((index) => index == -1);
  }

  void submitGuess() {
    if (gameOver) {
      return;
    }

    if (currentGuess.length < wordLength) {
      triedBadGuess();
      return;
    }

    if (!validate(currentGuess)) {
      triedBadGuess();
      return;
    }

    revealHints();

    if (wonAllGames()) {
      gameWon = true;
      gameOver = true;
      notifyListeners();
      return;
    }

    guessIndex = guessIndex + 1;

    if (guessIndex >= numberOfGuesses) {
      gameWon = false;
      gameOver = true;
      notifyListeners();
      return;
    }

    notifyListeners();
  }

  void restart() {
    initializeGame(numberOfGames);
    notifyListeners();
  }
}
