// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express(); 

/*dependencies */
const bodyParser = require('body-parser')

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');

app.use(cors());
// Initialize the main project folder
app.use(express.static('dist'));

app.get('/',function (req, res){
    res.sendFile('dist/index.html');
})

// Setup Server
const port = 8080;
 app.listen(port,listening);
function listening(){
    console.log("server running")
    console.log(`running on localhost:${port}`);
}

//get route
app.get('/all', getData);
function getData(req, res) {
    console.log(req.body);
    res.send(projectData);
}
 
 
//post route

app.post('/add', function(req, res){
    newData  = req.body;
        Object.assign(projectData, newData);
       res.send(projectData);
})
