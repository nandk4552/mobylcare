import axios from "axios";

const BASE_URL = `${import.meta.env.VITE_SERVER}/api/v1/inventory`;

const getAllInventoryItems = async () => {
  const response = await axios.get(`${BASE_URL}/get-items`);
  return response.data;
};

const createInventoryItem = async (data) => {
  const response = await axios.post(`${BASE_URL}/add-item`, data);
  return response.data;
};

const updateInventoryItem = async (id, data) => {
  const response = await axios.put(`${BASE_URL}/update-item/${id}`, data);
  return response.data;
};

const deleteInventoryItem = async (id) => {
  const response = await axios.delete(`${BASE_URL}/delete-item/${id}`);
  return response.data;
};

const deleteInventoryItemPhoto = async (id) => {
  const response = await axios.delete(`${BASE_URL}/delete-item-photo/${id}`);
  return response.data;
};

export default {
  getAllInventoryItems,
  createInventoryItem,
  updateInventoryItem,
  deleteInventoryItem,
  deleteInventoryItemPhoto,
};
