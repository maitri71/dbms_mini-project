const express = require("express");

const mysql = require("mysql2");

const cors = require("cors");

const multer = require("multer");

const path = require("path");

const app = express();

app.use(cors());

app.use(express.json());

app.use(
  "/uploads",
  express.static("uploads")
);



// ======================
// MYSQL CONNECTION
// ======================

const db = mysql.createConnection({

  host: "localhost",

  user: "root",

  password: "root123",

  database: "time_capsule_db",
  port: 3307
});

db.connect((err) => {

  if (err) {

    console.log(err);

  } else {

    console.log(
      "MySQL Connected Successfully"
    );
  }
});



// ======================
// MULTER IMAGE STORAGE
// ======================

const storage = multer.diskStorage({

  destination: (req, file, cb) => {

    cb(null, "uploads/");
  },

  filename: (req, file, cb) => {

    cb(
      null,
      Date.now() +
        path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage,
});



// ======================
// REGISTER API
// ======================

app.post("/register", (req, res) => {

  const { email, password } = req.body;

  const sql = `
    INSERT INTO users
    (email, password)

    VALUES (?, ?)
  `;

  db.query(
    sql,
    [email, password],

    (err, result) => {

      if (err) {

        console.log(err);

        res.status(500).json({
          error: err,
        });

      } else {

        res.json({
          message:
            "User Registered Successfully",
        });
      }
    }
  );
});



// ======================
// LOGIN API
// ======================

app.post("/login", (req, res) => {

  const { email, password } = req.body;

  const sql = `
    SELECT * FROM users

    WHERE email = ?
    AND password = ?
  `;

  db.query(
    sql,
    [email, password],

    (err, result) => {

      if (err) {

        console.log(err);

        res.status(500).json(err);

      } else {

        if (result.length > 0) {

          res.json({
            success: true,
            user: result[0],
          });

        } else {

          res.json({
            success: false,
            message:
              "Invalid Credentials",
          });
        }
      }
    }
  );
});



// ======================
// CREATE CAPSULE API
// ======================

app.post(
  "/create-capsule",

  upload.single("image"),

  (req, res) => {

    const {
      user_id,
      title,
      message,
      unlock_date,
    } = req.body;

    const image_url =
      req.file
        ? `http://localhost:5000/uploads/${req.file.filename}`
        : "";

    const sql = `
      INSERT INTO capsules
      (
        user_id,
        title,
        message,
        image_url,
        unlock_date
      )

      VALUES (?, ?, ?, ?, ?)
    `;

    db.query(
      sql,
      [
        user_id,
        title,
        message,
        image_url,
        unlock_date,
      ],

      (err, result) => {

        if (err) {

          console.log(err);

          res.status(500).json(err);

        } else {

          res.json({
            message:
              "Capsule Created Successfully",
          });
        }
      }
    );
  }
);



// ======================
// GET USER CAPSULES
// ======================

app.get(
  "/capsules/:userId",

  (req, res) => {

    const userId = req.params.userId;

    const sql = `
      SELECT * FROM capsules

      WHERE user_id = ?

      ORDER BY created_at DESC
    `;

    db.query(
      sql,
      [userId],

      (err, result) => {

        if (err) {

          console.log(err);

          res.status(500).json(err);

        } else {

          res.json(result);
        }
      }
    );
  }
);



// ======================
// GET SINGLE CAPSULE
// ======================

app.get(
  "/capsule/:id",

  (req, res) => {

    const id = req.params.id;

    const sql = `
      SELECT * FROM capsules

      WHERE id = ?
    `;

    db.query(
      sql,
      [id],

      (err, result) => {

        if (err) {

          console.log(err);

          res.status(500).json(err);

        } else {

          res.json(result[0]);
        }
      }
    );
  }
);



// ======================
// SERVER START
// ======================

app.listen(5000, () => {

  console.log(
    "Server running on port 5000"
  );
});