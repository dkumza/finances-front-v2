import { ArrowUpRight } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useEffect } from 'react';
import { handleExpenses, handleUserExpenses } from '@/helpers/handleExpenses';
import { useAppSelector } from '@/redux/hooks';
import { useMainContext } from '@/context/mainCtx';

export default function TransactionsTableRecent() {
  const { setActiveTab } = useMainContext();

  useEffect(() => {
    handleUserExpenses();
    handleExpenses();
  }, []);

  const { transactions } = useAppSelector((state) => state.expenses.fetchedExpenses);
  return (
    <Card className='lg:col-span-6 col-span-6'>
      <CardHeader className='flex flex-row items-center pb-2'>
        <div className='flex justify-between w-full items-center align-middle'>
          <div className='grid '>
            <CardTitle className='pb-1.5'>Recent Transactions</CardTitle>
            {transactions.length > 0 && (
              <CardDescription>
                {`You made ${transactions.length} ${
                  transactions.length > 1 ? 'transactions' : 'transaction'
                } this month.`}
              </CardDescription>
            )}
            {transactions.length === 0 && (
              <CardDescription>{`You have no transactions yet.`}</CardDescription>
            )}
          </div>
          {transactions.length > 0 && (
            <Button
              asChild
              size='sm'
              className='ml-auto gap-1'
              onClick={() => setActiveTab('transactions')}
            >
              <div className='cursor-pointer'>
                View All
                <ArrowUpRight className='h-4 w-4' />
              </div>
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className=''>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Created</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Category</TableHead>
              <TableHead className='text-right'>Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions && transactions.length > 0 ? (
              transactions.slice(0, 10).map((transaction) => (
                <TableRow key={transaction._id}>
                  <TableCell className='table-cell text-sm text-muted-foreground'>
                    {transaction.date &&
                      new Date(transaction.createdAt).toISOString().split('T')[0]}
                  </TableCell>
                  <TableCell className='table-cell text-sm text-muted-foreground'>
                    {transaction.description}
                  </TableCell>
                  <TableCell>
                    <div className='font-medium'>{transaction.category}</div>
                  </TableCell>

                  <TableCell className='text-right'>{transaction.amount} €</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className='h-24 text-center'>
                  No transactions.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
