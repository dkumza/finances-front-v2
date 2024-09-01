import { Tabs, TabsContent } from '@/components/ui/tabs';
import { DashCards } from './DashCards';
import TransactionsTable2 from './TransactionsTable2';
import { OverviewDonut } from './chart/OverviewDonut';

export const OverviewPage = () => {
  return (
    <div>
      <Tabs defaultValue='week' className='space-y-4'>
        {/* // TODO add logic to fetch transactions by selecting menu option */}
        {/* <DashMenu /> */}
        <TabsContent value='week' className='space-y-4'>
          <DashCards />
          <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-10'>
            <TransactionsTable2 />
            <OverviewDonut />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
