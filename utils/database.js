import mongoose, { mongo } from 'mongoose';

let isConnected = false; // tract of connection

export const connectToDB = async ()=> {
    mongoose.set("strictQuery", true);

    if (isConnected) {
        console.log('MongoDb is connected :>> ');
        return;
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: "shared_prompts",
            useNewUrlParser: true,
            useUnifiedTopology: true
        })

        isConnected = true;

        console.log("MongoDB is connected");
    } catch (error) {
        console.log('error :>> ', error);
    }
}