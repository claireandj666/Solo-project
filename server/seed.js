// server/seed.js
const mongoose = require('mongoose');
const Fortune = require('./models/fortuneModels');
const fortuneData = require('./data/mbti.json');

const MONGO_URI = `mongodb+srv://clairecc666:${encodeURIComponent('Abc@08062024')}@cluster0.z9zom.mongodb.net/mbtiZodiac?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: 'mbtiZodiac',
	serverSelectionTimeoutMS: 5000, // 5 seconds
  socketTimeoutMS: 45000 // 45 seconds
})
  .then(() => {
    console.log('Connected to Mongo DB.');
    return Fortune.insertMany(fortuneData);
  })
  .then(() => {
    console.log("Data seeded successfully");
    mongoose.connection.close();
  })
  .catch((error) => {
    console.log("Error seeding data:", error);
    mongoose.connection.close();
  });