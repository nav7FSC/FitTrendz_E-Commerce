import crypto from 'crypto'
import Database from 'better-sqlite3';
const sqliteDB = Database;

//TODO create classes for each model and a Database class that wraps the getDB and dbInstance as a singleton. Each insert function can be attached on it

let dbInstance = null

export function getDb() {
    if (!dbInstance) {
        dbInstance = new sqliteDB('database.sqlite', { verbose: console.log })
        console.log('Database connection created')
    }
    return dbInstance
}

export function getUserByEmail(email) {
    
    return dbInstance.prepare('SELECT * FROM users WHERE email = ?').get(email);
}

export function getAllProducts() {
    return dbInstance.prepare(`Select * from product`).all();
}