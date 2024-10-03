import { json, LoaderFunctionArgs } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { House } from "lucide-react";
import { Button } from "~/components/ui/button";
import { StatsGathered } from "../home/stats_gathered";
import { GeneralDataList } from "./general_data_list";
import { URLDetails } from "~/types/api-types";
import {
  ResponseTimeComparison,
  ResponseTimeWeek,
  ResponseTimeWeek2,
} from "./response_time";

export async function loader({ params }: LoaderFunctionArgs) {
  const res = await fetch(
    `http://localhost:1323/statistics/details?id=${params.id}`
  );

  const data: URLDetails = await res.json();

  return json(data);
}

export default function ServerID() {
  const data = useLoaderData<typeof loader>();

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
              Domain: <span className="text-red-400">{data.url}</span>
              {" Id: "}
              <span className="text-blue-400">{data.id}</span>
            </h2>
          </section>
          <section>
            <StatsGathered data={data.response_times} urlData={data.id} />
          </section>
          <section className="grid grid-cols-3 gap-2 p-2">
            <ResponseTimeComparison
              data={{
                min: data.minimum,
                max: data.maximum,
                response_times: data.response_times,
              }}
            />
            <ResponseTimeWeek response_times={data.response_times_7} />
            <ResponseTimeWeek2 response_times={data.response_times_14} />
          </section>
          <section>
            <GeneralDataList data={data.all} />
          </section>
        </div>
      </div>
    </>
  );
}
