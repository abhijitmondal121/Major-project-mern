const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const Razorpay = require('razorpay');
const dotenv = require('dotenv');
const Photo = require('./models/Photo');
const PORT = 5000;
const app = express();
const MONGO_URI =
  'mongodb+srv://mondalavi9836:Abhijit121@cluster0.w8ch1qn.mongodb.net/test';

dotenv.config();
// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MongoDB connection
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', (err) => {
  console.error('Mongodb connection error', err);
});
db.once('open', () => {
  console.log('Mongodb is connected');
});
const path = require('path');

// API endpoint for fetching all photos
app.get('/api/photos', async (req, res) => {
  try {
    const photos = await Photo.find();
    res.status(200).json(photos);
  } catch (error) {
    console.error('Error fetching photos', error);
    res.status(500).json({ message: 'Server error' });
  }
});
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// User schema and model
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});
const User = mongoose.model('User', userSchema);

// Register endpoint
app.post('/register', async (req, res) => {
  try {
    const hashedPassword = await bcryptjs.hash(req.body.password, 10);
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });
    const savedUser = await newUser.save();
    res.status(201).json({ message: 'Account created' });
  } catch (error) {
    console.error('Error during registration ', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Login endpoint
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const isPasswordValid = await bcryptjs.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password' });
    }
    // Include user's name and email in the token payload
    const token = jwt.sign(
      {
        userId: user._id,
        name: user.name,
        email: user.email,
      },
      'your_secret_key_here', // Set your JWT secret key here
      { expiresIn: '1h' }
    );
    res.json({ token });
  } catch (error) {
    console.error('Error during login ', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Booking Schema and Model
const bookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  carId: { type: mongoose.Schema.Types.ObjectId, ref: 'Car', required: true },
  carTitle: { type: String, required: true },
  carLocation: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  pickupDate: { type: Date, required: true },
  returnDate: { type: Date, required: true },
  paymentMode: { type: String, required: true },
  totalPrice: { type: Number, required: true },
  bookingId: { type: String, required: true, unique: true },
});

const Booking = mongoose.model('Booking', bookingSchema);

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token provided' });

  jwt.verify(token, 'your_secret_key_here', (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });
    req.user = user;
    next();
  });
};
// Function to generate a unique booking ID
const generateBookingId = () => {
  return `BOOKING_${new Date().getTime()}`;
};
// Endpoint to create a new booking
app.post('/api/bookings', authenticateToken, async (req, res) => {
  try {
    const {
      carId,
      carTitle,
      carLocation,
      name,
      email,
      phone,
      pickupDate,
      returnDate,
      paymentMode,
      totalPrice,
    } = req.body;
    if (
      !carId ||
      !carTitle ||
      !carLocation ||
      !name ||
      !email ||
      !phone ||
      !pickupDate ||
      !returnDate ||
      !paymentMode ||
      !totalPrice == undefined
    ) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    const bookingId = generateBookingId();
    const newBooking = new Booking({
      userId: req.user.userId,
      carId,
      carTitle,
      carLocation,
      name,
      email,
      phone,
      pickupDate,
      returnDate,
      paymentMode,
      totalPrice,
      bookingId,
    });

    await newBooking.save();
    res.status(201).json({ message: 'Booking successful' });
  } catch (error) {
    console.error('Error creating booking', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Endpoint to fetch all bookings for the authenticated user
app.get('/api/user/bookings', authenticateToken, async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.user.userId });
    res.status(200).json(bookings);
  } catch (error) {
    console.error('Error fetching user bookings', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
// Initialize Razorpay with your Razorpay API key and secret
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});
// Endpoint to create a new Razorpay order
app.post('/api/payments/razorpay', async (req, res) => {
  const { amount, currency, receipt, notes } = req.body;

  try {
    const paymentOptions = {
      amount,
      currency,
      receipt,
      notes,
    };

    const order = await razorpay.orders.create(paymentOptions);
    res.status(200).json(order);
  } catch (error) {
    console.error('Error creating Razorpay order:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Endpoint to verify Razorpay payment
app.post('/api/payments/razorpay/verify', async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;
  const crypto = require('crypto');

  const hash = crypto
    .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest('hex');

  if (hash === razorpay_signature) {
    res.json({ message: 'Payment verified successfully' });
  } else {
    res.status(400).json({ message: 'Invalid signature' });
  }
});


// Define schema and model for contact form submissions
const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String
});

const Contact = mongoose.model('Contact', contactSchema);

// Endpoint to handle contact form submission
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    
    // Create a new document in the Contact collection
    const newContact = new Contact({ name, email, message });
    await newContact.save();

    // Respond with a success message
    res.status(201).json({ message: 'Message sent successfully' });
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});



// Route to handle search query
app.post('/search', async (req, res) => {
  try {
    const { location } = req.body;
    // Fetch cars related to the location from the database
    const cars = await Photo.find({ location });
    res.json(cars);
  } catch (error) {
    console.error('Error searching cars by location', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});




app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
