// Test utility for MediMate API
import { mediMateAPI } from './api';

export async function testMediMateAPI() {
  console.log('🔍 Testing MediMate API Connection...');
  
  try {
    // Test 1: Health Check
    console.log('1. Testing health check...');
    const healthCheck = await mediMateAPI.healthCheck();
    console.log('✅ Health check:', healthCheck ? 'PASSED' : 'FAILED');

    // Test 2: Get Services
    console.log('2. Testing get services...');
    try {
      const services = await mediMateAPI.getServices();
      console.log('✅ Services retrieved:', services);
    } catch (error) {
      console.log('⚠️ Services endpoint not available:', error);
    }

    // Test 3: Send a test query
    console.log('3. Testing query endpoint...');
    try {
      const testResponse = await mediMateAPI.sendQuery(
        'Hello, this is a test message to verify the API connection.',
        'Welcome Agent'
      );
      console.log('✅ Query successful:', testResponse);
    } catch (error) {
      console.log('❌ Query failed:', error);
    }

    console.log('🎉 API Test Complete!');
    return true;
  } catch (error) {
    console.error('❌ API Test Failed:', error);
    return false;
  }
}

// Test function for development
export async function quickAPITest() {
  const result = await testMediMateAPI();
  return result;
}

// Auto-run test in development (disabled to avoid console errors)
// if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
//   setTimeout(() => {
//     console.log('🚀 Auto-running MediMate API test...');
//     quickAPITest();
//   }, 2000);
// } 