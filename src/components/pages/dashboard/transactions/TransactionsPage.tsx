import { useAppSelector } from '@/redux/hooks';
import { TransactionsTable } from './transactionsTable/TransactionsTable';
import { columns } from './transactionsTable/columns';
// import tasks from './transactionsTable/tasks.json';

export const TransactionsPage = () => {
  const { transactions } = useAppSelector((state) => state.expenses.fetchUserExpenses);
  // console.log('tasks', tasks);
  // const data = JSON.parse(tasks.toString());
  // console.log('data', data);

  return (
    <div>
      <TransactionsTable data={transactions} columns={columns} />
    </div>
  );
};
