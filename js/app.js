/*-------------------------------- Constants --------------------------------*/

/*---------------------------- Variables (state) ----------------------------*/
let words;
let selectedWord;
let userGuesses;
let wrongLetters;
let wrongLocLetters;
let rightLetters;
let currentWord;
let endGame;
let winner;

/*------------------------ Cached Element References ------------------------*/

const keysElements = document.querySelectorAll(".keyboard-box");
const lettersElements = document.querySelectorAll(".box");
const messageElement = document.querySelector(".message");
const resetButtonElement = document.querySelector("#reset-button");

/*-------------------------------- Functions --------------------------------*/
const init = () => {
  fetch("words.txt")
    .then((result) => {
      return result.text();
    })
    .then((text) => {
      const textNumber = Math.floor(Math.random() * 5758);
      words = text.split("\n");
      selectedWord = words[textNumber].toUpperCase();
      console.log(selectedWord);
    })
    .catch((e) => {
      console.error(e);
    });

  userGuesses = [];
  wrongLetters = [];
  wrongLocLetters = [];
  rightLetters = [];
  currentWord = "";
  endGame = false;
  winner = false;
  render();
};

const onKeyboardClicked = (event) => {
  if (event.target.innerHTML === "ENTER") {
    submitGuess();
  } else if (event.target.innerHTML === "Backspace") {
    currentWord = currentWord.substring(0, currentWord.length - 1);
  } else {
    if (currentWord.length < 5) {
      currentWord = currentWord + event.target.innerHTML;
    }
  }

  render();
};

const render = () => {
  displayWordTable();
  updateKeyboard();
  showMessage();
};

const resetWordTable = () => {
  lettersElements.forEach((element) => {
    element.innerHTML = "";
    element.classList = ["box"];
  });
};
const displayWordTable = () => {
  resetWordTable();
  let letterIndex = 0;
  userGuesses.forEach((word) => {
    for (let i = 0; i < word.length; i++) {
      lettersElements[letterIndex].innerHTML = word[i];

      if (word[i] === selectedWord[i]) {
        lettersElements[letterIndex].classList.add("green");
      } else if (selectedWord.includes(word[i])) {
        lettersElements[letterIndex].classList.add("yellow");
      } else {
        lettersElements[letterIndex].classList.add("gray");
      }

      letterIndex++;
    }
  });

  for (let i = 0; i < currentWord.length; i++) {
    lettersElements[letterIndex++].innerHTML = currentWord[i];
  }
};

const updateKeyboard = () => {
  keysElements.forEach((element) => {
    element.classList = ["keyboard-box"];
    if (rightLetters.includes(element.innerHTML)) {
      element.classList.add("green");
    } else if (wrongLocLetters.includes(element.innerHTML)) {
      element.classList.add("yellow");
    } else if (wrongLetters.includes(element.innerHTML)) {
      element.classList.add("gray");
    }
  });
};

const showMessage = () => {
  if (endGame && winner) {
    messageElement.innerHTML = "You won";
  } else if (endGame && !winner) {
    messageElement.innerHTML =
      "You lost. The correct answer is " + selectedWord;
  }
};
const validateWord = () => {
  return words.includes(currentWord.toLowerCase());
};

const submitGuess = () => {
  // 1.check 5 character
  if (currentWord.length === 5 && validateWord()) {
    userGuesses.push(currentWord);
    if (currentWord === selectedWord) {
      endGame = true;
      keysElements.forEach((element) => {
        element.removeEventListener("click", onKeyboardClicked);
        winner = true;
      });
    } else if (userGuesses.length === 6) {
      endGame = true;
      keysElements.forEach((element) => {
        element.removeEventListener("click", onKeyboardClicked);
        winner = false;
      });
    }

    for (let i = 0; i < currentWord.length; i++) {
      if (currentWord[i] === selectedWord[i]) {
        rightLetters.push(currentWord[i]);
      } else if (selectedWord.includes(currentWord[i])) {
        wrongLocLetters.push(currentWord[i]);
      } else {
        wrongLetters.push(currentWord[i]);
      }
    }

    currentWord = "";

    // 2. if it is a word
    // 3.update add to user guess
    // 4. update letters
    render();
  }
};

const compareWord = () => {};

/*----------------------------- Event Listeners -----------------------------*/

keysElements.forEach((element) => {
  element.addEventListener("click", onKeyboardClicked);
});

resetButtonElement.addEventListener("click", init);

init();
