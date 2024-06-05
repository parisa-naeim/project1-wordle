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
const backSpaceElement = document.querySelector(".backspace-icon");
const message = document.querySelector(".message");

/*-------------------------------- Functions --------------------------------*/
const init = () => {
  console.log("log init");
  fetch("words.txt")
    .then((result) => {
      console.log("say what is right");
      return result.text();
    })
    .then((text) => {
      console.log("say what is wrong");
      const textNumber = Math.floor(Math.random() * 5758);
      words = text.split("\n");
      selectedWord = words[textNumber].toUpperCase();
      console.log(selectedWord);
    })
    .catch((e) => {
      console.error(e);
      words = ["house", "loose", "shape"];
      selectedWord = "HOUSE";
    });

  userGuesses = [];
  wrongLetters = [];
  wrongLocLetters = [];
  rightLetters = [];
  currentWord = "";
  endGame = false;
  render();
};

const onKeyboardClicked = (event) => {
  console.log("we are in onKeyboardClick function " + event.target.innerHTML);

  if (event.target.innerHTML === "ENTER") {
    submitGuess();
  } else if (event.target === backSpaceElement) {
    currentWord = currentWord.substring(0, currentWord.length - 1);
    console.log("backspace", currentWord);
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
    message.innerHTML = "You won";
  } else if (endGame && !winner) {
    message.innerHTML = "You lost. The correct answer is " + selectedWord;
  }
};
const validateWord = () => {
  return words.includes(currentWord.toLowerCase());
};

const submitGuess = () => {
  console.log("submit");
  // 1.check 5 character
  if (currentWord.length === 5 && validateWord()) {
    console.log("it is 5 char");
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

init();
