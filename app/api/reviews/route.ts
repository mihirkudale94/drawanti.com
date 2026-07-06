import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    // Construct path to the local data file
    const dataFilePath = path.join(process.cwd(), 'data', 'reviews.json');
    
    // Read the file synchronously (it's small)
    const fileContents = fs.readFileSync(dataFilePath, 'utf8');
    const reviews = JSON.parse(fileContents);

    return NextResponse.json({
      success: true,
      reviews: reviews,
      isFallback: false,
      message: "Loaded reviews from local storage."
    });
  } catch (error) {
    console.error("Error reading reviews.json:", error);
    
    // Fallback if the file gets deleted or is unreadable
    return NextResponse.json({
      success: false,
      reviews: [],
      isFallback: true,
      message: "Internal server error reading local reviews."
    });
  }
}

