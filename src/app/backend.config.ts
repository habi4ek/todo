export const backendConfig = {
  host: 'http://localhost:8033',
  apiBasePath: '/api'
} as const;

export const todosApiBaseUrl = `${backendConfig.host}${backendConfig.apiBasePath}`;
