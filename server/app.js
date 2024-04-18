const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
const { error } = require('console');
const crudService = require('./crudService');
const path = require('path');

dotenv.config()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended : false}))

// Here we create our routes. Read more about routes 
// HB

// Require the upload middleware
const upload = require('./upload-disaster-image');

app.post('/create-disaster', upload.single('image'), async (req, res) => {
    const db = crudService.getCrudServiceIstance()
    
    const tableData = JSON.parse(req.body.tableData); // Assuming table data is sent as JSON string
    const city = req.body.city
    const type = req.body.type
    const picture = req.body.file
    let pictureName = undefined;

    if (picture) {
        pictureName = picture.filename
    }

    console.log("PIC:" + pictureName)
    
    if (city && type) {
        let disasterId = await db.createNewDisaster(type, city, pictureName)
        disasterId

        console.log("disasterId: " + disasterId)
        if (disasterId) {
            for (row of tableData) {
                const name = row[0]
                const qauntity = row[1]
                if (name && qauntity) {
                    db.createNewNeed(row[0], disasterId, row[1]) //Name, disId, Qty
                }
            }
        }
    }

});


app.post('/signup', (request, response) => {
    const { name, email, password, type } = request.body; 
    // What the hell is JavaScript evne doing. This is chaotic as f**k
    const db = crudService.getCrudServiceIstance();
    const result = db.signUpNewUser(name, email, password, type);
    result
    .then(data => response.json({success: true})) 
    // Question: Is this what shows up in the Network tab in Google Chrome (server side, I'm guessing)?
    .catch(error => console.log(error));
    // What is this chaining of functions?? WTF!
});
 
app.get('/get-disaster-image', (req, res) => {
    const imageName = req.query.imageName; // Access the name sent by the client
    const imagePath = path.join(__dirname, '/disaster-images', imageName);
    res.sendFile(imagePath);
});

app.get('/get-all-disasters', (request, response) => {
    const db = crudService.getCrudServiceIstance()
    const result = db.getAllDisasters()
    result
    .then(data => response.json({data : data}))
    .catch(err => {console.log(err)})
})

app.get('/get-all-needs', (request, response) => {
    const db = crudService.getCrudServiceIstance()
    const result = db.getAllNeeds()
    result
    .then(data => response.json({data : data}))
    .catch(err => {console.log(err)})
})

app.get('/get-all-needs-of-a-disaster', (request, response) => {
    const db = crudService.getCrudServiceIstance()
    const disasterId = request.query.disasterId; // Access the name sent by the client
    const result = db.getAllNeedsOfADisaster(disasterId)
    result
    .then(data => response.json({data : data}))
    .catch(err => {console.log(err)})
})

app.get('/get-disaster-by-id', (request, response) => {
    const db = crudService.getCrudServiceIstance()
    const disasterId = request.query.disasterId; // Access the name sent by the client
    const result = db.getDisasterById(disasterId)
    result
    .then(data => response.json({data : data}))
    .catch(err => {console.log(err)})
})

app.post('/submit-donations', (request, response) => {
    const db = crudService.getCrudServiceIstance()
    db.submitDonations(request.body)
    //console.log(request.body); // This will be your array from the frontend
});


app.put('/set-need-status', (request, response) => {
    const db = crudService.getCrudServiceIstance()
    db.setNeedStatus(request.body.id, request.body.status)
});


console.log(process.env.PORT)
app.listen(process.env.PORT, () => console.log('app is running on port', PORT=process.env.PORT));
