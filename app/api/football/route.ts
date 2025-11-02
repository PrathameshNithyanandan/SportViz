import { NextRequest, NextResponse } from 'next/server';
import { getFootballMatches } from '@/services/footballApi';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const status = searchParams.get('status');

    const matches = await getFootballMatches(status || undefined);

    return NextResponse.json({
      success: true,
      data: matches,
      count: matches.length,
    });

  } catch (error) {
    console.error('Football API error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch football matches',
        data: []
      },
      { status: 500 }
    );
  }
}
