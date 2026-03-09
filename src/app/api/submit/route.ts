import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Local database path
const dataPath = path.join(process.cwd(), 'data.json');

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Basic validation
    if (typeof data.liked !== 'boolean' || typeof data.rating !== 'number' || typeof data.word !== 'string') {
      return NextResponse.json({ error: 'Invalid data format' }, { status: 400 });
    }

    // Read current data
    let currentData = [];
    if (fs.existsSync(dataPath)) {
      const fileContent = fs.readFileSync(dataPath, 'utf-8');
      if (fileContent) {
        currentData = JSON.parse(fileContent);
      }
    }

    // Append new submission
    const newEntry = {
      id: Date.now().toString(),
      liked: data.liked,
      rating: data.rating,
      word: data.word.substring(0, 20).trim().toLowerCase(), // sanitize/limit word
      timestamp: new Date().toISOString()
    };

    currentData.push(newEntry);

    // Save back to file
    fs.writeFileSync(dataPath, JSON.stringify(currentData, null, 2));

    return NextResponse.json({ success: true, entry: newEntry });
  } catch (error) {
    console.error('Error saving submission:', error);
    return NextResponse.json({ error: 'Failed to save submission' }, { status: 500 });
  }
}
