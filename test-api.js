const axios = require('axios');

const API_URL = 'http://localhost:5001';

async function testAddEmployee() {
  try {
    console.log('Testing Add Employee API...');
    const response = await axios.post(`${API_URL}/api/employees`, {
      employeeId: 'TEST001',
      name: 'Test User',
      email: 'test@example.com',
      department: 'Testing',
      position: 'Tester'
    });
    console.log('✅ Success! Employee added:', response.data);
  } catch (error) {
    console.error('❌ Error:', error.response?.data || error.message);
  }
}

async function testGetEmployees() {
  try {
    console.log('\nTesting Get Employees API...');
    const response = await axios.get(`${API_URL}/api/employees`);
    console.log('✅ Success! Employees:', response.data);
  } catch (error) {
    console.error('❌ Error:', error.response?.data || error.message);
  }
}

async function runTests() {
  await testAddEmployee();
  await testGetEmployees();
}

runTests();
