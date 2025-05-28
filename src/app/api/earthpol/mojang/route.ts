import { NextResponse } from "next/server";

export async function GET(request: Request) {
  // Get query parameters from URL
  const url = new URL(request.url);
  const query = url.searchParams.get('query');
  
  if (!query) {
    return NextResponse.json({ error: 'Missing query parameter' }, { status: 400 });
  }
  
  try {
    // Process the query...
    const response = await fetch(`https://api.mojang.com/users/profiles/minecraft/${query}`, {
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });
    
    if (!response.ok) {
      console.log(`Error! Status: ${response.status}`);
      return NextResponse.json(
        null
      );
    }
    const data = await response.json();
    if (!data) {
        console.log('No data found');
    }
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching Mojang data:', error);
    return NextResponse.json(
      null
    );
  }
}