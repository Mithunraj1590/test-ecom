import { NextResponse } from 'next/server';
import { getExternalApiUrl } from '@/config/api';
import API_CONFIG from '@/config/api';

export async function GET(request) {
  try {
    // Get authorization header
    const authHeader = request.headers.get('authorization') || request.headers.get('Authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Authorization token required' },
        { status: 401 }
      );
    }

    const token = authHeader.split(' ')[1];
    const response = await fetch(
      getExternalApiUrl(API_CONFIG.EXTERNAL.CART.VIEW),
      {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();

    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('Cart view API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch cart items' },
      { status: 500 }
    );
  }
}
