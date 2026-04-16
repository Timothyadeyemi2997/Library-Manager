const mongoose = require('mongoose'); 

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.mongodb)
      console.log('MongoDB is connected')
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}