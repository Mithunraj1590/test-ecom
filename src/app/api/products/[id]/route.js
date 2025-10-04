import { NextResponse } from 'next/server';
import { getExternalApiUrl } from '@/config/api';
import API_CONFIG from '@/config/api';

// Handle GET /api/products/[id] - Get single product by ID
export async function GET(request, { params }) {
  try {
    const { id } = await params;
    
    // Make the API call from server side (no CORS issues)
    // Using the correct API structure: /api/products/details.php?id={product_id}
    const response = await fetch(
      getExternalApiUrl(`${API_CONFIG.EXTERNAL.PRODUCTS.DETAILS}?id=${id}`),
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
      { error: 'Failed to fetch product details' },
      { status: 500 }
    );
  }
}
