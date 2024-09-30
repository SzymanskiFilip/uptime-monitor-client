import type { MetaFunction } from "@remix-run/node";
import { LoaderCircle } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";

export const meta: MetaFunction = () => {
  return [
    { title: "Uptime Monitor" },
    { name: "description", content: "Welcome to the uptime monitor app" },
  ];
};

export default function Index() {
  const isLoading = false;

  return (
    <div className="">
      <form>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only">Email</Label>
            <Input
              id="email"
              placeholder="Email"
              type="email"
              disabled={isLoading}
            />
            <Input
              id="email"
              placeholder="Password"
              type="password"
              disabled={isLoading}
            />
          </div>
          <Button type="submit" disabled={isLoading}>
            {isLoading && <LoaderCircle />}
            Sign In with Email
          </Button>
        </div>
        <div className="relative mt-2">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background text-muted-foreground px-2">
              Or continue with
            </span>
          </div>
        </div>
      </form>
    </div>
  );
}
