import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Input } from "~/components/ui/input";

export function DomainsList() {
  return (
    <Card className="w-[600px]">
      <CardHeader>
        <CardTitle>Domains</CardTitle>
        <CardDescription>
          These will get pinged every 30 seconds
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-row items-center gap-1">
          <Input value="https://localhost:3000" disabled={true} />
          <Button variant={"destructive"} className="w-20">
            Delete
          </Button>
        </div>

        <div className="flex flex-row items-center gap-1 mt-2">
          <Input />
          <Button variant={"outline"} className="w-20">
            Save
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
