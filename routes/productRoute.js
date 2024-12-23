import express from 'express';
import { getAllProductDetails, getAllToysDetails } from '../controllers/productController.js';
import path from 'path';  
import { fileURLToPath } from 'url'; 


const router = express.Router();


// Get the __dirname equivalent in ES modules
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// // Serve images from 'productimages' folder
// app.use('/images', express.static(path.join(__dirname, 'productimages')));



router.get('/product_details', getAllProductDetails);
router.get('/toys_details', getAllToysDetails);

export default router;