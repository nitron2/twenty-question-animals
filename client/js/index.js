document.addEventListener('DOMContentLoaded', async function(){
    try {
        let index = 0

        const questions = await getAllQuestions()
        let answers = []

        const dnas = await getAllDNAs()
        const yes = document.getElementById("yes")
        const no = document.getElementById("no")
        const questionH3 = document.getElementById('question')

        let gameOver = false

        if (questions) {
            questionH3.innerText = questions[0].text
        }
        
        yes.addEventListener('click', function() {
            if(!gameOver) {
                answers[index] = 1
                advanceNextQuestion()
            } else {
                location.reload()
            }
        })
        
        no.addEventListener('click', function() {
            if(!gameOver) {
                answers[index] = 0
                advanceNextQuestion()
            } else {
                console.log("We need to add this animal into the db")
            }
        })
        
        function advanceNextQuestion() {
            index++;
            if (index == 20) {
                questionH3.innerText = ("Is your animal a " + (findMostSimilarAnimal(answers,dnas)) + "?")
                gameOver = true;
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

function findMostSimilarAnimal(targetArray, arrayOfArrays) {
    let maxSimilarity = 0;
    let mostSimilarAnimal = null;

    arrayOfArrays.forEach(candidateArray => {
        let similarityScore = 0;
        let i = 0;
        for (let key in candidateArray) {
            //console.log("key:" + key)
            if (key != "animal") {
                //console.log("candidateArray[key]:" + candidateArray[key])
                //console.log("targetArray[i]:" + targetArray[i])
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
