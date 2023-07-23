import { Schema, model, models } from 'mongoose';

const userSessionSchema = new Schema({
    title : String,
    mode: String,
    roomid: String,
    date:String,
    starttime:String,
    host:String,
})

const Session = models.userSession || model('userSession', userSessionSchema);

export default Session;