const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
const { error } = require('console');
const crudService = require('./crudService');

dotenv.config()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended : false}))

// Here we create our routes. Read more about routes 
// HB

// Require the upload middleware
const upload = require('./upload-disaster-image');

// TODO: Validate that image is of specific type:
// Set up a route for file uploads
app.post('/upload-disaster-image', upload.single('file'), (request, response) => {
  // Handle the uploaded file
  response.send('Disaster created successfully.')
});

app.post('/create-disaster', (request, response) => {
    const { type, city, picture} = request.body; 
    const db = crudService.getCrudServiceIstance();
    const result = db.createNewDisaster(type, city, picture);
    result
    .catch(error => console.log(error));
});


// create
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
 
// read
app.get('/getAll', (request, response) => {
    const db = crudService.getCrudServiceIstance()
    const result = db.getAllData()
    result
    .then(data => response.json({data: data}))
    .catch(err => (console.log(err)));
    response.json({
        success: true
    });
})
// update

// delete
console.log(process.env.PORT)
app.listen(process.env.PORT, () => console.log('app is running on port', PORT=process.env.PORT));
