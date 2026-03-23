const { connect } = require("mongoose");

const mongoURI = process.env.MONGO_URI || "mongodb+srv://adarsh:mko0(IJN@clusterone.5gdhtf1.mongodb.net/?appName=ClusterOne";

const connectToMongo = async () => {
    try {
        await connect(mongoURI, {
            serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
            socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
            bufferCommands: false, // Disable mongoose buffering
            bufferMaxEntries: 0, // Disable mongoose buffering
        });
        console.log("Connected to MongoDB successfully");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        throw error; // Re-throw to prevent app from starting
    }
}

module.exports = connectToMongo;

