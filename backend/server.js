const express = require("express");

const db = require("./db");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// db.pool.query(
//   `CREATE TABLE lists (
//   id INTEGER AUTO_INCREMENT
//   value TEXT,
//   PRIMARY KEY (id)
// )`,
//   (err, results, fields) => {
//     console.log(err);
//   }
// );

app.get("/api/values", (req, res) => {
  db.pool.query(`SELECT * FROM lists;`, (err, results, fields) => {
    if (err) return res.status(500).send(err);
    else return res.json(results);
  });
});

app.post("/api/value", function (req, res, next) {
  const sql = `INSERT INTO lists (value) VALUES(?)`;
  const param = [req.body.value];
  db.pool.query(sql, param, (err, results, fields) => {
    console.log("req.body.value: ", req.body.value);
    console.log("param", param);
    if (err) {
      console.log("에러발생");
      return res.status(500).send(err);
    } else return res.json({ success: true, value: req.body.value });
  });
});

app.listen(5000, () => {
  console.log("Listening on PORT 5000");
});
