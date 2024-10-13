import React, { useState, useEffect } from 'react';
import { getPlayers, deletePlayer, addPlayer } from './apiService';
import './PlayerList.css'; // Separate CSS file for better component styling and organization

const PlayerList = () => {
    const [players, setPlayers] = useState([]);  // State to hold the list of players
    const [newPlayer, setNewPlayer] = useState({
        name: '',
        role: ''
    });  

    // Fetch players when the component mounts
    useEffect(() => {
        loadPlayers();  // Automatically load the player list when the component renders
    }, []);  // Empty dependency array ensures this runs only once, on component mount

    const loadPlayers = async () => {
        try {
            const playersData = await getPlayers();  // Retrieve player data from API
            setPlayers(playersData);  // Update the player list with fetched data
        } catch (error) {
            console.error('Error loading players:', error);
        }
    };

    const handleAddPlayer = async () => {
        if (newPlayer.name && newPlayer.role) {  // Ensure both fields are filled to avoid empty submissions
            try {
                await addPlayer(newPlayer);  // Add the new player to the database
                setNewPlayer({ name: '', role: '' });  // Clear input fields after successful addition
                loadPlayers();  // Reload the player list to reflect the new addition
            } catch (error) {
                console.error('Error adding player:', error);
            }
        } else {
            alert('Please fill in both fields.');  
        }
    };

    const handleDeletePlayer = async (id) => {
        try {
            await deletePlayer(id);  // Delete player by id
            loadPlayers();  // Reload the player list after deletion to reflect the change
        } catch (error) {
            console.error('Error deleting player:', error);
        }
    };

    return (
        <div className="player-list-container">
            <h1>Player List</h1>
            
            {/* Section to add a new player */}
            <div className="add-player-container">
                <input 
                    type="text" 
                    placeholder="Player Name" 
                    value={newPlayer.name} 
                    onChange={(e) => setNewPlayer({ ...newPlayer, name: e.target.value })}
                />
                <input 
                    type="text" 
                    placeholder="Player Role" 
                    value={newPlayer.role} 
                    onChange={(e) => setNewPlayer({ ...newPlayer, role: e.target.value })}
                />
                <button onClick={handleAddPlayer} className="add-button">Add Player</button>  {/* Triggers player addition */}
            </div>

            {/* Display the list of players */}
            <ul className="player-list">
                {players.map(player => (
                    <li key={player._id} className="player-item">
                        <span className="player-info">{player.name} - {player.role}</span>
                        <button onClick={() => handleDeletePlayer(player._id)} className="delete-button">
                            Delete
                        </button>  {/* Deletes the player */}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PlayerList;
