import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

export const getStudents = async () => {
  const response = await apiClient.get('/students');
  return response.data;
};

export const getStudentById = async (id) => {
  const response = await apiClient.get(`/students/${id}`);
  return response.data;
};

export const createStudent = async (student) => {
  const response = await apiClient.post('/students', student);
  return response.data;
};

export const updateStudent = async (id, student) => {
  const response = await apiClient.put(`/students/${id}`, student);
  return response.data;
};

export const deleteStudent = async (id) => {
  await apiClient.delete(`/students/${id}`);
};

export const getApiErrorMessage = (error) => {
  if (error.response?.data?.validationErrors) {
    return Object.values(error.response.data.validationErrors).join(' ');
  }

  if (error.response?.data?.message) {
    return error.response.data.message;
  }

  if (error.code === 'ECONNABORTED') {
    return 'The request timed out. Please check the backend server.';
  }

  return 'Unable to connect to the backend. Please try again.';
};
