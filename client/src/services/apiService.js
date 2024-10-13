import axios from 'axios';

const API_URL = 'http://localhost:5003/api/players';

export const getPlayers = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error('Error fetching players:', error);
    }
};

export const addPlayer = async (name, role) => {
    try {
        const response = await axios.post(API_URL, { name, role });
        return response.data;
    } catch (error) {
        console.error('Error adding player:', error);
    }
};

export const deletePlayer = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting player:', error);
    }
};

export const searchPlayer = async (name) => {
    try {
        const response = await axios.get(`${API_URL}/search/${name}`);
        return response.data;
    } catch (error) {
        console.error('Player not found:', error);
    }
};
