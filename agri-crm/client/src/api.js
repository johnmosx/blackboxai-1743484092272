const API_BASE = 'http://localhost:5000/api';

// Auth
export const login = async (credentials) => {
  const response = await fetch(`${API_BASE}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  });
  return await response.json();
};

// User Management
export const getUsers = async () => {
  const response = await fetch(`${API_BASE}/users`);
  return await response.json();
};

export const updateUser = async (id, userData) => {
  const response = await fetch(`${API_BASE}/users/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userData)
  });
  return await response.json();
};

// Farmer Management
export const getFarmers = async () => {
  const response = await fetch(`${API_BASE}/farmers`);
  return await response.json();
};

export const getFarmer = async (id) => {
  const response = await fetch(`${API_BASE}/farmers/${id}`);
  return await response.json();
};

export const createFarmer = async (farmerData) => {
  const response = await fetch(`${API_BASE}/farmers`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(farmerData)
  });
  return await response.json();
};

export const updateFarmer = async (id, farmerData) => {
  const response = await fetch(`${API_BASE}/farmers/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(farmerData)
  });
  return await response.json();
};

export const deleteFarmer = async (id) => {
  const response = await fetch(`${API_BASE}/farmers/${id}`, {
    method: 'DELETE'
  });
  return await response.json();
};