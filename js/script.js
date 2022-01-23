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

let word = "magnolia";
const guessedLetterArray = [];
let guessesRemaining = 8;

const getWord = async function () {
    const res = await fetch("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
    const data = await res.text();
    const wordArray = word.split("\n");
    const randomWord = Math.floor(Math.random() * wordArray.length);
    word = wordArray[randomWord].trim();
    placeholder(word);
};

getWord();

const placeholder = function (word) {
    const placeholderLetters = [];
    for (const letter of word) {
        //console.log(letter);
        placeholderLetters.push("●");
    }
    wordInProgress.innerText = placeholderLetters.join("");
};

guessButton.addEventListener("click", function (e) {
    e.preventDefault();
    messages.innerText = "";
    const guess = textInput.value;
    const inputResult = validateInput(guess);
    
    if (inputResult) {
        makeGuess(guess);
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

const makeGuess = function (guess) {
    guess = guess.toUpperCase();
    if (guessedLetterArray.includes(guess)) {
        messages.innerText = "You have already guessed this letter. Try again";
    } else {
        guessedLetterArray.push(guess);
        console.log(guessedLetterArray);
        countGuesses(guess);
        displayLetters();
        updateWord(guessedLetterArray);
    }
};

const displayLetters = function () {
    guessedLetters.innerHTML = "";
    for (const letter of guessedLetterArray) {
        const li = document.createElement("li");
        li.innerText = letter;
        guessedLetters.append(li);
    }
};

const updateWord = function (guessedLetterArray) {
    const wordUpper = word.toUpperCase();
    const wordArray = wordUpper.split("");
    const revealLetter = [];
    for (const letter of wordArray) {
        if (guessedLetterArray.includes(letter)) {
            revealLetter.push(letter.toUpperCase());
        } else {
            revealLetter.push("●");
        }
    }
    wordInProgress.innerText = revealLetter.join("");
    successfulGuess();
};

const countGuesses = function (guess) {
    const uppercase = word.toUpperCase();
    if (!uppercase.includes(guess)) {
        messages.innerText = `The word doesn't contain ${guess}.`;
        guessesRemaining -= 1;
    } else {
        messages.innerText = `The letter ${guess} is in the word`;
    }

    if (remainingGuesses === 0) {
        messages.innerHTML = `The game is over. The word was <span class="highlight">${word}</span>.`;
    } else if (remainingGuesses === 1) {
        remainingGuessesSpan.innerText = `${guessesRemaining} guess`;
    } else {
        remainingGuessesSpan.innerText = `${guessesRemaining} guesses`;
    }
};

const successfulGuess = function () {
    if (word.toUpperCase() === wordInProgress.innerText) {
        messages.classList.add("win");
        messages.innerHTML = `<p class="highlight">You guessed the correct word! Congrats!</p>`;
    }
};
