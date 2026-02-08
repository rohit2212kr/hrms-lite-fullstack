const axios = require('axios');

const BACKEND_URL = 'https://hrms-lite-fullstack-m1ki.onrender.com';

async function testBackend() {
  console.log('Testing backend at:', BACKEND_URL);
  
  try {
    // Test 1: Check if backend is alive
    console.log('\n1. Testing root endpoint...');
    const rootResponse = await axios.get(BACKEND_URL);
    console.log('✅ Root endpoint works:', rootResponse.data);
    
    // Test 2: Try to add an employee
    console.log('\n2. Testing add employee...');
    const employeeData = {
      employeeId: 'TEST' + Date.now(),
      name: 'Test Employee',
      email: 'test@example.com',
      department: 'Testing',
      position: 'Tester'
    };
    
    const addResponse = await axios.post(`${BACKEND_URL}/api/employees`, employeeData);
    console.log('✅ Add employee works:', addResponse.data);
    
    // Test 3: Get all employees
    console.log('\n3. Testing get employees...');
    const getResponse = await axios.get(`${BACKEND_URL}/api/employees`);
    console.log('✅ Get employees works. Total:', getResponse.data.length);
    
  } catch (error) {
    console.error('❌ Error:', error.response?.data || error.message);
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Headers:', error.response.headers);
    }
  }
}

testBackend();
