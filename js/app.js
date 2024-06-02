/*-------------------------------- Constants --------------------------------*/

/*---------------------------- Variables (state) ----------------------------*/

let selectedWord;
let userGuesses;
let wrongGuesses;
let wrongLocGuesses;
let rightGuesses;
/*------------------------ Cached Element References ------------------------*/

const keysElements = document.querySelectorAll(".keyboard-box");
const lettersElements = document.querySelectorAll(".box");

/*-------------------------------- Functions --------------------------------*/
const init = () => {
  selectedWord = "house";
  userGuesses = [];
  wrongGuesses = [];
  wrongLocGuesses = [];
  rightGuesses = [];
};
const onKeyboardClicked = (event) => {
  console.log("er are in onKeyboardClick function " + event.target.innerHTML);
};
/*----------------------------- Event Listeners -----------------------------*/

keysElements.forEach((element) => {
  element.addEventListener("click", onKeyboardClicked);
});
