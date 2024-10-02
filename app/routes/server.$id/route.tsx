import { LoaderFunctionArgs } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { House } from "lucide-react";
import { Button } from "~/components/ui/button";

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
    </>
  );
}
