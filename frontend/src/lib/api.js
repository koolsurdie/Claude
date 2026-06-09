import axios from 'axios'

const api = axios.create({
  baseURL: '/api',
  headers: { 'Content-Type': 'application/json' },
})

// Projects
export const listProjects = () => api.get('/projects').then(r => r.data)
export const getProject = (id) => api.get(`/projects/${id}`).then(r => r.data)
export const createProject = (data) => api.post('/projects', data).then(r => r.data)
export const updateProject = (id, data) => api.put(`/projects/${id}`, data).then(r => r.data)
export const deleteProject = (id) => api.delete(`/projects/${id}`).then(r => r.data)

// Screens
export const updateScreen = (projectId, screenId, data) =>
  api.put(`/projects/${projectId}/screens/${screenId}`, data).then(r => r.data)

// Ingest
export const ingestFile = (projectId, file) => {
  const form = new FormData()
  form.append('file', file)
  return axios.post(`/api/projects/${projectId}/ingest`, form, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }).then(r => r.data)
}

// Generate
export const generateStoryboard = (projectId, text) =>
  api.post(`/projects/${projectId}/generate`, { text }).then(r => r.data)

// Export URLs (direct download)
export const storyboardExportUrl = (projectId) => `/api/projects/${projectId}/export/storyboard`
export const quizExportUrl = (projectId) => `/api/projects/${projectId}/export/quiz`
