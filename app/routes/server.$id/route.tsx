import { LoaderFunctionArgs } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { House } from "lucide-react";
import { Button } from "~/components/ui/button";
import { StatsGathered } from "../home/stats_gathered";

export async function loader({ params }: LoaderFunctionArgs) {
  console.log(params);
  return null;
}

export default function ServerID() {
  return (
    <>
      <nav className="flex flex-row items-center justify-between p-4">
        <h1>Uptime Monitor</h1>
        <Button asChild>
          <Link to="/logout">Logout</Link>
        </Button>
      </nav>

      <Button asChild>
        <Link to="/home" className="ml-4">
          Home
        </Link>
      </Button>

      <div className="flex flex-row items-center justify-center">
        <div className="max-w-[1400px] w-full">
          <section>
            <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
              Domain:{" "}
              <span className="text-red-400">
                https://localhost:3000/api/test
              </span>
              {" Id: "}
              <span className="text-blue-400">
                8b91d2b2-daef-4e75-94ef-413e7111562e
              </span>
            </h2>
          </section>

          <section></section>

          <section></section>
        </div>
      </div>
    </>
  );
}
