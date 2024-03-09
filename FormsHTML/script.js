function createListItem() {
    var numberOfItems = 5;

    // Get the <ul> element by its ID
    var myList = document.getElementById("vList");

    // Clear existing items in the list
    myList.innerHTML = "";

    // Create and append <li> elements to the <ul>
    for (var i = 1; i <= numberOfItems; i++) {
        var listItem = document.createElement("li");
        listItem.textContent = "Item " + i;
        myList.appendChild(listItem);
    }
    createListItem();
}

function showNextForm(currentList, formNum) {
    var i;

    // Hide forms starting from formNum
    for (i = formNum; i <= 10; i++) {
        document.getElementById("form" + i).style.display = 'none';
    }

    // Reset i for the next loop
    i = 1;

    // Show forms based on the currentList
    while (currentList < 10 && i <= 10) {
        if (currentList > (i - 1)) {
            document.getElementById("form" + i).style.display = 'block';
        }
        i++;
    }
}


function showNextFormTest(a,b){

    document.getElementById("form" + a + b).style.display = 'block';
}
