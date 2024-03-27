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

export async function getDisasterImageBlob(imageName) {
    try {
        const response = await fetch(`http://127.0.0.1:5003/get-disaster-image?imageName=${encodeURIComponent(imageName)}`);
        const blob = await response.blob(); // Parse the JSON from the response
        return blob;
    } catch (error) {
        console.error('Error fetching data: ', error); // Log any errors
        return undefined; // Return an empty array or appropriate value in case of an error
    }
}

export async function getAllNeedsOfADisaster(disasterId) {
    try {
        const response = await fetch(`http://127.0.0.1:5003/get-all-needs-of-a-disaster?disasterId=${encodeURIComponent(disasterId)}`);
        const data = await response.json(); // Parse the JSON from the response
        let needs = Object.values(data)[0]; // Assuming the structure needs this
        return needs;
    } catch (error) {
        console.error('Error fetching data: ', error); // Log any errors
        return undefined; // Return an empty array or appropriate value in case of an error
    }
}