const express = require('express');
const router = express.Router();


router.get('/', (req, res) => { 
    res.send('client/dist/index.html')
});


module.exports = router;