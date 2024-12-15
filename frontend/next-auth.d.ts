import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    id_token?: string; // Add the id_token field to the session
  }

  interface JWT {
    id_token?: string; // Add the id_token field to the JWT
  }
}