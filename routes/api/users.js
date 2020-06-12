const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport') //To protect routes
const KEY = require('../../config/keys').secret
const User = require('../../model/User')

/**
 * @route POST api/users/register
 * @desc Register the User
 * @access Public
 */
router.post('/register', (req, res) => {
    let { name, username, email, password, confirm_password } = req.body
    if (password !== confirm_password) {
        return res.status(400).json({
            msg: "Password do not match."
        })
    }

    //Check for the unique UserName
    User.findOne({ username: username }).then(user => {
        if (user) {
            return res.status(400).json({
                msg: "Username is already taken."
            })
        }
    })

    //Check for the unique Email
    User.findOne({ email: email }).then(user => {
        if (user) {
            return res.status(400).json({
                msg: "Email is already taken."
            })
        }
    })

    //The data is valid and now we can register user
    let newUser = new User({
        name,
        username,
        email,
        password
    });

    //Hash the password
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) {
                throw err;
            } else {
                newUser.password = hash;
                newUser.save().then(user => {
                    return res.status(201).json({
                        success: true,
                        msg: 'User Registered successfully'
                    })
                })
            }
        })
    })
})

/**
 * @route POST api/users/login
 * @desc Signing the User
 * @access Public
 */
router.post('/login', (req, res) => {
    User.findOne({ username: req.body.username }).then(user => {
        if (!user) {
            return res.status(404).json({
                msg: 'Username is invalid',
                success: false
            })
        }

        //If we find the user then we will compare the password
        bcrypt.compare(req.body.password, user.password).then(isMatch => {
            if (isMatch) {
                //User's password is correct and we need to send the JSON Token for that user
                const payload = {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    username: user.username
                }
                jwt.sign(payload, KEY, {
                    expiresIn: 604800
                }, (err, token) => {
                    res.status(200).json({
                        success: true,
                        user: user,
                        token: `Bearer ${token}`,
                        msg: 'You are now logged In'
                    })
                })
            } else {
                res.status(404).json({
                    msg: 'Password is invalid',
                    success: false
                })
            }
        })
    })
})

/**
 * @route GET api/users/profile
 * @desc Return User profile Data
 * @access Private
 */
router.get('/profile', passport.authenticate('jwt', { session: false }), (req, res) => {
    return res.json({
        user : req.user
    })
})

module.exports = router;