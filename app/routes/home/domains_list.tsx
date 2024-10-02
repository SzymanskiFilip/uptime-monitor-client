import {
  Form,
  useActionData,
  useFetcher,
  useNavigation,
  useSubmit,
} from "@remix-run/react";
import {
  FormEvent,
  FormEventHandler,
  useEffect,
  useRef,
  useTransition,
} from "react";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Domain } from "~/types/api-types";
import { action } from "./route";

export function DomainsList({ domains }: { domains: Domain[] }) {
  const addFetcher = useFetcher({ key: "add-domain" });
  const submit = useSubmit();
  const navigation = useNavigation();
  const actionData = useActionData<typeof action>();
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (
      actionData?.saveDomainStatus === "success" &&
      formRef.current !== null
    ) {
      formRef.current.reset();
    }
  }, [actionData]);

  return (
    <Card className="w-[600px]">
      <CardHeader>
        <CardTitle>Domains</CardTitle>
        <CardDescription>
          These will get pinged every 30 seconds
        </CardDescription>
      </CardHeader>
      <CardContent>
        {domains.map((d) => {
          return <DomainItem key={d.id} d={d} />;
        })}

        <addFetcher.Form
          ref={formRef}
          className="flex flex-row items-center gap-1 mt-2"
          method="POST"
          onSubmit={(e) => {
            submit(e.currentTarget, { replace: true });
          }}
        >
          <Input name="domain" />
          <Input
            name="action"
            value="domain-save"
            readOnly={true}
            className="hidden"
          />
          <Button
            type="submit"
            variant={"outline"}
            className="w-20"
            disabled={navigation.state === "submitting"}
          >
            {addFetcher.state === "submitting" ? "Saving..." : "Save"}
          </Button>
        </addFetcher.Form>
      </CardContent>
    </Card>
  );
}

function DomainItem({ d }: { d: Domain }) {
  const fetcher = useFetcher();

  return (
    <fetcher.Form
      className="flex flex-row items-center gap-1 mb-1"
      method="POST"
      onSubmit={(e) => {
        fetcher.submit(e.currentTarget, { method: "POST" });
      }}
    >
      <Input value={d.url} disabled />
      <Input
        name="action"
        value="domain-delete"
        readOnly={true}
        className="hidden"
      />
      <Button
        variant={"destructive"}
        className="w-20"
        name="urlId"
        value={d.id}
      >
        {fetcher.state === "submitting" ? "Deleting..." : "Delete"}
      </Button>
    </fetcher.Form>
  );
}
