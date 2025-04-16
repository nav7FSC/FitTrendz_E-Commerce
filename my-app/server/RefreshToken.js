import crypto from 'crypto'
import {getDb} from './dbInterface.js' 

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
    static get(token_id) {
        const db = getDb();
        const retrieved_token = db.prepare('SELECT * FROM refresh_token WHERE token = ?').get(token_id);
        console.log(retrieved_token);
        return new RefreshToken(
            retrieved_token["token"],
            retrieved_token["user_id"], 
            retrieved_token["created_at"], 
            retrieved_token["expires_at"], 
            retrieved_token["ip_address"], 
            retrieved_token["user_agent"], 
            retrieved_token["is_revoked"], 
            retrieved_token["replaced_by_token"], 
        )
    }

    revoke() {
        const stmt = this.db.prepare('UPDATE refresh_token SET is_revoked = ? WHERE token = ?');
        const result = stmt.run("true", this.token);
        this.is_revoked = "true";

        return result.changes;
    }

    is_valid() {
        if (this.is_revoked != "true" && this.expires_at < Date.now()) {
            return true;
        } else {
            return false;
        }
    }
    static invlidateOldToken(old_token) {
        if (old_token) {
            console.log("old token = ", old_token);
            const changes = RefreshToken.get(old_token).revoke();
            console.log("Old token revoked successfully: ", old_token);
        }
    }
    static buildRefreshToken(user, req) {
        console.log(req.cookies)
        try {
            let random_token = crypto.randomBytes(64).toString('hex');
            const user_id = user.id;
            const created_time = Date.now()
            const expires_at = created_time + 30 * 60 * 1000
            const ip = req.ip //TODO may need to change this to req.headers['x-forwarded-for] || req.ip if we move behind a proxie
            const user_agent = req.headers['user-agent']
            const is_revoked = "false";
            const old_token = req.cookies.refreshToken || null;
            // TODO Set up some testing for this
            // if (old_token !== null) {
            //     RefreshToken.get(old_token).revoke();
            // }
    
            console.log(random_token)
            console.log(user_id)
            console.log(created_time)
            console.log(expires_at)
            console.log(ip)
            console.log(user_agent)
            console.log(is_revoked)
            console.log(old_token)
    
            const new_token = new RefreshToken(
                random_token,
                user_id,
                created_time,
                expires_at,
                ip, 
                user_agent,
                is_revoked,
                old_token
            );
            new_token.insert()
            return new_token; 
        } catch (err) {
            if (err.code == "SQLITE_CONSTRAINT_PRIMARYKEY") {
                return buildRefreshToken(user, req)
            } else {
                throw console.log(err)
            }
        }
    }
}
