/**
 * HTTP file parser
 * Parses the requests.http file to extract HTTP requests with their
 * methods, URLs, headers, and request bodies
 */

import * as fs from 'fs';
import * as path from 'path';

// Define the structure of a request with headers and body
interface HttpRequest {
  name: string;
  method: string;
  url: string;
  headers?: Record<string, string>;
  body?: string;
  enabled: boolean;
}

// Parse the requests.http file
export function parseHttpFile(filePath: string): HttpRequest[] {
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const lines = fileContent.split('\n');
  
  const requests: HttpRequest[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Check for section headers like "### GET request"
    if (line.startsWith('###')) {
      const currentName = line.replace('###', '').trim();
      i++;

      // Parse the request block (method, url, headers, body)
      const request = parseRequestBlock(lines, i, currentName);
      
      if (request) {
        requests.push(request);
        i = request._endIndex || i;
      }
      continue;
    }

    i++;
  }

  return requests;
}

// Helper function to parse a single request block
function parseRequestBlock(
  lines: string[],
  startIndex: number,
  name: string
): (HttpRequest & { _endIndex?: number }) | null {
  let i = startIndex;
  let method = '';
  let url = '';
  const headers: Record<string, string> = {};
  let bodyStart = -1;
  let isCommented = false;

  // Find the method and URL line
  while (i < lines.length) {
    const line = lines[i];

    // Stop if we hit another section
    if (line.startsWith('###')) {
      break;
    }

    // Check if this is a request line (METHOD URL)
    const methodMatch = line.trim().replace(/^#+\s*/, '').match(/^(GET|POST|PUT|DELETE|PATCH|HEAD|OPTIONS)\s+(.+)/i);
    
    if (methodMatch) {
      isCommented = line.trim().startsWith('#');
      method = methodMatch[1].toUpperCase();
      url = methodMatch[2].trim();
      i++;
      break;
    }

    i++;
  }

  if (!method || !url) {
    return null;
  }

  // Parse headers - stop when we hit empty line or JSON start
  while (i < lines.length) {
    const line = lines[i];
    const trimmedLine = line.trim();

    // Stop if we hit another section
    if (line.startsWith('###')) {
      break;
    }

    // Empty line signals end of headers and start of body
    if (trimmedLine === '') {
      bodyStart = i + 1;
      i++;
      break;
    }

    // If line starts with { or [, we've reached the body
    if (trimmedLine.startsWith('{') || trimmedLine.startsWith('[')) {
      bodyStart = i;
      break;
    }

    // Check if this is a header line (key: value format at the start of the request)
    // Only match if it doesn't look like JSON
    const headerMatch = trimmedLine.match(/^([a-zA-Z-]+):\s*(.+)$/);
    
    if (headerMatch && !trimmedLine.includes('"')) {
      const headerKey = headerMatch[1].trim();
      const headerValue = headerMatch[2].trim();
      headers[headerKey] = headerValue;
      i++;
      continue;
    }

    // If we hit something that's not a header and not empty, it's body
    if (trimmedLine && !headerMatch) {
      bodyStart = i;
      break;
    }

    i++;
  }

  // Parse body (everything after headers until next section)
  let body = '';
  if (bodyStart !== -1) {
    const bodyLines = [];
    while (i < lines.length && !lines[i].startsWith('###')) {
      bodyLines.push(lines[i].trim().replace(/^#+\s*/, ''));
      i++;
    }
    body = bodyLines.join('\n').trim();
  }

  return {
    name,
    method,
    url,
    headers: Object.keys(headers).length > 0 ? headers : undefined,
    body: body ? body : undefined,
    enabled: !isCommented,
    _endIndex: i,
  };
}

export type { HttpRequest };