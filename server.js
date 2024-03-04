const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

const mongoose = require('mongoose')
const budgetModel = require('./models/budget_schema')

let url = 'mongodb://127.0.0.1:27017/personal_budget_mongodb';
app.use('/', express.static('public'));


app.get('/hello', (req, res) => {
    res.send('Hello World!');
})

// app.get('/budget', (req, res) => {
//     res.json(budget);
// });

mongoose
  .connect(url)
  .then(() => {
    console.log("Connected to the Database");
  })
  .catch((err) => {
    console.error("Error connecting to the Database:", err);
  });

  app.get("/budget", (req, res) => {
    budgetModel
      .find({})
      .then((data) => {
        res.json(data);
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
      });
  });
  
  app.post("/budget", (req, res) => {
    const data = req.body;
  
    Promise.all(
      data.map((obj) => {
        const newItem = new budgetModel(obj);
        return newItem.save();
      })
    )
      .then((newAdd) => {
        res.json("Added data Successfully");
        console.log(newAdd);
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
      });
  });

app.listen(port, () => {
    console.log(`API served at at http://localhost:${port}`);
})