This file describes the differences between v4 and v5 (formerly v2) of Word Game.

## Storage

Game data and stats are stored with the following shape in v4:

```json
{
    "games": {
        "1": {
            "numberOfGames": 1,
            "currentGuess": "",
            "guessIndex": 1,
            "isGuessInvalid": false,
            "value": {
                "0": {
                    "answer": "spite",
                    "guesses": [
                        {
                            "guess": "first",
                            "result": "_c_cc"
                        }
                    ],
                    "activeIndex": 1,
                    "status": "inProgress"
                }
            },
            "hints": {
                "0": {
                    "q": "unknown",
                    "w": "unknown",
                    "e": "unknown",
                    "r": "missing",
                    "t": "close",
                    "y": "unknown",
                    "u": "unknown",
                    "i": "close",
                    "o": "unknown",
                    "p": "unknown",
                    "a": "unknown",
                    "s": "close",
                    "d": "unknown",
                    "f": "missing",
                    "g": "unknown",
                    "h": "unknown",
                    "j": "unknown",
                    "k": "unknown",
                    "l": "unknown",
                    "z": "unknown",
                    "x": "unknown",
                    "c": "unknown",
                    "v": "unknown",
                    "b": "unknown",
                    "n": "unknown",
                    "m": "unknown",
                    "backspace": "unknown",
                    "enter": "unknown"
                }
            },
            "status": "inProgress"
        },
        "2": {
            "numberOfGames": 2,
            "currentGuess": "",
            "guessIndex": 2,
            "isGuessInvalid": false,
            "value": {
                "0": {
                    "answer": "expel",
                    "guesses": [
                        {
                            "guess": "salet",
                            "result": "__cx_"
                        },
                        {
                            "guess": "choir",
                            "result": "_____"
                        }
                    ],
                    "activeIndex": 2,
                    "status": "inProgress"
                },
                "1": {
                    "answer": "decay",
                    "guesses": [
                        {
                            "guess": "salet",
                            "result": "_c_c_"
                        },
                        {
                            "guess": "choir",
                            "result": "c____"
                        }
                    ],
                    "activeIndex": 2,
                    "status": "inProgress"
                }
            },
            "hints": {
                "0": {
                    "q": "unknown",
                    "w": "unknown",
                    "e": "exact",
                    "r": "missing",
                    "t": "missing",
                    "y": "unknown",
                    "u": "unknown",
                    "i": "missing",
                    "o": "missing",
                    "p": "unknown",
                    "a": "missing",
                    "s": "missing",
                    "d": "unknown",
                    "f": "unknown",
                    "g": "unknown",
                    "h": "missing",
                    "j": "unknown",
                    "k": "unknown",
                    "l": "close",
                    "z": "unknown",
                    "x": "unknown",
                    "c": "missing",
                    "v": "unknown",
                    "b": "unknown",
                    "n": "unknown",
                    "m": "unknown",
                    "backspace": "unknown",
                    "enter": "unknown"
                },
                "1": {
                    "q": "unknown",
                    "w": "unknown",
                    "e": "close",
                    "r": "missing",
                    "t": "missing",
                    "y": "unknown",
                    "u": "unknown",
                    "i": "missing",
                    "o": "missing",
                    "p": "unknown",
                    "a": "close",
                    "s": "missing",
                    "d": "unknown",
                    "f": "unknown",
                    "g": "unknown",
                    "h": "missing",
                    "j": "unknown",
                    "k": "unknown",
                    "l": "missing",
                    "z": "unknown",
                    "x": "unknown",
                    "c": "close",
                    "v": "unknown",
                    "b": "unknown",
                    "n": "unknown",
                    "m": "unknown",
                    "backspace": "unknown",
                    "enter": "unknown"
                }
            },
            "status": "inProgress"
        },
        "4": {
            "numberOfGames": 4,
            "currentGuess": "",
            "guessIndex": 8,
            "isGuessInvalid": false,
            "value": {
                "0": {
                    "answer": "scene",
                    "guesses": [
                        {
                            "guess": "salet",
                            "result": "x__c_"
                        },
                        {
                            "guess": "choir",
                            "result": "c____"
                        },
                        {
                            "guess": "pudgy",
                            "result": "_____"
                        },
                        {
                            "guess": "shuck",
                            "result": "x__c_"
                        },
                        {
                            "guess": "bluff",
                            "result": "_____"
                        },
                        {
                            "guess": "flair",
                            "result": "_____"
                        },
                        {
                            "guess": "scene",
                            "result": "xxxxx"
                        },
                        {
                            "guess": "",
                            "result": "_____"
                        },
                        {
                            "guess": "",
                            "result": "_____"
                        }
                    ],
                    "activeIndex": 6,
                    "winIndex": 6,
                    "status": "won"
                },
                "1": {
                    "answer": "beady",
                    "guesses": [
                        {
                            "guess": "salet",
                            "result": "_c_c_"
                        },
                        {
                            "guess": "choir",
                            "result": "_____"
                        },
                        {
                            "guess": "pudgy",
                            "result": "__c_x"
                        },
                        {
                            "guess": "shuck",
                            "result": "_____"
                        },
                        {
                            "guess": "bluff",
                            "result": "x____"
                        },
                        {
                            "guess": "flair",
                            "result": "__x__"
                        },
                        {
                            "guess": "scene",
                            "result": "__c__"
                        },
                        {
                            "guess": "beady",
                            "result": "xxxxx"
                        },
                        {
                            "guess": "",
                            "result": "_____"
                        }
                    ],
                    "activeIndex": 7,
                    "winIndex": 7,
                    "status": "won"
                },
                "2": {
                    "answer": "shuck",
                    "guesses": [
                        {
                            "guess": "salet",
                            "result": "x____"
                        },
                        {
                            "guess": "choir",
                            "result": "cx___"
                        },
                        {
                            "guess": "pudgy",
                            "result": "_c___"
                        },
                        {
                            "guess": "shuck",
                            "result": "xxxxx"
                        },
                        {
                            "guess": "",
                            "result": "_____"
                        },
                        {
                            "guess": "",
                            "result": "_____"
                        },
                        {
                            "guess": "",
                            "result": "_____"
                        },
                        {
                            "guess": "",
                            "result": "_____"
                        },
                        {
                            "guess": "",
                            "result": "_____"
                        }
                    ],
                    "activeIndex": 3,
                    "winIndex": 3,
                    "status": "won"
                },
                "3": {
                    "answer": "flair",
                    "guesses": [
                        {
                            "guess": "salet",
                            "result": "_cc__"
                        },
                        {
                            "guess": "choir",
                            "result": "___xx"
                        },
                        {
                            "guess": "pudgy",
                            "result": "_____"
                        },
                        {
                            "guess": "shuck",
                            "result": "_____"
                        },
                        {
                            "guess": "bluff",
                            "result": "_x_c_"
                        },
                        {
                            "guess": "flair",
                            "result": "xxxxx"
                        },
                        {
                            "guess": "",
                            "result": "_____"
                        },
                        {
                            "guess": "",
                            "result": "_____"
                        },
                        {
                            "guess": "",
                            "result": "_____"
                        }
                    ],
                    "activeIndex": 5,
                    "winIndex": 5,
                    "status": "won"
                }
            },
            "hints": {
                "0": {
                    "q": "missing",
                    "w": "missing",
                    "e": "missing",
                    "r": "missing",
                    "t": "missing",
                    "y": "missing",
                    "u": "missing",
                    "i": "missing",
                    "o": "missing",
                    "p": "missing",
                    "a": "missing",
                    "s": "missing",
                    "d": "missing",
                    "f": "missing",
                    "g": "missing",
                    "h": "missing",
                    "j": "missing",
                    "k": "missing",
                    "l": "missing",
                    "z": "missing",
                    "x": "missing",
                    "c": "missing",
                    "v": "missing",
                    "b": "missing",
                    "n": "missing",
                    "m": "missing",
                    "backspace": "missing",
                    "enter": "missing"
                },
                "1": {
                    "q": "missing",
                    "w": "missing",
                    "e": "missing",
                    "r": "missing",
                    "t": "missing",
                    "y": "missing",
                    "u": "missing",
                    "i": "missing",
                    "o": "missing",
                    "p": "missing",
                    "a": "missing",
                    "s": "missing",
                    "d": "missing",
                    "f": "missing",
                    "g": "missing",
                    "h": "missing",
                    "j": "missing",
                    "k": "missing",
                    "l": "missing",
                    "z": "missing",
                    "x": "missing",
                    "c": "missing",
                    "v": "missing",
                    "b": "missing",
                    "n": "missing",
                    "m": "missing",
                    "backspace": "missing",
                    "enter": "missing"
                },
                "2": {
                    "q": "missing",
                    "w": "missing",
                    "e": "missing",
                    "r": "missing",
                    "t": "missing",
                    "y": "missing",
                    "u": "missing",
                    "i": "missing",
                    "o": "missing",
                    "p": "missing",
                    "a": "missing",
                    "s": "missing",
                    "d": "missing",
                    "f": "missing",
                    "g": "missing",
                    "h": "missing",
                    "j": "missing",
                    "k": "missing",
                    "l": "missing",
                    "z": "missing",
                    "x": "missing",
                    "c": "missing",
                    "v": "missing",
                    "b": "missing",
                    "n": "missing",
                    "m": "missing",
                    "backspace": "missing",
                    "enter": "missing"
                },
                "3": {
                    "q": "missing",
                    "w": "missing",
                    "e": "missing",
                    "r": "missing",
                    "t": "missing",
                    "y": "missing",
                    "u": "missing",
                    "i": "missing",
                    "o": "missing",
                    "p": "missing",
                    "a": "missing",
                    "s": "missing",
                    "d": "missing",
                    "f": "missing",
                    "g": "missing",
                    "h": "missing",
                    "j": "missing",
                    "k": "missing",
                    "l": "missing",
                    "z": "missing",
                    "x": "missing",
                    "c": "missing",
                    "v": "missing",
                    "b": "missing",
                    "n": "missing",
                    "m": "missing",
                    "backspace": "missing",
                    "enter": "missing"
                }
            },
            "status": "won"
        }
    },
    "stats": {
        "value": {
            "1": {
                "gamesPlayed": 4,
                "gamesWon": 3,
                "sumOfFinishes": 20,
                "currentWinStreak": 0,
                "maxWinStreak": 3,
                "finishCounts": {
                    "0": 0,
                    "1": 0,
                    "2": 1,
                    "3": 1,
                    "4": 0,
                    "5": 1,
                    "6": 1
                }
            },
            "2": {
                "gamesPlayed": 2,
                "gamesWon": 1,
                "sumOfFinishes": 15,
                "currentWinStreak": 0,
                "maxWinStreak": 1,
                "finishCounts": {
                    "0": 0,
                    "1": 0,
                    "2": 0,
                    "3": 0,
                    "4": 0,
                    "5": 1,
                    "6": 1
                }
            },
            "4": {
                "gamesPlayed": 3,
                "gamesWon": 3,
                "sumOfFinishes": 24,
                "currentWinStreak": 3,
                "maxWinStreak": 3,
                "finishCounts": {
                    "0": 0,
                    "1": 0,
                    "2": 0,
                    "3": 1,
                    "4": 1,
                    "5": 1,
                    "6": 0
                }
            }
        }
    }
}
```

## Keyboard

The keyboard has a much better layout in v4. It was based on existing layouts for Android keyboards.