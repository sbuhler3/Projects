const express = require("express");
const cors = require("cors");
const mysql = require("mysql");

const PORT = process.env.PORT || 3001;

const app = express();

app.use(cors());

app.use(express.json());

const db = mysql.createConnection({
  user: "newuser",
  host: "localhost",
  password: "fitpassword",
  database: "fitTrack",
});
//REGISTER

app.post("/register", (req, res) => {
  const userName = req.body.userName;
  const email = req.body.email;
  const age = req.body.age;
  const pwd = req.body.pwd;
  //CHECK EXISTING USER
  const q = "SELECT * FROM users WHERE email = ?";

  db.query(q, email, (err, data) => {
    if (err) return res.json(err);
    if (data.length) return res.status(409).json("user exists");

    const q = "INSERT INTO users (userName, email, age, pwd) VALUES (?,?,?,?)";
    db.query(q, [userName, email, age, pwd], (err, data) => {
      if (err) return res.json(err);
      return res.status(200).json({ userName, email, age, pwd });
    });
  });
});

//LOGIN

app.post("/login", (req, res) => {
  const email = req.body.email;
  const pwd = req.body.pwd;

  const q = "SELECT * FROM users WHERE email=? AND pwd=?";
  db.query(q, [email, pwd], (err, data) => {
    if (err) return res.json(err);

    if (data.length) {
      res.status(200).json(data[0]);
    } else {
      res.status(404).json("User/password combination does not exist");
    }
  });
});

// START BACKEND FOR STRENGTH

app.post("/strength", (req, res) => {
  const id = req.body.id;
  const date = req.body.date;
  const month = req.body.month;
  const exercise = req.body.exercise;
  const sets = req.body.sets;
  const reps = req.body.reps;
  const resistance = req.body.resistance;
  const user_id = req.body.user_id;

  const q =
    "INSERT INTO strength (id, date, month, exercise, sets, reps, resistance, user_id) VALUES (?,?,?,?,?,?,?,?)";
  db.query(
    q,
    [id, date, month, exercise, sets, reps, resistance, user_id],
    (err, data) => {
      if (err) return res.json(err);
      else {
        res.status(200).json({
          id,
          date,
          month,
          exercise,
          sets,
          reps,
          resistance,
          user_id,
        });
      }
    }
  );
});

//get records
app.get("/strength", (req, res) => {
  const q = "SELECT * FROM strength";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    else {
      res.status(200).send({ data });
    }
  });
});

//get records based on month and userID
app.get("/strength/:month/:id", (req, res) => {
  let month = req.params.month;
  let id = req.params.id;
  let q = `SELECT * FROM strength WHERE month = ${month} AND user_id = ${id}`;
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    else {
      res.status(200).send({ data });
    }
  });
});

//update records
app.put("/strength/update/:id", (req, res) => {
  let q = `UPDATE strength SET 
  date = '${req.body.date}',
  exercise = '${req.body.exercise}',
  sets = ${req.body.sets},
  reps = ${req.body.reps},
  resistance = '${req.body.resistance}'
  WHERE id = '${req.params.id}'`;

  db.query(q, (err, data) => {
    if (err) return res.json(err);
    else {
      res.status(200).json("Successfully updated record");
    }
  });
});

//delete records
app.delete("/strength/delete/:id", (req, res) => {
  let q = `DELETE FROM strength WHERE id = '${req.params.id}'`;
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    else {
      res.status(200).json("Successfully deleted record");
    }
  });
});

app.delete("/strength/delete", (req, res) => {
  let q = `DELETE FROM strength`;
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    else {
      res.status(200).json("Successfully deleted all records");
    }
  });
});

//END STRENGTH PAGE BACKEND
app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
