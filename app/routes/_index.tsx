import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Uptime Monitor" },
    { name: "description", content: "Welcome to the uptime monitor app" },
  ];
};

export default function Index() {
  return <div className="flex h-screen items-center justify-center">Index</div>;
}
