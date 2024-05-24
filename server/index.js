//our dependensies
const express = require('express');
const app = express();
const { Pool } = require('pg');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwtGenerator = require('./utils/jwtGenerator')
const  extractRank = require('./utils/utiltiyFuntions')
const authorize = require('./middleware/authorize')
require('dotenv').config();


app.use(express.json());
app.use(cors());

//run the server
app.listen(5000, () => {
    console.log('server started on port 5000');
});

//ceating database
const pool = new Pool({
    // user: 'postgres',
    // host: 'localhost',
    // password: 'tarun',
    // database: 'ksp',
    // port: '5432'
    connectionString: process.env.POSTGRES_URL ,
});
pool.connect();

app.get('/', (req, res) => {
    res.send(`<h1>hello world</h1>`);
});

//register
app.post('/api/register', async (req, res) => {
    const sentEmail = req.body.Email;
    const sentUsername = req.body.Username;
    const sentPassword = req.body.Password;
    const  sentRank= req.body.Rank;

    // Corrected SQL query with parameterized query
    const SQL = 'INSERT INTO users (email, username, password,rank) VALUES ($1, $2, $3, $4) RETURNING *';
    const salt = await bcrypt.genSalt(10); 
    const hashedPassword = await bcrypt.hash(sentPassword, salt); 
    const values = [sentEmail, sentUsername, hashedPassword,sentRank];
    
    try {
        const newUser = await pool.query(SQL, values);
        // Executing parameterized query
        // console.log(newUser.rows[0]);
        // res.send({ message: 'User added' });
        res.status(200).json({ message: 'Scuccessfully Registered' });
    } catch (error) {
        console.error('Error inserting user:', error);
        // res.status(500).send({ error: 'Error inserting user' });
        console.log(error)
        res.status(404).json({ error: 'Registration unsuccessfull' });

    }
});

//login
app.post('/api/login', async (req, res) => {
    const sentLoginUsername = req.body.LoginUsername;
    const sentLoginPassword = req.body.LoginPassword;

    // SQL query with parameterized query
    const SQL = 'SELECT * FROM users WHERE username = $1';
    const values = [sentLoginUsername];
    
    try {
        // Executing parameterized query
        const result = await pool.query(SQL, values);
        if (result.rows.length === 0) {
            return res.status(401).send({message : "Invalid Credential"});
        }
        const validPassword = await bcrypt.compare(
            sentLoginPassword,
            result.rows[0].password
        );
        delete result.rows[0].password
        const user=result.rows[0]
        if (validPassword) {
            // res.send("Credentials matched"); // Send user data if found
            const jwtToken = jwtGenerator(result.rows[0].id);
            return res.json({ jwtToken,user });
        } else {
            res.status(401).send({ message: 'Invalid username or password' }); // Unauthorized status if user not found
        }
    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).send({ error: 'Error logging in user' });
    }
});

app.get("/api/verify", authorize, (req, res) => {
    try {
      res.json(true);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  });
  

  app.post("/api/getofficers",authorize, async (req, res) => {
    const SQL = `Select distinct ioname,user_id from firdetails where user_id in (SELECT o.id FROM users o JOIN officer_hierarchy oh ON o.id = oh.junior_id WHERE oh.senior_id= $1 AND oh.junior_id != $1)`;
    const values = [req.user.id];

    try {
        const result = await pool.query(SQL, values);
        // if (result.rows.length === 0) {
        //     return res.status(401).send({message : "No subordinate officers found"});
        // }
        res.send(extractRank(result.rows))
        // res.send(usernames)
        
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  });

  
  app.post("/api/getfirdetails",authorize, async (req, res) => {
    // const SQL = `SELECT "FirNo","UnitName",year,fir_stage,"Complaint_Mode",place_of_offence,"Fir_Date","FIR_Type" FROM firdetails WHERE user_id = $1 limit $2`;
    const SQL = `SELECT "FirNo","UnitName",year,"Complaint_Mode",fir_stage FROM firdetails WHERE user_id = $1 AND year= $2 limit $3`;
    const values = [req.user.id,req.body.year,req.body.limit];
    // console.log('user id '  ,req.user)
    // const values = [req.user.id];

    try {
        const result = await pool.query(SQL, values);
        // if (result.rows.length === 0) {
        //     return res.status(401).send({message : "No Firdetails found"});
        // }
        res.send(result.rows)
        console.log(result.rows)
        // res.send(usernames)
        
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  });
  
  app.post("/api/getfirdetails_withid",authorize, async (req, res) => {
    // const SQL = `SELECT "FirNo","UnitName",year,fir_stage,"Complaint_Mode",place_of_offence,"Fir_Date","FIR_Type" FROM firdetails WHERE user_id = $1 limit $2`;
    const SQL = `SELECT "FirNo",district,"UnitName","beat_name",ioname,year,"Fir_Date",fir_stage,"FIR_Type","Complaint_Mode","CrimeGroup_Name","CrimeHead_Name","ActSection",place_of_offence,distance_from_ps FROM firdetails WHERE "FirNo" = $1 and user_id= $2`;
    const values = [req.body.FirNo, req.user.id];
    // console.log('user id '  ,req.user)
    // const values = [req.user.id];

    try {
        const result = await pool.query(SQL, values);
        // if (result.rows.length === 0) {
        //     return res.status(401).send({message : "No Firdetails found"});
        // }
    console.log(result.rows)

        res.send(result.rows)
        // console.log(result.rows)
        // res.send(usernames)
        
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  });


  app.post('/api/getdata',authorize, async (req, res) => {
    // const  officerName= req.body.Name
    // console.log(officerName);

    // SQL query with parameterized query
    const SQL = "SELECT ioname,fir_stage FROM firdetails WHERE user_id = $1 ";
    const values = [req.user.id,];

    try {
        // Executing parameterized query
        const result = await pool.query(SQL, values);
        if (result.rows.length > 0) {
            res.send(result.rows); // Send user data if found
        } else {
            res.status(401).send({ message: 'Invalid officer name' }); // Unauthorized status if user not found
        }
    } catch (error) {
        console.error('Error getting info:', error);
        res.status(500).send({ error: 'Error finding officer data' });
    }
});


app.post('/api/getofficerinfo',authorize, async (req, res) => {
    // const  officerName= req.body.Name
    // console.log(officerName);

    // SQL query with parameterized query
    const SQL = 'SELECT distinct ioname FROM firdetails WHERE user_id = $1 ';
    const values = [req.user.id,];

    try {
        // Executing parameterized query
        const result = await pool.query(SQL, values);
        if (result.rows.length > 0) {
            res.send(extractRank(result.rows)); // Send user data if found
        } else {
            res.status(401).send({ message: 'Invalid officer name' }); // Unauthorized status if user not found
        }
    } catch (error) {
        console.error('Error getting info:', error);
        res.status(500).send({ error: 'Error finding officer data' });
    }
});

  app.post('/api/getdata_withid',authorize, async (req, res) => {
    const  id= req.body.id
    // console.log(officerName);

    // SQL query with parameterized query
    const SQL = "SELECT ioname,fir_stage FROM firdetails WHERE user_id = $1 ";
    const values = [id,];

    try {
        // Executing parameterized query
        const result = await pool.query(SQL, values);
        if (result.rows.length > 0) {
            res.send(result.rows); // Send user data if found
        } else {
            res.status(401).send({ message: 'Invalid officer name' }); // Unauthorized status if user not found
        }
    } catch (error) {
        console.error('Error getting info:', error);
        res.status(500).send({ error: 'Error finding officer data' });
    }
});


app.post('/api/getofficerinfo_withid',authorize, async (req, res) => {
    const  id= req.body.id
    // console.log(officerName);

    // SQL query with parameterized query
    const SQL = 'SELECT distinct ioname FROM firdetails WHERE user_id = $1 ';
    const values = [id,];

    try {
        // Executing parameterized query
        const result = await pool.query(SQL, values);
        if (result.rows.length > 0) {
            res.send(extractRank(result.rows)); // Send user data if found
        } else {
            res.status(401).send({ message: 'Invalid officer name' }); // Unauthorized status if user not found
        }
    } catch (error) {
        console.error('Error getting info:', error);
        res.status(500).send({ error: 'Error finding officer data' });
    }
});


module.exports = app