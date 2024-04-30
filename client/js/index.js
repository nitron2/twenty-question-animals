const GAME_STATES = {
    PLAYING: 'PLAYING',
    GUESSED: 'GUESSED',
    PLAYER_WIN: 'PLAYER_WIN',
    PLAYER_LOSE: 'PLAYER_LOSE'
  };

/**
 * Simple game logic. Does not need to be abstracted very much
 */
  
document.addEventListener('DOMContentLoaded', async function(){
    try {
        let currentGameState = GAME_STATES.PLAYING
        let index = 0

        const questions = await getAllQuestions()
        let answers = []

        const dnas = await getAllDNAs()
        const yes = document.getElementById("yes")
        const no = document.getElementById("no")
        const questionH3 = document.getElementById('question')
        const animalSubmission = document.getElementById('animal-submission')

        animalSubmission.style.display = "none"

        if (questions) {
            questionH3.innerText = questions[0].text
        }

        /**
         * Should probably be refactored to follow DRY
         */
        
        yes.addEventListener('click', async function() {
            switch(currentGameState) {
                case GAME_STATES.PLAYING:
                    answers[index] = 1
                    advanceNextQuestion()
                    break
                case GAME_STATES.GUESSED: // Player: Bah! You beat me! How frustrating.
                    currentGameState = GAME_STATES.PLAYER_LOSE
                    location.reload()
                    break
                case GAME_STATES.PLAYER_WIN:
                    await addAnimal(animalSubmission.value, answers)
                    location.reload()
                    break
            }
        })

        /**
         * Should probably be refactored to follow DRY
         */
        
        no.addEventListener('click', function() {
            switch(currentGameState) {
                case GAME_STATES.PLAYING:
                    answers[index] = 0
                    advanceNextQuestion()
                    break
                case GAME_STATES.GUESSED: //Player: NO! you got my animal wrong
                    currentGameState = GAME_STATES.PLAYER_WIN
                    animalSubmission.style.display = "block"
                    questionH3.innerText = "Type the name of the animal you were thinking of. Would you like us to add it?"
                    break
                case GAME_STATES.PLAYER_WIN: // Okay, this is not your animal....
                    location.reload()
                    break
            }
        })
        
        function advanceNextQuestion() {
            index++;
            if (index == 20) {
                questionH3.innerText = ("Is your animal a " + (findMostSimilarAnimal(answers,dnas)) + "?")
                currentGameState = GAME_STATES.GUESSED
                return
            }
            let question = questions[index]
            questionH3.innerText = question.text
        }
        
    } catch (error) {
        console.error('Error fetching data: ', error); // Log any errors
        return undefined; // Return an empty array or appropriate value in case of an error
    }
})

/**
 * Uses Hamming distance similarity score to determine closest animal "DNA".
 * Not impressed with the time complexity of this aglorithm, however.
 * 
 * @param {Array} targetArray 
 * @param {Array} arrayOfArrays 
 * @returns 
 */

function findMostSimilarAnimal(targetArray, arrayOfArrays) {
    let maxSimilarity = 0;
    let mostSimilarAnimal = null;

    arrayOfArrays.forEach(candidateArray => {
        let similarityScore = 0;
        let i = 0;
        for (let key in candidateArray) {
            if (key != "animal") {
                if (candidateArray[key] == targetArray[i]) {
                    similarityScore++;
                }
                i++
            }
            
        }

        if (similarityScore > maxSimilarity) {
            maxSimilarity = similarityScore;
            mostSimilarAnimal = candidateArray.animal;
        }
    });

    return mostSimilarAnimal;
}

/**
 * Communicate with the server to pull questions and dnas and to add animals as well.
 */

async function getAllQuestions() {
    const response = await fetch('http://127.0.0.1:5003/get-all-questions')
    const data = await response.json() // Parse the JSON from the response
    return Object.values(data)[0] // Assuming the structure needs this
}

async function getAllDNAs() {
    const response = await fetch('http://127.0.0.1:5003/get-all-dnas')
    const data = await response.json() // Parse the JSON from the response
    return Object.values(data)[0] // Assuming the structure needs this
}

async function addAnimal(animal, dna) {
    fetch("http://127.0.0.1:5003/add-animal", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'animal' : animal,
            'dna' : dna
        })    
    })
    .then(response => {
        console.log('Raw response:', response);
        return response.json()
    })
    .catch((error) => console.log('Error:', error))
}