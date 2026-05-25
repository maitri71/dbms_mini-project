const express = require("express");

const cors = require("cors");

const db = require("./db");

const app = express();

app.use(cors());

app.use(express.json());


// REGISTER API
app.post("/register", (req, res) => {

  const { email, password } = req.body;

  const sql =
    "INSERT INTO users (email, password) VALUES (?, ?)";

  db.query(sql, [email, password], (err, result) => {

    if (err) {

      res.status(500).json(err);

    } else {

      res.json({
        message: "User Registered Successfully"
      });
    }
  });
});


// LOGIN API
app.post("/login", (req, res) => {

  const { email, password } = req.body;

  const sql =
    "SELECT * FROM users WHERE email=? AND password=?";

  db.query(sql, [email, password], (err, result) => {

    if (err) {

      res.status(500).json(err);

    } else {

      if (result.length > 0) {

        res.json({
          success: true,
          user: result[0]
        });

      } else {

        res.json({
          success: false
        });
      }
    }
  });
});


// CREATE CAPSULE API
app.post("/create-capsule", (req, res) => {

  console.log(req.body);

  const {
    user_id,
    title,
    message,
    image_url,
    unlock_date
  } = req.body;

  const sql = `
    INSERT INTO capsules
    (user_id, title, message, image_url, unlock_date)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [
      user_id,
      title,
      message,
      image_url,
      unlock_date
    ],
    (err, result) => {

      if (err) {

        console.log(err);

        res.status(500).json(err);

      } else {

        res.json({
          message: "Capsule Created Successfully"
        });
      }
    }
  );
});


// GET CAPSULES API
app.get("/capsules/:id", (req, res) => {

  const userId = req.params.id;

  const sql =
    "SELECT * FROM capsules WHERE user_id=?";

  db.query(sql, [userId], (err, result) => {

    if (err) {

      res.status(500).json(err);

    } else {

      res.json(result);
    }
  });
});


app.listen(5000, () => {

  console.log("Server Running on Port 5000 🚀");

});