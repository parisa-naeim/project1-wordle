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
  selectedWord = "house";
  userGuesses = ["mouse", "funny"];
  wrongGuesses = [];
  wrongLocGuesses = [];
  rightGuesses = [];
  currentWord = "";
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
      lettersElements[letterIndex++].innerHTML = word[i];
    }
  });
};
const updateKeyboard = () => {};
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
