const API_BASE = 'http://localhost:5000/api';

// Helper function to get auth headers
const getAuthHeaders = () => ({
  'Authorization': `Bearer ${localStorage.getItem('token')}`
});

// Auth endpoints
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

export const changePassword = async (currentPassword, newPassword) => {
  const response = await fetch(`${API_BASE}/change-password`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeaders()
    },
    body: JSON.stringify({ currentPassword, newPassword })
  });
  return await response.json();
};

export const verifyToken = async () => {
  const response = await fetch(`${API_BASE}/auth/verify`, {
    headers: getAuthHeaders()
  });
  if (!response.ok) {
    throw new Error('Token verification failed');
  }
  return await response.json();
};

// User Management
export const createUser = async (userData) => {
  const response = await fetch(`${API_BASE}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeaders()
    },
    body: JSON.stringify(userData)
  });
  return await response.json();
};

export const getUsers = async () => {
  const response = await fetch(`${API_BASE}/users`, {
    headers: getAuthHeaders()
  });
  const data = await response.json();
  return Array.isArray(data) ? data : [];
};

export const updateUser = async (id, userData) => {
  const response = await fetch(`${API_BASE}/users/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeaders()
    },
    body: JSON.stringify(userData)
  });
  return await response.json();
};

export const deleteUser = async (id) => {
  const response = await fetch(`${API_BASE}/users/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders()
  });
  return await response.json();
};

// Farmer Management
export const getFarmers = async () => {
  const response = await fetch(`${API_BASE}/farmers`, {
    headers: getAuthHeaders()
  });
  return await response.json();
};

export const getFarmer = async (id) => {
  const response = await fetch(`${API_BASE}/farmers/${id}`, {
    headers: getAuthHeaders()
  });
  return await response.json();
};

export const createFarmer = async (farmerData) => {
  const response = await fetch(`${API_BASE}/farmers`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeaders()
    },
    body: JSON.stringify(farmerData)
  });
  return await response.json();
};

export const updateFarmer = async (id, farmerData) => {
  const response = await fetch(`${API_BASE}/farmers/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeaders()
    },
    body: JSON.stringify(farmerData)
  });
  return await response.json();
};

export const deleteFarmer = async (id) => {
  const response = await fetch(`${API_BASE}/farmers/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders()
  });
  return await response.json();
};