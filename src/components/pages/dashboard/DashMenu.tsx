import { TabsList, TabsTrigger } from '@/components/ui/tabs';

export const DashMenu = () => {
  return (
    <TabsList>
      <TabsTrigger value='week'>Week</TabsTrigger>
      <TabsTrigger value='month'>Month</TabsTrigger>
      <TabsTrigger value='year'>Year</TabsTrigger>
    </TabsList>
  );
};
