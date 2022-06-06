let li = 6;
let underline = "__";

function checkWord() {
   document.getElementById("btn").disabled = true;
   let inpWord = document.getElementById('wordInp').value.trim();
   let upperCaseWord = inpWord.toUpperCase();
   upperCaseWord = upperCaseWord.replace(/\s+/g, '');
   let letters = /^[a-zA-Z]+$/.test(upperCaseWord);
   if (inpWord == "") {
      alertMessage.innerHTML = "Enter a word please!";
   } else if (upperCaseWord.length < 3) {
      alertMessage.innerHTML = "Enter a word of at least 3 letters!";
   } else if (upperCaseWord.length > 22) {
      alertMessage.innerHTML = "Enter a word of up to 22 letters!";
   } else if (letters) {
      generateHiddenWord(upperCaseWord);
   } else {
      alertMessage.innerHTML = "Enter a word that does not contain numbers or symbols!";
   }
}

function generateHiddenWord(upperCaseWord) {
   const hiddenWord = [];
   let wordLength = upperCaseWord.length;
   hiddenWord[0] = upperCaseWord[0];
   for (let i = 1; i < wordLength - 1; ++i) {
      if (upperCaseWord[i] === upperCaseWord[0]) {
         hiddenWord[i] = upperCaseWord[0];
      } else if (upperCaseWord[i] === upperCaseWord[wordLength - 1]) {
         hiddenWord[i] = upperCaseWord[wordLength - 1];
      } else {
         hiddenWord[i] = underline;
      }
   }
   hiddenWord[wordLength - 1] = upperCaseWord[wordLength - 1];
   wordGs.innerHTML = hiddenWord.join(' ');
   lifes.innerHTML = li;
   generateButtons(upperCaseWord, hiddenWord);
}

function generateButtons(upperCaseWord, hiddenWord) {
   let leng = hiddenWord.length - 1;
   let gameWon = false;
   let wrongLetters = 0;
   const drawingPiece = document.getElementsByClassName('elements');
   const keyboard = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Z', 'X', 'C', 'V', 'B', 'N', 'M'];
   for (let i = 0; i < keyboard.length; ++i) {
      let createButton = document.createElement("button");
      createButton.innerHTML = keyboard[i];
      createButton.setAttribute("id", keyboard[i]);
      createButton.setAttribute("class", "butt");
      addBtn.appendChild(createButton);
      let findLetter = false;
      createButton.onclick = function chosenLetter() {
         document.getElementById(keyboard[i]).disabled = true;
         for (let j = 1; j <= leng; ++j) {
            if (keyboard[i] === upperCaseWord[j]) {
               hiddenWord[j] = keyboard[i];
               wordGs.innerHTML = hiddenWord.join(' ');
               findLetter = true;
            }
         }
         if (findLetter === false) {
            --li;
            lifes.innerHTML = li;
            drawingPiece[wrongLetters].style.display = 'block';
            ++wrongLetters;
         }
         if (hiddenWord.includes(underline)) {
            gameWon = false;
         } else {
            gameWon = true;
         }
         gameStatus(gameWon, drawingPiece, keyboard);
      }
   }
}

function gameStatus(gameWon, drawingPiece, keyboard) {
   if (li == 0) {
      alertMessage.innerHTML = "You lost!";
   } else if (gameWon) {
      alertMessage.innerHTML = "You win!";
   }
   if (gameWon || li == 0) {
      for (let i = 0; i <= 25; ++i) {
         document.getElementById(keyboard[i]).disabled = true;
      }
   }
}