import User from "../models/userModel.js";
import bcrypt from 'bcryptjs'
import createToken from "../utils/createToken.js";

const createUser = async (req, res) => {
    const {username, email, password} = req.body
    console.log(req.body);
    

    if (!username || !email || !password) {
        return res.status(400).send("Please fill all fields");
    }

    try {
        // Check if the user already exists
        const userExist = await User.findOne({ email });
        if (userExist) {
            return res.status(400).send("User already exists");
        }

        const salt = await bcrypt.genSalt(10); // Add await here
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({ username, email, password: hashedPassword });

        await newUser.save();

        createToken(res, newUser._id);

        return res.status(201).json({
            _id: newUser._id, 
            username: newUser.username,
            email: newUser.email
        });

    } catch (error) {
        console.error("error",error.message);
        return res.status(500).send("Server error");
    }
   
}

const loginUser = async (req, res) => {

    const {email, password} = req.body;

    const user = await User.findOne({email})

    if(user && (await bcrypt.compare(password, user.password))){
        createToken(res, user._id)
        return res.status(200).json({_id: user._id, username: user.username, email: user.email, password: user.password})
    }

    return res.status(400).send('Invalid credentials')
}

const logoutUser = async (req, res) => {
    res.cookie("JWT","",{
        httpOnly: true,
        expires: new Date(0)
    })

    return res.status(200).json({message: "loged out successfully"})
}

const getCurrentUserProfile = async (req, res) => {
    const user = await User.findOne({_id:req._id})
    if(user){
        return res.json({_id:user._id, username: user.username, email: user.email})
    }

    return res.status(404).send("user not found")
}


export  {
    createUser,
    loginUser,
    logoutUser,
    getCurrentUserProfile
}