const path = require('path');
const express = require('express');
const apiRouter = require('./routes/api');
const cors = require('cors'); // Add this line
const mongoose = require('mongoose');

const app = express();
const PORT = 3000;

const MONGO_URI = `mongodb+srv://clairecc666:${encodeURIComponent('Abc@08062024')}@cluster0.z9zom.mongodb.net/mbtiZodiac?retryWrites=true&w=majority&appName=Cluster0`;

// Connect to MongoDB
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 10000, // Optional: increases connection timeout
})
.then(() => console.log('Connected to Mongo DB'))
.catch((err) => console.error('MongoDB connection error:', err));


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', apiRouter);
app.use(express.static(path.resolve(__dirname, '../client')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

// Start the server
app.listen(PORT, () => {
  // console.log(`Server is running on http://localhost:${PORT}`);
	console.log(`Server listening on port: ${PORT}...`);
});