const mysql2 = require('mysql2');
const User = require('../models/User');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'myappdb',
});

class UserRepository {
    createUser(username, password) {
        return new Promise((resolve, reject) => {
          const query = 'INSERT INTO users (username, password) VALUES (?, ?)';
          connection.query(query, [username, password], (error, results) => {
            if (error) return reject(error);
    
            resolve(results.insertId);
          });
        });
      }


      findUserByUsername(username){
        return new Promise((resolve, reject) =>{
                const query = "SELECT * FROM users WHERE username = ?";
                connection.query(query, [username], (error, results) =>{
                    if(error) return reject(error);

                    if(results.length === 0){
                        resolve(null);
                    }else{
                        const {id, username, password } = results[0];
                        const user = new User(id, username, password);
                        resolve(user);
                    }
                });
        });
    }
}


module.exports = new UserRepository();
