const express = require("express");
const PouchDB = require("pouchdb");
const cors = require("cors");
const users = require("./users.json");
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const db = new PouchDB("users-local");

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

db.bulkDocs(users);

app.get("/users", (req, res) => {
  if (req.query.limit) {
    let pageSize = parseInt(req.query.limit);
    let options = {
      limit: pageSize,
      skip: parseInt(req.query.offset) * pageSize,
      include_docs: true,
    };
    db.allDocs(options)
      .then((data) => {
        res.send(data);
      })
      .catch((err) => res.send(err));
  } else {
    db.allDocs({ include_docs: true })
      .then((data) => {
        res.send(data);
      })
      .catch((err) => res.send(err));
  }
});

app.get("/users/:id", (req, res) => {
  db.get(req.params.id)
    .then((document) => {
      res.send(document);
    })
    .catch((err) => res.send(err));
});

app.post("/users", (req, res) => {
  db.allDocs({ include_docs: true, limit: 1, descending: true })
    .then((data) => {
      let highestIndex = data.rows[0].doc?.id;
      let newId = new Date().getTime().toString();
      db.put({ _id: newId.toString(), id: highestIndex + 1, ...req.body })
        .then((data) => {
          res.send(data);
        })
        .catch((err) => res.send(err));
    })
    .catch((err) => res.send(err));
});

app.delete("/users/:id", (req, res) => {
  db.get(req.params.id)
    .then((doc) => {
      db.remove(doc)
        .then((data) => res.send(data))
        .catch((err) => res.send(err));
    })
    .catch((err) => res.send(err));
});

app.patch("/users/:id", (req, res) => {
  db.get(req.params.id)
    .then((doc) => {
      db.put({
        ...doc,
        ...req.body,
      })
        .then((updatedDoc) => res.send(updatedDoc))
        .catch((err) => res.send(err));
    })
    .catch((err) => res.send(err));
});
