import { TransactionsTable } from './transactionsTable/TransactionsTable';
import { columns } from './transactionsTable/columns';
import tasks from './transactionsTable/tasks.json';

export const TransactionsPage = () => {
  // console.log('tasks', tasks);
  // const data = JSON.parse(tasks.toString());
  // console.log('data', data);
  return (
    <div>
      <TransactionsTable data={tasks} columns={columns} />
    </div>
  );
};
