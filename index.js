const express = require('express');

const app = express();

// Configs
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html");
});







app.listen(8080, ()=> {
    console.log("Server listening on port 8080");
});

