import { NextResponse } from 'next/server';
import { getExternalApiUrl } from '@/config/api';
import API_CONFIG from '@/config/api';

export async function POST(request) {
  try {
    const body = await request.json();
    const { product_id, quantity } = body;

    // Get authorization header
    const authHeader = request.headers.get('authorization') || request.headers.get('Authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Authorization token required' },
        { status: 401 }
      );
    }

    const token = authHeader.split(' ')[1];

    // Send as form data
    const formData = new URLSearchParams();
    formData.append('product_id', product_id);
    formData.append('quantity', quantity);
    
    const response = await fetch(
      getExternalApiUrl(API_CONFIG.EXTERNAL.CART.ADD),
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      }
    );

    const data = await response.json();

    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('Cart add API error:', error);
    return NextResponse.json(
      { error: 'Failed to add product to cart' },
      { status: 500 }
    );
  }
}
