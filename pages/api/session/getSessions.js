import connectMongo from "../../../database/conn";
import Session from "../../../models/userSession";

const handler = async (req, res) => {
    connectMongo().catch(() =>res.status(405).json({error:"Error in the Connection"})) 
    try {
        
        const users = await Session.find({})
        .then((users)=>{
            
            res.status(200).json(users)
        })
    }
    catch(errors){
        res.status(405).json({errors:`${errors}`})
    }
}

export default handler;