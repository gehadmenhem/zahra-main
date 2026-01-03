const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const knexInstance = require("../db/dbConfig");
const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;
const {parentRegistration,parentLogin}=require("../controller/parentOperations/parentOperations")
// Register
// router.post('/registeruser', async (req, res) => {
//     try {
        
   
//     const { first_name, last_name, email_address, password } = req.body;
//     if (!first_name || !last_name || !email_address || !password) {
//         throw new Error("validation error: first_name, last_name, email_address, password")
//     }

//   const existing = await knexInstance('dbo.profile').where({ email_address }).first();
//   if (existing) return res.status(400).json({ message: 'Email already exists' });

//     const hashedPassword = await bcrypt.hash(password, 10);
//     const profile={first_name,last_name,email_address,password:hashedPassword}
//  const registeredUser=await registerUser(profile)

//         res.status(201).json({ message: 'User registered' });
//          }
//      catch (error) {
//            console.error(error.message);
//     res.status(500).json({ error: error?.message || error });
//     }
// });

router.route("/register").post(async (req, res) => {
  try {
    console.log("Incoming data:", req.body);

    const {
      first_name,
      last_name,
      email_address,
      phone_number,
      emergency_contact_name,
      emergency_contact_phone,
      province,
      city,
      postal_code,
      password
    } = req.body;

    // ✅ Validation
    if (
      !first_name ||
      !last_name ||
      !email_address ||
      !phone_number ||
      !emergency_contact_name ||
      !emergency_contact_phone ||
      !province ||
      !city ||
      !postal_code ||
      !password
    ) {
      return res.status(400).json({
        error: "Validation error: all fields are required",
      });
    }

    // 🔐 Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // ✅ Prepare data for DB
    const parentData = {
      first_name,
      last_name,
      email_address,
      phone_number,
      emergency_contact_name,
      emergency_contact_phone,
      province,
      city,
      postal_code,
      password: hashedPassword, // store hashed password
          
    };

    console.log("Prepared parent data:", parentData);

    // 💾 Call your registration service
    const result = await parentRegistration(parentData);

    res.status(201).json(result);
  } catch (error) {
    console.error("Register error:", error.message);
    res.status(500).json({ error: error.message || "Registration failed" });
  }
});

router.post("/login", async (req, res) => {
  try {
   
    const { email_address, password } = req.body?.loginData;

    // ✅ Validate input
    if (!email_address || !password) {
      return res.status(400).json({
        error: "Email and password are required",
      });
    }

    // ✅ Find user
    const user = await parentLogin({email_address})
    if (!user) {
      return res.status(401).json({
        error: "Invalid email or password",
      });
    }
    console.log(password)
    console.log(user.password)
    // 🔐 Compare password
    const isMatch = await bcrypt.compare(password, user.password);
console.log(isMatch)
    if (!isMatch) {
      return res.status(401).json({
        error: "Invalid email or password",
      });
    }

    // 🔑 Generate JWT (optional but recommended)
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // ✅ Success response (never return password)
    res.status(200).json({
      id: user.id,
      email_address: user.email_address,
      role: user.role,
      token,
    });
  } catch (error) {
    console.error("Login error:", error.message);
    res.status(500).json({ error: "Login failed" });
  }
});

// // Login
// router.post('/loginuser', async (req, res) => {
//   try {
//     const { email_address, password } = req.body;

//     if (!email_address || !password) {
//       return res.status(400).json({ message: "Email and password are required" });
//     }

//     const user = await knexInstance('dbo.profile').where({ email_address }).first();

//     if (!user) {
//       return res.status(401).json({ message: 'Invalid Email Address' });
//     }

//     const match = await bcrypt.compare(password, user.password);
//     if (!match) {
//       return res.status(401).json({ message: 'Invalid Password' });
//     }

//     const token = jwt.sign({ profile: email_address }, JWT_SECRET, { expiresIn: '1d' });

//     // Set cookie properly
//     res.cookie('token', token, {
//       httpOnly: true,              // ✅ More secure - prevents JS access
//       secure: true,                // ✅ Required for HTTPS
//       sameSite: 'None',            // ✅ Required for cross-site cookies
//       maxAge: 86400000             // 1 day
//       // domain: '.onrender.com'   // ❌ Usually unnecessary unless you're using subdomains
//     });

//     res.json({ message: 'Login successful' });

//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: error.message || 'Internal Server Error' });
//   }
// });


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
