const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
const crudService = require('./crudService');
const { error } = require('console');

dotenv.config()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended : false}))

// Here we create our routes

// create
app.post('/insert', (request,response) => {

});

// read
app.get('/getAll', (request, response) => {
    const db = crudService.getCrudServiceIstance()
    const result = db.getAllData()
    result
    .then(data => response.json({data: data}))
    .catch(err => (console.log(err)))
    console.log('server says hi');
    response.json({
        success: true
    })

})
// update

// delete
console.log(process.env.PORT)
app.listen(process.env.PORT, () => console.log('app is running'));
