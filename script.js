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

    // Call createCards function for the first time
    createCards('cardContainer', myImageListTEST.length);

    


    
    for (var i = 0; i <=4; i++) {
        var specificCard = document.getElementById('cardContainer').querySelector(`.card:nth-child(${i+1})`);
        if (specificCard) {
            // Create an img element
            var imageElement = document.createElement('img');
    
            // Set the src attribute to the URL of the image
            imageElement.src = 'imgTest/' + myImageListTEST[i];
    
            // Append the image element to the specificCard
            specificCard.appendChild(imageElement);
        }
    }
    // Add more scripts or call createCards again as needed...
});
