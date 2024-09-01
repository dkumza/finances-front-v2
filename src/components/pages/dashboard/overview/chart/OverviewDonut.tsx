import { Label, Pie, PieChart } from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { chartConfig } from './donutConfig';
import { useAppSelector } from '@/redux/hooks';

interface ExpenseAccumulator {
  [category: string]: number;
}

const colors = [
  'var(--color-Food)',
  'var(--color-Home)',
  'var(--color-Other)',
  'var(--color-Shopping)',
  // 'var(--color-other)',
];

export function OverviewDonut() {
  const { totalExpense, allExpenses, transactions } = useAppSelector(
    (state) => state.expenses.fetchedExpenses
  );

  // Group expenses by category
  const groupedExpenses = allExpenses.reduce<ExpenseAccumulator>(
    (acc, expense) => {
      const category = expense.category;
      if (!acc[category]) {
        acc[category] = 0;
      }
      acc[category] += Math.abs(expense.amount || 0);
      return acc;
    },
    {}
  );

  // Convert grouped expenses to chart data, by mapping over the object entries and adding a fill color
  const chartData = Object.entries(groupedExpenses).map(
    ([category, amount], index) => ({
      category,
      amount,
      fill: colors[index % colors.length],
    })
  );

  return (
    <Card className='md:col-span-4'>
      <CardHeader className='flex justify-center align-middle'>
        <CardTitle className=''>Overview</CardTitle>
        {transactions.length === 0 && (
          <CardDescription>{`You have no transactions yet.`}</CardDescription>
        )}
      </CardHeader>
      <CardContent className='flex-1 pb-0'>
        <ChartContainer
          config={chartConfig}
          className='mx-auto aspect-square max-h-[430px]'
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey='amount'
              nameKey='category'
              innerRadius={100}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor='middle'
                        dominantBaseline='middle'
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className='fill-foreground text-3xl font-bold'
                        >
                          {totalExpense} €
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className='fill-muted-foreground'
                        >
                          Total Expenses
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
