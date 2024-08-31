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
import { TransactionsForm } from './pages/transactions/TransactionsForm';
interface DrawerComponentProps {
  title: string;
}

export const DrawerComponent: React.FC<DrawerComponentProps> = ({ title }) => {
  const [innerWidth, setInnerWidth] = React.useState(window.innerWidth);

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
    <Drawer direction='right'>
      <DrawerTrigger asChild>
        <Button>{title}</Button>
      </DrawerTrigger>
      <DrawerContent
        style={{ marginLeft: `${innerWidth - 444}px` }}
        className='rounded-none flex items-center'
      >
        <div className='w-[352px] '>
          <DrawerHeader className='p-0 mb-2'>
            <DrawerTitle>New Transaction</DrawerTitle>
            <DrawerDescription className='border-none'>
              Please enter transaction details
            </DrawerDescription>
          </DrawerHeader>
          <div className=''>
            <div
              id='drawer-body'
              className='flex items-center justify-center space-x-2'
            >
              <TransactionsForm />
            </div>
          </div>
          <DrawerFooter className='p-0 m-0'>
            <DrawerClose asChild>
              <Button variant='outline'>Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};
