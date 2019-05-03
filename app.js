const express = require('express');
const bodyParser = require('body-parser');
var dotenv = require('dotenv');
dotenv.config();
const report = require('./routes/report.route'); 
const app = express();
const router = express.Router();

//mongoose connection
const mongoose = require('mongoose');
let dev_db_url = 'mongodb://'+process.env.DATABASE_NAME+':'+process.env.DATABASE_PASSWORD+'@ds153763.mlab.com:53763/db1';
let mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB, {useNewUrlParser: true});
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/reports', report);

let port = 1234;

app.listen(port, () => {
    console.log('Server is up and running on port numner ' + port);
});

app.get('/getReports',(req,res)=>{
    db.collection("reports").find({}).toArray((err,documents)=>{
        if(err)
         console.log(err);
        else{
            console.log(documents);
            res.json(documents);
        }
    });
});


