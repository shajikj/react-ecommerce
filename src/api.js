const defaultApiBaseUrl = "http://localhost/react-backend/api";
const configuredApiBaseUrl =
  import.meta.env.VITE_API_BASE_URL || defaultApiBaseUrl;

if (
  import.meta.env.PROD &&
  !/^https:\/\//i.test(configuredApiBaseUrl)
) {
  throw new Error(
    "Set VITE_API_BASE_URL to an HTTPS URL when building for production.",
  );
}

export const API_BASE_URL = configuredApiBaseUrl.replace(/\/+$/, "");

export function apiUrl(path) {
  return `${API_BASE_URL}/${path.replace(/^\/+/, "")}`;
}

export async function readApiResponse(response) {
  const body = await response.text();

  if (!response.ok) {
    throw new Error("The server could not complete your request.");
  }

  try {
    return JSON.parse(body);
  } catch {
    throw new Error("The server returned an invalid response.");
  }
}
