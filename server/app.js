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

app.listen(process.env.PORT, () => console.log('app is running on port', PORT=process.env.PORT));

app.get('/get-all-questions', (request, response) => {
    const db = crudService.getCrudServiceIstance()
    const result = db.getAllQuestions()
    result
    .then(data => response.json({data : data}))
    .catch(err => {console.log(err)})
})


app.get('/get-all-dnas', (request, response) => {
    const db = crudService.getCrudServiceIstance()
    const result = db.getAllDNAs()
    result
    .then(data => response.json({data : data}))
    .catch(err => {console.log(err)})
})

app.post('/add-animal', (request, response) => {
    const db = crudService.getCrudServiceIstance()
    db.addAnimal(request.body)
    //console.log(request.body); // This will be your array from the frontend
});