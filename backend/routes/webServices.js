const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const router = express.Router();
const multer =require("multer")
const { registerInventory, getUser, getInventory,getInventoryImages,getReviews } = require("../db/dbOperations");
const { base64ImageToBuffer } = require("../controller/getImages/getImagesConverttoBuffer")
const {sendEmail} = require("../controller/sendingEmails/sendEmail")
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/", router);
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
router.use((req, res, next) => {
  next();
});
router.route("/").get((req, res) => {
  res.send("server is up and running cannot Get");
});
//to be continue
// const JWT_SECRET = 'your_jwt_secret_key';

// app.post('/login', async (req, res) => {
//   const { username, password } = req.body;
//   const user = users.find(u => u.username === username);
  
//   if (!user || !await bcrypt.compare(password, user.password)) {
//     return res.status(401).json({ message: 'Invalid credentials' });
//   }

//   const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '1d' });

//   res.cookie('token', token, {
//     httpOnly: true,
//     sameSite: 'Lax',
//     secure: false, // set to true in production with HTTPS
//     maxAge: 24 * 60 * 60 * 1000
//   });

//   res.json({ message: 'Logged in successfully' });
// });

// app.get('/profile', (req, res) => {
//   const token = req.cookies.token;
//   if (!token) return res.status(401).json({ message: 'Not logged in' });

//   try {
//     const decoded = jwt.verify(token, JWT_SECRET);
//     res.json({ user: decoded });
//   } catch (err) {
//     res.status(401).json({ message: 'Invalid token' });
//   }
// });

// // Logout
// app.post('/logout', (req, res) => {
//   res.clearCookie('token');
//   res.json({ message: 'Logged out' });
// });


router.route("/register").post( async (req, res) => {
  try {
  console.log(req.body)
    const {
      first_name, last_name, email, phone_number, emergency_contact_name, emergency_contact_phone, province, city, postal_code, password
    } = req.body;

    if (
      !first_name || !last_name || !email || !phone_number || !emergency_contact_name || !emergency_contact_phone || !province || !city || !postal_code || !password
    ) {
      throw new Error(
        "validation error: all fields are required"
      );
    }
 const parentData = {
      first_name,
      last_name,
      email,
      phone_number,
      emergency_contact_name,
      emergency_contact_phone,
      province,
      city,
      postal_code,
      password,
    };
    console.log(parentData)



    res.status(200).json(result);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: error?.message || error });
  }
});

router.route("/register").get(async (req, res) => {
  try {
    const result = await getUser();
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error?.message || error });
  }
});

router.route("/inventory").get(async (req, res) => {
  try {
    const result = await getInventory();
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
   res.status(500).json({ error: error?.message || error });
  }
});

router.route("/inventoryImages").post(async (req, res) => {
  try {
    console.log(req.body)
    const {vin_number}=req.body
    if(!vin_number ){
      throw new Error("validation error: vin number is required to get the car Images")
    }
let allImages=[]
    const result = await getInventoryImages({vin_number});
    for(const imageObj of result){
       const ImageBuffer=await base64ImageToBuffer(imageObj.image)
       let newImageData={vin_number:imageObj?.vin_number,imageBuffer:ImageBuffer}
       allImages.push(newImageData)
    }
   console.log(allImages)
   
    res.status(200).json(allImages);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error?.message || error });
  }
});

router.route("/sendEmail").post(async (req, res) => {
  try {
    
    const {name,email,phone,message}=req.body.emailData
    if(!name || !email || !message){
      throw new Error("validation error: name ,email,message are required to contact us")
    }
     const result=await sendEmail(name,email,phone,message)
   console.log(result)
    res.status(200).json(result);
  } catch (error) {
    console.log(error?.message);
    res.status(500).json({ error: error?.message || error });
  }
});

router.route("/sendinquiry").post(async (req, res) => {
  try {
    console.log(req.body)
    const {name,email,phone,message,vin_number,make,year,price}=req.body.emailData
    if(!name || !email || !message ||!vin_number || !make || !year||!price){
      throw new Error("validation error: name,email,phone,message,vin_number,make,year,price are required to contact us")
    }
     const result=await sendEmail(name,email,phone,message,vin_number,make,year,price)
   console.log(result)
    res.status(200).json(result);
  } catch (error) {
    console.log(error?.message);
    res.status(500).json({ error: error?.message || error });
  }
});

router.route("/reviews").get(async (req, res) => {
  try {
    const result = await getReviews();
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
   res.status(500).json({ error: error?.message || error });
  }
});



module.exports = router;
