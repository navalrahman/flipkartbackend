import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import path from 'path';  
import { fileURLToPath } from 'url';

import userRoutes from './routes/userRoute.js';
import productRoutes from './routes/productRoute.js';

dotenv.config();

const port = process.env.PORT || 5050;

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    // origin: 'http://localhost:5173', 
    // credentials: true 
}));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// Serve images from 'productimages' folder
app.use('/images', express.static(path.join(__dirname, 'productimages')));


app.use('/api/users', userRoutes);
app.use('/api/product', productRoutes);

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Mongodb Connected");
    } catch (error) {
        console.log("error", error.message);
        process.exit(1);
    }
};

connectDB();

app.listen(port, () => {
    console.log(`server running on port ${port}`);
});
