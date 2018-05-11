const mongoose = require('mongoose');

const User = mongoose.model('User');

module.exports.profileRead = function(req, res) {
    const userId = req.payload._id;
    
    if (!userId) { 
        res.status(401).json({ 
            "message": "Unauthorized user!"
        });
    }
    else { 
        User.findById(userId)
            .exec(function(err, user){ 
                res.status(200).json(user);
            })
        
    }
}