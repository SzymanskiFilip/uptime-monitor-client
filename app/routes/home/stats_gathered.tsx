import { Link } from "@remix-run/react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "~/components/ui/chart";

export const description = "An interactive line chart";

const chartConfig = {
  views: {
    label: "response time",
  },
  responseTime: {
    label: "ResponseTime",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function StatsGathered({
  data,
  urlData,
}: {
  data: { date: string; avg: number }[];
  urlData: string;
}) {
  return (
    <Card>
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>
            Line Chart - Interactive -{" "}
            <Link to={`/server/${urlData}`}>
              <span className="text-blue-500 hover:underline">
                {" "}
                URL id {` ${urlData}`}
              </span>
            </Link>
          </CardTitle>
          <CardDescription>
            Showing average server response type for each recorded day.
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <LineChart
            accessibilityLayer
            data={data}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="avg"
                  labelFormatter={(value) => {
                    const date = new Date(value); // Parse date string
                    return date.toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    });
                  }}
                />
              }
            />
            <Line
              dataKey={"avg"}
              type="monotone"
              stroke="hsl(200, 100%, 50%)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
