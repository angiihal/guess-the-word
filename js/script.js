//unordered list where the player's guessed letters will appear
const guessedLetters = document.querySelector(".guessed-letters");
//button with text "Guess!" in it
const guessButton = document.querySelector(".guess");
//text input where player will guess a letter
const textInput = document.querySelector(".letter");
//empty paragraph where word in progress will appear
const wordInProgress = document.querySelector(".word-in-progress");
//where the remainng guesses will display
const remainingGuesses = document.querySelector(".remaining");
//span inside paragraph where remaining guesses display
const remainingGuessesSpan = document.querySelector(".remaining span");
//message will appear when player guesses a letter
const messages = document.querySelector(".message");
//hidden button that will appear promting the player to play again
const playAgainButton = document.querySelector(".play-again");
//starting word
const word = "magnolia";

const placeholder = function (word) {
    const placeholderLetters = [];
    for (const letter of word) {
        console.log(letter);
        placeholderLetters.push("●");
    }
    wordInProgress.innerText = placeholderLetters.join("");
};

placeholder(word);

guessButton.addEventListener("click", function (e) {
    e.preventDefault();
    const value = textInput.value;
    console.log(value);
    textInput.value = "";
});