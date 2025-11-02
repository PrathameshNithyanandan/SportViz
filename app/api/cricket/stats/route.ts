import { NextResponse } from 'next/server';
import { getApiUsageStats } from '@/services/cricketApi';

export async function GET() {
  try {
    const stats = getApiUsageStats();

    return NextResponse.json({
      success: true,
      data: stats
    });

  } catch (error) {
    console.error('Stats API error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch API stats'
      },
      { status: 500 }
    );
  }
}
