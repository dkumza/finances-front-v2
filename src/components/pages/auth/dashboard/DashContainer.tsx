import { Header } from './header/Header';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent } from '@/components/ui/tabs';

import { DashCards } from './overview/DashCards';
import { DashMenu } from './DashMenu';
import { useEffect } from 'react';
import { handleExpenses, handleUserExpenses } from '@/helpers/handleExpenses';
import { useAppSelector } from '@/redux/hooks';
import { RecentTransactions } from './overview/RecentTransactions';
// import { CalendarDateRangePicker } from '@/components/CalendarDateRangePicker';
// import { Button } from 'react-day-picker';

export function DashContainer() {
  useEffect(() => {
    handleUserExpenses();
    handleExpenses();
  }, []);

  const { transactions } = useAppSelector(
    (state) => state.expenses.fetchedExpenses
  );
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
          <DashMenu />
          <TabsContent value='overview' className='space-y-4'>
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
              <Card className='col-span-3 '>
                <CardHeader className=''>
                  <CardTitle>Recent Transactions</CardTitle>
                  {transactions.length > 0 && (
                    <CardDescription>
                      {`You made ${transactions.length} ${
                        transactions.length > 1 ? 'transactions' : 'transaction'
                      } this month.`}
                    </CardDescription>
                  )}
                  {transactions.length === 0 && (
                    <CardDescription>
                      {`You have no transactions this month.`}
                    </CardDescription>
                  )}
                </CardHeader>
                <CardContent>
                  <RecentTransactions length={10} />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
