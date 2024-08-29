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
        style={{ marginLeft: `${innerWidth - 635}px` }}
        className='rounded-none flex items-center'
      >
        <div className='w-[352px] border border-green-600 p-0'>
          <DrawerHeader className='px-0'>
            <DrawerTitle>Add New Transaction</DrawerTitle>
            <DrawerDescription>Set your daily activity goal.</DrawerDescription>
          </DrawerHeader>
          <div className='p-4 pb-0'>
            <div className='flex items-center justify-center space-x-2'></div>
          </div>
          <DrawerFooter className='px-0'>
            <Button>Submit</Button>
            <DrawerClose asChild>
              <Button variant='outline'>Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};
