const express=require('express');
const jwt=require('jsonwebtoken');
const bycrypt=require('bcrypt');//hashing of password from plainTest to UnReadable Format
require('dotenv').config();
const app=express();
const cors=require('cors');
app.use(cors())
app.use(express.json());
const mongoose=require('mongoose');

const UserSchema=new mongoose.Schema({
    userName:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
});

const User=mongoose.model('User',UserSchema);
const FoodSchema=new mongoose.Schema({
    foodName:{
        type:String,
        required:true
    },
    cuisine:{
        type:String,
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
});

const Food=mongoose.model('Food_User',FoodSchema);
try{
    mongoose.connect(process.env.MONGODB_URL);
}catch(err){
    console.log("Error connecting with database");
}

// ---- VALID TOKEN VERIFICATION MIDDLEWARE ----
function verifyToken(req, res, next) {
    try {
        const authHeader = req.headers.authorization || req.headers.Authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "No token provided" });
        }
    const token = authHeader.replace('Bearer',''); // Extract token only
    const secret = process.env.JWT_SECRET || "fallback_secret";
    jwt.verify(token, secret, (err, decoded) => {
        if (err) {
        // Handle token errors clearly
            if (err.name === "TokenExpiredError") {
                return res.status(401).json({ message: "Token expired" });
            }
            if (err.name === "JsonWebTokenError") {
                return res.status(401).json({ message: "Invalid token" });
            }
                return res.status(401).json({ message: "Token verification failed" });
        }
        req.user = decoded; // decoded contains { id, userName, iat, exp }
        next(); // pass to next function..
    });
    } catch (err) {
        console.error("verifyToken error:", err);
        return res.status(500).json({ message: "Internal server error" });
    }
}


//REGISTER
app.post('/api/resister', async (req, res) => {
try {
    const { userName, password } = req.body;

    if (!userName || !password) {
        return res.status(400).json({ message: 'userName and password are required' });
    }

    // check for existing user
    const existing = await User.findOne({ userName });
    if (existing) {
        return res.status(409).json({ message: 'Username already taken' });
    }

    // hash password and save user
    const hashingPassword = await bycrypt.hash(password, 10);
    const user = new User({
        userName,              // <-- use field name directly
        password: hashingPassword
    });

    await user.save();

    // create JWT
    const token = jwt.sign(
        { id: user._id, userName: user.userName },
        process.env.JWT_SECRET || 'fallback_secret',
        { expiresIn: '2h' }
    );

    return res.status(201).json({
        message: 'User registered',
        user: { id: user._id, userName: user.userName },
        token
    });
    }catch (err) {
    console.error('Register error:', err);
    return res.status(500).json({ message: 'Internal server error' });
    }
});

// ---- LOGIN ----
app.post('/api/login', async (req, res) => {
try {
    const { userName, password } = req.body;

    if (!userName || !password) {
        return res.status(400).json({ message: 'userName and password are required' });
    }

    const user = await User.findOne({ userName });
    if (!user) {
      // keep message generic for security
        return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bycrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
        { id: user._id, userName: user.userName },
        process.env.JWT_SECRET || 'fallback_secret',
        { expiresIn: '2h' }
    );

    return res.status(200).json({
        message: 'Login successful',
        user: { id: user._id, userName: user.userName },
        token
    });
    }catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({ message: 'Internal server error' });
    }
});