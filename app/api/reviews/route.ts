import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const dataFilePath = path.join(process.cwd(), 'data', 'reviews.json');
    const fileContents = fs.readFileSync(dataFilePath, 'utf8').replace(/^\uFEFF/, '');
    const reviews = JSON.parse(fileContents);

    return NextResponse.json({
      success: true,
      reviews: Array.isArray(reviews) ? reviews : [],
      sourceUrl: 'https://share.google/opMeC2c62E8WG3uPX',
    });
  } catch (error) {
    console.error('Error reading Google reviews:', error);

    return NextResponse.json({
      success: false,
      reviews: [],
      sourceUrl: 'https://share.google/opMeC2c62E8WG3uPX',
    });
  }
}
