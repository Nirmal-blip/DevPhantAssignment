// app/api/users/route.ts

import { NextRequest, NextResponse } from "next/server";

// GET request
export async function GET(): Promise<NextResponse> {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos/1');
    const data = response.json();

    return NextResponse.json({
        success: true,
        data: data,
    });
}

// POST request
export async function POST(
  request: NextRequest
): Promise<NextResponse> {
  const body = await request.json();

  return NextResponse.json({
    success: true,
    message: "User created",
    data: body,
  });
}
