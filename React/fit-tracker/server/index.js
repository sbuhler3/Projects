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

app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
