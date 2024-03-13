const mysql = require('mysql')
const dotenv = require('dotenv');
const { resolve } = require('path');
const { rejects } = require('assert');
let instance = null;
dotenv.config()

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'user',
    password: 'password',
    database: 'people',
    port: 3306
})

connection.connect((err) => {
    if (err) {
        console.log(err.message)
    }
    console.log('db: ' + connection.state)
})

class CrudService {
    static getCrudServiceIstance() {
        return instance ? instance : new CrudService();
    }

    async getAllData() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM people;";
                connection.query(query, (err, results) => { //Callback function, or so I'm told.
                    if (err) {
                        reject(new Error(err.message))
                    }
                    resolve(results)
                })
            })

            console.log(results)
        }
        catch (error){
            console.log('error')
        }
    }
}

module.exports = CrudService
