import { useAppSelector } from '@/redux/hooks';
import { TransactionsTable } from './transactionsTable/TransactionsTable';
import { columns } from './transactionsTable/columns';

export const TransactionsPage = () => {
  const { transactions } = useAppSelector((state) => state.expenses.fetchUserExpenses);

  return (
    <div>
      <TransactionsTable data={transactions} columns={columns} />
    </div>
  );
};
