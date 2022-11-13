const app =  require("express")() ;
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");	
require("dotenv").config();
mongoose.Promise = global.Promise;

app.use(cors());

var port = process.env.PORT || 7000;

mongoose.Promise = global.Promise;

mongoose.connect(process.env.DATABASE, 
    async(err) => {
        if(err) throw err;
        console.log("connected to db");
    });

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

var v1 = require("./api/routes");

app.use("/api/v1", v1.router);

app.use(function(req, res) {
    res.status(404).send({url: req.originalUrl + ' not found'})
});

app.listen(port, ()=>{
    console.log(`Server is listening on: ${port}`);    
});

