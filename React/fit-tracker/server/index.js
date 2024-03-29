const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
//const path = require("path");

const app = express();
//const _dirname = path.dirname("");
//const buildPath = path.join(_dirname, "../client/build");

//app.use(express.static(buildPath));

//app.get("/", function (req, res) {
//  res.sendFile(
//    path.join(_dirname, "../client/build/index.html"),
//    function (err) {
//      if (err) {
//        res.status(500).send(err);
//      }
//    }
//  );

//});

const PORT = process.env.PORT || 3001;

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
app.post("/login/hash", (req, res) => {
  const email = req.body.email;
  const q = `Select pwd,email from users where email=?`;

  db.query(q, [email], (err, data) => {
    if (err) return res.json(err);
    else {
      return res.json(data);
    }
  });
});

app.post("/login", (req, res) => {
  const email = req.body.email;
  const pwd = req.body.hashedPwd;

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
  let q = `SELECT * FROM strength WHERE month = ${month} AND user_id = ${id} ORDER BY date`;
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    else {
      res.status(200).send({ data });
    }
  });
});
//order by date desc
app.get("/strength/:month/:id/desc", (req, res) => {
  let month = req.params.month;
  let id = req.params.id;
  let q = `SELECT * FROM strength WHERE month = ${month} AND user_id = ${id} ORDER BY date DESC`;
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    else {
      res.status(200).send({ data });
    }
  });
});
//order by exercise asc
app.get("/strength/:month/:id/exercise-a", (req, res) => {
  let month = req.params.month;
  let id = req.params.id;
  let q = `SELECT * FROM strength WHERE month = ${month} AND user_id = ${id} ORDER BY exercise`;
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    else {
      res.status(200).send({ data });
    }
  });
});
//order by exercise desc
app.get("/strength/:month/:id/exercise-d", (req, res) => {
  let month = req.params.month;
  let id = req.params.id;
  let q = `SELECT * FROM strength WHERE month = ${month} AND user_id = ${id} ORDER BY exercise DESC`;
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    else {
      res.status(200).send({ data });
    }
  });
});
//order by sets asc
app.get("/strength/:month/:id/sets-a", (req, res) => {
  let month = req.params.month;
  let id = req.params.id;
  let q = `SELECT * FROM strength WHERE month = ${month} AND user_id = ${id} ORDER BY sets`;
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    else {
      res.status(200).send({ data });
    }
  });
});
//order by sets desc
app.get("/strength/:month/:id/sets-d", (req, res) => {
  let month = req.params.month;
  let id = req.params.id;
  let q = `SELECT * FROM strength WHERE month = ${month} AND user_id = ${id} ORDER BY sets DESC`;
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    else {
      res.status(200).send({ data });
    }
  });
});
//order by reps asc
app.get("/strength/:month/:id/reps-a", (req, res) => {
  let month = req.params.month;
  let id = req.params.id;
  let q = `SELECT * FROM strength WHERE month = ${month} AND user_id = ${id} ORDER BY reps`;
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    else {
      res.status(200).send({ data });
    }
  });
});
//order by reps desc
app.get("/strength/:month/:id/reps-d", (req, res) => {
  let month = req.params.month;
  let id = req.params.id;
  let q = `SELECT * FROM strength WHERE month = ${month} AND user_id = ${id} ORDER BY reps DESC`;
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    else {
      res.status(200).send({ data });
    }
  });
});
//order by resistance asc
app.get("/strength/:month/:id/res-a", (req, res) => {
  let month = req.params.month;
  let id = req.params.id;
  let q = `SELECT * FROM strength WHERE month = ${month} AND user_id = ${id} ORDER BY resistance +0`;
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    else {
      res.status(200).send({ data });
    }
  });
});
//order by resistance asc
app.get("/strength/:month/:id/res-d", (req, res) => {
  let month = req.params.month;
  let id = req.params.id;
  let q = `SELECT * FROM strength WHERE month = ${month} AND user_id = ${id} ORDER BY resistance +0 desc`;
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

// START BACKEND FOR CARDIO

app.post("/cardio", (req, res) => {
  const id = req.body.id;
  const date = req.body.date;
  const month = req.body.month;
  const exercise = req.body.exercise;
  const time = req.body.time;
  const user_id = req.body.user_id;

  const q =
    "INSERT INTO cardio (id, date, month, exercise, time, user_id) VALUES (?,?,?,?,?,?)";
  db.query(q, [id, date, month, exercise, time, user_id], (err, data) => {
    if (err) return res.json(err);
    else {
      res.status(200).json({
        id,
        date,
        month,
        exercise,
        time,
        user_id,
      });
    }
  });
});

//get records
app.get("/cardio", (req, res) => {
  const q = "SELECT * FROM cardio";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    else {
      res.status(200).send({ data });
    }
  });
});

//get records based on month and userID
app.get("/cardio/:month/:id", (req, res) => {
  let month = req.params.month;
  let id = req.params.id;
  let q = `SELECT * FROM cardio WHERE month = ${month} AND user_id = ${id} ORDER BY date`;
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    else {
      res.status(200).send({ data });
    }
  });
});
//order by date desc
app.get("/cardio/:month/:id/desc", (req, res) => {
  let month = req.params.month;
  let id = req.params.id;
  let q = `SELECT * FROM cardio WHERE month = ${month} AND user_id = ${id} ORDER BY date DESC`;
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    else {
      res.status(200).send({ data });
    }
  });
});
//order by exercise asc
app.get("/cardio/:month/:id/exercise-a", (req, res) => {
  let month = req.params.month;
  let id = req.params.id;
  let q = `SELECT * FROM cardio WHERE month = ${month} AND user_id = ${id} ORDER BY exercise`;
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    else {
      res.status(200).send({ data });
    }
  });
});
//order by exercise desc
app.get("/cardio/:month/:id/exercise-d", (req, res) => {
  let month = req.params.month;
  let id = req.params.id;
  let q = `SELECT * FROM cardio WHERE month = ${month} AND user_id = ${id} ORDER BY exercise DESC`;
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    else {
      res.status(200).send({ data });
    }
  });
});
//order by time asc
app.get("/cardio/:month/:id/time-a", (req, res) => {
  let month = req.params.month;
  let id = req.params.id;
  let q = `SELECT * FROM cardio WHERE month = ${month} AND user_id = ${id} ORDER BY time`;
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    else {
      res.status(200).send({ data });
    }
  });
});
//order by time desc
app.get("/cardio/:month/:id/time-d", (req, res) => {
  let month = req.params.month;
  let id = req.params.id;
  let q = `SELECT * FROM cardio WHERE month = ${month} AND user_id = ${id} ORDER BY time DESC`;
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    else {
      res.status(200).send({ data });
    }
  });
});
//update records
app.put("/cardio/update/:id", (req, res) => {
  let q = `UPDATE cardio SET 
  date = '${req.body.date}',
  exercise = '${req.body.exercise}',
  time = '${req.body.time}'
  WHERE id = '${req.params.id}'`;

  db.query(q, (err, data) => {
    if (err) return res.json(err);
    else {
      res.status(200).json("Successfully updated record");
    }
  });
});

//delete records
app.delete("/cardio/delete/:id", (req, res) => {
  let q = `DELETE FROM cardio WHERE id = '${req.params.id}'`;
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    else {
      res.status(200).json("Successfully deleted record");
    }
  });
});

app.delete("/cardio/delete", (req, res) => {
  let q = `DELETE FROM cardio`;
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    else {
      res.status(200).json("Successfully deleted all records");
    }
  });
});

//END CARDIO PAGE BACKEND

app.delete("/delete", (req, res) => {
  let q = "Delete from users";
  db.query(q, (err, res) => {
    if (err) return res.json(err);
  });
});
