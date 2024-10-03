import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "~/components/ui/chart";

export function ResponseTimeWeek({
  response_times,
}: {
  response_times: {
    date: string;
    avg: number;
  }[];
}) {
  const chartConfig = {
    responseTime: {
      label: "response time",
      color: "hsl(var(--chart-1))",
    },
  } satisfies ChartConfig;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Bar Chart - Last 7 days</CardTitle>
        <CardDescription>Average response times per day</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={response_times}
            margin={{
              top: 20,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar
              dataKey={(entry) => Math.round(entry.avg)}
              fill="#00aaff"
              radius={8}
            >
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="leading-none text-muted-foreground">
          Showing average time in milliseconds
        </div>
      </CardFooter>
    </Card>
  );
}

export function ResponseTimeWeek2({
  response_times,
}: {
  response_times: {
    date: string;
    avg: number;
  }[];
}) {
  const chartConfig = {
    responseTime: {
      label: "response time",
      color: "hsl(var(--chart-1))",
    },
  } satisfies ChartConfig;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Bar Chart - From 14 to 7 days ago</CardTitle>
        <CardDescription>Average response times per day</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={response_times}
            margin={{
              top: 20,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar
              dataKey={(entry) => Math.round(entry.avg)}
              fill="#00aaff"
              radius={8}
            >
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="leading-none text-muted-foreground">
          Showing average time in milliseconds
        </div>
      </CardFooter>
    </Card>
  );
}

export function ResponseTimeComparison({
  data,
}: {
  data: {
    min: {
      id: string;
      url_id: string;
      headers: string;
      success: boolean;
      response_time: number;
      saved_at: string;
    };
    max: {
      id: string;
      url_id: string;
      headers: string;
      success: boolean;
      response_time: number;
      saved_at: string;
    };
    response_times: {
      date: string;
      avg: number;
    }[];
  };
}) {
  const chartData = [
    { label: "Minimum", value: data.min.response_time },
    {
      label: "Today",
      value: data.response_times.length > 0 ? data.response_times[0].avg : 0,
    },
    { label: "Maximum", value: data.max.response_time },
  ];

  const chartConfig = {
    responseTime: {
      label: "response time",
      color: "hsl(var(--chart-1))",
    },
  } satisfies ChartConfig;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Bar Chart - Response Times general</CardTitle>
        <CardDescription>Minimum todays average and maximum</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 20,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="label"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="value" fill="#00aaff" radius={8}>
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="leading-none text-muted-foreground">
          Showing average time in milliseconds
        </div>
      </CardFooter>
    </Card>
  );
}
