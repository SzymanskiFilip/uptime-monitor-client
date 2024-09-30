import {
  json,
  redirect,
  type ActionFunctionArgs,
  type MetaFunction,
} from "@remix-run/node";
import { Form, useActionData, useNavigation } from "@remix-run/react";
import { LoaderCircle } from "lucide-react";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";

export const meta: MetaFunction = () => {
  return [
    { title: "Uptime Monitor" },
    { name: "description", content: "Welcome to the uptime monitor app" },
  ];
};

export async function action({ request }: ActionFunctionArgs) {
  const form = await request.formData();

  const email = String(form.get("email"));
  const password = String(form.get("password"));

  await new Promise((res) => setTimeout(res, 1000));

  if (email === "a@a.com") {
    return json({
      errors: {
        email: "Invalid email",
      },
    });
  }

  if (email.length > 0 && password.length > 0) {
    return redirect("/home");
  }

  return null;
}

export default function Index() {
  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();

  const [password, setPassword] = useState<string>(
    actionData?.errors.email !== undefined ? "" : ""
  );

  return (
    <div className="min-h-screen flex flex-row items-center justify-center">
      <Form method="post">
        <h1>Sign in</h1>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only">Email</Label>
            <Input
              id="email"
              placeholder="Email"
              type="email"
              name="email"
              disabled={navigation.state === "submitting"}
            />
            <Input
              id="email"
              name="password"
              placeholder="Password"
              type="password"
              disabled={navigation.state === "submitting"}
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>
          {actionData?.errors && (
            <p className="text-sm text-red-500">Incorrect Email or Password</p>
          )}
          <Button type="submit" disabled={navigation.state === "submitting"}>
            <span className="flex flex-row items-center justify-center leading-3">
              {navigation.state === "submitting" && (
                <LoaderCircle className="animate-spin mb-0.5" size={18} />
              )}
              <span className="leading-3">Sign In</span>
            </span>
          </Button>
        </div>
      </Form>
    </div>
  );
}
