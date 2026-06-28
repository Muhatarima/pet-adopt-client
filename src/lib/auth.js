import { betterAuth } from "better-auth";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { MongoClient } from "mongodb";

if (!process.env.MONGODB_URI) {
  throw new Error("MONGODB_URI is required");
}

const client = new MongoClient(process.env.MONGODB_URI);
const db = client.db();

const googleProvider =
  process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
    ? {
        google: {
          clientId: process.env.GOOGLE_CLIENT_ID,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        },
      }
    : undefined;

const trustedOrigins = [
  "http://localhost:3000",
  "https://pet-adopt-client-xi.vercel.app",
  process.env.BETTER_AUTH_URL,
  process.env.NEXT_PUBLIC_AUTH_URL,
].filter(Boolean);

const appUrl =
  process.env.NODE_ENV === "production"
    ? "https://pet-adopt-client-xi.vercel.app"
    : process.env.BETTER_AUTH_URL || "http://localhost:3000";

export const auth = betterAuth({
  database: mongodbAdapter(db),
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: googleProvider,
  secret: process.env.BETTER_AUTH_SECRET,
  baseURL: appUrl,
  trustedOrigins,
});
