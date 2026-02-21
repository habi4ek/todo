# Todo Mobile Angular

A mobile-first modern Angular application using Angular Material.

## Backend API config

The app uses a backend Todo REST API.

Change backend host in:
`/Users/yurii/WebstormProjects/my_pro/todo/src/app/backend.config.ts`

```ts
export const backendConfig = {
  host: 'http://localhost:8000',
  apiBasePath: '/api'
} as const;
```

## Run locally

```bash
npm install
npm start
```

## Build

```bash
npm run build
```
