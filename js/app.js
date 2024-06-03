/*-------------------------------- Constants --------------------------------*/

/*---------------------------- Variables (state) ----------------------------*/

let selectedWord;
let userGuesses;
let wrongLetters;
let wrongLocLetters;
let rightLetters;
let currentWord = "";
/*------------------------ Cached Element References ------------------------*/

const keysElements = document.querySelectorAll(".keyboard-box");
const lettersElements = document.querySelectorAll(".box");
const backSpaceElement = document.querySelector(
  ".backspace-icon"
);

/*-------------------------------- Functions --------------------------------*/
const init = () => {
  selectedWord = "HOUSE";
  userGuesses = ["MOUSE", "FUNNY"];
  wrongLetters = ["M"];
  wrongLocLetters = ["Y"];
  rightLetters = ["O", "H", "U"];
  currentWord = "GH";
  render();
};
const onKeyboardClicked = (event) => {
    console.log("we are in onKeyboardClick function " + event.target.innerHTML);

  if (event.target.innerHTML === "ENTER") {
    console.log("enter");
  } else if (event.target === backSpaceElement) {
    console.log("backspace");
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
};

const displayWordTable = () => {
  let letterIndex = 0;
  userGuesses.forEach((word) => {
    for (let i = 0; i < word.length; i++) {
      lettersElements[letterIndex].innerHTML = word[i];
      if (rightLetters.includes(word[i])) {
        lettersElements[letterIndex].classList.add("green");
      } else if (wrongLocLetters.includes(word[i])) {
        lettersElements[letterIndex].classList.add("yellow");
      } else if (wrongLetters.includes(word[i])) {
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
    if (rightLetters.includes(element.innerHTML)) {
      element.classList.add("green");
    } else if (wrongLocLetters.includes(element.innerHTML)) {
      element.classList.add("yellow");
    } else if (wrongLetters.includes(element.innerHTML)) {
      element.classList.add("gray");
    }
  });
};
const validateWord = () => {
  return true;
};
const submitGuess = () => {
  validateWord();
};
const compareWord = () => {};
init();
/*----------------------------- Event Listeners -----------------------------*/

keysElements.forEach((element) => {
  element.addEventListener("click", onKeyboardClicked);
});
