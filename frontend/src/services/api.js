// Borgholm API Client communicating with PostgreSQL Express Backend

const BASE_URL = '/api';

export function getAuthToken() {
  return localStorage.getItem('borgholm_token');
}

export function setAuthToken(token) {
  if (token) {
    localStorage.setItem('borgholm_token', token);
  } else {
    localStorage.removeItem('borgholm_token');
  }
}

async function request(endpoint, options = {}) {
  const token = getAuthToken();
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers
  };

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      ...options,
      headers
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || `Request failed with status ${response.status}`);
    }
    return data;
  } catch (err) {
    console.warn(`[API] Error contacting backend for ${endpoint}:`, err.message);
    throw err;
  }
}

// 1. Authentication
export async function loginUser(email, password) {
  const data = await request('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password })
  });
  if (data.token) {
    setAuthToken(data.token);
  }
  return data;
}

export async function registerUser(userData) {
  const data = await request('/auth/register', {
    method: 'POST',
    body: JSON.stringify(userData)
  });
  if (data.token) {
    setAuthToken(data.token);
  }
  return data;
}

export async function getCurrentUser() {
  const token = getAuthToken();
  if (!token) return null;
  try {
    const data = await request('/auth/me');
    return data.user;
  } catch {
    setAuthToken(null);
    return null;
  }
}

// 2. Inquiries ("Say Hello" Drawer)
export async function sendInquiry(inquiryData) {
  return request('/inquiries', {
    method: 'POST',
    body: JSON.stringify(inquiryData)
  });
}

// 3. Newsletter Subscription (Footer)
export async function subscribeNewsletter(email) {
  return request('/subscribers', {
    method: 'POST',
    body: JSON.stringify({ email })
  });
}

// 4. E-Commerce Orders (Cart Drawer)
export async function createOrder(orderData) {
  return request('/orders', {
    method: 'POST',
    body: JSON.stringify(orderData)
  });
}

// 5. Catalog (Products, Projects, Posts)
export async function getProducts() {
  return request('/products');
}

export async function getProjects() {
  return request('/projects');
}

export async function getPosts() {
  return request('/posts');
}

export async function addComment(postId, commentData) {
  return request(`/posts/${postId}/comments`, {
    method: 'POST',
    body: JSON.stringify(commentData)
  });
}

// 6. Admin / Data Inspection
export async function getInquiries() {
  return request('/inquiries');
}

export async function getAllUsers() {
  return request('/auth/users');
}

export async function getSubscribers() {
  return request('/subscribers');
}

export async function getAllOrders() {
  return request('/orders');
}
