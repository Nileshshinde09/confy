import connectMongo from "../../../../database/conn";
import Session from "../../../../models/userSession";

const handler = async (req, res) => {
    connectMongo().catch(() =>res.status(405).json({error:"Error in the Connection"})) 
    try {
        const sessionid = req.query.sessionid
        
        if(sessionid){

            const user = await Session.findById({_id:sessionid})
            .then((user)=>{
                
                res.status(200).json(user)
            })
        }
        
        res.status(404).json({error:"User not Selected"})
    }
    catch(errors){
        res.status(405).json({errors:`${errors}`})
    }
}

export default handler;