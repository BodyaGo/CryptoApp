const express = require("express");
const app = express();
const mysql = require("mysql2");

const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "root",
  database: "crypto",
});

app.post("/create", (req, res) => {
  const username = req.body.username;
  const age = req.body.age;
  const email = req.body.email;
  const password = req.body.password;

  db.query(
    "INSERT INTO users (username, age, email, password) VALUES (?,?,?,?)",
    [username, age, email, password],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
});

app.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  db.query(
    "SELECT * FROM users WHERE email = ? AND password = ?",
    [email, password],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        if (result.length > 0) {
          res.send({ message: "Login successful", user: result[0] });
        } else {
          res.status(401).send({ message: "Invalid credentials" });
        }
      }
    }
  );
});

app.get("/users", (req, res) => {
  db.query("SELECT * FROM users", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.post("/user-exists", (req, res) => {
  const email = req.body.email;

  db.query("SELECT * FROM users WHERE email = ?", [email], (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).send({ message: "Database error" });
    } else {
      if (results.length > 0) {
        res.send({ exists: true });
      } else {
        res.send({ exists: false });
      }
    }
  });
});

app.put("/update", (req, res) => {
  const id = req.body.id;
  const password = req.body.password;
  db.query(
    "UPDATE users SET password = ? WHERE id = ?",
    [password, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM users WHERE id = ?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.listen(3001, () => {
  console.log("Yey, your server is running on port 3001");
});
