//our dependensies
const express = require('express');
const app = express();
const { Pool } = require('pg');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwtGenerator = require('./utils/jwtGenerator')
const {getCurrentISTDateTimeISO,extractRank} = require('./utils/utiltiyFuntions')
const authorize = require('./middleware/authorize')
const cron = require('node-cron');
const classNames = require('classnames');
require('dotenv').config();


app.use(express.json());
app.use(cors());

//run the server
app.listen(5000,'0.0.0.0',() => {
  loadTasks();
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

let scheduledTasks = {};

app.use(express.json());
console.log(getCurrentISTDateTimeISO())
// Load all active tasks from the database and schedule them on startup
async function loadTasks() {
  const query = 'SELECT * FROM dutyscheduler';

  try {
    const result = await pool.query(query);
    const tasks = result.rows;
    tasks.forEach((task) => {
      scheduleTask(task);
    });
  } catch (err) {
    console.error(err);
  }
};


// Function to schedule a task
const scheduleTask = async (task) => {
//   if (task.is_active) {
    const taskId = cron.schedule(task.cron_time, async() => {
      console.log(`Task ${task.title} is running`);
      const isoDate = getCurrentISTDateTimeISO();
      const query = `INSERT INTO duties (title, description,userid) VALUES ($1, $2, $3) RETURNING *`;
//       const query = `UPDATE tasks SET "updatedAt" = $1, deadline= DATE_TRUNC('day', CURRENT_TIMESTAMP AT TIME ZONE 'Asia/Kolkata') + INTERVAL '1 day' - INTERVAL '1 second'
//  WHERE id = $2 RETURNING *`;
      const values = [task.title, task.description, task.userid];
      try {
        const result = await pool.query(query, values);
        const task = result.rows[0];
        console.log(task)
      } catch (err) {
        console.error(err);
      }
    });

    scheduledTasks[task.id] = taskId;
    console.log(`Task ${task.title} scheduled with cronTime ${task.cron_time}`);
//   }
};
app.get('/api/gettime', async(req,res)=>{
    const query = `SELECT * FROM duties`;
    try {
      const result = await pool.query(query);
      const duties = result.rows;
      res.json(duties);
    } catch (err) {
      console.error(err);
      res.status(500).send('Error fetching duties');
    }
})
app.get('/api/gettask', async(req,res)=>{
    const query = `SELECT * FROM duties`;
    try {
      const result = await pool.query(query);
      const duties = result.rows;
      res.json(duties);
    } catch (err) {
      console.error(err);
      res.status(500).send('Error fetching duties');
    }
})

app.post('/api/schedule-task', async (req, res) => {
    const { title, description,userid,cron_time, police_station } = req.body;
    // const task_id = uuidv4();
    const query = `INSERT INTO dutyscheduler (title, description,userid, cron_time,police_station) VALUES ($1, $2, $3, $4, $5) RETURNING *`;
    const values = [title, description,userid,cron_time,police_station];
  
    try {
      const result = await pool.query(query, values);
      const task = result.rows[0];
      await scheduleTask(task);
      res.send(task);
    } catch (err) {
      console.error(err);
      res.status(500).send('Error scheduling task');
    }
  });

app.post('/api/getOnboardOfficers', async (req, res) => {
    const { duty,cron_time } = req.body;
    // const task_id = uuidv4();
    
    // const query = `SELECT * FROM tasks WHERE title = $1 AND cron_time = $2`;
    const query = `SELECT distinct dt.id ,f.ioname, f.user_id
                  FROM dutyscheduler dt
                  JOIN firdetails f ON dt.userid = f.user_id
                  WHERE dt.title = $1  AND dt.cron_time = $2;`;
    const values = [duty,cron_time];
    console.log(values)
    // const newQuery = `Select distinct ioname,user_id from firdetails where user_id=$1 `;
    
    try {
      const result = await pool.query(query, values);
      // // res.send(result.rows[0]);
      // console.log(result.rows[0])
      // if(!result.rows[0]){
      //   return res.send([]);
      // }
      // const newresult = await pool.query(newQuery, [result.rows[0].userid]);
      res.send(result.rows);
    } catch (err) {
      console.error(err);
      res.status(500).send('Error fetching officers');
    }
  });

  // Endpoint to stop and remove a task
app.delete('/api/stop-task', async (req, res) => {
  const { task_id } = req.query;
  console.log({...req.body})
  const query = 'DELETE FROM dutyscheduler WHERE id = $1 RETURNING *';
  const values = [task_id];
  try {
    const result = await pool.query(query, values);
    const task = result.rows[0];
    if (task && scheduledTasks[task.id]) {
      scheduledTasks[task.id].stop();
      res.send(`Task ${task.title} has been stopped`);
    } else {
      res.send('Task not found or already stopped');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Error stopping task');
  }
});

app.post('/api/getactiveduties',authorize, async (req, res) => {
    const userId = req.user.id
    try {
      const result = await pool.query('SELECT * FROM duties WHERE userid = $1', [userId]);
      res.json(result.rows);
    } catch (err) {
      console.error(err.message);
    }
  });
app.post('/api/completeduty', async (req, res) => {
    const {task_id} = req.body;
    try {
      const result = await pool.query(`UPDATE duties SET completed = 'true',notified = 'true'  WHERE id = $1 returning *`, [task_id]);
      res.json(result.rows);
    } catch (err) {
      console.error(err.message);
    }
  });

app.get('/api/officers', async (req, res) => {
    const search = req.query.search || '';
    try {
      const result = await pool.query('SELECT id, username FROM users WHERE username ILIKE $1', [`%${search}%`]);
      res.json(result.rows);
    } catch (err) {
      console.error(err.message);
    }
  });

  // app.post('/api/assign-duty', async (req, res) => {
  //   const { officerId, duty, day } = req.body;
  //   try {
  //     const result = await pool.query(
  //       'INSERT INTO duties (officer_id, duty, day) VALUES ($1, $2, $3) RETURNING *',
  //       [officerId, duty, day]
  //     );
  //     res.json(result.rows[0]);
  //   } catch (err) {
  //     console.error(err.message);
  //   }
  // });

  // app.get('/api/officer-duties/:id', async (req, res) => {
  //   const { id } = req.params;
  //   try {
  //     const result = await pool.query('SELECT duty, day FROM duties WHERE officer_id = $1', [id]);
  //     res.json(result.rows);
  //   } catch (err) {
  //     console.error(err.message);
  //   }
  // });

//Getting Notifications 
app.post('/api/getofficersByPS', async (req, res) => {
    const { PS } = req.body;
    console.log(PS)
    try {
      //  is_read= 'false' AND 
      const result = await pool.query(`SELECT * FROM dutyscheduler WHERE police_station = $1`, [PS]);
      res.json(result.rows);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Error getting notifications');
    }
  });
app.get('/api/getnotifications',authorize, async (req, res) => {
  const  userId  = req.user.id
    try {
      //  is_read= 'false' AND 
      console.log({userId})
      const result = await pool.query(`SELECT * FROM notifications WHERE  is_read= 'false' AND  user_id = $1`, [userId]);
      res.json(result.rows);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Error getting notifications');
    }
  });
  
//Setting Notifications 
app.put('/api/setnotificationread', async (req, res) => {
    const { id } = req.body;
    try {
      const result = await pool.query(`UPDATE notifications SET is_read = 'true' WHERE id = $1 returning *`, [id]);
      res.json(result.rows[0]);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Error setting notification as read');
    }
  });

// Add this new endpoint to handle patrol log submissions
app.post('/api/submitbeatlog', authorize, async (req, res) => {
  const { beatName, beatId, date, patrolStart, patrolEnd, observations } = req.body;
  const userId = req.user.id; // Assuming you're using the authorize middleware

  const query = `
    INSERT INTO beat_logs (beat_name, beat_id, date, patrol_start, patrol_end, observations, user_id, created_at)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    RETURNING *
  `;

  const values = [
    beatName,
    beatId,
    date,
    patrolStart,
    patrolEnd,
    observations,
    userId,
    getCurrentISTDateTimeISO()
  ];

  try {
    const result = await pool.query(query, values);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error submitting patrol log:', err);
    res.status(500).json({ error: 'Failed to submit patrol log' });
  }
});

app.post('/api/getbeatlogs', authorize, async (req, res) => {
  const {id} = req.body;
  const userId = id ||  req.user.id; // Assuming you're using the authorize middleware

  const query = `select * from beat_logs where user_id=$1`;

  const values = [
    userId
  ];
  try {
    const result = await pool.query(query, values);
    res.status(200).json(result.rows);
  } catch (err) {
    console.error('Error submitting patrol log:', err);
    res.status(500).json({ error: 'Failed to submit patrol log' });
  }
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
        // res.send(usernames)
        
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  });
  app.post('/api/addfir', authorize, async (req, res) => {
    // Corrected SQL query with parameterized query
    // const SQL = 'INSERT INTO users (email, username, password,rank) VALUES ($1, $2, $3, $4) RETURNING *';
    // const SQL  = 'INSERT INTO firdetails (district, "FirNo", year, user_id) VALUES ($1, $2, $3, $4)'
    const SQL=`INSERT INTO firdetails (district, "UnitName", "FirNo", "RI", year, "Month", "Offence_From_Date", "Offence_To_Date", "FIR_Reg_DateTime", "Fir_Date", "FIR_Type", "fir_stage", "Complaint_Mode", "CrimeGroup_Name", "CrimeHead_Name", "Latitude", "Longitude", "ActSection", IOName, "KGID", "IOAssignment", "Internal_IO", place_of_offence, distance_from_ps, beat_name, village_area_name, male, female, boy, girl, age_0, victim_count, accused_count, arrested_male, arrested_female, arrested_count_no, accused_chargesheeted_count, conviction_count, fir_id, unit_id, crime_no,user_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, $28, $29, $30, $31, $32, $33, $34, $35, $36, $37, $38, $39, $40, $41, $42)`
    const values = req.body.firValues;
    values.push(req.user.id)
    try {
        const newFir = await pool.query(SQL, values);
        // Executing parameterized query
        // console.log(newUser.rows[0]);
        // res.send({ message: 'User added' });
        res.status(200).json({ message: 'Scuccessfully Fir registered' });
    } catch (error) {
        console.error('Error adding Fir:', error);
        // res.status(500).send({ error: 'Error inserting user' });
        console.log(error)
        res.status(404).json({ error: 'Error occured while Adding Fir' });
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
    const  id= req.body.id || req.user.id
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
    const  id= req.body.id || req.user.id
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

app.post('/api/getconviction',authorize, async (req, res) => {
    const  id= req.body.id || req.user.id
    // console.log(officerName);

    // SQL query with parameterized query
    const SQL = 'SELECT accused_chargesheeted_count, conviction_count FROM firdetails WHERE accused_chargesheeted_count > 0 and conviction_count> 0 and user_id = $1 ';
    const values = [id,];

    try {
        // Executing parameterized query
        const result = await pool.query(SQL, values);
            res.send(result.rows); // Send user data if found
    } catch (error) {
        console.error('Error getting info:', error);
        res.status(500).send({ error: 'Error finding officer data' });
    }
});
const substringsToRemove = ['Dist', 'Sub-Dist', 'Region','TOWN','City','PS'];
function removeSubstringsFromTwoStrings(string1, string2) {
    const removeSubstrings = (originalString) => {
      let resultString = originalString;
  
      substringsToRemove.forEach(substring => {
        const regex = new RegExp(substring, 'g');
        resultString = resultString.replace(regex, '');
      });
  
      return resultString.trim();
    };
  
    const cleanedString1 = removeSubstrings(string1);
    const cleanedString2 = removeSubstrings(string2);
  
    return `${cleanedString1}, ${cleanedString2}, India`
}
app.post('/api/getcrimehotspot',authorize, async (req, res) => {
    const  id=  req.user.id
    // console.log(officerName);

    // SQL query with parameterized query
    const SQL = 'SELECT beat_name, district, village_area_name,"Latitude","Longitude" from firdetails where  user_id = $1';
    const values = [id,];

    try {
        // Executing parameterized quer
        const result = await pool.query(SQL, values);
        let newobj={}
        result.rows.forEach(item=>{
            if(!newobj[item.beat_name]?.crimeCount){
                newobj[item.beat_name]={...item,
                    crimeCount : (newobj[item.beat_name]?.crimeCount || 0)+ 1,
                    location: removeSubstringsFromTwoStrings(item.village_area_name,item.district),
                }
            }
            else {
                newobj[item.beat_name]={...newobj[item.beat_name],crimeCount : (newobj[item.beat_name]?.crimeCount || 0)+ 1}
            }
        })
        res.send(newobj); // Send user data if found
    } catch (error) {
        console.error('Error getting info:', error);
        res.status(500).send({ error: 'Error finding officer data' });
    }
});

app.post('/api/getresponsetime',authorize, async (req, res) => {
    const  id= req.body.id || req.user.id
    // console.log(officerName);

    // SQL query with parameterized query
    const SQL = 'SELECT CAST(AVG(response_time) AS INTEGER) as response_time from firdetails where user_id = $1 ';
    const values = [id,];

    try {
        // Executing parameterized query
        const result = await pool.query(SQL, values);
            res.send(result.rows[0]); // Send user data if found
    } catch (error) {
        console.error('Error getting info:', error);
        res.status(500).send({ error: 'Error finding officer data' });
    }
});
const cronJobexecute = async () => {
  console.log('Cron job running...'); // Log cron job execution
  // const currentISTDate = getISTDate();
  const currentISTDate = (new Date());
  console.log('Current IST Date:',currentISTDate ); // Log current IST date
  try {
      const res = await pool.query('SELECT * FROM duties WHERE completed = false AND notified = false AND deadline < $1', [currentISTDate]);
      const tasks = res.rows;
      console.log('Tasks:', tasks);
      for (const task of tasks) {
          const title= `Pending Task`;
          const message = `Task ${task.title} is overdue`;
          const Notification = await pool.query('INSERT INTO notifications (user_id, title, message) VALUES ($1, $2, $3) RETURNING * ', [task.userid,title, message]);
          const user = Notification.rows[0];
          console.log(Notification.rows[0])
          await pool.query('UPDATE duties SET notified = true WHERE id = $1', [task.id]);

          // if (user) {
          //     const transporter = nodemailer.createTransport({
          //         service: 'Gmail',
          //         auth: {
          //             user: 'atishsuslade@gmail.com',
          //             pass: 'iawl ulog vmqg uuok',
          //         },
          //     });

          //     const mailOptions = {
          //         from: 'atishsuslade@gmail.com',
          //         to: user.email,
          //         subject: 'Task Deadline Notification',
          //         text: `The task "${task.title}" is overdue. Please complete it as soon as possible.`,
          //     };

          //     transporter.sendMail(mailOptions, async (error, info) => {
          //         if (error) {
          //             console.error('Error sending email:', error);
          //         } else {
          //             console.log('Email sent:', info.response);

          //             // Update task as notified
          //             await client.query('UPDATE tasks SET notified = true WHERE id = $1', [task.id]);
          //         }
          //     });
          // }
      }
  } catch (error) {
      console.error('Error executing query:', error);
  }
}

cron.schedule('* * * * *',cronJobexecute);
module.exports = app