require("dotenv").config();
const express = require("express");
const connections = require("./db.js");

const app = express();
const { server_port } = process.env;
const things = [
  { id: 1, name: "Socks" },
  { id: 2, name: "Computer" },
  { id: 3, name: "Passion" },
];

app.get("/things/:id", (req, res) => {
  const parsedThingId = parseInt(req.params.id);
  const thing = things.find((thing) => thing.id === parsedThingId);
  if (thing) {
    res.send(thing);
  } else {
    res.sendStatus(404);
  }
});

app.get("/", (req, res) => {
  res.send("welcome to the  home page");
});

app.get("/products/:id", (req, res) => {
  let { id } = req.params;
  connections
    .promise()
    .query("SELECT * FROM `products` WHERE product_id = ? ", [id])
    .then(([results]) => {
      if (!results.length) {
        res.status(404).send({
          status: "404",
          msg: "not found",
          data: null,
        });
      } else {
        res.json(results);
      }
    })
    .catch((err) => {
      console.error(err);
      res.status("500").send("eroooorrrrrr");
    });
});

app.listen(server_port, (e) => {
  if (e) {
    console.log("running");
  } else {
    console.log("listening on port", server_port);
  }
});
app.post("/products", (req, res) => {
  //   let { id } = req.params;
  connections
    .promise()
    .query("INSER INTO products (title, price) VALUES (?,?)", [title, price])
    .then(([result]) => {
      const createProduct = { id: result.insertId, title, price };
      res.status(201).json(createProduct);
    })
    .catch((err) => {
      console.error(err);
      res.status("500").send("eroooorrrrrr");
    });
});
