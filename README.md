# PetAdopt Haven

## Purpose
PetAdopt Haven is a full-stack pet adoption platform where users can browse pets, submit adoption requests, and manage their adoption activity. Pet owners can add listings, update pet information, view requests, and approve or reject adoption requests.

## Live URL
Add your deployed client URL here.

## Features
- Public home page with banner, featured pets, adoption tips, success stories, and extra information sections.
- All Pets page with pet cards, search by name, and species filtering.
- Email/password authentication with Google login support through Better Auth.
- Private dashboard routes for My Requests, Add Pet, and My Listings.
- Pet owners can add, edit, delete, and view adoption requests for their listings.
- Users can submit adoption requests, view request status, and cancel requests.
- Toast-based success and error notifications.
- Responsive layout for mobile, tablet, and desktop screens.

## NPM Packages Used
- next
- react
- react-dom
- better-auth
- @better-auth/mongo-adapter
- mongodb
- react-hot-toast
- framer-motion
- @heroui/react
- tailwindcss
- eslint

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

For Vercel deployment, set:
- `BETTER_AUTH_URL` and `NEXT_PUBLIC_AUTH_URL` to the deployed client URL.
- `NEXT_PUBLIC_API_URL` to the deployed server URL.
- Add the deployed client URL to Google OAuth authorized redirect settings if using Google login.

Google login is optional for local testing until the Google client values are added.

## Run Locally
```bash
npm install
npm run dev
```

Open `http://localhost:3000`.
