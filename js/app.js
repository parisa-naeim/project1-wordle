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
let validCurrentWord;

/*------------------------ Cached Element References ------------------------*/

const keysElements = document.querySelectorAll(".keyboard-box");
const lettersElements = document.querySelectorAll(".box");
const messageElement = document.querySelector(".message");
const resetButtonElement = document.querySelector("#reset-button");
const hiddenButtonElement = document.querySelector("#hidden-button");

/*-------------------------------- Functions --------------------------------*/

const init = () => {
  // add eventListener to keyboard
  keysElements.forEach((element) => {
    element.addEventListener("click", onKeyboardClicked);
  });

  // read the words file
  fetch("./data/words.txt")
    .then((result) => {
      return result.text();
    })
    .then((text) => {
      // select a random word
      const textNumber = Math.floor(Math.random() * 488);
      words = text.split("\n").map((item) => item.toUpperCase());
      selectedWord = words[textNumber];
      console.log(selectedWord);
    })
    .catch((e) => {
      console.error(e);
    });

  // assign default values to the state variables
  userGuesses = [];
  wrongLetters = [];
  wrongLocLetters = [];
  rightLetters = [];
  currentWord = "";
  endGame = false;
  winner = false;
  validCurrentWord = true;
  render();
};

const onKeyboardClicked = (event) => {
  if (event.target.innerHTML === "ENTER") {
    submitGuess();
  } else if (event.target.innerHTML === "Backspace") {
    currentWord = currentWord.substring(0, currentWord.length - 1);
  } else {
    // it is a letter
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

  // iterate on all guesses
  userGuesses.forEach((word, index) => {
    let selectedWordCopy = selectedWord;
    const from = 0 + index * 5;

    // iterate on word letters for showing the letters and making them green if match
    for (let i = 0; i < word.length; i++) {
      lettersElements[i + from].innerHTML = word[i];
      if (word[i] === selectedWordCopy[i]) {
        lettersElements[i + from].classList.add("green");
        selectedWordCopy =
          selectedWordCopy.substring(0, i) +
          "_" +
          selectedWordCopy.substring(i + 1);
      }
    }

    // iterate on word letters to make them yellow or gray
    for (let i = 0; i < word.length; i++) {
      if (selectedWordCopy.includes(word[i]) && selectedWordCopy[i] !== "_") {
        lettersElements[i + from].classList.add("yellow");
      } else if (
        !selectedWordCopy.includes(word[i]) &&
        selectedWordCopy[i] !== "_"
      ) {
        lettersElements[i + from].classList.add("gray");
      }
    }
  });

  // show current word
  const currentWordIndex = userGuesses.length * 5;
  for (let i = 0; i < currentWord.length; i++) {
    lettersElements[i + currentWordIndex].innerHTML = currentWord[i];
  }
};

const updateKeyboard = () => {
  // update keybaord keys colors
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
  // show message to user
  if (!endGame && !validCurrentWord) {
    messageElement.innerHTML = "Please enter a valid word";
  } else if (endGame && winner) {
    showConfetti();
    messageElement.innerHTML = "You won";
  } else if (endGame && !winner) {
    messageElement.innerHTML =
      "Game is over. The correct answer is " + selectedWord;
  } else {
    messageElement.innerHTML = "";
  }
};

const validateWord = () => {
  // check 5 character and is a valid word
  return currentWord.length === 5 && words.includes(currentWord);
};

const submitGuess = () => {
  if (validateWord()) {
    // if it is a word add to user guess
    validCurrentWord = true;
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

    // update guessed letters
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
  } else {
    validCurrentWord = false;
  }

  render();
};

function showConfetti() {
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 },
  });
}

const winTheGame = () => {
  const word = selectedWord;
  init();
  selectedWord = word;
  currentWord = selectedWord;
  submitGuess();
};

/*----------------------------- Event Listeners -----------------------------*/

resetButtonElement.addEventListener("click", init);
hiddenButtonElement.addEventListener("click", winTheGame);

init();
