// script.js

document.addEventListener('DOMContentLoaded', function() {
    // Function to create cards in the cardContainer
    function initializeBlankCards(containerId, numberOfCards) {
        var cardContainer = document.getElementById(containerId);

        for (var i = 1; i <= numberOfCards; i++) {
            var card = document.createElement('div');
            card.className = 'card';
            card.textContent = 'Card ' + i;
            cardContainer.appendChild(card);
        }
    }

    fetch('http://127.0.0.1:5003/get-all-disasters')
    .then(response => response.json()) // Parse the JSON from the response
    .then(data => {
        let disasters = Object.values(data);
        disasters = disasters[0]
        initializeBlankCards('cardContainer', disasters.length)
            // loop to go through all cards
        for (let i = 0; i <= disasters.length; i++) { 
            let disaster = disasters[i]
            let specificCard = document.getElementById('cardContainer').querySelector(`.card:nth-child(${i+1})`);
            if (specificCard) {

            // STßEP 1. Create a card container div
                let containerDiv = document.createElement('div');
                containerDiv.className = 'card-container';

            // STEP 2. Create the elements

                // Create an Span element
                let spanElement = document.createElement('span');
                
                // IMAGE ---------------------------------------------------
                let imageName = disaster.picture
                // info for img to put in Card
                fetch(`http://127.0.0.1:5003/get-disaster-image?imageName=${encodeURIComponent(imageName)}`)
                .then(response => response.blob())
                .then(imageBlob => {
                    const imageObjectURL = URL.createObjectURL(imageBlob);
                    const imageElement = document.createElement('img');
                    imageElement.src = imageObjectURL;
                    document.body.appendChild(imageElement);
                    containerDiv.appendChild(imageElement);
                })
                .catch(error => {
                    console.error('Error fetching image:', error);
                });

                // CITY -----------------------------------------------------
                let cityParagraph = document.createElement('p');
                cityParagraph.textContent = disaster.city;
                containerDiv.appendChild(cityParagraph);

                // TYPE ------------------------------------------------------
                let typeParagraph = document.createElement('p');
                typeParagraph.textContent = disaster.type;
                containerDiv.appendChild(typeParagraph);
                // Create Descrption Paragraph Element
                //var descriptionParagraph = document.createElement('p');
                // Create Item Paragraph Element
                //var itemParagraph = document.createElement('p');

            // STEP 3.5 Give element a class if it needs it
                // no worky: spanElement.classList.add('descriptionSpan', 'itemSpan');
                // no worky: spanElement.className = 'first-word';

            // STEP 3. Link the elements to their Data

            //SPAN NO WORKY
                //spanElement.textContent = 'Description: ';
                // no worky: descriptionSpan.textContent = 'Description: ';
                // no worky: itemSpan.textContent = 'Items: ';

            //IMG



                // info for data to put in Description Paragraph

            //DESCRIPTION
                // to add a span to make just description Bold you need to create a span element
                // then later you need to append them together.
                
                // no worky: descriptionParagraph.appendChild(descriptionSpan);
                // no worky: descriptionParagraph.appendChild(document.createTextNode(myDescriptionListTEST[i]));

                // descriptionParagraph.textContent = 'Description: ' + myDescriptionListTEST[i];


            //ITEMS
                // info for data to put in Items Paragraph
                    // this now inputs 3 of the items from my item list to the card
                    // so we can see what 
                //for (let index = 0; index < disasters.length; index++) {
                    // TODO: add ranNum generator which chooses a few key items from list to display
                    // learned about slice its pretty neat
                //    itemParagraph.textContent = 'Items: ' + myItemListTEST.slice(0).join(', ');
                
                //}
        
            // STEP 4. attach the elements to the div they belong in
                // Append the image and description to the container div
                

            // STEP 5. This links the new DIV to the Card
                // Append the container div to the specificCard
                specificCard.appendChild(containerDiv);
            }
        }
    })
    .catch(error => {
        console.error('Error fetching data: ', error); // Log any errors
    });


    // This is a test line, later it will be replaced by the database
    // TODO: When Images are added, they will automatically renamed Image1.JPEG, Image2.JPEG... ImageX.JPG... ImageX+1.JPG
    // X will be chosen based off of the length of the list, so it'll be X+1
    //var myImageListTEST = ['image11.jpeg', 'image12.jpeg', 'image13.jpeg', 'image14.jpeg','image21.jpeg'];
    //var myDescriptionListTEST = 
    //[ 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis commodo odio aenean sed adipiscing diam donec'
    //, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis commodo odio aenean sed adipiscing diam donec.'
    //, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis commodo odio aenean sed adipiscing diam donec.'
    //, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis commodo odio aenean sed adipiscing diam donec.'
    //, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis commodo odio aenean sed adipiscing diam donec.'];
    //var myItemListTEST = ['Pizza', 'Burger', 'Sushi', 'Pasta', 'Ice Cream'];



    // Add more scripts or call createCards again as needed...
    function PopUp(containerId){
        var cardContainer = document.getElementById(containerId);
        cardContainer.addEventListener('click', function(){
            console.log('card clicked');
        })
    };


    const addNameButton = document.getElementById("add-name-button")

addNameButton.onclick = function() {
    const nameInputField = document.getElementById("name-input")
    const nameStr = nameInputField.value
    console.log(nameStr)
    nameInputField.value = " "

    fetch("http://127.0.0.1:5002/insert", {
        headers: {
            'Content-type' : 'application/json'// What even are naming conventions?!
        },
        method: 'POST',
        body: JSON.stringify({name: nameStr})
    }) // These are routes, I am told.
    .then(response => response.json())
    .then(data => insertRowsIntoTable(data['data']))
    .catch(error => console.log(error)); //Handle errors in the backend
    console.log
}

const refreshButton = document.getElementById("refresh-button")
refreshButton.onclick = function() {
    fetch('http://127.0.0.1:5002/getAll')
    .then(response => response.json()) 
    .then(data => loadHTMLTable(data['data']));
}

function insertRowsIntoTable(data) {
    
}

function loadHTMLTable(data) {
    console.log('hi!')
    const tableBody = document.querySelector('table tbody')
    if (data.length === 0) {
        tableBody.innerHTML =  "<tr><td class = 'no-data' colspan='5'>No Data</td><tr>"
        return
    }
    let tableHtml = ""; // Appearantly our aim is to concat strings.
    data.forEach(function ({id, name, date_added}) {
        tableHtml += '<tr>';
        tableHtml += '<td>${id}</td>';
        tableHtml += '<td>${name}</td>';
        tableHtml += '<td>${new Date(date_added).toLocaleString()}</td>';
        tableHtml += '<td><button class="delete-row-button" data-id=&{id}>Delete</button></td>';
        tableHtml += '<td><button class="edit-row-button" data-id=&{id}>Edit</button></td>';
    });

    table.innerHTML = tableHtml;
}

});


