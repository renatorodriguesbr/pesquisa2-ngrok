import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const dataPath = path.join(process.cwd(), 'data.json');

export async function GET() {
  try {
    let currentData = [];
    if (fs.existsSync(dataPath)) {
      const fileContent = fs.readFileSync(dataPath, 'utf-8');
      if (fileContent) {
        currentData = JSON.parse(fileContent);
      }
    }
    
    return NextResponse.json(currentData);
  } catch (error) {
    console.error('Error fetching data:', error);
    return NextResponse.json({ error: 'Failed to load data' }, { status: 500 });
  }
}
