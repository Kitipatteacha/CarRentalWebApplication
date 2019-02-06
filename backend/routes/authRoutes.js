const passport = require('passport')
const mongoose = require('mongoose');
const User = mongoose.model('users')
const requireLogin = require('../middlewares/requireLogin')

module.exports = (app) => {
    app.get('/auth/google', // login with google
        passport.authenticate('google', {
            scope: ['profile', 'email']
        })
    )
    app.post('/auth/local', (req, res) => // signup with local
        {   //console.log(req.body)
            User.register(new User({username: req.body.username}), req.body.password, (err, user) => {
            if (err) {
                console.log(err);
                return res.redirect('/')
            }
            passport.authenticate('local')(req, res, function() {
                res.redirect('/')
            })
        })}
    )
    app.post('/auth/login', 
        passport.authenticate('local', {
            successRedirect : "/",
            failureRedirect : "/failure"
        }), (req, res) => {

        }
    )
        

    app.get( // callback after succesfully login
        '/auth/google/callback',
        passport.authenticate('google'),
        (req, res) => {
            res.redirect('/')
        }
    )

    app.get('/api/logout', (req, res) => { // logout 
        req.logout();
        res.redirect('/');
    })

    app.get('/api/current_user', (req, res) => { // get current user
        res.send(req.user);
    })

    app.post('/api/authentication', requireLogin, async (req, res) => {
        const { tel,
            idCardNum,
            DLicenseNumber,
            isAuthenticated } = req.body
        console.log(tel,
            idCardNum,
            DLicenseNumber,
            isAuthenticated)
        const user = await User.findByIdAndUpdate(req.user["_id"], {
            $set: {
                tel,
                idCardNum,
                DLicenseNumber,
                isAuthenticated
            }
        }, (err, result) => {
            if (err) {
                console.log(err);
            }
        })
        console.log(user)
        res.send(user);

    })
}