import { NextResponse } from 'next/server';

export function sendSuccess<T>(
  message: string,
  data: T | null,
  status = 200,
) {
  return NextResponse.json({ success: true, message, data }, { status });
}

export function sendError(message: string, status = 500) {
  return NextResponse.json({ success: false, message, data: null }, { status });
}

export function getErrorMessage(error: unknown, fallback: string) {
  return error instanceof Error ? error.message : fallback;
}
