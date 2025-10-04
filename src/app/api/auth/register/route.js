import { NextResponse } from 'next/server';
import { getExternalApiUrl } from '@/config/api';
import API_CONFIG from '@/config/api';

// Handle POST /api/auth/register - Register new user
export async function POST(request) {
  try {
    const body = await request.json();
    
    
    // Make the API call from server side (no CORS issues)
    // Try with form data instead of JSON
    const formData = new URLSearchParams();
    Object.keys(body).forEach(key => {
      formData.append(key, body[key]);
    });
    
    const response = await fetch(
      getExternalApiUrl(API_CONFIG.EXTERNAL.AUTH.REGISTER),
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData,
      }
    );

    let data;
    try {
      data = await response.json();
    } catch (parseError) {
      data = { error: 'Invalid response format' };
    }
    
    // If registration is successful, automatically log in the user to get a token
    if (response.status === 201 && data.message === 'User registered successfully') {
      
      try {
        // Prepare login data - use username for login (not email)
        const loginData = new URLSearchParams();
        loginData.append('username', body.username);
        loginData.append('password', body.password);
        
        const loginResponse = await fetch(
          'https://globosoft.co.uk/ecommerce-api/api/auth/login.php',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: loginData,
          }
        );
        
        const loginData_result = await loginResponse.json();
        
        // Return the login response (which should include token) instead of just registration success
        return NextResponse.json(loginData_result, { status: loginResponse.status });
      } catch (loginError) {
        console.error('Auto-login failed:', loginError);
        // If auto-login fails, still return registration success
        return NextResponse.json(data, { status: response.status });
      }
    }
    
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('Register API Error:', error);
    return NextResponse.json(
      { error: 'Failed to register user' },
      { status: 500 }
    );
  }
}
