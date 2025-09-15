import axios from 'axios';

const API_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://user-management-dashboard-v40x.onrender.com/api' 
    : '/api';


export const getUsers = async () => {
  const res = await axios.get(`${API_URL}/users`);
  return res.data.data;
};

export const getUser = async (id) => {
  const res = await axios.get(`${API_URL}/users/${id}`);
  return res.data.data;
};

export const createUser = async (user) => {
  const res = await axios.post(`${API_URL}/users`, user);
  return res.data;
};

export const updateUser = async (id, user) => {
  const res = await axios.put(`${API_URL}/users/${id}`, user);
  return res.data;
};

export const deleteUser = async (id) => {
  const res = await axios.delete(`${API_URL}/users/${id}`);
  return res.data;
};