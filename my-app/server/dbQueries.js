/**This file contains useful examples of sqlite commands */
import {data} from '../src/db/data.js'
import Database from 'better-sqlite3';

const db = new Database('database.sqlite');
db.pragma('journal_mode = WAL');

// Creates a table according to the provide schema if it doesn't already exist
const create_users_table = db.prepare(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT,
    phone_number TEXT,
    address TEXT,
    role TEXT NOT NULL,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL
  )`);
// create_users_table.run() // runs the prepared create statement

// Creates a table according to the provide schema if it doesn't already exist
const create_product_table = db.prepare(`CREATE TABLE IF NOT EXISTS product (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    image TEXT,
    title TEXT NOT NULL,
    rating REAL NOT NULL,
    reviews TEXT NOT NULL,
    prevPrice REAL NOT NULL,
    newPrice REAL NOT NULL,
    style TEXT NOT NULL,
    color TEXT NOT NULL,
    category TEXT NOT NULL,
    gender TEXT NOT NULL,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL
  )`);
  //create_product_table.run() 

// const drop_product_table = db.prepare(`DROP TABLE product`)
// drop_product_table.run()
// create_product_table.run() // runs the prepared create statement
// insert_test_products_from_existing_list()

// Creates a table according to the provide schema if it doesn't already exist
const create_refresh_token_table = db.prepare(`CREATE TABLE IF NOT EXISTS refresh_token (
    token TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    created_at TEXT NOT NULL,
    expires_at TEXT NOT NULL,
    ip_address TEXT NOT NULL,
    user_agent TEXT NOT NULL,
    is_revoked TEXT NOT NULL, 
    replaced_by_token TEXT,
    FOREIGN KEY(user_id) REFERENCES users(id)
  )`);
  function delete_token(token) {
    const delete_user_stmt = db.prepare(`DELETE FROM refresh_token WHERE token = ?`)
    const deleted = delete_user_stmt.run(token)
    console.log(deleted)
}
//const drop_refresh_token_table = db.prepare(`DROP TABLE refresh_token`)

function insert_test_products(image, title, rating, reviews, prevPrice, newPrice, company, color, category, gender) {
    const insert_test_user_stmt = db.prepare(`INSERT INTO product 
        (
            image, 
            title, 
            rating, 
            reviews, 
            prevPrice, 
            newPrice, 
            style, 
            color,
            category,
            gender,
            created_at, 
            updated_at
        ) VALUES
        (
            ?, 
            ?, 
            ?, 
            ?, 
            ?, 
            ?, 
            ?,
            ?, 
            ?,
            ?,
            datetime(), 
            datetime()
        )
        `)
    // runs the insert with the provided strings. The id is auto incremented as defined above
    insert_test_user_stmt.run(
        image, 
        title, 
        rating, 
        reviews, 
        prevPrice, 
        newPrice, 
        company, 
        color,
        category,
        gender,
    )
}
// temp script to insert products from matt's existing test list in db/data.jsx
function insert_test_products_from_existing_list() {
    data.forEach(element => {
        insert_test_products(...Object.values(element))
    });
}
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

function make_password_nullable() {
    const drop_password = db.prepare(`ALTER TABLE users DROP COLUMN password`);
    drop_password.run()

    const add_password = db.prepare(`ALTER TABLE users ADD COLUMN password`);
    add_password.run()
}

const create_password_resets_table = db.prepare(`
    CREATE TABLE IF NOT EXISTS password_resets (
      id            INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id       INTEGER NOT NULL,
      reset_code    TEXT    NOT NULL,
      expires_at    INTEGER NOT NULL,
      FOREIGN KEY(user_id) REFERENCES users(id)
    )`);
  create_password_resets_table.run();

make_password_nullable()
//delete_token("67cdc073f3b9b70a488b9e2d593de80b7358640249318fb0f63ad3bf3189b56c896094957e14cb21214346939c65d7cb59b0496aafaa5c192f2be42258943c66")



// delete_user("jack")
// insert_test_products_from_existing_list()
//drop_product_table.run()
// create_refresh_token_table.run() // runs the prepared create statement
