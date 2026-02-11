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

export const fetchProducts = async () => {
    const response = await axios.get(`${API_URL}/products`);
    return response.data;
};

export const createProduct = async (productData, token) => {
    const config = { headers: { Authorization: `Bearer ${token}` } };
    const response = await axios.post(`${API_URL}/products`, productData, config);
    return response.data;
};

export const updateProduct = async (id, productData, token) => {
    const config = { headers: { Authorization: `Bearer ${token}` } };
    const response = await axios.put(`${API_URL}/products/${id}`, productData, config);
    return response.data;
};

export const deleteProduct = async (id, token) => {
    const config = { headers: { Authorization: `Bearer ${token}` } };
    const response = await axios.delete(`${API_URL}/products/${id}`, config);
    return response.data;
};

export const uploadImage = async (file, token) => {
    const formData = new FormData();
    formData.append('image', file);
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
        }
    };
    const response = await axios.post(`${API_URL}/upload`, formData, config);
    return response.data;
};

export const fetchUsers = async (token) => {
    const config = { headers: { Authorization: `Bearer ${token}` } };
    const response = await axios.get(`${API_URL}/users`, config);
    return response.data;
};

export const deleteUser = async (id, token) => {
    const config = { headers: { Authorization: `Bearer ${token}` } };
    const response = await axios.delete(`${API_URL}/users/${id}`, config);
    return response.data;
};

export const updateProfile = async (userData, token) => {
    const config = { headers: { Authorization: `Bearer ${token}` } };
    const response = await axios.put(`${API_URL}/users/profile`, userData, config);
    return response.data;
};
