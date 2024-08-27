import { Header } from './header/Header';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent } from '@/components/ui/tabs';

import { DashCards } from './DashCards';
import { DashMenu } from './DashMenu';

export function DashContainer() {
  return (
    <div className='flex min-h-screen w-full flex-col'>
      <Header />
      <div className='flex-1 space-y-4 p-8 pt-6 container'>
        <div className='flex items-center justify-between space-y-2'>
          <h2 className='text-3xl font-bold tracking-tight'>Dashboard</h2>
          {/* <div className='flex items-center space-x-2'>
            <CalendarDateRangePicker />
            <Button>Download</Button>
          </div> */}
        </div>
        <Tabs defaultValue='overview' className='space-y-4'>
          <TabsContent value='overview' className='space-y-4'>
            <DashMenu />
            <DashCards />
            <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-7'>
              <Card className='col-span-4'>
                <CardHeader>
                  <CardTitle>Overview</CardTitle>
                </CardHeader>
                {/* <CardContent className='pl-2'>
                  <Overview />
                </CardContent> */}
              </Card>
              <Card className='col-span-3'>
                <CardHeader>
                  <CardTitle>Recent Sales</CardTitle>
                  <CardDescription>
                    You made 265 sales this month.
                  </CardDescription>
                </CardHeader>
                {/* <CardContent>
                  <RecentSales />
                </CardContent> */}
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
