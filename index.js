const express = require('express');
const app = express();

const driveUploadMiddleware = require('./driveUploadMiddleware');

// Configs
app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const dotenv = require('dotenv');
dotenv.config();

console.log(process.env.HOLA)


app.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.post('/upload', driveUploadMiddleware, (req, res) => { 
    res.json("Nice");
});


// 404
app.use((req, res, next) => {
    res.status(404).send("Page not found");
})

app.listen(8080, ()=> {
    console.log("Server listening on port 8080");
});

