import express from 'express';
import {getUserByEmail, getAllProducts, getDb} from './dbInterface.js';
import bcrypt from 'bcrypt';
import cors from 'cors';
import cookieParser from 'cookie-parser'
import {SignJWT, jwtVerify} from 'jose'
import dotenv from 'dotenv'
import crypto from 'crypto'
import {RefreshToken} from './RefreshToken.js'
import Stripe from 'stripe'

import nodemailer from 'nodemailer';

dotenv.config()
const app = express();
const db = getDb();
const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);
const stripe = Stripe(process.env.STRIPE_SECRET);
// TODO make tokens expire later

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
})); // TODO only for development change backend to deliver frontend or use CDN?
app.use(cookieParser())

// add validation and sanatize for the email and password
app.post('/api/auth/login', async (req, res) => {
    const { email, password } = req.body;

    const user = getUserByEmail(email);

    if (!user) {
        return res.status(401).json({ error: "Invalid email or password" });
    }

    const isValid = bcrypt.compareSync(password, user.password);


    if (!isValid) {
        return res.status(401).json({ error: "Invalid email or password" });
    }

    const accessToken = await buildAcessJWT(user, JWT_SECRET)
    console.log("JWT: ", accessToken)
    const refreshToken = RefreshToken.buildRefreshToken(user, req);
    RefreshToken.invlidateOldToken(refreshToken.replaced_by_token);

    res.cookie('refreshToken', refreshToken.token, {
        httpOnly: true,
        secure: false, // TODO set true when HTTPS is enabled
        sameSite: 'lax', // change when backend delivers the front? Maybe not if react is hosted elsewhere
        maxAge:  60 * 60 * 1000 // 1 hour until browser removes it
    });
    console.log(`cookie header set: ${res.getHeader('Set-Cookie')}`)
    console.log(`Token: ${refreshToken}`)

    res.json({message: 'Login Successful', accessToken: accessToken});
});


export async function buildAcessJWT(user, secret) {
    const signing_algorithm = "HS256";
    const token_type = "JWT";

    const header = {
        alg: signing_algorithm,
        typ: token_type
    }
    // registered claims
    const subject = user.id
    const issuer = "FitTrendz"
    const iat = Math.floor(Date.now() / 1000)
    const exp = iat + 60 * 15 // expires in 15 minutes

    // private claims 
    const name = user.name
    //const picture = user.picture TODO when pictures are implemented add back
    const role = user.role


    const payload = {
        name: name,
        //picture: picture,
        role: role
    }

    const jwt = await new SignJWT(payload)
    .setIssuedAt(iat)
    .setExpirationTime(exp)
    .setIssuer(issuer)
    .setSubject(subject)
    .setProtectedHeader(header)
    .sign(secret)

    return jwt
}

//middleware
async function requireAuth(req, res, next) {
    console.log("require auth middleware reached")
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // remove "Bearer"
    console.log(`auth token ${token}`);

    if (!token) return res.status(401).json({ error: 'Unauthorized' });

    console.log("token not undefined")
    console.log(token)
    try {
        const user = await jwtVerify(token, JWT_SECRET);
        console.log(user)
        req.user = user;
        next();
      } catch (e) {
        console.log(e)
        return res.status(401).json({ error: 'Invalid token' });
      }
}

app.post('/api/auth/logout', async (req, res) => {
    const refreshTokenID = req.cookies.refreshToken;
    const refreshToken = RefreshToken.get(refreshTokenID);
    if (refreshToken) {
        refreshToken.revoke()
    }

    res.clearCookie("refreshToken",{
        httpOnly: true,
        secure: false, // TODO set true when HTTPS is enabled
        sameSite: 'lax', // change when backend delivers the front? Maybe not if react is hosted elsewhere
    })
    return res.status(200).json({message:"Logged out"})
})

// TODO update to add profile picture
app.post('/api/auth/update', requireAuth, async (req, res) => {
    const { password } = req.body
    // console.log(req)
    // console.log(req.body)
    // console.log("Headers:", req.headers);
    // console.log("Body:", req.body);
    const user = req.user;
    console.log(`user: ${user}`);
    if (!user) {
        return res.status(401).json({ error: "Invalid email or password" });
    }
    const hashedPassword = bcrypt.hashSync(password, 10);
    const updatePassword = db.prepare(`UPDATE users SET password = ?`)
    try {
        updatePassword.run(hashedPassword)
    } catch (error) {
        res.status(400).json({error: "Update password failed."})
    }
})

app.post('/api/auth/register', async (req, res) => {
    const { first_name, last_name, email, password } = req.body; // TODO add phone number and address to regular registration or only on purchase?
    const hashedPassword = bcrypt.hashSync(password, 10);
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
app.get('/api/auth/me', requireAuth, async (req, res) => {
    console.log("Request recieved")
    try {
        const email = req.user.email; // from the requireAuth middlware
        const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email);
        res.json({ user });
        console.log("request authenticated")
    } catch (error) {
        console.log("no token found")
        res.status(400).json({ error: "Getting current user info failed." });
    }
});

//get all products
app.get('/api/product/getAll', async (req, res) => {
    console.log("Request for all products recieved")
    try {
        const allProducts = getAllProducts()
        console.log(allProducts)
        res.json({ success: "All products sucessfully retrieved", allProducts });
    } catch (error) {
        res.status(400).json({ error: "failed to get all products" });
        console.log(error)
    }
});

app.post('/api/auth/forgot-password', async (req, res) => {
    try {
      const { email } = req.body;
      const user = getUserByEmail(email);
      if (!user) return res.status(404).json({ error: 'No user with that email.' });
  
      // 6‑digit code
      const resetCode = Math.floor(100000 + Math.random() * 900000).toString();
      const expiresAt = Date.now() + 60*60*1000; // 1 hour

      db.prepare(`
        CREATE TABLE IF NOT EXISTS password_resets (
          id          INTEGER PRIMARY KEY AUTOINCREMENT,
          user_id     INTEGER NOT NULL,
          reset_code  TEXT    NOT NULL,
          expires_at  INTEGER NOT NULL,
          FOREIGN KEY(user_id) REFERENCES users(id)
        )`).run();
  

      // save it
      db.prepare(
        'INSERT INTO password_resets (user_id, reset_code, expires_at) VALUES (?,?,?)'
      ).run(user.id, resetCode, expiresAt);
  
      // send email
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT),
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS
        }
      });
  
      await transporter.sendMail({
        from: `"FitTrendz Support" <${process.env.SMTP_USER}>`,
        to: user.email,
        subject: 'Your FitTrendz password reset code',
        text: `Your reset code is ${resetCode}. It expires in one hour.`,
      });
  
      res.json({ message: 'Reset code sent to your email.' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Unable to send reset code.' });
    }
  });

  app.post('/api/auth/reset-password', async (req, res) => {
    try {
      const { email, code, newPassword } = req.body;
      const user = getUserByEmail(email);
      if (!user) return res.status(404).json({ error: 'User not found.' });

      db.prepare(`
        CREATE TABLE IF NOT EXISTS password_resets (
          id          INTEGER PRIMARY KEY AUTOINCREMENT,
          user_id     INTEGER NOT NULL,
          reset_code  TEXT    NOT NULL,
          expires_at  INTEGER NOT NULL,
          FOREIGN KEY(user_id) REFERENCES users(id)
        )`).run();
  
      const record = db.prepare(
        'SELECT * FROM password_resets WHERE user_id = ? AND reset_code = ?'
      ).get(user.id, code);
  
      if (!record || record.expires_at < Date.now()) {
        return res.status(400).json({ error: 'Invalid or expired code.' });
      }
  
      // hash & update
      const hash = await bcrypt.hash(newPassword, 10);
      db.prepare('UPDATE users SET password = ? WHERE id = ?')
        .run(hash, user.id);
  
      // clean up
      db.prepare('DELETE FROM password_resets WHERE id = ?')
        .run(record.id);
  
      res.json({ message: 'Password has been reset.' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Password reset failed.' });
    }
  });

app.post('/api/auth/forgot-password', async (req, res) => {
    try {
      const { email } = req.body;
      const user = getUserByEmail(email);
      if (!user) return res.status(404).json({ error: 'No user with that email.' });
  
      // 6‑digit code
      const resetCode = Math.floor(100000 + Math.random() * 900000).toString();
      const expiresAt = Date.now() + 60*60*1000; // 1 hour

      db.prepare(`
        CREATE TABLE IF NOT EXISTS password_resets (
          id          INTEGER PRIMARY KEY AUTOINCREMENT,
          user_id     INTEGER NOT NULL,
          reset_code  TEXT    NOT NULL,
          expires_at  INTEGER NOT NULL,
          FOREIGN KEY(user_id) REFERENCES users(id)
        )`).run();
  

      // save it
      db.prepare(
        'INSERT INTO password_resets (user_id, reset_code, expires_at) VALUES (?,?,?)'
      ).run(user.id, resetCode, expiresAt);
  
      // send email
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT),
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS
        }
      });
  
      await transporter.sendMail({
        from: `"FitTrendz Support" <${process.env.SMTP_USER}>`,
        to: user.email,
        subject: 'Your FitTrendz password reset code',
        text: `Your reset code is ${resetCode}. It expires in one hour.`,
      });
  
      res.json({ message: 'Reset code sent to your email.' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Unable to send reset code.' });
    }
  });

  app.post('/api/auth/reset-password', async (req, res) => {
    try {
      const { email, code, newPassword } = req.body;
      const user = getUserByEmail(email);
      if (!user) return res.status(404).json({ error: 'User not found.' });

      db.prepare(`
        CREATE TABLE IF NOT EXISTS password_resets (
          id          INTEGER PRIMARY KEY AUTOINCREMENT,
          user_id     INTEGER NOT NULL,
          reset_code  TEXT    NOT NULL,
          expires_at  INTEGER NOT NULL,
          FOREIGN KEY(user_id) REFERENCES users(id)
        )`).run();
  
      const record = db.prepare(
        'SELECT * FROM password_resets WHERE user_id = ? AND reset_code = ?'
      ).get(user.id, code);
  
      if (!record || record.expires_at < Date.now()) {
        return res.status(400).json({ error: 'Invalid or expired code.' });
      }
  
      // hash & update
      const hash = await bcrypt.hash(newPassword, 10);
      db.prepare('UPDATE users SET password = ? WHERE id = ?')
        .run(hash, user.id);
  
      // clean up
      db.prepare('DELETE FROM password_resets WHERE id = ?')
        .run(record.id);
  
      res.json({ message: 'Password has been reset.' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Password reset failed.' });
    }
  });

app.post('/create-checkout-session', async (req, res) => {
    const session  = await stripe.checkout.sessions.create({
        line_items: [
            {
                price: 'price_1RFObWCkS2P2sDdJAoNbDKEa',
                quantity: 1,
            },
        ],
        mode: 'payment',
        success_url: 'http://localhost:5173?success=true',
        cancel_url: 'http://localhost:5173?canceled=true',
    });
    
    res.json({url: session.url});
});

// Start Server
app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
