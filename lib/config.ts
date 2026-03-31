export function getApiBaseUrl() {
  const base = process.env.NEXT_PUBLIC_API_BASE_URL;
  if (!base) return "";
  return base.replace(/\/+$/, "");
}

export function apiUrl(path: string) {
  const base = getApiBaseUrl();
  if (!path.startsWith("/")) path = `/${path}`;
  return `${base}${path}`;
}
