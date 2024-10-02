import { redirect } from "@remix-run/node";
import { authCookie } from "~/lib/auth";

export async function loader() {
  return redirect("/", {
    headers: {
      "Set-Cookie": await authCookie.serialize("", {
        maxAge: 0,
      }),
    },
  });
}
