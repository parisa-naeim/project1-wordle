/*-------------------------------- Constants --------------------------------*/

/*---------------------------- Variables (state) ----------------------------*/

let selectedWord;
let userGuesses;
let wrongGuesses;
let wrongLocGuesses;
let rightGuesses;
let currentWord;
/*------------------------ Cached Element References ------------------------*/

const keysElements = document.querySelectorAll(".keyboard-box");
const lettersElements = document.querySelectorAll(".box");

/*-------------------------------- Functions --------------------------------*/
const init = () => {
  selectedWord = "HOUSE";
  userGuesses = ["MOUSE", "FUNNY"];
  wrongGuesses = ["M"];
  wrongLocGuesses = ["Y"];
  rightGuesses = ["O", "H", "U"];
  currentWord = "GH";
  render();
};
const onKeyboardClicked = (event) => {
  console.log("er are in onKeyboardClick function " + event.target.innerHTML);
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
      if (rightGuesses.includes(word[i])) {
        lettersElements[letterIndex].classList.add("green");
      } else if (wrongLocGuesses.includes(word[i])) {
        lettersElements[letterIndex].classList.add("yellow");
      } else if (wrongGuesses.includes(word[i])) {
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
    if (rightGuesses.includes(element.innerHTML)) {
      element.classList.add("green");
    } else if (wrongLocGuesses.includes(element.innerHTML)) {
      element.classList.add("yellow");
    } else if (wrongGuesses.includes(element.innerHTML)) {
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
