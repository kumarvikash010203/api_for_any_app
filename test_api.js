const fetch = require('node-fetch');

// API base URL - Using the newest deployment URL
const BASE_URL = 'https://api-for-any-bvvvriw6k-vikash-s-projects-d7aa065f.vercel.app';

// Test user data
const testUser = {
  fullName: 'Test User',
  email: 'test@example.com', 
  password: 'password123',
  confirmPassword: 'password123',
  phoneNumber: '1234567890'
};

// Helper function to make API requests
async function makeRequest(endpoint, method = 'GET', body = null) {
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json'
    }
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  try {
    console.log(`Making ${method} request to ${BASE_URL}${endpoint}`);
    const response = await fetch(`${BASE_URL}${endpoint}`, options);
    console.log(`Response status: ${response.status}`);
    
    // Try to parse JSON, but handle non-JSON responses
    let data;
    const text = await response.text();
    try {
      data = JSON.parse(text);
    } catch (e) {
      console.log('Response is not JSON. Raw response:', text.substring(0, 200) + '...');
      data = { raw: 'Non-JSON response' };
    }
    
    return { status: response.status, data };
  } catch (error) {
    console.error('API Request Error:', error);
    return { status: 500, error: error.message };
  }
}

// Test home endpoint
async function testHomeEndpoint() {
  console.log('\n--- Testing Home Endpoint ---');
  const result = await makeRequest('/');
  console.log('Response data:', result.data);
}

// Test signup
async function testSignup() {
  console.log('\n--- Testing Signup ---');
  const result = await makeRequest('/api/users/signup', 'POST', testUser);
  console.log('Response data:', result.data);
}

// Test login
async function testLogin() {
  console.log('\n--- Testing Login ---');
  const result = await makeRequest('/api/users/login', 'POST', {
    email: testUser.email,
    password: testUser.password
  });
  console.log('Response data:', result.data);
  
  if (result.data && result.data.token) {
    return result.data.token;
  }
  return null;
}

// Run tests
async function runTests() {
  try {
    await testHomeEndpoint();
    await testSignup();
    const token = await testLogin();
    if (token) {
      console.log('Successfully logged in and received token');
    }
    console.log('\n--- All Tests Completed ---');
  } catch (error) {
    console.error('Test Error:', error);
  }
}

// Execute tests
runTests(); 