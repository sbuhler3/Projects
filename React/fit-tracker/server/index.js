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

app.post("/register", (req, res) => {
  const userName = req.body.userName;
  const email = req.body.email;
  const age = req.body.age;
  const pwd = req.body.pwd;
  db.query(
    "INSERT INTO users (userName, email, age, pwd) VALUES (?,?,?,?)",
    [userName, email, age, pwd],
    (err, result) => {
      console.log(err);
    }
  );
});
app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
