const mongoose = require('mongoose');
// const fortuneData = require('../client/data/mbti.json');

// const MONGO_URI = 'mongodb+srv://clairecc666:Abc@08062024@cluster0.z9zom.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

// mongoose.connect(MONGO_URI, {
//   // options for the connect method to parse the URI
//   useNewUrlParser: true,
//   // sets the name of the DB that our collections are part of
//   dbName: 'mbtiZodiac'
// })
//   .then(() => console.log('Connected to Mongo DB.'))
//   .catch(err => console.log(err));


// Fortune.insertMany(fortuneData)
//   .then(() => {
//     console.log("Data seeded successfully");
//     mongoose.connection.close();
//   })
//   .catch((error) => console.log("Error seeding data:", error));


const Schema = mongoose.Schema;

const fortuneSchema = new Schema({
	mbti: { type: String, required: true },
  zodiac: { type: String, required: true },
  overview: { type: String, required: true },
  emotional_logical: {
    type: {
      type: String,
      enum: ['emotional', 'logical'],
      required: true
    },
    message: { type: String, required: true }
  },
  static_dynamic: {
    type: {
      type: String,
      enum: ['static', 'dynamic'],
      required: true
    },
    message: { type: String, required: true }
  },
  inner_drive: {
    type: {
      type: String,
      enum: ['passive', 'aggressive'],
      required: true
    },
    message: { type: String, required: true }
  }
})

fortuneSchema.index({ mbti: 1, zodiac: 1 }, { unique: true });

const Fortune = mongoose.model('Fortune', fortuneSchema);
module.exports = Fortune;