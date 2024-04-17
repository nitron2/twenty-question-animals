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


app.post('/upload-disaster-image', upload.single('file'), (request, response) => {
  response.send('Disaster created successfully.')
});

app.post('/create-disaster', (request, response) => {
    const { type, city, picture} = request.body; 
    const db = crudService.getCrudServiceIstance();
    const result = db.createNewDisaster(type, city, picture);
    result
    .catch(error => console.log(error));
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
    const disasterId = request.query.disasterId; // Access the name sent by the client
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
