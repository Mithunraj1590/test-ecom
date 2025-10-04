import { NextResponse } from 'next/server';
import { getExternalApiUrl } from '@/config/api';
import API_CONFIG from '@/config/api';

// Handle POST /api/auth/login - Login user
export async function POST(request) {
  try {
    const body = await request.json();
    
    // Try with JSON format first, then fallback to form data
    let response;
    try {
      response = await fetch(
        getExternalApiUrl(API_CONFIG.EXTERNAL.AUTH.LOGIN),
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body),
        }
      );
      
      const tempData = await response.clone().json();
      
      // If JSON fails with missing fields, try form data
      if (response.status === 400 && tempData.message === 'Missing required fields') {
        const formData = new URLSearchParams();
        Object.keys(body).forEach(key => {
          formData.append(key, body[key]);
        });
        
        
        response = await fetch(
          getExternalApiUrl(API_CONFIG.EXTERNAL.AUTH.LOGIN),
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: formData,
          }
        );
      }
      
      // If login fails with invalid credentials and we're using email as username,
      // try using the email as the actual username field
      if (response.status === 401 && body.username && body.username.includes('@')) {
        const emailLoginData = new URLSearchParams();
        emailLoginData.append('email', body.username);
        emailLoginData.append('password', body.password);
        
        
        response = await fetch(
          getExternalApiUrl(API_CONFIG.EXTERNAL.AUTH.LOGIN),
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: emailLoginData,
          }
        );
      }
    } catch (error) {
      console.error('Login request error:', error);
      throw error;
    }

    let data;
    try {
      data = await response.json();
    } catch (parseError) {
      data = { error: 'Invalid response format' };
    }
    
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('Login API Error:', error);
    return NextResponse.json(
      { error: 'Failed to login user' },
      { status: 500 }
    );
  }
}
