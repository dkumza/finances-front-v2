import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { FC } from 'react';

interface DashSidebarProps {
  className: string;
}

export const DashSidebar: FC<DashSidebarProps> = ({ className }) => {
  return (
    <div className={cn('', className)}>
      <Card className='space-y-4 pt-6 h-screen rounded-none border-y-0'>
        <div className='px-3'>
          <div className='text-3xl font-semibold pb-6 text-center flex justify-center gap-4 items-center'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='36'
              height='36'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
              className='lucide lucide-diamond-percent'
            >
              <path d='M2.7 10.3a2.41 2.41 0 0 0 0 3.41l7.59 7.59a2.41 2.41 0 0 0 3.41 0l7.59-7.59a2.41 2.41 0 0 0 0-3.41L13.7 2.71a2.41 2.41 0 0 0-3.41 0Z' />
              <path d='M9.2 9.2h.01' />
              <path d='m14.5 9.5-5 5' />
              <path d='M14.7 14.8h.01' />
            </svg>
            Dashboard
          </div>
          <h2 className='mb-2 px-4 text-lg font-semibold tracking-tight'>
            Discover
          </h2>
          <div className='space-y-1'>
            <Button variant='secondary' className='w-full justify-start'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
                className='mr-2 h-4 w-4'
              >
                <circle cx='12' cy='12' r='10' />
                <polygon points='10 8 16 12 10 16 10 8' />
              </svg>
              Listen Now
            </Button>
            <Button variant='ghost' className='w-full justify-start'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
                className='mr-2 h-4 w-4'
              >
                <rect width='7' height='7' x='3' y='3' rx='1' />
                <rect width='7' height='7' x='14' y='3' rx='1' />
                <rect width='7' height='7' x='14' y='14' rx='1' />
                <rect width='7' height='7' x='3' y='14' rx='1' />
              </svg>
              Browse
            </Button>
            <Button variant='ghost' className='w-full justify-start'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
                className='mr-2 h-4 w-4'
              >
                <path d='M4.9 19.1C1 15.2 1 8.8 4.9 4.9' />
                <path d='M7.8 16.2c-2.3-2.3-2.3-6.1 0-8.5' />
                <circle cx='12' cy='12' r='2' />
                <path d='M16.2 7.8c2.3 2.3 2.3 6.1 0 8.5' />
                <path d='M19.1 4.9C23 8.8 23 15.1 19.1 19' />
              </svg>
              Radio
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};
