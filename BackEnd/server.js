const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const session = require('express-session');
const saltRounds = 10;

const app = express();
const PORT = process.env.PORT || 8081;


app.use(cors({
  origin: ['http://127.0.0.1:5173', 'http://localhost:5173'],
  credentials: true,
}));
app.use(bodyParser.json());

app.use(session({
  secret: 'atharva',
  resave: false,
  saveUninitialized: false,
}));


const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'project',
  });

  app.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ success: false, message: 'All fields must be filled' });
    }
    // Check if the username already exists
    db.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
      if (err) {
        return res.status(500).json({ success: false, message: 'Database error' });
      }
      if (results.length > 0) {
        return res.status(400).json({ success: false, message: 'User already exists' });
      }
  
      // Hash the password before storing it in the database
      bcrypt.hash(password, saltRounds, (hashErr, hashedPassword) => {
        if (hashErr) {
          console.error('Error hashing password:', hashErr);
          return res.status(500).json({ success: false, message: 'Registration failed' });
        }
  
        // Insert the user into the database
        db.query(
          'INSERT INTO users (username, password, email) VALUES (?, ?, ?)',
          [username, hashedPassword, email],
          (insertErr, insertResults) => {
            if (insertErr) {
              console.error('Error registering user:', insertErr);
              return res.status(500).json({ success: false, message: 'Registration failed' });
            }
            res.status(201).json({ success: true, message: 'Registration successful' });
          }
        );
      });
    });
  });
  
db.connect((err) => {
    if (err) {
      console.error('Error connecting to MySQL database:', err);
    } else {
      console.log('Connected to MySQL database');
    }
  });

  app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'All fields must be filled' });
    }
    db.query(
      'SELECT * FROM users WHERE email = ?',
      [email],
      async (err, results) => {
        if (err) {
          console.error('Error querying user:', err);
          res.status(500).json({ success: false, message: 'Login failed' });
        } else {
          if (results.length > 0) {
            const match = await bcrypt.compare(password, results[0].password);
            if (match) {
              req.session.isLoggedIn = true;
              req.session.username = results[0].username;
              req.session.email = results[0].email;
              req.session.userid = results[0].userid;
              res.status(200).json({ success: true, message: 'Login successful', email: req.session.email, isLoggedIn: req.session.isLoggedIn, user_id:req.session.userid, userLang:results[0].user_lang});
            } else {
              res.status(401).json({ success: false, message: 'Invalid password' });
            }
          } else {
            res.status(404).json({ success: false, message: 'User not found' });
          }
        }
      }
    );
  });
  
  app.post('/logout', (req, res) => {

    req.session.destroy((err) => {
      if (err) {
        console.error('Error during logout:', err);
        res.status(500).json({ success: false, message: 'Logout failed' });
      } else {
        res.json({ success: true, message: 'Logout successful' });
      }
    });
  });

  app.post('/LanguageSelector', async (req, res) => {
    const { userId, selectedLang } = req.body;
    if (!userId || !selectedLang) {
      return res.status(400).json({ success: false, message: 'User ID and selected language are required' });
    }
    let Langno = selectedLang;
    if(selectedLang ==='Japanese')
    {
      Langno = 1;
    }
    
  
    // Update user's language in the database
    db.query(
      'UPDATE users SET user_lang = ? WHERE userid = ?',
      [Langno, userId],
      (err, results) => {
        if (err) {
          console.error('Error updating user language:', err);
          res.status(500).json({ success: false, message: 'Failed to update user language' });
        } else {
          console.log('User language updated successfully');
          res.status(200).json({ success: true, message: 'User language updated successfully' });
        }
      }
    );
  });
  
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });