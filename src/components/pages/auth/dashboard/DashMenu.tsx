import { TabsList, TabsTrigger } from '@/components/ui/tabs';

export const DashMenu = () => {
  return (
    <TabsList>
      <TabsTrigger value='overview'>Overview</TabsTrigger>
      <TabsTrigger value='analytics' disabled>
        Budgets
      </TabsTrigger>
      <TabsTrigger value='reports' disabled>
        Bills
      </TabsTrigger>
      <TabsTrigger value='notifications' disabled>
        Savings
      </TabsTrigger>
    </TabsList>
  );
};
