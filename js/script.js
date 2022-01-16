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

const word = "magnolia";
const guessedLetterArray = [];

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
    messages.innerText = "";
    const letter = textInput.value;
    const inputResult = validateInput(letter);
    
    if (inputResult) {
        makeGuess(letter);
    }
    textInput.value = "";
});

const validateInput = function (input) {
    const acceptedLetter = /[a-zA-Z]/;

    if (input.length === 0) {
        messages.innterText = "Please enter a letter";
    } else if (input.length > 1) {
        messages.innerText = "Please enter only one letter at a time"
    } else if (!input.match(acceptedLetter)) {
        messages.innerText = "Please enter a letter from A to Z"
    } else {
        return input;
    }
};

const makeGuess = function (letter) {
    letter = letter.toUpperCase();
    if (guessedLetterArray.includes(letter)) {
        messages.innerText = "You have already guessed this letter. Try again";
    } else {
        guessedLetterArray.push(letter);
        console.log(guessedLetterArray);
        displayLetters();
        updateWord(guessedLetterArray);
    }
};

const displayLetters = function () {
    guessedLetters.innerHTML = "";
    for (const letters of guessedLetterArray) {
        const li = document.createElement("li");
        li.innerText = letters;
        guessedLetters.append(li);
    }
};

const updateWord = function (guessedLetterArray) {
    const wordUpper = word.toUpperCase();
    const wordArray = wordUpper.split("");
    const revealLetter = [];
    for (const letters of wordArray) {
        if (guessedLetterArray.includes(letters)) {
            revealLetter.push(letters.toUpperCase());
        } else {
            revealLetter.push("●");
        }
    }
    wordInProgress.innerText = revealLetter.join("");
    successfulGuess();
};

const successfulGuess = function () {
    if (word.toUpperCase() === wordInProgress.innerText) {
        messages.classList.add("win");
        messages.innerHTML = `<p class="highlight">You guessed the correct word! Congrats!</p>`;
    }
};
