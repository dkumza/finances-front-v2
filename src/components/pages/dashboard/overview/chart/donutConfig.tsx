import { ChartConfig } from '@/components/ui/chart';

export const description = 'A donut chart with text'; // unused variable

export const chartConfig = {
  Expenses: {
    label: 'Expenses',
  },
  Food: {
    label: 'Food',
    color: 'hsl(var(--chart-1))',
  },
  Home: {
    label: 'Home',
    color: 'hsl(var(--chart-2))',
  },
  Other: {
    label: 'Other Expenses',
    color: 'hsl(var(--chart-3))',
  },
  Shopping: {
    label: 'Shopping & Services',
    color: 'hsl(var(--chart-4))',
  },
  // other: {
  //   label: 'Other',
  //   color: 'hsl(var(--chart-5))',
  // },
} satisfies ChartConfig;
