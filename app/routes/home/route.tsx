import { LoaderFunctionArgs } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { Button } from "~/components/ui/button";
import { validate } from "~/lib/auth.server";
import { DomainsList } from "./domains_list";

export async function loader(request: LoaderFunctionArgs) {
  await validate(request);

  return null;
}

export default function Home() {
  return (
    <>
      <nav className="flex flex-row items-center justify-between p-4">
        <h1>Uptime Monitor</h1>
        <Button asChild>
          <Link to="/logout">Logout</Link>
        </Button>
      </nav>
      <div className="flex flex-row items-center justify-center">
        <div className="max-w-[1400px] w-full">
          <section className="flex flex-row items-center justify-start">
            <DomainsList />
          </section>
        </div>
      </div>
    </>
  );
}
