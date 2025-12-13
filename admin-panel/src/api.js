import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:5001/api';

export const fetchOrders = async (token) => {
    try {
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        const response = await axios.get(`${API_URL}/orders`, config);
        return response.data;
    } catch (error) {
        console.error('Error fetching orders:', error);
        throw error;
    }
};
