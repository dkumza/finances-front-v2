import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { DashCards } from './DashCards';
import TransactionsTable2 from './TransactionsTable2';

export const OverviewPage = () => {
  return (
    <div>
      <Tabs defaultValue='week' className='space-y-4'>
        {/* // TODO add logic to fetch transactions by selecting menu option */}
        {/* <DashMenu /> */}
        <TabsContent value='week' className='space-y-4'>
          <DashCards />
          <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-7'>
            <Card className='md:col-span-4'>
              <CardHeader>
                <CardTitle>Overview</CardTitle>
              </CardHeader>
              {/* <CardContent className='pl-2'>
        <Overview />
      </CardContent> */}
            </Card>

            <TransactionsTable2 />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
