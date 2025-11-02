import { NextRequest, NextResponse } from 'next/server';
import { getCricketMatches } from '@/services/cricketApi';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const status = searchParams.get('status') as 'live' | 'upcoming' | 'ft' | null;

    const matches = await getCricketMatches(status || undefined);

    return NextResponse.json({
      success: true,
      data: matches,
      count: matches.length
    });

  } catch (error) {
    console.error('Cricket API error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch cricket matches',
        data: []
      },
      { status: 500 }
    );
  }
}
