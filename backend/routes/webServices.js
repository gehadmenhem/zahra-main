/** @format */

const express = require('express');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const app = express();
const router = express.Router();
const multer = require('multer');
const {
  registerInventory,
  getUser,
  getInventory,
  getInventoryImages,
  getReviews,
} = require('../db/dbOperations');
const {
  base64ImageToBuffer,
} = require('../controller/getImages/getImagesConverttoBuffer');
const { sendEmail } = require('../controller/sendingEmails/sendEmail');
const {
  childrenRegistration,
  getParentChildren,
} = require('../controller/childOperations/childOperations');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/', router);
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
router.use((req, res, next) => {
  next();
});
router.route('/').get((req, res) => {
  res.send('server is up and running cannot Get');
});

const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;
const authMiddleware = (req, res, next) => {
  // Get token from cookies
  const token = req.cookies.token; // optional chaining alternative
  if (!token) {
    return res.status(401).json({ message: 'Not authenticated' });
  }

  try {
    // Verify JWT token
    const decoded = jwt.verify(token, JWT_SECRET);

    // Attach decoded info to request object
    req.user = decoded; // { id, email, role }

    // Proceed to next middleware / route
    next();
  } catch (err) {
    console.error('JWT verification failed:', err.message);
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

router.get('/children', authMiddleware, async (req, res) => {
  try {
    const { parent_id } = req.query; // ✅ query parameter

    console.log('Parent ID received:', parent_id);

    if (!parent_id) {
      return res.status(400).json({ message: 'Parent ID is required' });
    }
    console.log(parent_id);
    const children = await getParentChildren(parent_id);
    console.log(children);
    res.status(200).json(children);
  } catch (error) {
    console.error('Error fetching children:', error);
    res.status(500).json({ message: 'Failed to fetch children' });
  }
});

router.route('/register').get(async (req, res) => {
  try {
    const result = await getUser();
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error?.message || error });
  }
});

router.route('/inventory').get(async (req, res) => {
  try {
    const result = await getInventory();
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error?.message || error });
  }
});

router.route('/inventoryImages').post(async (req, res) => {
  try {
    console.log(req.body);
    const { vin_number } = req.body;
    if (!vin_number) {
      throw new Error(
        'validation error: vin number is required to get the car Images'
      );
    }
    let allImages = [];
    const result = await getInventoryImages({ vin_number });
    for (const imageObj of result) {
      const ImageBuffer = await base64ImageToBuffer(imageObj.image);
      let newImageData = {
        vin_number: imageObj?.vin_number,
        imageBuffer: ImageBuffer,
      };
      allImages.push(newImageData);
    }
    console.log(allImages);

    res.status(200).json(allImages);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error?.message || error });
  }
});

router.route('/sendEmail').post(async (req, res) => {
  try {
    const { name, email, phone, message } = req.body.emailData;
    if (!name || !email || !message) {
      throw new Error(
        'validation error: name ,email,message are required to contact us'
      );
    }
    const result = await sendEmail(name, email, phone, message);
    console.log(result);
    res.status(200).json(result);
  } catch (error) {
    console.log(error?.message);
    res.status(500).json({ error: error?.message || error });
  }
});

router.route('/sendinquiry').post(async (req, res) => {
  try {
    console.log(req.body);
    const { name, email, phone, message, vin_number, make, year, price } =
      req.body.emailData;
    if (
      !name ||
      !email ||
      !message ||
      !vin_number ||
      !make ||
      !year ||
      !price
    ) {
      throw new Error(
        'validation error: name,email,phone,message,vin_number,make,year,price are required to contact us'
      );
    }
    const result = await sendEmail(
      name,
      email,
      phone,
      message,
      vin_number,
      make,
      year,
      price
    );
    console.log(result);
    res.status(200).json(result);
  } catch (error) {
    console.log(error?.message);
    res.status(500).json({ error: error?.message || error });
  }
});

router.route('/reviews').get(async (req, res) => {
  try {
    const result = await getReviews();
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error?.message || error });
  }
});

module.exports = router;
