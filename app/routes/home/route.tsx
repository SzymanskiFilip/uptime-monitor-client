/* eslint-disable react-hooks/exhaustive-deps */
import {
  ActionFunctionArgs,
  json,
  LoaderFunctionArgs,
  MetaFunction,
} from "@remix-run/node";
import { Link, useActionData, useLoaderData } from "@remix-run/react";
import { Button } from "~/components/ui/button";
import { validate } from "~/lib/auth.server";
import { DomainsList } from "./domains_list";
import { Domain } from "~/types/api-types";
import { deleteDomain, saveDomain } from "~/service/domains.server";
import { useEffect } from "react";
import { useToast } from "~/hooks/use-toast";
import { Toaster } from "~/components/ui/toaster";
import { StatsGathered } from "./stats_gathered";
import { DomainResponseTime } from "~/types/data-types";

export const meta: MetaFunction = () => {
  return [
    { title: "Uptime Monitor" },
    { name: "description", content: "Welcome to the uptime monitor app" },
  ];
};

export async function loader(request: LoaderFunctionArgs) {
  await validate(request);

  const res = await fetch("http://localhost:1323/domains", {
    method: "GET",
  });

  const body: Domain[] = await res.json();

  const promises = body.map((d) => {
    return fetch(`http://localhost:1323/statistics?id=${d.id}`);
  });

  const responses = await Promise.all(promises);
  const domainResponseTimes: DomainResponseTime[] = await Promise.all(
    responses.map(async (res) => {
      const json: DomainResponseTime = await res.json();
      return {
        id: json.id,
        data: json.data,
      };
    })
  );

  return json({
    domains: body,
    domainResponseTimes: domainResponseTimes,
  });
}

export default function Home() {
  const data = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();
  const { toast } = useToast();

  useEffect(() => {
    if (actionData !== undefined && actionData !== null) {
      if (actionData.saveDomainStatus === "invalid") {
        toast({
          title: "Input a valid url.",
          variant: "destructive",
        });
      }
    }
  }, [actionData]);

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
            <DomainsList domains={data.domains} />
          </section>

          <section className="mt-2">
            {data.domainResponseTimes.map((responseTime) => {
              return (
                <StatsGathered
                  key={responseTime.id}
                  data={responseTime.data}
                  urlData={responseTime.id}
                />
              );
            })}
          </section>
        </div>
      </div>

      <Toaster />
    </>
  );
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();

  const obj = Object.fromEntries(formData);

  if (obj.action === "domain-save") {
    const saveDomainStatus = await saveDomain(formData);
    return json({
      saveDomainStatus: saveDomainStatus,
    });
  }

  if (obj.action === "domain-delete") {
    await deleteDomain(formData);
  }

  return null;
}
