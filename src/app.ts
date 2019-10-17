import * as express from 'express';
import * as cors from 'cors';
import * as bodyparser from 'body-parser';
import * as path from 'path';
import * as mongoose from 'mongoose';
import { verifytoken } from './common/common';


const users = require('./controller/user');
const login = require('./controller/login');
const createRequest = require('./controller/createRequest');
const content = require('./controller/contentData');


const app = express();
app.use(cors());
app.use(bodyparser.json({limit: '50mb'}));

// Database connect
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true ,
    useFindAndModify: true
};

mongoose.connect('mongodb://localhost:27017/estimation_tools', options);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Unable to database connection error:'));
db.once('open', function callback () {
  console.log("connected database");
});

app.use('/login', login);
app.use('/user', verifytoken, users);
app.use('/createRequest', verifytoken, createRequest);
app.use('/content', verifytoken, content);


export {app};