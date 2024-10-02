import { LoaderFunctionArgs, redirect } from "@remix-run/node";
import { authCookie } from "./auth";

export async function validate({ request }: LoaderFunctionArgs) {
  const cookieString = request.headers.get("Cookie");
  const cookie = await authCookie.parse(cookieString);

  if (cookie === null) {
    throw redirect("/");
  }
  return { cookie };
}
