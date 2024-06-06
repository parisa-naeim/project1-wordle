# Wordle

## Introduction

Wordle is a fun and addictive word puzzle game where players guess a hidden five-letter word within six attempts. Each guess provides feedback, guiding players towards the correct answer by indicating which letters are correct and in the correct position.

## How to Play

1. **Start the Game**: The game selects a random five-letter word that the player must guess.
2. **Make a Guess**: Enter a five-letter word and press enter.
3. **Receive Feedback**:
   - **Green**: The letter is correct and in the correct position.
   - **Yellow**: The letter is correct but in the wrong position.
   - **Gray**: The letter is not in the word at all.
4. **Repeat**: Use the feedback to make new guesses. You have a total of six attempts to guess the correct word.

## Example

If the hidden word is "APPLE":

- Guess 1: **PARTY**
  - P (Green), A (Yellow), R (Gray), T (Gray), Y (Gray)
- Guess 2: **PLANE**
  - P (Green), L (Yellow), A (Yellow), N (Gray), E (Green)
- Continue making guesses until you either guess the word correctly or use up all six attempts.

## Features

- **On screen keyboard**: An onscreen keyboard to let users to enter their guesses.
- **Words table**: A table to show the list of user guess and the feeback.
- **Message**: A message shown to users if the user word is not correct or when the game finishes.
- **Reset game**: User can reset the game whenever during the game.

## Source code

It's an open source project which can be cloned by:

```
git clone https://github.com/parisa-naeim/project1-wordle.git
```

## Where to play?

Wordle is deployed on [GitHub pages](https://parisa-naeim.github.io/project1-wordle/). Feel free to open it in your browser and give it a try.

## Screenshots

Screenshot of a Win scenario.

![First Screen shot of wordle](/images/wordle-screenshot.JPG)

Screenshot of a lost scenario.

![Second Screen shot of wordle](/images/wordle-screenshot-2.JPG)

## Technologies

- HTML
- CSS
- JavaScript

## Attributaions

A file of 5,757 five letter words is downloaded from [five-letter-words github repo](https://github.com/charlesreid1/five-letter-words/blob/master/sgb-words.txt)

## Next Steps

More improvements can be done to make Wordle more fun game:

1. Keep users scores so they can see their scores history.
2. Can use audio assisstant to make the game accessible for visionary impaired people.
