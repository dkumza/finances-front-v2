import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useAppSelector } from '@/redux/hooks';
import { FC } from 'react';

export interface RecentTransactionsProps {
  length?: number;
}

export const TransactionsTable: FC<RecentTransactionsProps> = ({ length }) => {
  const { transactions } = useAppSelector(
    (state) => state.expenses.fetchedExpenses
  );

  console.log('transactions', transactions);
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className='w-[100px]'>Category</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Date</TableHead>
          <TableHead className='text-right'>Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {/* show 10 last transactions === length */}
        {transactions.slice(0, length).map((transaction) => (
          <TableRow key={transaction._id}>
            <TableCell className='font-medium'>
              {transaction.category}
            </TableCell>
            <TableCell>{transaction.description}</TableCell>
            <TableCell>
              {transaction.date &&
                new Date(transaction.date).toISOString().split('T')[0]}
            </TableCell>
            <TableCell className='text-right'>{transaction.amount}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
