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
    let blob = await getDisasterImageBlob(disaster.picture)
    const imageObjectURL = URL.createObjectURL(blob)
    const imageElement = document.createElement('img')
    imageElement.src = imageObjectURL
    disasterImage.src = imageObjectURL 
})


function handleClick(evt) {
    // Update the databse each time, and pull back down numbers for everything
    var node = evt.target || evt.srcElement;
    if (node.name == 'edit') {
        node.value = "Modify";
    }
}

function loadHTMLTable(data) {
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

