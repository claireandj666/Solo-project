// server/controllers/fortuneController.js
const Fortune = require('../models/fortuneModels');

// Function to get a fortune based on MBTI and Zodiac
const getFortune = async (req, res) => {
	const { mbti, zodiac } = req.query;
	console.log(`MBTI: ${mbti}, Zodiac: ${zodiac}`); 

  try {
    // const { mbti, zodiac } = req.query;
    const fortune = await Fortune.findOne({ mbti, zodiac });

    if (!fortune) {
      return res.status(404).json({ message: 'Fortune not found for this combination' });
    }
		res.status(200).json(fortune);
  } catch (err) {
    console.error('Error in fortuneController: ', err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getFortune
};
