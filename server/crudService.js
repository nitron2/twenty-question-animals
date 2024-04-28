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
            const animal = body.animal
            const dna = body.dna

            if (animal == null) throw new Error("Animal Missing")
            if (dna == null ) throw new Error("DNA Missing")
            
            try {
                const result = await new Promise((resolve, reject) => { 
                    let query = "INSERT INTO dnas (animal, has_fur_feathers_or_scales, has_horn_tusk_or_long_neck, has_long_lifespan, has_stripes_or_spots, is_bigger_than_a_human, is_brown, is_carnivore, is_endangered, is_fast, is_featured_in_madagascar_movie, is_friendly_to_humans, is_insect, is_loud, is_mammal, is_native_to_united_states, is_nocturnal, is_pet, is_smaller_than_a_microwave, is_social, lives_in_water) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);"
        
                    connection.query(query, [animal, dna[0], dna[1], dna[2], dna[3], dna[4], dna[5], dna[6], dna[7], dna[8], dna[9], dna[10], dna[11], dna[12], dna[13], dna[14], dna[15], dna[16],dna[17], dna[18], dna[19]], (error, results) => { 
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
