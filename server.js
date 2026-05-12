const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

const bookingsRoutes = require('./routes/bookingRoutes');
const authRoutes = require('./routes/authRoutes');
const movieRoutes = require('./routes/movieRoutes');

//Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// CORS Configuration - This will be placed Right After creating the app
const corsOptions ={
  origin: [
    'https://timogramcinema.vercel.app',
    'https://timogramcinema.netlify.app',
    'http://localhost:3000'
  ],
  credentials: true, // This is important because I used  auth to protect middleware
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  optionsSuccessStatus: 200 // For legacy browers (IE11)
}; 

//Time to apply CORS middleware BEFORE any routes
app.use(cors(corsOptions));  

//Middleware
app.use(express.json()); //Parse JSON bodies

//MongoDb Connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
    process.exit(1); //Exit with failure
  }
};

connectDB();

//Basic test route
app.get('/', (req, res) => {
    res.json({message: 'Welcome to TimoGramCinema Backend API'});
});

app.use('/api/auth', authRoutes);
app.use('/api/bookings', bookingsRoutes);

app.use('/api/movies', movieRoutes);

//Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});

