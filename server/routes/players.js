const express = require('express');
const router = express.Router();  // Using express Router to keep player-related routes modular, making the code more organized and easier to scale.
const Player = require('../models/playerModel');  // Importing the Player model to interact with the MongoDB collection of players.

// GET all players
router.get('/', async (req, res) => {
  try {
    const players = await Player.find();  // Fetching all player documents from the MongoDB database.
    res.json(players);  // Returning the player data in JSON format to the client.
  } catch (err) {
    res.status(500).json({ message: err.message });  // Sending an error response if something goes wrong on the server side.
  }
});

// POST a new player
router.post('/', async (req, res) => {
  const player = new Player({
    name: req.body.name,
    role: req.body.role,
    age: req.body.age,  // Adding age and other details to store more relevant information about each player.
    batting_average: req.body.batting_average,
    bowling_average: req.body.bowling_average,
  });

  try {
    const newPlayer = await player.save();  // Saving the newly created player to the database.
    res.status(201).json(newPlayer);  // Returning the newly created player with a success status of 201.
  } catch (err) {
    res.status(400).json({ message: err.message });  // Handling any client errors, like missing or invalid data.
  }
});

// DELETE a player
router.delete('/:id', async (req, res) => {
  try {
    const player = await Player.findByIdAndDelete(req.params.id);  // Deleting a player by their unique MongoDB ID.
    if (!player) {
      return res.status(404).json({ message: 'Player not found' });  // Returning 404 if no player is found with the given ID.
    }
    res.json({ message: 'Player deleted' });  // Confirming successful deletion.
  } catch (err) {
    res.status(500).json({ message: err.message });  // Sending an error response for any server-side issues during deletion.
  }
});

module.exports = router;  // Exporting the router so it can be used in the main application for player routes.
