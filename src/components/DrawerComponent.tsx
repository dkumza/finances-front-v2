import * as React from 'react';

import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { TransactionsForm } from './pages/dashboard/transactions/TransactionsForm';
interface DrawerComponentProps {
  title: string;
}

export const DrawerComponent: React.FC<DrawerComponentProps> = ({ title }) => {
  const [innerWidth, setInnerWidth] = React.useState(window.innerWidth);
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  React.useEffect(() => {
    const handleResize = () => {
      setInnerWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <Drawer direction='right' open={drawerOpen} onOpenChange={setDrawerOpen}>
      <DrawerTrigger asChild>
        <Button onClick={() => setDrawerOpen(true)}>{title}</Button>
      </DrawerTrigger>
      <DrawerContent
        style={{ marginLeft: `${innerWidth - 444}px` }}
        className='rounded-none flex items-center overflow-auto'
      >
        <div className='w-[352px] '>
          <DrawerHeader className='p-0'>
            <DrawerTitle className='text-2xl font-semibold tracking-tight p-0 m-0'>
              New Transaction
            </DrawerTitle>
            <DrawerDescription className='border-none leading-7 [&:not(:first-child)]:mt-2 text-muted-foreground mb-2'>
              Please enter transaction details
            </DrawerDescription>
          </DrawerHeader>
          <div className=''>
            <div
              id='drawer-body'
              className='flex items-center justify-center space-x-2'
            >
              <TransactionsForm setDrawerOpen={setDrawerOpen} />
            </div>
          </div>
          <DrawerFooter className='p-0 mt-3'>
            <DrawerClose asChild>
              <Button variant='outline'>Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};
