import mongoose from "mongoose";
import Task from '../db/schema/task.js';

export const connectDB = async () => {
    try {
        console.log('connecting to mongo db...');
        const conn = await mongoose.connect(`${process.env.MONGO_CONN_URL}`, {
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
            // useFindAndModify: false, // Uncomment if needed
            // useCreateIndex: true     // Uncomment if needed
        });

        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

export const populateMongoDb = async () => {
        mongoose.connection.once('open', async () => {
        console.log('MongoDB connection is open');
        if (await Task.countDocuments().exec() > 0) return

        Promise.all([
            Task.create({ name: 'User 1' }),
            Task.create({ name: 'User 2' }),
            Task.create({ name: 'User 3' }),
            Task.create({ name: 'User 4' }),
            Task.create({ name: 'User 5' }),
            Task.create({ name: 'User 6' }),
            Task.create({ name: 'User 7' }),
            Task.create({ name: 'User 8' }),
            Task.create({ name: 'User 9' }),
            Task.create({ name: 'User 10' }),
            Task.create({ name: 'User 11' }),
            Task.create({ name: 'User 12' })
        ]).then(() => console.log('Added Tasks'))
    });
}

const mongoDb = {
    connectDB,
    populateMongoDb
};

export default mongoDb;

