import { TabsList, TabsTrigger } from '@/components/ui/tabs';

export const DashMenu = () => {
  return (
    <TabsList>
      <TabsTrigger value='overview'>Overview</TabsTrigger>
      <TabsTrigger value='budget'>Budgets</TabsTrigger>
      <TabsTrigger value='bills'>Bills</TabsTrigger>
      <TabsTrigger value='savings'>Savings</TabsTrigger>
    </TabsList>
  );
};
