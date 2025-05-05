import { getDb } from "./dbInterface.js";

export class User {
  first_name = null;
  last_name = null;
  email = null;
  role = "customer";
  created_at = null;
  updated_at = null;
  phone_number = null;
  address = null;
  password = null;
  db = null;

  constructor(
    first_name,
    last_name,
    email,
    created_at,
    updated_at,
    phone_number,
    address,
    password
  ) {
    this.first_name = first_name;
    this.last_name = last_name;
    this.email = email;
    this.role = role;
    this.created_at = created_at;
    this.updated_at = updated_at;
    this.phone_number = phone_number;
    this.address = address;
    this.password = password;
    this.db = getDb();
  }
  insert() {
    const created_time = Date.now();
    const expires_at = created_time + 30 * 60 * 1000;

    const insert_user_stmt = this.db.prepare(`INSERT INTO users 
            (
            first_name, 
            last_name, 
            email, 
            role, 
            created_at, 
            updated_at, 
            phone_number,
            address,
            password
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
                ?
            )
            `);
    insert_refresh_token_stmt.run(
      this.first_name,
      this.last_name,
      this.email,
      this.role,
      created_time,
      expires_at,
      this.phone_number,
      this.address,
      this.password
    );
  }
  static getUserByEmail(email) {
    const db = getDb();
    return db.prepare("SELECT * FROM users WHERE email = ?").get(email);
  }
}
