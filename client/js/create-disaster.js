let uploadedFileName
let disasterId

document.addEventListener('DOMContentLoaded', function() {
    //const fileInput = document.getElementById('fileInput');

    //fileInput.addEventListener('change', function() {
    //    uploadedFileName = fileInput.files[0].name
    //})
})

function sumbitCreateDisasterForm(event) { //(event)
    const imageUploadStatusDiv = document.getElementById('imageUploadStatus');

    //event.preventDefault(); // Prevent the form from submitting the traditional way

    if (uploadedFileName) {
        const formData = new FormData(document.getElementById('createDisasterForm')); // Use the form's data
        fetch('http://127.0.0.1:5003/upload-disaster-image', {
            method: 'POST',
            body: formData, // Send the form data to the server
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            // Displaying the response message from the server
            const message = data.message;
            
            // Check if the upload was successful and fileInfo is available
            if (data.success && data.fileInfo && data.fileInfo.uploadedName) {
                uploadedFileName = data.fileInfo.uploadedName
                .then(response => response.json())
                .catch(error => console.log(error)); //Handle errors in the backend
                // Now you can use uploadedFileName as needed
                // For example, display it along with the message
                document.getElementById('uploadResponse').innerHTML = `${message}<br>Uploaded File Name: ${uploadedFileName}`;
            } else {
            
                // Handle the case where the file was not uploaded successfully or fileInfo is missing
                document.getElementById('uploadResponse').textContent = message;
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }

    fetch("http://127.0.0.1:5003/create-disaster", {
        headers: {
            'Content-type' : 'application/json'// What even are naming conventions?!
        },
        method: 'POST',
        body: JSON.stringify({
            type: document.getElementById('type').value,
            city: document.getElementById('city').value,
            picture: uploadedFileName
        })
    }) // These are routes, I am told.
    // now
};

function showNextFormTest(a, b) {
    for (var i = 1; i <= 10; i++) { // Assuming you have 10 forms, adjust if needed
        var formID = document.getElementById("form" + a + i);

        if (formID) {
            formID.style.display = i === b ? "block" : "none";
        }
    }
}

function resetPage() {
    // Reload the current page
    location.reload();
}

function createListItem(selectedRadioBtn) {
    var numberOfItems = 5;

    // Get the <ul> element by its ID
    var myList = document.getElementById("vList" + selectedRadioBtn.charAt(selectedRadioBtn.length - 1));


    // Clear existing items in the list
    myList.innerHTML = "";

    // Create and append <li> elements to the <ul>
    for (var i = 1; i <= numberOfItems; i++) {
        var listItem = document.createElement("li");
        listItem.textContent = "Item " + i + " - " + selectedRadioBtn;
        myList.appendChild(listItem);
    }
}

// Event listener for radio buttons
document.querySelectorAll('input[name="optionsBttn"]').forEach(function(radioBtn) {
    radioBtn.addEventListener("change", function() {
        // Your code here when the radio button state changes
        createListItem(this.id);
    });
});