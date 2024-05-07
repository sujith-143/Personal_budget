const mongoose = require("mongoose");
const chalk = require("chalk");

const connectDB = async () => {
  try {
    const url =
      "mongodb+srv://sujithari143:wTc39TGyvCt4gTqf@cluster0.nrh6xqp.mongodb.net/NBAD"; //  MongoDB URL
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(chalk.cyan(`Connected to MongoDB at ${url}`));
  } catch (error) {
    console.error(chalk.red(`Error connecting to MongoDB: ${error}`));
  }
};

module.exports = connectDB;

// Call the function to connect to the database
connectDB();
