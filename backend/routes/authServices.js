const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const knexInstance = require("../db/dbConfig");
const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;
const {registerUser} =require("../db/dbOperations");
const { errorMonitor } = require('nodemailer/lib/xoauth2');
// Register
router.post('/registeruser', async (req, res) => {
    try {
        
   
    const { first_name, last_name, email_address, password } = req.body;
    if (!first_name || !last_name || !email_address || !password) {
        throw new Error("validation error: first_name, last_name, email_address, password")
    }

  const existing = await knexInstance('dbo.profile').where({ email_address }).first();
  if (existing) return res.status(400).json({ message: 'Email already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const profile={first_name,last_name,email_address,password:hashedPassword}
 const registeredUser=await registerUser(profile)

        res.status(201).json({ message: 'User registered' });
         }
     catch (error) {
           console.error(error.message);
    res.status(500).json({ error: error?.message || error });
    }
});

// Login
router.post('/loginuser', async (req, res) => {
  try {
    const { email_address, password } = req.body;

    if (!email_address || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await knexInstance('dbo.profile').where({ email_address }).first();

    if (!user) {
      return res.status(401).json({ message: 'Invalid Email Address' });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ message: 'Invalid Password' });
    }

    const token = jwt.sign({ profile: email_address }, JWT_SECRET, { expiresIn: '1d' });

    // Set cookie properly
    res.cookie('token', token, {
      httpOnly: true,              // ✅ More secure - prevents JS access
      secure: true,                // ✅ Required for HTTPS
      sameSite: 'None',            // ✅ Required for cross-site cookies
      maxAge: 86400000             // 1 day
      // domain: '.onrender.com'   // ❌ Usually unnecessary unless you're using subdomains
    });

    res.json({ message: 'Login successful' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message || 'Internal Server Error' });
  }
});


// // Logout
// router.post('/logout', (req, res) => {
//   res.clearCookie('token');
//   res.json({ message: 'Logged out' });
// });

// Authenticated route
router.get('/me', async (req, res) => {
    console.log('inside me')
    
    const token = req.cookies.token;
    console.log(token)
  if (!token) return res.status(401).json({ message: 'Not authenticated' });

  try {
      const decoded = jwt.verify(token, JWT_SECRET);
      console.log(decoded)
      const user = await knexInstance('dbo.profile').where({ email_address: decoded.profile }).first();
      console.log(user)
    res.json(user);
  } catch {
    res.status(401).json({ message: 'Invalid token' });
  }
});

module.exports = router;
