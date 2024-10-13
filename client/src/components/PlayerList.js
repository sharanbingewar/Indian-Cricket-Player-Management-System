import React, { useState } from 'react';
import { getPlayers, addPlayer, deletePlayer, searchPlayer } from '../services/apiService';
import './PlayerList.css';

const PlayerList = () => {
    const [players, setPlayers] = useState([]);
    const [newPlayerName, setNewPlayerName] = useState('');
    const [newPlayerRole, setNewPlayerRole] = useState('');
    const [searchName, setSearchName] = useState('');
    const [searchedPlayer, setSearchedPlayer] = useState(null);

    // Fetch players when "Show All Players" is clicked
    const handleShowAllPlayers = async () => {
        const allPlayers = await getPlayers();
        setPlayers(allPlayers);

        // Reset searched player when showing all players
        setSearchedPlayer(null);
    };

    // Clear the displayed player list
    const handleClearPlayers = () => {
        setPlayers([]); // Reset players array to empty
    };

    // Handle adding a player without updating the visible list immediately
    const handleAddPlayer = async () => {
        if (!newPlayerName || !newPlayerRole) {
            alert('Please enter both name and role.');
            return;
        }
        await addPlayer(newPlayerName, newPlayerRole);

        // Clear the input fields after adding
        setNewPlayerName('');
        setNewPlayerRole('');

        // Optional: Show a success message if needed
        alert('Player added successfully! Click "Show All Players" to view the updated list.');
    };

    // Handle deleting a player
    const handleDeletePlayer = async (id) => {
        const result = window.confirm('Are you sure you want to delete this player?');
        if (result) {
            await deletePlayer(id);
            setPlayers(players.filter(player => player._id !== id));
        }
    };

    // Handle searching for a player by name
    const handleSearchPlayer = async () => {
        if (!searchName) {
            alert('Please enter a name to search');
            return;
        }
        const player = await searchPlayer(searchName);
        if (player) {
            setSearchedPlayer(player);
        } else {
            setSearchedPlayer(null);
            alert('Player not found');
        }

        // Clear search input field after searching
        setSearchName('');
    };

    return (
        <div className="player-list-container">
            <h1>Indian Cricket Team</h1>

            {/* Add Player Section */}
            <div className="add-player-container">
                <input
                    type="text"
                    placeholder="Enter player name"
                    value={newPlayerName}
                    onChange={(e) => setNewPlayerName(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Enter player role"
                    value={newPlayerRole}
                    onChange={(e) => setNewPlayerRole(e.target.value)}
                />
                <button className="add-button" onClick={handleAddPlayer}>
                    Add Player
                </button>
            </div>

            {/* Search Player Section */}
            <div className="search-player-container">
                <input
                    type="text"
                    placeholder="Search player by name"
                    value={searchName}
                    onChange={(e) => setSearchName(e.target.value)}
                />
                <button className="add-button" onClick={handleSearchPlayer}>
                    Search Player
                </button>
            </div>

            {/* Search Result */}
            {searchedPlayer && (
                <div className="searched-player">
                    <h3>{searchedPlayer.name}</h3>
                    <p>Role: {searchedPlayer.role}</p>
                </div>
            )}

            {/* Show All Players Button */}
            <button className="add-button" onClick={handleShowAllPlayers}>
                Show All Players
            </button>

            {/* Clear Button - Only visible if players have been fetched */}
            {players.length > 0 && (
                <button className="clear-button" onClick={handleClearPlayers}>
                    Clear List
                </button>
            )}

            {/* Player List */}
            {players.length > 0 && (
                <ul className="player-list">
                    {players.map((player) => (
                        <li key={player._id} className="player-item">
                            <div className="player-info">
                                {player.name} - {player.role}
                            </div>
                            <button className="delete-button" onClick={() => handleDeletePlayer(player._id)}>
                                Delete
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default PlayerList;
