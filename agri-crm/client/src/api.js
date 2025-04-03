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
  const response = await fetch(`${API_BASE}/users/change-password`, {
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
  const response = await fetch(`${API_BASE}/verify`, {
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

// Crop Type Management
export const createCropType = async (cropTypeData) => {
  const response = await fetch(`${API_BASE}/crop-types`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeaders()
    },
    body: JSON.stringify(cropTypeData)
  });
  return await response.json();
};

export const getCropTypes = async () => {
  const response = await fetch(`${API_BASE}/crop-types`, {
    headers: getAuthHeaders()
  });
  return await response.json();
};

export const updateCropType = async (id, cropTypeData) => {
  const response = await fetch(`${API_BASE}/crop-types/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeaders()
    },
    body: JSON.stringify(cropTypeData)
  });
  return await response.json();
};

export const deleteCropType = async (id) => {
  const response = await fetch(`${API_BASE}/crop-types/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders()
  });
  
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || 'Failed to delete crop type');
  }

  try {
    return await response.json();
  } catch {
    return { success: true }; // Handle empty response case
  }
};

// Phenology Stage API
export const createPhenologyStage = async (stageData) => {
  const response = await fetch(`${API_BASE}/phenology-stages`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeaders()
    },
    body: JSON.stringify(stageData)
  });
  return await response.json();
};

export const getPhenologyStages = async (cropTypeId) => {
  const response = await fetch(`${API_BASE}/phenology-stages/crop-type/${cropTypeId}`, {
    headers: getAuthHeaders()
  });
  return await response.json();
};

export const updatePhenologyStage = async (id, stageData) => {
  const response = await fetch(`${API_BASE}/phenology-stages/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeaders()
    },
    body: JSON.stringify(stageData)
  });
  return await response.json();
};

export const deletePhenologyStage = async (id) => {
  const response = await fetch(`${API_BASE}/phenology-stages/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders()
  });
  return await response.json();
};