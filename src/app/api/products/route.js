import { NextResponse } from 'next/server';
import { getExternalApiUrl } from '@/config/api';
import API_CONFIG from '@/config/api';

// Handle GET /api/products - Get all products
export async function GET() {
  try {
    
    // Make the API call from server side (no CORS issues)
    const response = await fetch(
      getExternalApiUrl(API_CONFIG.EXTERNAL.PRODUCTS.LIST),
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}
