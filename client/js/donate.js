
document.addEventListener('DOMContentLoaded', function() {
    // Function to create cards in the cardContainer
    function initializeBlankNeeds(containerId, numberOfCards) {
        var cardContainer = document.getElementById(containerId);

        for (var i = 1; i <= numberOfCards; i++) {
            var card = document.createElement('div');
            card.className = 'card';
            card.textContent = 'Card ' + i;
            cardContainer.appendChild(card);
        }
    }

    function handleClick(evt) {
        // Update the databse each time, and pull back down numbers for everything
        var node = evt.target || evt.srcElement;
        if (node.name == 'edit') {
          node.value = "Modify";
        }
      }

    

    function populateTable() {
        
    }



    // CITY -----------------------------------------------------
    let cityParagraph = document.getElementById('');
    cityParagraph.textContent = disaster.city;

    // TYPE ------------------------------------------------------
    let typeParagraph = document.getElementById('p');
    typeParagraph.textContent = disaster.type;


// STEP 5. This links the new DIV to the Card
    // Append the container div to the specificCard
    specificCard.appendChild(cardContainer);

    fetch(`http://127.0.0.1:5003/get-all-needs-of-a-disaster?disasterId=${encodeURIComponent(disaster.id)}`)
    .then(response => response.json()) // Parse the JSON from the response
    .then(data => {



        let needs = Object.values(data);
        needs = needs[0]
        for(const need of needs) {
            let needParagraph = document.createElement('p');
            needParagraph.textContent = need.name + ": " + need.quantity + "/" + need.max;
            cardContainer.appendChild(needParagraph);
        }
    })
    .catch(error => {
        console.error('Error fetching data: ', error); // Log any errors
    });
        
});



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


