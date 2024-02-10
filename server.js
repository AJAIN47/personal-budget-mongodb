const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;
const budget = require("./mock-data.json");

app.use('/', express.static('public'));
app.use(cors());


app.get('/hello', (req, res) => {
    res.send('Hello World!');
})

app.get('/budget', (req, res) => {
    res.json(budget);
});

app.listen(port, () => {
    console.log(`API served at at http://localhost:${port}`);
})