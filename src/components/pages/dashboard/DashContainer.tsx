import { DrawerComponent } from '@/components/pages/transactions/DrawerComponent';
import { UserNav } from './header/UserNav';
import { OverviewPage } from './overview/OverviewPage';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useState } from 'react';
import { TransactionsTable } from '../transactions/transactionsTable/TransactionsTable';
import { useMainContext } from '@/context/mainCtx';

export function DashContainer() {
  const { activeTab, setActiveTab } = useMainContext();
  const [title, setTitle] = useState('Overview');
  // const location = useLocation();

  const setPageTitle = (value: string) => {
    setTitle(value);
  };

  return (
    <div className='flex min-h-screen w-full flex-col container px-4'>
      {/* <Header /> */}
      <div className='flex'>
        {/* <DashSidebar className='hidden lg:block' /> */}
        <div className='flex-1 space-y-4'>
          <div className='flex items justify-between'>
            <div className='flex pt-6 pb-2  w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4 '>
              <div className='flex items justify-between gap-8'>
                <h2 className='text-2xl font-bold tracking-tight flex gap-2 items-center'>
                  {/* <Layers /> */}
                  {title}
                </h2>
              </div>

              <form className='ml-auto flex-1 sm:flex-initial'>
                {/* <div className='relative'>
                <Search className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
                <Input
                type='search'
                placeholder='Search products...'
                className='pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]'
                />
                </div> */}
              </form>
              <div className='flex items-center space-x-2 '>
                <DrawerComponent title={'New Transaction'} />
              </div>
              {/* <ThemeSwitcher /> */}
              <UserNav />
            </div>
          </div>

          <Tabs value={activeTab} className='space-y-4'>
            <TabsList>
              <TabsTrigger
                value='overview'
                onClick={() => {
                  setActiveTab('overview');
                  setPageTitle('Overview');
                }}
              >
                Overview
              </TabsTrigger>
              <TabsTrigger
                value='transactions'
                onClick={() => {
                  setActiveTab('transactions');
                  setPageTitle('Transactions');
                }}
              >
                Transactions
              </TabsTrigger>
            </TabsList>
            <TabsContent value='overview' className='space-y-4'>
              <OverviewPage />
            </TabsContent>
            <TabsContent value='transactions' className='space-y-4'>
              <TransactionsTable />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
