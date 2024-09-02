import { ChartConfig } from '@/components/ui/chart';

export const description = 'A donut chart with text'; // unused variable

// TODO create proper categories in the backend, which will have single words
export const chartConfig = {
  Beauty: {
    label: 'Beauty',
    color: 'hsl(var(--chart-1))',
  },
  Food: {
    label: 'Food',
    color: 'hsl(var(--chart-2))',
  },
  Health: {
    label: 'Health',
    color: 'hsl(var(--chart-3))',
  },
  Home: {
    label: 'Home',
    color: 'hsl(var(--chart-4))',
  },
  Other: {
    label: 'Other',
    color: 'hsl(var(--chart-5))',
  },
  Shopping: {
    label: 'Shopping',
    color: 'hsl(var(--chart-6))',
  },
  Services: {
    label: 'Services',
    color: 'hsl(var(--chart-7))',
  },
  Transport: {
    label: 'Transport',
    color: 'hsl(var(--chart-8))',
  },
} satisfies ChartConfig;

export const colors = [
  'var(--color-Beauty)',
  'var(--color-Food)',
  'var(--color-Health)',
  'var(--color-Home)',
  'var(--color-Other)',
  'var(--color-Shopping)',
  'var(--color-Services)',
  'var(--color-Transport)',
];
