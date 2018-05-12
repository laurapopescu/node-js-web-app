const express = require('express'); 
const http = require('http'); 
const bodyParser = require('body-parser');
const path = require('path');
const passport = require('passport');
const config = require('./config/secret');
const mongoose = require('mongoose');
const models = require('./models/user');
const passportController = require('./config/passport');
const jwt = require('express-jwt');
const app = express();

const profileController = require('./controllers/profile');
const authenticationController = require('./controllers/authentication');

const auth = jwt({ 
    secret : config.secret,
    userProperty: 'payload'
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'dist')));

// app.use(session({
//     resave: true,
//     saveUninitialized: true,
//     secret: config.secret,
//     store: new MongoStore({ url: config.database, autoReconnect: true })
// }));

app.use(passport.initialize());

//routes
app.get('/api/profile', auth, profileController.profileRead);
app.post('/api/register', authenticationController.register);
app.post('/api/login', authenticationController.login);

app.get('/', (req, res) => { 
    res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

//database connection
mongoose.connect(config.database, function(err) { 
    if (err) console.log(err);

    console.log("Connected to the database");
})

app.set('port', config.port);
const server = http.createServer(app); 
server.listen(config.port, () => console.log(`Running on port ${config.port}`));