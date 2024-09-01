import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Activity, DiamondPercent, DollarSign, Layers } from 'lucide-react';
import { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';

interface DashSidebarProps {
  className: string;
}

export const DashSidebar: FC<DashSidebarProps> = ({ className }) => {
  const location = useLocation();
  return (
    <div className={cn('w-80', className)}>
      <Card className='space-y-4 pt-6 h-screen rounded-none border-y-0'>
        <div className='px-3'>
          {/* Header */}
          <div className='text-3xl font-semibold pb-6 flex justify-center gap-4 items-center'>
            <DiamondPercent />
            Dashboard
          </div>

          {/* Menu items */}
          <Link to='/'>
            <Button
              variant={location.pathname === '/' ? 'default' : 'ghost'}
              className={cn('w-full justify-start flex gap-1')}
            >
              <Layers className='h-4' />
              Overview
            </Button>
          </Link>
          <h2 className='my-2 px-4 text-lg font-semibold tracking-tight'>
            Transactions
          </h2>
          <div className='flex flex-col gap-1'>
            <Link to='/expenses'>
              <Button
                variant={
                  location.pathname === '/expenses' ? 'default' : 'ghost'
                }
                className={cn('w-full justify-start flex gap-1')}
              >
                <Layers className='h-4' />
                Expenses
              </Button>
            </Link>
            <Link to='/income'>
              <Button
                variant={location.pathname === '/income' ? 'default' : 'ghost'}
                className={cn('w-full justify-start flex gap-1')}
              >
                <DollarSign className='h-4' />
                Income
              </Button>
            </Link>
            <Link to='/transactions'>
              <Button
                variant={
                  location.pathname === '/transactions' ? 'default' : 'ghost'
                }
                className={cn('w-full justify-start flex gap-1')}
              >
                <Activity className='h-4' />
                Transactions
              </Button>
            </Link>
          </div>
        </div>
      </Card>
    </div>
  );
};
