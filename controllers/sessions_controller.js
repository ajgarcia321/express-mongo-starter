const bcrypt = require('bcrypt')
const express = require('express')
const sessions = express.Router()
const User = require('../models/users.js')

sessions.get('/new', (req, res) => {
    res.render('sessions/new.ejs', {
        currentUser: req.session.currentUser
    })
})

sessions.post('/', (req,res) => {
    User.findOne({username: req.body.username}, (err, foundUser) => {
        //Database error
        if (err) {
            console.log(err);
            res.send('Oops the DB had a problem')
        // User not found
        } else if (!foundUser) {
            res.send('<a href="/">Sorry, no user found</a>')
        // Lets check the password of a found user
        } else {
            if (bcrypt.compareSync(req.body.password, foundUser.password)){
                req.session.currentUser = foundUser
                console.log("Successful Login");
                res.redirect('/')
            } else {
                // Passwords do not math
                res.send('<a href="/">Password does not match</a>')
            }
        }
    })
})

sessions.delete('/', (req, res) => {
    req.session.destroy(() => {
        console.log("Successful Logout");
        res.redirect('/')
    })
})

module.exports = sessions
