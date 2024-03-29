"use server";

import { getServerSession } from "next-auth";
import { cookies, headers } from "next/headers";
import { NextApiRequest } from "next";
import { getToken } from "next-auth/jwt";
import { authOptions } from "../api/auth/authOptions";
export async function getSession() {
  return await getServerSession(authOptions);
}
export async function getCurrentUser() {
  try {
    const session = await getSession();
    if (!session) return null;
    return session.user;
  } catch (error) {
    return null;
  }
}
// This function is workaround to not being able to send a request object in the app router.
// Not needed if we are working with NextAuthJS 5+.
export async function getTokenWorkaround() {
  const req = {
    headers: Object.fromEntries(headers() as Headers),
    cookies: Object.fromEntries(
      cookies()
        .getAll()
        .map((c) => [c.name, c.value])
    ),
  } as NextApiRequest;
  return await getToken({ req });
}
