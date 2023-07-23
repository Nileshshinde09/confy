import mongoose from 'mongoose';
const MONGO_URL= "mongodb+srv://nileshshindeofficial:ukQmowRcOYZk89nQ@artify.nu7g7vb.mongodb.net/"
const connectMongo = async () => {
    try {
        const { connection } = await mongoose.connect(MONGO_URL);

        if(connection.readyState == 1){
            console.log("Connected...!")
            return Promise.resolve(true)
        }
    } catch (error) {
        return Promise.reject(error)
    }
}

export default connectMongo;