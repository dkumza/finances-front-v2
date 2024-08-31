'use client';

import { ArrowUpRight } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { handleExpenses, handleUserExpenses } from '@/helpers/handleExpenses';
import { useAppSelector } from '@/redux/hooks';

export default function TransactionsTable2() {
  useEffect(() => {
    handleUserExpenses();
    handleExpenses();
  }, []);

  const { transactions } = useAppSelector(
    (state) => state.expenses.fetchedExpenses
  );
  return (
    <Card className='lg:col-span-3 col-span-4'>
      <CardHeader className='flex flex-row items-center'>
        <div className='grid gap-2'>
          <CardTitle>Recent Transactions</CardTitle>
          {transactions.length > 0 && (
            <CardDescription>
              {`You made ${transactions.length} ${
                transactions.length > 1 ? 'transactions' : 'transaction'
              } this month.`}
            </CardDescription>
          )}
          {transactions.length === 0 && (
            <CardDescription>
              {`You have no transactions this month.`}
            </CardDescription>
          )}
        </div>
        <Button asChild size='sm' className='ml-auto gap-1'>
          <Link to={''}>
            View All
            <ArrowUpRight className='h-4 w-4' />
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Category</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className='text-right'>Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions &&
              transactions.slice(0, 10).map((transaction) => (
                <TableRow key={transaction._id}>
                  <TableCell>
                    <div className='font-medium'>{transaction.category}</div>
                    <div className='hidden text-sm text-muted-foreground md:inline'>
                      {transaction.description}
                    </div>
                  </TableCell>
                  <TableCell className='table-cell text-sm text-muted-foreground'>
                    {transaction.date &&
                      new Date(transaction.date).toISOString().split('T')[0]}
                  </TableCell>
                  <TableCell className='text-right'>
                    {transaction.amount} €
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
