const mongoose = require('mongoose');  // Importing Mongoose to define the schema and interact with MongoDB.

// Defining the schema for a player with relevant fields.
const playerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,  
  },
  role: {
    type: String,
    required: true,  
  },
  age: {
    type: Number,
    required: true,  
  },
  batting_average: {
    type: Number,
    required: true,  
  },
  bowling_average: {
    type: Number,
    required: true,  
  },
});

module.exports = mongoose.model('Player', playerSchema);  // Exporting the Player model to interact with the 'Player' collection in MongoDB using this schema.
