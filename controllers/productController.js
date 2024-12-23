import Image from "../models/productModel.js";



const getAllProductDetails = async (req, res) => {
    try {
        const images = await Image.find();
        res.json(images);
    } catch (error) {
        res.status(500).json({ message: "Error fetching images" });
    }
}


const getAllToysDetails = async(req, res) => {
    try {
        const images = await Image.find();
        res.json(images);
    } catch (error) {
        res.status(500).json({ message: "Error fetching images" });
    }
}

export {
    getAllProductDetails,
    getAllToysDetails
} 