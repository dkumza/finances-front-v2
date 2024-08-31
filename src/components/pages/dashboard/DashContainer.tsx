import { Header } from './header/Header';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { DashCards } from './overview/DashCards';
import { DashMenu } from './DashMenu';
import TransactionsTable2 from './overview/TransactionsTable2';
import { DrawerComponent } from '@/components/DrawerComponent';

export function DashContainer() {
  return (
    <div className='flex min-h-screen w-full flex-col'>
      <Header />
      <div className='flex-1 space-y-4 p-8 pt-6 container'>
        <div className='flex items justify-between'>
          <h2 className='text-3xl font-bold tracking-tight'>Dashboard</h2>
          <div className='flex items-center space-x-2'>
            <DrawerComponent title={'New Transaction'} />
          </div>
        </div>
        <Tabs defaultValue='overview' className='space-y-4'>
          <DashMenu />
          <TabsContent value='overview' className='space-y-4'>
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
    </div>
  );
}
