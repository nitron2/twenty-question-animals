// According to this Medium article: 
// https://medium.com/swlh/restful-api-design-get-post-put-patch-delete-a-walkthrough-with-javascripts-fetch-api-e37a8416e2a0
// the GET method is the only one that does not require
// header and body specifications, but I don't do this at all in my non GET
// methods. Research this further.

export async function getAllDisasters() {
    try {
        const response = await fetch('http://127.0.0.1:5003/get-all-disasters');
        const data = await response.json(); // Parse the JSON from the response
        return Object.values(data)[0]; // Assuming the structure needs this
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
        return Object.values(data)[0]; // Assuming the structure needs this
    } catch (error) {
        console.error('Error fetching data: ', error); // Log any errors
        return undefined; // Return an empty array or appropriate value in case of an error
    }
}

export async function getDisasterById(disasterId) {
    try {
        const response = await fetch(`http://127.0.0.1:5003/get-disaster-by-id?disasterId=${encodeURIComponent(disasterId)}`);
        const data = await response.json(); // Parse the JSON from the response
        return Object.values(data)[0]; // Assuming the structure needs this
    } catch (error) {
        console.error('Error fetching data: ', error); // Log any errors
        return undefined; // Return an empty array or appropriate value in case of an error
    }
}

export async function submitDonations(donations) {
    try {
        await fetch('http://127.0.0.1:5003/submit-donations', {
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
