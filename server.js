const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

//Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// CORS Configuration - This will be placed Right After creating the app
const allowedOrigins = [
    'https://timogramcinema.netlify.app', // The production frontend
    'http://localhost:3000', //Local React dev server
    // We could add more if needed later, e.g our deployed backend domain
]; 

const corsOptions ={
  origin: function (origin, callback){
      // This allows request with no origin (like mobile apps, postman,curl)
      if (!origin) return callback(null, true);

      if (allowedOrigins.indexOf(origin) !== -1){
        callback(null, true); 
      }else{
        callback(new Error('Not allowed by CORS'));
      }
  },
  credentials: true, // This is important because I used  auth to protect middleware
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedheaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  optionsSuccessStatus: 200 // For legacy browers (IE11)
}; 

//Time to apply CORS middleware BEFORE any routes
app.use(cors(corsOptions)); 

app.use(cors({
  origin:['https://timogramcinema.netlify.app', 'http://localhost:3000'],
  credentials: true
})); 

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

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/bookings', require('./routes/bookingRoutes'));
app.use('/api/movies', require('./routes/movieRoutes'));

//TODO: Import and use routes later. app.use('/api/auth', require('./routes/authRoutes')); app.use('api/bookings', require('./routes/bookingRoutes'));

//Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});