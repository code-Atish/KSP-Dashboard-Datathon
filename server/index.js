//our dependensies
const express = require('express');
const app = express();
const { Pool } = require('pg');
const cors = require('cors');

app.use(express.json());
app.use(cors());

//run the server
app.listen(5000, () => {
    console.log('server started on port 5000');
});

//ceating database
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    password: 'tarun',
    database: 'ksp',
    port: '5432'
});

pool.connect();

app.get('/', (req, res) => {
    res.send(`<h1>hello world</h1>`);
});

//register
app.post('/register', async (req, res) => {
    const sentEmail = req.body.Email;
    const sentUsername = req.body.Username;
    const sentPassword = req.body.Password;

    // Corrected SQL query with parameterized query
    const SQL = 'INSERT INTO users (email, username, password) VALUES ($1, $2, $3)';
    const values = [sentEmail, sentUsername, sentPassword];

    try {
        // Executing parameterized query
        const result = await pool.query(SQL, values);
        console.log('User inserted successfully');
        res.send({ message: 'User added' });
    } catch (error) {
        console.error('Error inserting user:', error);
        res.status(500).send({ error: 'Error inserting user' });
    }
});

//login
app.post('/login', async (req, res) => {
    const sentLoginUsername = req.body.LoginUsername;
    const sentLoginPassword = req.body.LoginPassword;

    // SQL query with parameterized query
    const SQL = 'SELECT * FROM users WHERE username = $1 AND password = $2';
    const values = [sentLoginUsername, sentLoginPassword];

    try {
        // Executing parameterized query
        const result = await pool.query(SQL, values);
        if (result.rows.length > 0) {
            res.send(result.rows[0]); // Send user data if found
        } else {
            res.status(401).send({ message: 'Invalid username or password' }); // Unauthorized status if user not found
        }
    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).send({ error: 'Error logging in user' });
    }
});


