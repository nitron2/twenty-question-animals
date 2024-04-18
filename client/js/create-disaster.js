document.addEventListener('DOMContentLoaded', function() {
    const needs = document.getElementById('needs');
    let rowCount = 1;

    document.getElementById('createDisasterForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const formData = new FormData(this);


        const city = document.getElementById('city').value
        const type = document.getElementById('type').value
        console.log('city:' + city)
        formData.append('city', city)
        formData.append('type', type)
    
        const tableData = [];
        const rows = document.querySelectorAll('#needs tr');
        rows.forEach(row => {
            const inputs = row.querySelectorAll('input');
            const rowData = [];
            inputs.forEach(input => {
                // Push the value of the input, or an empty string if the input is null
                rowData.push(input.value || '');
            });
            tableData.push(rowData);
        });
  
        formData.append('tableData', JSON.stringify(tableData)); // Add table data as a string
        
        console.log("FormData:" + formData);
        fetch('http://127.0.0.1:5003/create-disaster', {
            method: 'POST',
            body: formData
        })
        .then(response => response.text())
        .then(data => {
            alert('Everything uploaded successfully!');
        })
        .catch((error) => {
            console.error('Error:', error);
            alert('Error uploading data');
        });
    });

    needs.addEventListener('input', function(event) {
        if (event.target.tagName === 'INPUT') {
            addNewRowIfNeeded();
        }
    });

    function addNewRowIfNeeded() {
        const lastRow = needs.querySelector('tr:last-child');
        const inputs = lastRow.querySelectorAll('input');
        const allFilled = Array.from(inputs).every(input => input.value !== '');
        
        if (allFilled) {
            rowCount++;
            const newRow = needs.insertRow(-1);
            const newCell1 = newRow.insertCell(0);
            const newCell2 = newRow.insertCell(1);
    
            newCell1.innerHTML = `<input type="text" id="need${rowCount}-name">`;
            newCell2.innerHTML = `<input type="text" id="need${rowCount}-quantity">`;
        }
    }

});


  