// Test script to verify CORS is working
const axios = require('axios');

const API_URL = 'https://hrms-lite-fullstack-m1ki.onrender.com';

async function testCORS() {
  console.log('Testing CORS fix...\n');
  
  try {
    // Test 1: Health check
    console.log('1. Testing health check endpoint...');
    const healthResponse = await axios.get(`${API_URL}/`);
    console.log('✓ Health check passed:', healthResponse.data.message);
    
    // Test 2: Get employees
    console.log('\n2. Testing GET /api/employees...');
    const getResponse = await axios.get(`${API_URL}/api/employees`);
    console.log(`✓ GET employees passed. Found ${getResponse.data.length} employees`);
    
    // Test 3: Add employee (this was failing due to CORS)
    console.log('\n3. Testing POST /api/employees (CORS test)...');
    const testEmployee = {
      employeeId: `TEST${Date.now()}`,
      name: 'CORS Test Employee',
      email: `test${Date.now()}@example.com`,
      department: 'Testing',
      position: 'QA Engineer'
    };
    
    const postResponse = await axios.post(`${API_URL}/api/employees`, testEmployee);
    console.log('✓ POST employee passed:', postResponse.data.name);
    
    // Test 4: Delete test employee
    console.log('\n4. Cleaning up test employee...');
    await axios.delete(`${API_URL}/api/employees/${testEmployee.employeeId}`);
    console.log('✓ Cleanup completed');
    
    console.log('\n✅ All tests passed! CORS is working correctly.');
    
  } catch (error) {
    console.error('\n❌ Test failed:');
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Error:', error.response.data);
    } else {
      console.error('Error:', error.message);
    }
  }
}

testCORS();
