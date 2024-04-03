// According to this Medium article: 
//https://medium.com/swlh/restful-api-design-get-post-put-patch-delete-a-walkthrough-with-javascripts-fetch-api-e37a8416e2a0
// the GET method is the only one that does not require
// header and body specifications, but I don't do this at all in my non GET
// methods. Research this further.

export async function getAllDisasters() {
    try {
        const response = await fetch('http://127.0.0.1:5003/get-all-disasters');
        const data = await response.json(); // Parse the JSON from the response
        let disasters = Object.values(data)[0]; // Assuming the structure needs this
        return disasters;
    } catch (error) {
        console.error('Error fetching data: ', error); // Log any errors
        return undefined; // Return an empty array or appropriate value in case of an error
    }
}

export async function getDisasterImageBlob(disaster) {
    try {
        const response = await fetch(`http://127.0.0.1:5003/get-disaster-image?imageName=${encodeURIComponent(disaster.picture)}`);
        const blob = await response.blob(); // Parse the JSON from the response
        return blob;
    } catch (error) {
        console.error('Error fetching data: ', error); // Log any errors
        return undefined; // Return an empty array or appropriate value in case of an error
    }
}

export async function getAllNeedsOfADisaster(disaster) {
    try {
        const response = await fetch(`http://127.0.0.1:5003/get-all-needs-of-a-disaster?disasterId=${encodeURIComponent(disaster.id)}`);
        const data = await response.json(); // Parse the JSON from the response
        let needs = Object.values(data)[0]; // Assuming the structure needs this
        return needs; 
    } catch (error) {
        console.error('Error fetching data: ', error); // Log any errors
        return undefined; // Return an empty array or appropriate value in case of an error
    }
}

export async function makeDonations(donations) {
    try {
        await fetch('http://127.0.0.1:5003/make-donations', {
            method: 'POST', // Specify the method
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(donations),
          })
          .then(response => response.json()) // Parse the JSON response
          .then(data => console.log(data)) // Log the response data
          .catch((error) => {
            console.log('Error:', error);
          });
    } catch (error) {
        console.log('Error fetching data: ', error); // Log any errors
    }
}


/*export async function makeDonation(needId, amount) {
    try {
        await fetch(`http://127.0.0.1:5003/make-donation?needId=${encodeURIComponent(needId)}&amount=${encodeURIComponent(amount)}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json(); // or .text(), etc., depending on the response type
        })
        .then(data => {
            console.log(data); // Process your response data here
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
        });
    } catch (error) {
        console.error('Error fetching data: ', error); // Log any errors
    }
/*}

/*export async function makeDonation(needId, amount) {
    try {
        await fetch(`http://127.0.0.1:5003/make-donation`, {
            mthod: 'PATCH',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                needId: needId,
                amount: amount
            })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json(); // or .text(), etc., depending on the response type
        })
        .then(data => {
            console.log(data); // Process your response data here
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
        });
    } catch (error) {
        console.error('Error fetching data: ', error); // Log any errors
    }
}*/


