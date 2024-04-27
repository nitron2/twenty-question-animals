/**
 *
 *  data that has already made its way server-side, to interface with
 *  SQL database.
*
*   Keep in mind that the client-server architecture is very much the
*   same as it was on Roblox. You know what you're doing, man. Keep going.
*   Remember when Nicholas told us about Odin project? That was this
*
*   Essentially, crudService acts as the go-between for app.js and database
*/ 

const mysql = require('mysql');
const dotenv = require('dotenv');
const { resolve } = require('path');
const { rejects } = require('assert');
const { error } = require('console');
const { query } = require('express');
let instance = null;
dotenv.config()

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'twenty-questions',
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

    async getAllQuestions() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM questions;";
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

    async getAllDNAs() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM dnas;";
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

    async addAnimal(body) {
        if (body) {
            if(body.animal == null) {
                throw new Error("Animal Missing")
            }

            if(body.dna == null ) {
                throw new Error("DNA Missing")
            }
            
            try {
                const result = await new Promise((resolve, reject) => { 
                    let query = "INSERT INTO dnas (animal, firstq, secondq...) VALUES (?, ?, ?,...);"
        
                    connection.query(query, [name, disasterId, quantityMax], (error, results) => { 
                        if (error) reject(new Error(error.message))
                        resolve(results) 
                    })
                })
                console.log('insertId for need: ' + result.insertId) // Use result.insertId
            } catch (error) {
                console.log(error)
            }
        } else {
            throw new Error("Request body missing.")
        }
    }
}




module.exports = CrudService
