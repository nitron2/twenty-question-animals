
document.addEventListener('DOMContentLoaded', function() {
    const fileInput = document.getElementById('fileInput');
    const table = document.getElementById('table');
    let rowCount = 1;

    fileInput.addEventListener('change', function() {
        uploadedFileName = fileInput.files[0].name;
    });

    function addNewRowIfNeeded() {
        const lastRow = table.querySelector('tr:last-child');
        const inputs = lastRow.querySelectorAll('input');
        const allFilled = Array.from(inputs).every(input => input.value !== '');
        
        if (allFilled) {
            rowCount++;
            const newRow = table.insertRow(-1);
            const newCell1 = newRow.insertCell(0);
            const newCell2 = newRow.insertCell(1);

            newCell1.innerHTML = `<input type="text" id="need${rowCount}-name" required>`;
            newCell2.innerHTML = `<input type="text" id="need${rowCount}-quantity" required>`;
        }
    }

    table.addEventListener('input', function(event) {
        if (event.target.tagName === 'INPUT') {
            addNewRowIfNeeded();
        }
    });
});

function submitCreateDisasterForm(event) {
    event.preventDefault(); // Prevent the form from submitting the traditional way
    const imageUploadStatusDiv = document.getElementById('imageUploadStatus');

    if (uploadedFileName) {
        const formData = new FormData(document.getElementById('createDisasterForm'));
        fetch('http://127.0.0.1:5003/upload-disaster-image', {
            method: 'POST',
            body: formData,
        })
        .then(response => response.text())
        .then(text => {
            imageUploadStatusDiv.innerHTML = text; // Display success message or failure
        })
        .catch(error => {
            console.error('Error:', error);
            imageUploadStatusDiv.innerHTML = 'Error uploading file.';
        });
    }

    fetch("http://127.0.0.1:5003/create-disaster", {
        headers: {
            'Content-type' : 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({
            type: document.getElementById('type').value,
            city: document.getElementById('city').value,
            picture: uploadedFileName
        })
    })
    .then(response => response.json())
    .catch(error => console.log('Error during disaster creation:', error));
}

function submitCreateDisasterForm(event) {
    event.preventDefault(); // Prevent the form from submitting traditionally
    const imageUploadStatusDiv = document.getElementById('imageUploadStatus');

    // Upload file first if a file was selected
    if (uploadedFileName) {
        const formData = new FormData(document.getElementById('createDisasterForm'));
        fetch('http://127.0.0.1:5003/upload-disaster-image', {
            method: 'POST',
            body: formData,
        })
        .then(response => {
            if (response.ok) {
                return response.text(); // Return the text if the response is OK
            } else {
                throw new Error('Failed to upload file.');
            }
        })
        .then(text => {
            imageUploadStatusDiv.innerHTML = text; // Display success message
            submitDisasterDetails(); // Submit other details after image upload
        })
        .catch(error => {
            console.error('Error:', error);
            imageUploadStatusDiv.innerHTML = error.message;
        });
    } else {
        submitDisasterDetails(); // No file to upload, directly submit other details
    }
}

// Function to submit disaster details
function submitDisasterDetails() {
    fetch("http://127.0.0.1:5003/create-disaster", {
        headers: {
            'Content-type' : 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({
            type: document.getElementById('type').value,
            city: document.getElementById('city').value,
            picture: uploadedFileName
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
    })
    .catch(error => console.error('Error during disaster creation:', error));
}
