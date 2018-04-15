const express = require('express'); 
const http = require('http'); 
const bodyParser = require('body-parser');
const path = require('path');


const api = require('./routes/api');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'dist'))); 
app.use('/api', api); 

app.get('*', (req, res) => { 
    res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

const port = process.env.PORT || '3000'; 
app.set('port', port);

const server = http.createServer(app); 
server.listen(port, () => console.log(`Listening on local port ${port}`));