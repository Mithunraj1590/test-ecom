import { NextResponse } from 'next/server';
import { getExternalApiUrl } from '@/config/api';
import API_CONFIG from '@/config/api';

export async function POST(request) {
  try {
    const body = await request.json();
    const { address, latitude, longitude } = body;

    // Get authorization header
    const authHeader = request.headers.get('authorization') || request.headers.get('Authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Authorization token required' },
        { status: 401 }
      );
    }

    const token = authHeader.split(' ')[1];

    // Prepare request data for external API
    const requestData = {
      address: address,
      latitude: latitude || '',
      longitude: longitude || ''
    };
    
    
    // Send as form data (like other APIs)
    const formData = new URLSearchParams();
    formData.append('address', address);
    if (latitude) formData.append('latitude', latitude);
    if (longitude) formData.append('longitude', longitude);
    
    
    const response = await fetch(
      getExternalApiUrl(API_CONFIG.EXTERNAL.CHECKOUT.CHECKOUT),
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
    console.error('Checkout API error:', error);
    return NextResponse.json(
      { error: 'Failed to process checkout' },
      { status: 500 }
    );
  }
}
