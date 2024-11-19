
import axios from 'axios';

export async function fetchSprintData() {
    try {
        const response = await axios.get('https://api.example.com/sprint-data');
        return response.data;
    } catch (error) {
        console.error('Error fetching sprint data:', error);
        throw error;
    }
}
    
