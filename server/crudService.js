// Essnetially, crudService acts as the go-between for 
// data that has already made its way server-side, to interface with
// SQL database.

// Keep in mind that the client-server architecture is very much the
// same as it was on Roblox. You know what you're doing, man. Keep going.
// Remember when Nicholas told us about Odin project? That was this

// HB

const mysql = require('mysql');
const dotenv = require('dotenv');
const { resolve } = require('path');
const { rejects } = require('assert');
const { error } = require('console');
let instance = null;
dotenv.config()

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'fema',
    port:'3306'
})

connection.connect((error) => {
    if (error) {
        console.log(error.message)
    }
})

class CrudService {
    static getCrudServiceIstance() {
        return instance ? instance : new CrudService();
    }
    
    // what do you think we should do next? confirm that everything actually got added to db correct;y
    async signUpNewUser(name, email, password, type) {
        console.log("trying to insert " + name + " into db.")

        try {   
            const insertId = await new Promise((resolve, reject) => { 
                // We have seen this in server application development before (Villafañe).
                //const query = "INSERT INTO `people`(`id`, `name`, `date_added`) VALUES ('1','hayden','December 17, 1995 03:24:00'))"
                const query = "INSERT INTO users (name, email, password, type) VALUES (?, ?, ?, ?);"
                 // Parameterize to prevent SQL injection 
                //pool.query(query, (error, result) => { 
                    // Callback function, or so I'm told.
                // if (error) reject(new Error(error.message))
                //    resolve(result) // What does resolve do, specifically?
                //})
                connection.query(query, [name, email, password, type], (error, result) => { 
                    // Callback function, or so I'm told.
                    if (error) reject(new Error(error.message))
                    resolve(result) // What does resolve do, specifically?
                })
            })
            console.log(insertId)
        } catch (error) {
            console.log(error);
        }
    }

    async getAllDisasters() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM disasters;";

                connection.query(query, (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results)
                })
            });
            console.log(response)
            return response
        } catch (error) {
            console.log(error)
        }
    }

    async createNewDisaster(type, city, picture) {
        console.log("trying to insert " + type + ": " + city + " " + picture + " into db.")

        try {   
            const insertId = await new Promise((resolve, reject) => { 
                let query
                if (picture) {query = "INSERT INTO disasters (type, city, picture) VALUES (?, ?, ?);"}
                else {query = "INSERT INTO disasters (type, city) VALUES (?, ?);"
            }
                connection.query(query, [type, city, picture], (error, result) => { 
                    if (error) reject(new Error(error.message))
                    resolve(result) 
                })
            })
            console.log(insertId)
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = CrudService
