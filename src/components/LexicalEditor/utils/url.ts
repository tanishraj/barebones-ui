// URL validation regex for common protocols
const SUPPORTED_URL_PROTOCOLS = new Set(['http:', 'https:', 'mailto:', 'tel:']);

export function sanitizeUrl(url: string): string {
  try {
    const parsedUrl = new URL(url);
    if (!SUPPORTED_URL_PROTOCOLS.has(parsedUrl.protocol)) {
      return 'https://';
    }
    return url;
  } catch {
    // If URL is invalid, try to fix it
    if (url.length > 0 && !url.startsWith('http')) {
      return 'https://' + url;
    }
    return 'https://';
  }
}

export function isValidUrl(url: string): boolean {
  try {
    const parsedUrl = new URL(url);
    return SUPPORTED_URL_PROTOCOLS.has(parsedUrl.protocol);
  } catch {
    return false;
  }
}
