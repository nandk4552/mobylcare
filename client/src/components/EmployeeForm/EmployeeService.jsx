import axios from "axios";

const BASE_URL = `${import.meta.env.VITE_SERVER}/api/v1/employees`;

const getAllEmployees = async () => {
  const response = await axios.get(`${BASE_URL}/get-all`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.data;
};

const createEmployee = async (data) => {
  const response = await axios.post(`${BASE_URL}/add`, data);
  return response.data;
};

const updateEmployee = async (id, data) => {
  const response = await axios.put(`${BASE_URL}/update/${id}`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.data;
};

const deleteEmployee = async (id) => {
  const response = await axios.delete(`${BASE_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.data;
};

export default {
  getAllEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
};
