    const express = require('express');
    const jwt = require('jsonwebtoken');
    const bcrypt = require('bcrypt');
    require('dotenv').config();
    const app = express();
    const cors = require('cors');
    app.use(cors());
    app.use(express.json());
    const mongoose = require('mongoose');

    const UserSchema = new mongoose.Schema({
        userName: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        }
    });

    const User = mongoose.model('User', UserSchema,'user_datas');

    const FoodSchema = new mongoose.Schema({
        foodName: {
            type: String,
            required: true
        },
        cuisine: {
            type: String,
            required: true
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    });

    const Food = mongoose.model('Food', FoodSchema);

    // connect to mongo
    mongoose
        .connect(process.env.MONGODB_URL)
        .then(() => console.log('MongoDB connected'))
        .catch((err) => console.log('Error connecting with database', err));

    // helper: auth middleware
    const authenticate = (req, res, next) => {
        const authHeader = req.headers.authorization;
        if (!authHeader) return res.status(401).json({ message: 'No token provided' });
        const token = authHeader.split(' ')[1];
        try {
            const payload = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret');
            req.user = payload;
            next();
        } catch (err) {
            return res.status(401).json({ message: 'Invalid token' });
        }
    };

    // REGISTER
    app.post('/api/register', async (req, res) => {
        try {
            const { userName, password } = req.body;

            if (!userName || !password) {  
                return res.status(400).json({ message: 'userName and password are required' });
            }

        const existing = await User.findOne({ userName });
        if (existing) {
            return res.status(409).json({ message: 'Username already taken' });
        }

        const hashingPassword = await bcrypt.hash(password, 10);
        const user = new User({
            userName,
            password: hashingPassword
        });

        await user.save();

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
        } catch (err) {
        console.error('Register error:', err);
        return res.status(500).json({ message: 'Internal server error' });
        }
    });

    // LOGIN
    app.post('/api/login', async (req, res) => {
        try {
            const { userName, password } = req.body;
            if (!userName || !password) {
            return res.status(400).json({ message: 'userName and password are required' });
        }

        const user = await User.findOne({ userName });
        if (!user) {
            return res.status(400).json({ message: 'Invalid Username' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid password' });
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
        } catch (err) {
            console.error('Login error:', err);
            return res.status(500).json({ message: 'Internal server error' });
        }
    });

    // Create food (authenticated)
    app.post('/api/food', authenticate, async (req, res) => {
        try {
            const { foodName, cuisine } = req.body;
            if (!foodName || !cuisine) {
                return res.status(400).json({ message: 'foodName and cuisine are required' });
            }

        const food = new Food({
            foodName,
            cuisine,
            user: req.user.id
        });

        await food.save();
        return res.status(201).json({ message: 'Food created', food });
        } catch (err) {
            console.error('Create food error:', err);
            return res.status(500).json({ message: 'Internal server error' });
        }
    });

    // Get foods for authenticated user
    app.get('/api/showfood', authenticate, async (req, res) => {
        try {
            const foods = await Food.find({ user: req.user.id }).populate('user', 'userName');
            return res.status(200).json({ foods });
        } catch (err) {
            console.error('Get foods error:', err);
            return res.status(500).json({ message: 'Internal server error' });
        }
    });

    // Update food (PUT)
    app.put('/api/updatefood/:id', authenticate, async (req, res) => {
        try {
            const { id } = req.params;
            const { foodName, cuisine } = req.body;
            if (!foodName && !cuisine) {
                return res.status(400).json({ message: 'At least one of foodName or cuisine is required' });
        }

        const food = await Food.findById(id);
        if (!food) return res.status(404).json({ message: 'Food not found' });
        if (food.user.toString() !== req.user.id) return res.status(403).json({ message: 'Not authorized' });

        if (foodName) food.foodName = foodName;
        if (cuisine) food.cuisine = cuisine;

        await food.save();
        return res.status(200).json({ message: 'Food updated', food });
        } catch (err) {
            console.error('Update food error:', err);
            return res.status(500).json({ message: 'Internal server error' });
        }
    });

    // Delete food (DELETE)
    app.delete('/api/deletefood/:id', authenticate, async (req, res) => {
        try {
            const { id } = req.params;
            const food = await Food.findById(id);
            if (!food) return res.status(404).json({ message: 'Food not found' });
            if (food.user.toString() !== req.user.id) return res.status(403).json({ message: 'Not authorized' });

        await Food.findByIdAndDelete(id);
        return res.status(200).json({ message: 'Food deleted' });
        } catch (err) {
        console.error('Delete food error:', err);
        return res.status(500).json({ message: 'Internal server error' });
        }
    });

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
