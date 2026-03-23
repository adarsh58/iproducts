const express = require('express');
const router = express.Router();
const fetchUser = require('../Middleware/FetchUser');
const User = require('../Model/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || "iproductsapp";


// TESTING API -http://localhost:5000/api/auth/
router.get('/', async (req, res) => {
    res.send("API IS UP And running");
})


router.post('/CreateUser', [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password length should be more than and equal to 5').isLength({ min: 5 })
], async (req, res) => {
        // If there are errors, return Bad request and the errors
        const errors = validationResult(req);   
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }   
        try {
            // Check whether the user with this email exists already
            let user = await User.findOne({ email: req.body.email });
            if (user) {
                return res.status(400).json({ error: "Sorry, a user with this email already exists" });
            }
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(req.body.password, salt);
            user = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: hashedPassword
            });
            const data = {
                user: {
                    id: user.id
                }
            };
            const token  = jwt.sign(data, JWT_SECRET);
            res.status(200).json({success : true, message: "User added successfully!" ,token});
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error");
        }
    });


    router.post('/LoginUser', [
        body('email', 'Enter a valid email').isEmail(),
        body('password', 'Password cannot be blank').exists()
    ], async (req, res) => {
        // If there are errors, return Bad request and the errors
        console.log(req.body);
        const errors = validationResult(req);   
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        console.log('success validation');
        const { email, password } = req.body;
        try {
            let user = await User.findOne({ email });
            console.log('user ', user);
            if (!user) {
                return res.status(400).json({ error: "Please try to login with correct credentials" });
            }
            const isPasswordMatch = await bcrypt.compare(password, user.password);
             console.log('isPasswordMatch ', isPasswordMatch);
            if (!isPasswordMatch) {
                return res.status(400).json({ error: "Please try to login with correct credentials" });
            }
            console.log('isPasswordMatch end ');
            const data = {
                user: {
                    id: user.id
                }
            };
             console.log('data',data);
            const token = jwt.sign(data, JWT_SECRET);
            console.log('token',token);
            res.status(200).json({ success: true, message: "Login successful!", token,user: user.name });   
        } catch (error) {
            console.error('catch', error.message, error);
            res.status(500).json({ success: false, message: 'Internal Server Error', error: error.message });
        }
    });


    router.get('/GetUser', fetchUser, async (req, res) => {
        try {
            const userId = req.user.id;
            const user = await User.findById(userId).select("-password");
            res.status(200).json(user);
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error");
        }
        });

        router.get('/deleteUser', fetchUser, async (req, res) => {
            try {
                const userId = req.user.id;
                await User.findByIdAndDelete(userId);
                res.status(200).json({ success: true, message: "User deleted successfully!" });
            } catch (error) {
                console.error(error.message);
                res.status(500).send("Internal Server Error");
            }
        
        });


module.exports = router; 