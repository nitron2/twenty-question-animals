// script.js

document.addEventListener('DOMContentLoaded', function() {
    // Function to create cards in the cardContainer
    function createCards(containerId, numberOfCards) {
        var cardContainer = document.getElementById(containerId);

        for (var i = 1; i <= numberOfCards; i++) {
            var card = document.createElement('div');
            card.className = 'card';
            card.textContent = 'Card ' + i;
            cardContainer.appendChild(card);
        }
    }



    // This is a test line, later it will be replaced by the database
    // TODO: When Images are added, they will automatically renamed Image1.JPEG, Image2.JPEG... ImageX.JPG... ImageX+1.JPG
    // X will be chosen based off of the length of the list, so it'll be X+1
    var myImageListTEST = ['image11.jpeg', 'image12.jpeg', 'image13.jpeg', 'image14.jpeg','image21.jpeg'];
    var myDescriptionListTEST = 
    [ 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis commodo odio aenean sed adipiscing diam donec'
    , 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis commodo odio aenean sed adipiscing diam donec.'
    , 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis commodo odio aenean sed adipiscing diam donec.'
    , 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis commodo odio aenean sed adipiscing diam donec.'
    , 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis commodo odio aenean sed adipiscing diam donec.'];
    var myItemListTEST = ['Pizza', 'Burger', 'Sushi', 'Pasta', 'Ice Cream'];

    // Call createCards function for the first time
    createCards('cardContainer', myImageListTEST.length);

    


    // loop to go through all cards
    for (var i = 0; i <=myImageListTEST.length; i++) { 
        var specificCard = document.getElementById('cardContainer').querySelector(`.card:nth-child(${i+1})`);
        
        
        if (specificCard) {

        // STEP 1. Create a container div
            var containerDiv = document.createElement('div');
            containerDiv.className = 'card-container';

        // STEP 2. Create the elements
            // Create an img element
            var imageElement = document.createElement('img');
            // Create Descrption Paragraph Element
            var descriptionParagraph = document.createElement('p');
            // Create Item Paragraph Element
            var itemParagraph = document.createElement('p');


        // STEP 3. Link the elements to their Data
            // info for img to put in Card
            imageElement.src = 'imgTest/' + myImageListTEST[i];
            // info for data to put in Description Paragraph

            // to add a span to make just description Bold you need to create a span element
            // then later you need to append them together.
            descriptionParagraph.textContent = 'Description: ' + myDescriptionListTEST[i];



            // info for data to put in Items Paragraph
                // this now inputs 3 of the items from my item list to the card
                // so we can see what 
            for (let index = 0; index < myItemListTEST.length; index++) {
                // TODO: add ranNum generator which chooses a few key items from list to display
                // learned about slice its pretty neat
                itemParagraph.textContent = 'Items: ' + myItemListTEST.slice(0).join(', ');
            }
    
        // STEP 4. attach the elements to the div they belong in
            // Append the image and description to the container div
            containerDiv.appendChild(imageElement);
            containerDiv.appendChild(descriptionParagraph);
            containerDiv.appendChild(itemParagraph);
        
        // STEP 5. This links the new DIV to the Card
            // Append the container div to the specificCard
            specificCard.appendChild(containerDiv);
        }
    }
    // Add more scripts or call createCards again as needed...
});
