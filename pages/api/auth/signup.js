// import connectMongo from "../../../database/conn"
// import User from "../../../models/userModel"
// import { hash } from 'bcryptjs';

// const handler=async(req,res)=>{
//     connectMongo().catch(error=>res.json({error:"Connection Faild...!"}))
//     if(req.method ==="POST"){
//         if(!req.body) return res.status(404).json({error:"Dont have form data...!"})
//         const {username,email,password} = req.body;
//         //check duplicate user
//         const checkexisting = await User.findOne({email})
//         if(checkexisting) return res.status(422).json({message:"User already exist...!"})
//         User.create({ username, email, password : await hash(password, 12)}, function(err, data){
//             if(err) return res.status(404).json({ err });
//             res.status(201).json({ status : true, user: data})
//         })
//     }
//     else{
//         res.status(500).json({message:"HTTP method not valid only POST Accepted"})
//     }

// }

// export default handler

import connectMongo from "../../../database/conn";
import User from "../../../models/userModel";
import { hash } from "bcryptjs";

const handler = async (req, res) => {
  try {
    await connectMongo(); // Establish MongoDB connection

    if (req.method !== "POST") {
      return res.status(405).json({ message: "HTTP method not valid, only POST is accepted" });
    }

    if (!req.body) {
      return res.status(400).json({ error: "No form data found" });
    }

    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      alert("User already exists")
      return res.status(422).json({ message: "User already exists" });
    }

    const hashedPassword = await hash(password, 12);
    const newUser = await User.create({ username, email, password: hashedPassword });

    return res.status(201).json({ status: "success", user: newUser });
  } catch (error) {
    console.error("Error during signup:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export default handler;
