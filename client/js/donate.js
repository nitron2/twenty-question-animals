import { getAllDisasters, getDisasterImageBlob, getAllNeedsOfADisaster} from './fetch-disaster-data.js'
 
document.addEventListener('DOMContentLoaded', async function() {
    // Function to create cards in the cardContainer
    let disasters = await getAllDisasters()
    let disaster = disasters[0]

    let cityParagraph = document.getElementById('city')
    cityParagraph.textContent = disaster.city

    let typeParagraph = document.getElementById('type')
    typeParagraph.textContent = disaster.type

    let disasterImage = document.getElementById('disaster-image')
    let blob = await getDisasterImageBlob(disaster)
    const imageObjectURL = URL.createObjectURL(blob)
    const imageElement = document.createElement('img')
    imageElement.src = imageObjectURL
    disasterImage.src = imageObjectURL 

    let needs = await getAllNeedsOfADisaster(disaster)
    populateNeeds(needs)
})


function handleClick(evt) {
    // Update the databse each time, and pull back down numbers for everything
    var node = evt.target || evt.srcElement;
    if (node.name == 'edit') {
        node.value = "Modify";
    }
}

function populateNeeds(needs) {
    const table = document.getElementById('needs')
    const tableBody = table.tableBody
    if (needs.length === 0) {
        tableBody.innerHTML =  "<tr><td class = 'no-data' colspan='3'>No Needs</td><tr>"
        return
    }
    let tableHtml = ""; // Appearantly our aim is to concat strings.
    needs.forEach(function (need) {
        tableHtml += "<tr>"
        tableHtml += "<td class = 'need'>{need.name}}</td>"
        tableHtml += "<td class = 'quantity'> {need.quantity}/{need.max}</td>"
        tableHtml += "<td class = 'button-container'>"
        tableHtml += "<form name='f1' action='#' > <input id='edit1' type='submit' name='edit' value='1'></form>"
        tableHtml += "<form name='f1' action='#' > <input id='edit1' type='submit' name='edit' value='25'></form>"
        tableHtml += "<form name='f1' action='#' > <input id='edit1' type='submit' name='edit' value='50'></form>"
        tableHtml += "<form name='f1' action='#' > <input id='edit1' type='submit' name='edit' value='100'></form>"
        tableHtml += "</td>"
        tableHtml += "</tr>"


        //tableHtml += '<tr>';
        //tableHtml += '<td>${id}</td>';
        //tableHtml += '<td>${name}</td>';
        //tableHtml += '<td>${new Date(date_added).toLocaleString()}</td>';
        //tableHtml += '<td><button class="delete-row-button" data-id=&{id}>Delete</button></td>';
        //tableHtml += '<td><button class="edit-row-button" data-id=&{id}>Edit</button></td>';
    });
    table.innerHTML = tableHtml;
}

