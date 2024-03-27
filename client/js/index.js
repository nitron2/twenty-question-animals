import { getAllDisasters, getAllNeedsOfADisaster, getDisasterImageBlob } from './fetch-disaster-data.js'

document.addEventListener('DOMContentLoaded', async function() {
    const disasters = await getAllDisasters();
    if (disasters) {
        initializeBlankCards('cardContainer', disasters.length)
        populateBlankDisastersCards(disasters)
    }
})
    
function initializeBlankCards(containerId, numberOfCards) {
    var cardContainer = document.getElementById(containerId);
    for (var i = 1; i <= numberOfCards; i++) {
        var card = document.createElement('div');
        card.className = 'card';
        card.textContent = 'Card ' + i; //?
        cardContainer.appendChild(card);
    }
}

async function populateBlankDisastersCards(disasters) {
    for (let i = 0; i <= disasters.length; i++) { 
        let disaster = disasters[i]
        let card = document.getElementById('cardContainer').querySelector(`.card:nth-child(${i+1})`);
        if (card) {
            let cardContainer = document.createElement('div');
            cardContainer.className = 'card-container';
            addHeaderToCard(cardContainer, disaster.city)
            addHeaderToCard(cardContainer, disaster.type)
            await addImageToCard(cardContainer, disaster.picture)
            await addNeedsToCard(cardContainer, disaster.id)
            addButtonsToCard(cardContainer)
            card.appendChild(cardContainer);
        }
    }
}

function addHeaderToCard(cardContainer, text) {
    let paragraph = document.createElement('p');
    paragraph.textContent = text;
    cardContainer.appendChild(paragraph);
}

async function addImageToCard(cardContainer, pictureName) {
    let blob = await getDisasterImageBlob(pictureName)
    const imageObjectURL = URL.createObjectURL(blob)
    const imageElement = document.createElement('img')
    imageElement.src = imageObjectURL
    cardContainer.appendChild(imageElement)
}

async function addNeedsToCard(cardContainer,disasterId) {
    let needs = await getAllNeedsOfADisaster(disasterId)
    if (needs) {
        for(const need of needs) {
            let needParagraph = document.createElement('p');
            needParagraph.textContent = need.name + ": " + need.quantity + "/" + need.max;
            cardContainer.appendChild(needParagraph);
        }
    }
}

function addButtonsToCard(cardContainer) {
    let donate = document.createElement('button');
    donate.textContent = "Donate";
    cardContainer.appendChild(donate);

    let volunteer = document.createElement('button');
    volunteer.textContent = "Volunteer";
    cardContainer.appendChild(volunteer);

    let deliver = document.createElement('button');
    deliver.textContent = "Deliver";
    cardContainer.appendChild(deliver);
}