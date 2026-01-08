# Learnix

Professional Learning Management System

Learnix is a full-stack Learning Management System (LMS) built with the MERN stack. It provides features for creators and learners including course management, lecture uploads, payments (Razorpay), reviews, and Google authentication.

## Key Features

- User authentication (email/password + Google OAuth)
- Creator dashboard for course & lecture management
- Course listing, course detail, and lecture previews
- Reviews and ratings by enrolled users
- Razorpay payment integration for course enrollment
- Cloudinary + Multer support for media uploads
- AI-powered search hooks (placeholder for integrations)

## Tech Stack

- Backend: Node.js, Express, MongoDB (Mongoose)
- Frontend: React + Vite, Tailwind CSS
- Auth: JWT + HTTP-only cookies
- Media: Multer + Cloudinary
- Payments: Razorpay

## Repository Structure (high level)

- `Backend/` — Express API, controllers, models, middleware, and backend README
- `Frontend/` — React + Vite application, pages, components, and hooks
- `README.md` — This file

See each subfolder for more details and local README files.

## Requirements

- Node.js (v16+ recommended)
- npm or yarn
- A running MongoDB instance or connection string

## Environment

This project uses environment variables for sensitive configuration. DO NOT commit `.env` files to source control. Example variables you will need to set in `Backend/.env` and `Frontend` environment files:

- Backend (examples)

  - `MONGODB_URI` — MongoDB connection string
  - `JWT_SECRET` — JWT signing secret
  - `CLOUDINARY_*` — Cloudinary credentials
  - `RAZORPAY_KEY_ID` / `RAZORPAY_KEY_SECRET` — Razorpay credentials

- Frontend (examples)
  - `VITE_FIREBASE_APIKEY`, `VITE_RAZORPAY_KEY_ID`, etc.

I intentionally did not modify any `.env` files while renaming project artifacts.

## Quick Start — Backend

1. Open a terminal in the `Backend` folder.
2. Install dependencies:

```powershell
npm install
```

3. Create your `.env` file (copy `.env.example` if present) and set required variables.

4. Start the development server:

```powershell
npm run dev
```

## Quick Start — Frontend

1. Open a terminal in the `Frontend` folder.
2. Install dependencies:

```powershell
npm install
```

3. Create a frontend environment file (e.g. `.env.local`) and provide variables like `VITE_FIREBASE_APIKEY`.

4. Start the dev server:

```powershell
npm run dev
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Open a pull request with a clear description of changes
