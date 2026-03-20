const { connect } = require("mongoose");

const mongoURI = "mongodb+srv://adarsh:mko0(IJN@clusterone.5gdhtf1.mongodb.net/?appName=ClusterOne";
const connectToMongo = async () => {
    try {
        await connect(mongoURI);
    } catch (error) {
        console.error("Error connecting to MongoDB:", error); 
    }
}

module.exports = connectToMongo;

