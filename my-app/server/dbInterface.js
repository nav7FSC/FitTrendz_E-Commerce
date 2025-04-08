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

export class RefreshToken {
    //TODO add revoke function, ...
    token = null;
    user_id = null;
    created_at = null;
    expires_at = null;
    ip_address = null;
    user_agent = null;
    is_revoked = null;
    replaced_by_token = null;
    db = null

    constructor(
        token, 
        user_id, 
        created_at, 
        expires_at, 
        ip_address, 
        user_agent, 
        is_revoked, 
        replaced_by_token, 
    ) {
        this.token = token;
        this.user_id = user_id;
        this.created_at = created_at;
        this.expires_at = expires_at;
        this.ip_address = ip_address;
        this.user_agent = user_agent;
        this.is_revoked = is_revoked;
        this.replaced_by_token = replaced_by_token;
        this.db = getDb()
    }
    insert() {
        const insert_refresh_token_stmt = this.db.prepare(`INSERT INTO refresh_token 
            (
            token, 
            user_id, 
            created_at, 
            expires_at, 
            ip_address, 
            user_agent, 
            is_revoked, 
            replaced_by_token
            ) VALUES
            (
                ?, 
                ?, 
                ?, 
                ?,
                ?, 
                ?, 
                ?,
                ?
            )
            `
        )
        insert_refresh_token_stmt.run(
            this.token,
            this.user_id,
            this.created_at,
            this.expires_at,
            this.ip_address,
            this.user_agent,
            this.is_revoked,
            this.replaced_by_token
        )
    }
    get(token_id) {
        this.db.prepare('SELECT * FROM refresh_token WHERE token = ?').get(token_id);
    }
}

export function getUserByEmail(email) {
    
    return dbInstance.prepare('SELECT * FROM users WHERE email = ?').get(email);
}

export function getAllProducts() {
    return dbInstance.prepare(`Select * from product`).all();
}