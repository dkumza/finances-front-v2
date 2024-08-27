import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { FC } from 'react';
import { RecentTransactionsProps } from './TransactionsTable';
import { useAppSelector } from '@/redux/hooks';
import {
  CarFront,
  Euro,
  HandCoins,
  HeartPulse,
  HousePlus,
  ShoppingCart,
  Utensils,
} from 'lucide-react';

export const RecentTransactions: FC<RecentTransactionsProps> = ({ length }) => {
  const { transactions } = useAppSelector(
    (state) => state.expenses.fetchedExpenses
  );

  const category = (cat: string) => {
    switch (cat) {
      case 'Food':
        return <Utensils className='h-4 w-4' />;
      case 'Health & Beauty':
        return <HeartPulse className='h-4 w-4' />;
      case 'Home':
        return <HousePlus className='h-4 w-4' />;
      case 'Transport':
        return <CarFront className='h-4 w-4' />;
      case 'Shopping & Services':
        return <ShoppingCart className='h-4 w-4' />;
      case 'Salary':
        return <Euro className='h-4 w-4' />;
      default:
        return <HandCoins className='h-4 w-4' />;
    }
  };
  return (
    <div className='space-y-8'>
      {transactions.slice(0, length).map((transaction) => (
        <div key={transaction._id} className='flex items-center'>
          <Avatar className='h-9 w-9'>
            <AvatarImage src='/avatars/01.png' alt='Avatar' />
            <AvatarFallback>{category(transaction.category)}</AvatarFallback>
          </Avatar>
          <div className='ml-4 space-y-1'>
            <p className='text-sm font-medium leading-none'>
              {transaction.date &&
                new Date(transaction.date).toISOString().split('T')[0]}
            </p>
            <p className='text-sm text-muted-foreground'>
              {' '}
              {transaction.description}
            </p>
          </div>
          <div className='ml-auto font-medium'>{transaction.amount} €</div>
        </div>
      ))}
    </div>
  );
};
