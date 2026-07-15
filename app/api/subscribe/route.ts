import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, source } = body;

    if (!email || !email.includes('@')) {
      return NextResponse.json({ success: false, error: 'Invalid email address' }, { status: 400 });
    }

    const dataDir = path.join(process.cwd(), 'data');
    const dataFilePath = path.join(dataDir, 'subscribers.json');

    // Ensure data directory exists
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    let subscribers = [];

    // Read existing subscribers if file exists
    if (fs.existsSync(dataFilePath)) {
      try {
        const fileContents = fs.readFileSync(dataFilePath, 'utf8').trim();
        if (fileContents) {
          subscribers = JSON.parse(fileContents);
        }
      } catch (err) {
        console.error('Error reading existing subscribers.json, resetting:', err);
      }
    }

    // Check if email already exists
    const exists = subscribers.some((sub: any) => sub.email.toLowerCase() === email.toLowerCase());

    if (!exists) {
      // Append new subscriber
      subscribers.push({
        email: email.toLowerCase(),
        source: source || 'Website Pop-up',
        subscribedAt: new Date().toISOString()
      });

      fs.writeFileSync(dataFilePath, JSON.stringify(subscribers, null, 2), 'utf8');
    }

    return NextResponse.json({ success: true, message: 'Subscribed successfully' });
  } catch (error) {
    console.error('Error in subscription API:', error);
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}
