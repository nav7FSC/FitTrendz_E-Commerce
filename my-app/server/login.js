import express from 'express';
import Database from 'better-sqlite3';
import bcrypt from 'bcrypt';
import cors from 'cors';
import jwt from 'jsonwebtoken';

const app = express();
const db = new Database('./database.sqlite', { verbose: console.log });

app.use(express.json());
app.use(cors());

// TODO use an actual secret key and move to env vars or something
const SECRET_KEY = "secret_key"; 

app.post('/api/auth/login', (req, res) => {
    const { email, password } = req.body;

    const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email);

    if (!user) {
        return res.status(401).json({ error: "Invalid email or password" });
    }

    const isValid = bcrypt.compareSync(password, user.password);


    if (!isValid) {
        return res.status(401).json({ error: "Invalid email or password" });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, { expiresIn: '1h' }); // TODO make this actually secure

    res.json({token});
    //console.log(res) // TODO remove logging or implement better logging tools
});

app.post('/api/auth/register', async (req, res) => {
    const { first_name, last_name, email, password } = req.body; // TODO add phone number and address to regular registration or only on purchase?
    const hashedPassword = bcrypt.hashSync(password, 10);
    console.log(req.body)

    try {
        const insert = db.prepare(`INSERT INTO users (
            first_name, 
            last_name, 
            email, 
            password, 
            role, 
            created_at, 
            updated_at,
            phone_number, 
            address
        ) VALUES
        (
            ?, ?, ?, ?, 
            ?, datetime(), datetime(), ?, ?
        )
        `
        );
        try {
            insert.run(
                first_name,
                last_name,
                email, 
                hashedPassword,
                "customer",
                null,
                null
            );
        } catch (error) {
            console.log(error)
            res.status(400).json({error: "Create new user failed."})
        }
        res.json({ success: "User registered" });
    } catch (error) {
        res.status(400).json({ error: "email already exists" });
    }
});

//TODO Has not been tested but would be used to retrieve signed in user data
app.get('/api/auth/me', async (req, res) => {
    try {
        const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email);
        res.json({ user });
    } catch (error) {
        res.status(400).json({ error: "Getting current user info failed." });
    }
});


// Start Server
app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
