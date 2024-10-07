import { useAppSelector } from '@/redux/hooks';
import { TransactionsTable } from './transactionsTable/TransactionsTable';

export const TransactionsPage = () => {
  const { transactions } = useAppSelector((state) => state.expenses.fetchUserExpenses);

  return (
    <div>
      <TransactionsTable data={transactions} />
    </div>
  );
};
