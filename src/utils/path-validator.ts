import * as path from 'path';

export function validateOutputPath(outputPath: string): boolean {
  // Prevent directory traversal attacks
  const resolvedPath = path.resolve(outputPath);
  const normalizedPath = path.normalize(resolvedPath);

  // Ensure path doesn't contain suspicious patterns
  if (
    normalizedPath.includes('..') ||
    normalizedPath.includes('~') ||
    normalizedPath.startsWith('/')
  ) {
    return false;
  }

  // Only allow alphanumeric, hyphen, underscore, and forward slash
  if (!/^[\w\-./]+$/.test(normalizedPath)) {
    return false;
  }

  return true;
}

export function sanitizeFilename(filename: string): string {
  // Remove any dangerous characters from filename
  return filename
    .replace(/[^a-zA-Z0-9._-]/g, '_')
    .replace(/^\.+/, '') // Remove leading dots
    .substring(0, 255); // Limit length
}

export function validateUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}
