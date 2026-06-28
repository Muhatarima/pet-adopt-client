# PetAdopt Haven Client

Frontend application for PetAdopt Haven, a full-stack pet adoption platform where users can browse pets, request adoptions, and manage their dashboard activity.

## Live Links

- Client Site: https://pet-adopt-client-xi.vercel.app
- Server API: https://pet-adoption-server-two-beryl.vercel.app
- Pets API: https://pet-adoption-server-two-beryl.vercel.app/pets

## Purpose

PetAdopt Haven helps users find pets available for adoption and submit adoption requests. Pet owners can manage their own listings, edit pet information, view adoption requests, and approve or reject requests from the dashboard.

## Features

- Responsive home page with hero banner, featured pets, adoption tips, success stories, and extra sections.
- Public All Pets page with search by pet name and species filtering.
- Pet details page with full pet information and adoption form.
- Email/password authentication using Better Auth.
- Google login support when OAuth credentials are configured.
- Private dashboard routes for Add Pet, My Listings, and My Requests.
- Add, edit, delete, and view owner pet listings.
- View adoption requests for each pet and approve or reject them.
- User request list with status and cancel option.
- Toast-based success and error notifications.
- Custom loading and not-found pages.

## Tech Stack

- Next.js
- React
- Tailwind CSS
- Better Auth
- MongoDB adapter for Better Auth
- React Hot Toast
- Vercel

## NPM Packages Used

- `next`
- `react`
- `react-dom`
- `better-auth`
- `@better-auth/mongo-adapter`
- `mongodb`
- `react-hot-toast`
- `framer-motion`
- `@heroui/react`
- `tailwindcss`
- `eslint`

## Main Routes

```txt
/                    Home
/pets                All Pets
/pets/:id            Pet Details
/login               Login
/register            Register
/dashboard/add-pet   Add Pet
/dashboard/my-pets   My Listings
/dashboard/my-requests My Requests
```

## Environment Variables

Create a `.env` file locally or add these variables in Vercel:

```bash
MONGODB_URI=your_mongodb_connection_string
BETTER_AUTH_SECRET=your_secret
BETTER_AUTH_URL=http://localhost:3000
NEXT_PUBLIC_AUTH_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:5000
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

For Vercel deployment, use:

```bash
MONGODB_URI=your_mongodb_connection_string
BETTER_AUTH_SECRET=your_secret
BETTER_AUTH_URL=https://pet-adopt-client-xi.vercel.app
NEXT_PUBLIC_AUTH_URL=https://pet-adopt-client-xi.vercel.app
NEXT_PUBLIC_API_URL=https://pet-adoption-server-two-beryl.vercel.app
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

Google login is optional until Google OAuth credentials are added.

## Run Locally

```bash
npm install
npm run dev
```

Open:

```txt
http://localhost:3000
```

## Deployment

This client is deployed on Vercel.

Vercel settings:

- Framework Preset: Next.js
- Build Command: `npm run build`
- Install Command: `npm install`
- Output Directory: Next.js default

After changing environment variables, redeploy the latest Vercel deployment.
