const mongoose = require('mongoose');
const passport = require('passport');
const Strategy = require('passport-local').Strategy;

const User = mongoose.model('User');

passport.use(new Strategy(
    {
        usernameField: 'email'
    }, 
    
    function (username, password, done) {
        User.findOne({ email: username }, function (err, user) {
            if (err) {
                return done(err);
            }

            if (!user) {
                return done(null, false, {
                    message: 'User not found!'
                });
            }

            if (!user.verifyPassword(password)) {
                return done(null, false, {
                    message: 'Invalid password!'
                });
            }

            return done(null, user);
        });
    }
));
