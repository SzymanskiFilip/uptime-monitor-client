import { createCookie } from "@remix-run/node";

const secret = "ez";

export const authCookie = createCookie("auth", {
  httpOnly: true,
  path: "/",
  sameSite: "lax",
  secrets: [secret],
  secure: process.env.NODE_ENV === "production",
  maxAge: 60 * 60 * 60 * 24 * 14,
});
