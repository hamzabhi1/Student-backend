import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb://nauman33183:kSsLkDr80OibhCJo@ac-bxhavsb-shard-00-00.cyh0epv.mongodb.net:27017,ac-bxhavsb-shard-00-01.cyh0epv.mongodb.net:27017,ac-bxhavsb-shard-00-02.cyh0epv.mongodb.net:27017/?ssl=true&replicaSet=atlas-919khs-shard-0&authSource=admin&appName=HamzaPractice",
    );
    console.log("MongoDB Connected");
  } catch (error) {
    console.log(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
