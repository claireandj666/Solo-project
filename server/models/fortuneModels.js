const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const fortuneSchema = new Schema({
	mbti: { type: String, required: true },
  zodiac: { type: String, required: true },
  snapshot: { type: String, required: true },
  heart_mind: {  // emotional_logical: 
    type: {
      type: String,
      enum: ['Intuitive', 'Analytical'],
      required: true
    },
    message: { type: String, required: true }
  },
  rhythm_of_being: {
    type: {
      type: String,
      enum: ['Consistent', 'Vibrant'],
      required: true
    },
    message: { type: String, required: true }
  },
  inner_drive: {
    type: {
      type: String,
      enum: ['Receptive', 'Assertive'],
      required: true
    },
    message: { type: String, required: true }
  }
})

fortuneSchema.index({ mbti: 1, zodiac: 1 }, { unique: true });

const Fortune = mongoose.model('Fortune', fortuneSchema);
module.exports = Fortune;