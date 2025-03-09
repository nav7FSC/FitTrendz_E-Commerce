import Database from 'better-sqlite3';

let dbInstance = null

export function getDb() {
    if (!dbInstance) {
        dbInstance = new Database('database.sqlite', { verbose: console.log })
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