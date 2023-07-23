import connectMongo from "../../../database/conn";
import Session from "../../../models/userSession";

const handler = async (req, res) => {
    try {
        await connectMongo()
            .then(() => { console.log("Connected") })
            .catch((error) => res.json({ errors: error }))
        if (req.method == 'POST') {
            if (!req.body) {
                return res.status(405).json({ message: "Data Not Found...!" })
            }
            const { title, mode, roomid, date, starttime,host } = req.body;
            const existroomid = await Session.findOne({ roomid })
            const existdate = await Session.findOne({ date })
            const existtime = await Session.findOne({ starttime })

            if (existroomid) {
                return res.status(422).json({ message: "Roomid Already assigned to another session exist...!" })
            }
            else if (existdate && existtime) {
                return res.status(422).json({ message: "Session on this time alredy sheduled...!" })
            }
            const newSession = await Session.create({ title, mode, roomid, date, starttime,host })
            return res.status(201).json({ status: "success", user: newSession })

        }
    } catch (error) {
        console.error("Error during add Session", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }

}

export default handler;