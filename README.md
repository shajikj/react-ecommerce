# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## API configuration

The frontend reads the backend API root from `VITE_API_BASE_URL`. For local
development, copy `.env.example` to `.env.local` and adjust the URL if your PHP
backend is hosted somewhere other than
`http://localhost/react-backend/api`.

Set `VITE_API_BASE_URL` to the HTTPS API root in the production build
environment before building (for example, `https://shop.example.com/api`). A
production app refuses to start with a non-HTTPS API URL. Vite variables are
included in browser code; never put passwords, database credentials, private
keys, or other server secrets in them.

For cross-origin deployments, configure the PHP API to allow the exact
frontend origin and configure the PHP session cookie for the HTTPS deployment.
The current API CORS headers allow the local Vite origin by default.

Order creation uses the authenticated PHP session, active product prices and
discount percentages, and a 10-unit per-product limit. The current product
schema has no stock/inventory field, so live stock validation requires adding
inventory data and corresponding backend rules.
