const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

// Helper for fetch with error handling
async function fetchJSON(url: string, options?: RequestInit) {
  const response = await fetch(url, options);

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Request failed' }));
    throw new Error(error.error || `HTTP ${response.status}`);
  }

  // Handle 204 No Content
  if (response.status === 204) {
    return null;
  }

  return response.json();
}

// Articles API
export async function getArticles(draft?: boolean) {
  const url = draft !== undefined
    ? `${API_URL}/articles?draft=${draft}`
    : `${API_URL}/articles`;
  return fetchJSON(url);
}

export async function getArticle(id: string) {
  return fetchJSON(`${API_URL}/articles/${id}`);
}

export async function createArticle(data: {
  title: string;
  content: string;
  isDraft: boolean;
  tags: string[];
}) {
  return fetchJSON(`${API_URL}/articles`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
}

export async function updateArticle(id: string, data: {
  title?: string;
  content?: string;
  isDraft?: boolean;
  tags?: string[];
}) {
  return fetchJSON(`${API_URL}/articles/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
}

export async function deleteArticle(id: string) {
  return fetchJSON(`${API_URL}/articles/${id}`, {
    method: 'DELETE'
  });
}

export async function kiffArticle(id: string) {
  return fetchJSON(`${API_URL}/articles/${id}/kiff`, {
    method: 'POST'
  });
}

// Profile API
export async function getProfile() {
  return fetchJSON(`${API_URL}/profile`);
}

export async function updateProfile(data: {
  name?: string;
  bio?: string;
  age?: number;
  location?: string;
  photoUrl?: string;
  backgroundImage?: string;
}) {
  return fetchJSON(`${API_URL}/profile`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
}

// Comments API
export async function getComments(articleId: string) {
  return fetchJSON(`${API_URL}/articles/${articleId}/comments`);
}

export async function createComment(articleId: string, data: {
  authorName: string;
  content: string;
}) {
  return fetchJSON(`${API_URL}/articles/${articleId}/comments`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
}

// Images API
export async function uploadImage(file: File): Promise<{ url: string }> {
  const formData = new FormData();
  formData.append('image', file);

  const response = await fetch(`${API_URL}/images`, {
    method: 'POST',
    body: formData
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Upload failed' }));
    throw new Error(error.error || `HTTP ${response.status}`);
  }

  return response.json();
}
