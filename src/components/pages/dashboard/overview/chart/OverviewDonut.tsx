import { Label, Pie, PieChart } from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ChartLegend, ChartLegendContent } from '@/components/ui/chart';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { chartConfig, colors } from './donutConfig';
import { useAppSelector } from '@/redux/hooks';

interface ExpenseAccumulator {
  [category: string]: number;
}

export function OverviewDonut() {
  const { totalExpense, allExpenses } = useAppSelector(
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

  console.log('groupedExpenses: ', groupedExpenses);

  // Convert grouped expenses to chart data, by mapping over the object entries and adding a fill color
  const chartData = Object.entries(groupedExpenses).map(
    ([category, amount], index) => ({
      category,
      amount,
      fill: colors[index % colors.length],
    })
  );
  console.log('chartData: ', chartData);

  return (
    <Card className='lg:col-span-4 col-span-6'>
      <CardHeader className='flex justify-center align-middle pb-2'>
        <CardTitle className=''>Overview Expenses</CardTitle>
        {allExpenses.length === 0 && (
          <CardDescription>{`You have no expenses yet.`}</CardDescription>
        )}
        {allExpenses.length > 0 && (
          <CardDescription>
            {`You made ${allExpenses.length} ${
              allExpenses.length > 1 ? 'expenses' : 'expense'
            } this month.`}
          </CardDescription>
        )}
      </CardHeader>
      <CardContent className='flex-1 justify-center align-middle'>
        <ChartContainer
          config={chartConfig}
          className='mx-auto aspect-square max-h-[250px]'
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
              innerRadius={60}
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
            <ChartLegend content={<ChartLegendContent />} />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
