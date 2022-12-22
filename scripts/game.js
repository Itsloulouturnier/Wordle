class Game{
    constructor(wordArray){
        this.numberOfGuesses = 6;
        this.wordArray = wordArray;
        this.word = '';
        this.guess = '';
        this.guessesRemaining = this.numberOfGuesses;
        this.nextLetter = 0;
        this.guessedWord = [];
        this.newLine = false;
    }
    secretWord(){
        let secretWord = this.wordArray[Math.floor(Math.random() * this.wordArray.length)].toLowerCase().split('');
        this.word = secretWord;
    }

    keyboard(){
        document.addEventListener("keyup", (event) => {
            let pressedKey = event.key;
            if (pressedKey == "Backspace") {
                this.deleteLetter();
                console.log(this.guess);
            }
            if(this.nextLetter == 5 && pressedKey == 'Enter'){
                this.checkWord();
                console.log(this.guess)
            }     
        });
    }

    inputLetters(event){

        document.addEventListener("keyup", (event) => {
            if (this.nextLetter === 5) {
                return
            }
            let row = document.getElementsByClassName("letter-row")[6 - this.guessesRemaining]
            let box = row.children[this.nextLetter];
            
            let pressedKey = event.key;
            console.log({newLine: this.newLine})
            if(this.newLine) {
                this.guessedWord = [];
                this.newLine = false;
            }
            
            if(this.nextLetter <= 5 && pressedKey !== 'Enter' && pressedKey !== 'Backspace'){
                    this.nextLetter++
                    box.textContent = pressedKey
                    box.classList.add("addedLetters");
                    this.guessedWord.push(pressedKey);
                    this.guess = this.guessedWord;
             } 
        }); 
    };

    
    deleteLetter(){
        
        let row = document.getElementsByClassName("letter-row")[6 - this.guessesRemaining]
        let box = row.children[this.nextLetter - 1]
        box.textContent = ""
        box.classList.remove('addedLetters');
        this.guess.pop();
        this.nextLetter--;
    }


    
    checkWord(){

        let row = document.getElementsByClassName("letter-row")[6 - this.guessesRemaining]
        let guessString = ''
        let rightGuess = this.word;
    
        for (const val of this.guess) {
            guessString += val
        }
        
        for (let i = 0; i < 5; i++) {
            let letterColor = ''
            let box = row.children[i]
            let letter = this.guess[i]
            
            let letterPosition = rightGuess.indexOf(this.guess[i])

            console.log({row, guessString, rightGuess, letterColor, box, letter, letterPosition, guess: this.guess});
            if (letterPosition === -1) {
                letterColor = 'grey'
            } else {
               
                if (letter === rightGuess[i]) {
                    letterColor = 'green'
                } else {
                    letterColor = 'yellow'
                }

            }
    
            let delay = 10 * i
            setTimeout(()=> {
                box.style.backgroundColor = letterColor
                
            }, delay)
        }

        console.log({guessString, rightGuess})

    
        if (guessString === rightGuess.join('')) {
            setTimeout(() => alert("You Win!"), 100)            
            this.guessesRemaining = 0
            return
        } else {
            this.guessesRemaining -= 1;
            this.newLine = true;
            this.guess = [];
            this.nextLetter = 0;
    
            if (this.guessesRemaining === 0) {
                alert("You lose!")
                alert(`The secret word was: "${this.word.join('')}"`)
            }
        }   
    }
    
}

const game2 = new Game(wordsArray);



game2.secretWord();
game2.keyboard();
game2.inputLetters();

