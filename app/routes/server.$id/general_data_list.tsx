import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";

export function GeneralDataList({
  data,
}: {
  data: {
    id: string;
    url_id: string;
    headers: string;
    success: boolean;
    response_time: number;
    saved_at: string;
  }[];
}) {
  console.log(data);
  return (
    <Table>
      <TableCaption>Outages</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[180px]">Sent at</TableHead>
          <TableHead className="w-[80px]">Status</TableHead>
          <TableHead>Response Headers</TableHead>
          <TableHead className="text-right">Response Time</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((row) => {
          return (
            <TableRow key={row.id}>
              <TableCell className="font-medium">
                {new Date(row.saved_at).toLocaleTimeString("pl")}
              </TableCell>
              <TableCell
                className={`${!row.success ? "bg-red-500 text-white" : ""}`}
              >
                {row.success ? "Success" : "Failure"}
              </TableCell>
              <TableCell>{row.headers}</TableCell>
              <TableCell className="text-right">{row.response_time}</TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
