const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password:{
        type: String, 
        required: true
    },
},{ timestamps: true });

// Hash the password before saving the user
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        return next(); // Kepp this for non-password changes
    }

    try{
        this.password = await bcrypt.hash(this.password, 10);
        next(); // Call next( only after hashing
    } catch (error){
        next(error); // Pass error to next if hashing fails
    }
}); 

module.exports = mongoose.model('User', userSchema);