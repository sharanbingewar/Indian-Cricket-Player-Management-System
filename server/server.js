const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 5003;

// Middleware
app.use(cors());  // Enabling cross-origin requests to allow the frontend (on a different domain) to communicate with the API.
app.use(bodyParser.json());  // Parsing incoming request bodies in JSON format, making it easier to handle POST/PUT data.

// MongoDB Connection (using MongoDB Atlas)
mongoose.connect('mongodb+srv://sbingewar9999:ij6hzkPL89UAnk5r@cricketteamcluster.devyf.mongodb.net/IndianCricketteam', {
    useNewUrlParser: true,  
    useUnifiedTopology: true,  // Provides better handling of connection monitoring, important for a cloud-hosted database.
})
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err));

// Player Schema and Model
const playerSchema = new mongoose.Schema({
    name: String,
    role: String,
});

// Creating a model allows us to interact with the 'players' collection in MongoDB easily.
const Player = mongoose.model('Player', playerSchema);

// Routes

// GET all players
app.get('/api/players', async (req, res) => {
    try {
        const players = await Player.find();  // Fetching all player records from the database.
        res.json(players);
    } catch (error) {
        res.status(500).json({ message: error.message });  // Send 500 status for server errors, ensuring issues are communicated clearly.
    }
});

// POST route to add a new player
app.post('/api/players', async (req, res) => {
    const { name, role } = req.body;

    const newPlayer = new Player({ name, role });  // Creating a new instance to validate and insert into the database.

    try {
        const savedPlayer = await newPlayer.save();  // Using async/await ensures the save operation is completed before proceeding.
        res.status(201).json(savedPlayer);  // Return 201 to indicate successful resource creation.
    } catch (error) {
        res.status(400).json({ message: error.message });  // 400 for bad requests, useful for invalid data.
    }
});

// DELETE a player by ID
app.delete('/api/players/:id', async (req, res) => {
    try {
        const deletedPlayer = await Player.findByIdAndDelete(req.params.id);  // Deleting based on the unique MongoDB ID.

        if (!deletedPlayer) {
            return res.status(404).json({ message: 'Player not found' });  // Return 404 if the player does not exist in the database.
        }

        res.json({ message: 'Player deleted successfully', deletedPlayer });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Search a player by name
app.get('/api/players/search/:name', async (req, res) => {
    try {
        const player = await Player.findOne({ name: req.params.name });  // Searching by name, assuming names are unique.
        
        if (player) {
            res.json(player);
        } else {
            res.status(404).json({ message: 'Player not found' });  // Return 404 if the player is not found.
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
    // Running the server on the specified port and confirming it with a console log.
});
