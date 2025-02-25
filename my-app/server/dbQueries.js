/**This file contains useful examples of sqlite commands */

import Database from 'better-sqlite3';

const db = new Database('database.sqlite');
db.pragma('journal_mode = WAL');

// Creates a table according to the provide schema if it doesn't already exist
const create_users_table = db.prepare(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    phone_number TEXT,
    address TEXT,
    role TEXT NOT NULL,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL
  )`);

create_users_table.run() // runs the prepared create statement

// perpares a statement that will accept ? number of inputs and set datetime as the last two
function insert_test_user() {
    const insert_test_user_stmt = db.prepare(`INSERT INTO users 
        (first_name, last_name, email, 
            password, phone_number, address, 
            role, created_at, updated_at
        ) VALUES
        (
            ?, ?, ?, ?, 
            ?, ?, ?, datetime(), datetime()
        )
        `)
    // runs the insert with the provided strings. The id is auto incremented as defined above
    insert_test_user_stmt.run("Jack", "Borah", "borahjj\@farmingdale.edu",
        "secretpassword", "(555)555-5555", 
        "address", "admin")
}

function get_user() {
    const get_user_stmt = db.prepare(`SELECT * from users WHERE first_name = ?`)
    const user = get_user_stmt.get('Jack') // google the better-sqlite3 api for details on get vs run
    console.log(user)
}

function delete_user(first_name) {
    const delete_user_stmt = db.prepare(`DELETE FROM users WHERE first_name = ?`)
    const deleted = delete_user_stmt.run(first_name)
    console.log(deleted)
}

function drop_columns() {
    const drop_column_stmt1 = db.prepare(`ALTER TABLE users DROP COLUMN phone_number`)
    const drop_column_stmt2 = db.prepare(`ALTER TABLE users DROP COLUMN address`)

    drop_column_stmt1.run()
    drop_column_stmt2.run()
}

function add_columns() {
    const add_column_stmt1 = db.prepare(`ALTER TABLE users ADD COLUMN phone_number`)
    const add_column_stmt2 = db.prepare(`ALTER TABLE users ADD COLUMN address`)

    add_column_stmt1.run()
    add_column_stmt2.run()
}

delete_user("jack")