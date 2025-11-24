# React + Vite

# Mentora — Frontend

This repository contains the frontend scaffold for Mentora. It is a Vite + React structure containing pages, components, services and placeholders for integrations (Razorpay, Google OAuth, Cloudinary) mapped to the backend API.

Quick notes

- Framework: Vite + React (files scaffolded). Install dependencies manually.
- Styling: Tailwind is already configured by you. I removed the temporary Tailwind/PostCSS config files I created to avoid conflicts; this scaffold preserves your existing Tailwind setup and public assets (logo, icons).

How this scaffold maps to backend features

- Auth: `src/services/authService.js` placeholder functions for login/register/logout/googleAuth. Backend routes: `/auth/login`, `/auth/register`, `/auth/google`.
- Courses: `src/services/courseService.js` has placeholders: `/courses`, `/courses/:id`, `/courses/upload` (Cloudinary upload proxy).
- Lectures: part of course detail/lecture pages; backend exposes `/courses/:id/lectures`.
- Reviews: `src/services/reviewService.js` placeholders: `/reviews` (GET/POST) and query by `courseId`.
- Payments: `src/services/paymentService.js` placeholders for `/payment/order` and `/payment/verify` to integrate Razorpay.

Files & structure created

- `index.html`, `vite.config.js`
- `public/assets/` (images and media you added). Common files used by the scaffold:
  - `/public/assets/logo.jpg` — brand logo used in header
  - `/public/assets/home.jpg` — home hero image used on Home page
  - `/public/assets/empty.jpg` — default course thumbnail placeholder
  - `/public/assets/google.jpg` — icon used on Google sign-in buttons
  - other images and media in `/public/assets`
- `src/`:
  - `index.jsx`, `App.jsx`
  - `routes/AppRoutes.jsx` — app routing
  - `components/` — `layout`, `auth`, `course`, `payment`, `review`, `common` components
  - `pages/` — `Home`, `Login`, `Register`, `Courses`, `CourseDetail`, `CreateCourse`, `Lecture`, `Profile`, `Checkout`, `NotFound`
  - `services/` — `api.js`, `authService.js`, `courseService.js`, `paymentService.js`, `reviewService.js`, `userService.js` (placeholders)
  - `context/AuthContext.js`, `hooks/*`
  - `styles/globals.css` (keeps minimal resets; Tailwind is managed by you)

Placeholders and next steps

1. Install dependencies locally in the `Frontend` folder (example):

```powershell
npm install
```

2. Tailwind is already set up in this project per your note — do not re-run Tailwind init here. Use your existing configuration and placement for Tailwind directives (`@tailwind base`, `@tailwind components`, `@tailwind utilities`) in your CSS entry file.
3. Wire API calls: replace placeholder throws with actual calls using `fetch` or `axios` and `BASE_URL` from `src/services/api.js`.
4. Razorpay: backend should expose `/payment/order` to create order; frontend should call `paymentService.createOrder()` and then open Razorpay checkout with returned orderId. After payment, call `/payment/verify` to confirm.
5. Google Auth: use backend `/auth/google` endpoint. Frontend button should retrieve Google credential and send to backend to exchange for our JWT/session.

Phase-by-phase checklist (suggested)

- Phase 1: UI shell — header, footer, routes, pages skeleton (done)
- Phase 2: Auth — implement `authService`, Google sign-in button, login/register flows
- Phase 3: Courses — list, detail, create course (Cloudinary upload), lectures
- Phase 4: Reviews & Search — implement `reviewService`, search UI
- Phase 5: Payments — integrate Razorpay flows and order verification
- Phase 6: Polish — add Tailwind classes, responsive styles, accessibility

If you want I can:

- Wire the API calls using `axios` and add example usage in services.
- Add Tailwind classes to the components as a next pass.
- Start the dev server from here (if you want me to run `npm install` and `npm run dev`).

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
