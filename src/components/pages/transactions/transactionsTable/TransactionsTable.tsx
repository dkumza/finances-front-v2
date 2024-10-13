import {
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { DataTablePagination } from './data-table-pagination';
import { DataTableToolbar } from './data-table-toolbar';
import { useCallback, useEffect, useState } from 'react';
import { Transaction } from '@/redux/slices/expensesSlice';
import { Columns } from './columns';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { deleteExpense } from '@/redux/actions/expensesActions';
import { DeleteTransactionDialog } from '../DeleteTransactionDialog';
import { toast } from '@/components/ui/use-toast';
import { useMainContext } from '@/context/mainCtx';

export function TransactionsTable() {
  const dispatch = useAppDispatch();
  const { transactions } = useAppSelector((state) => state.expenses.fetchUserExpenses);

  const { setDialog } = useMainContext();
  const [data, setData] = useState<Transaction[]>(transactions);
  const [rowSelection, setRowSelection] = useState({});
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);

  // update the local data when the transactions change
  useEffect(() => {
    setData(transactions);
  }, [transactions]);

  const deleteSelectedRows = useCallback(() => {
    // Get the selected row indices
    const selectedIndices = Object.keys(rowSelection).map(Number);

    // Get the selected row data and IDs
    const selectedRows = selectedIndices.map((index) => data[index]);
    const selectedIds = selectedRows.map((row) => row._id);

    console.log('Selected row data:', selectedRows);
    console.log('Selected row IDs:', selectedIds);

    // TODO deleteRowsFromDatabase(selectedIds);

    // Filter out the selected rows from the local data
    const newData = data.filter((row) => !selectedIds.includes(row._id));

    // Update the local state
    setData(newData);
    setRowSelection({});
  }, [data, rowSelection]);

  const handleEdit = useCallback((transaction: Transaction) => {
    // Implement your edit logic here
    console.log('Editing transaction:', transaction);
  }, []);

  const handleDelete = useCallback((transaction: string) => {
    setDialog(false);
    dispatch(deleteExpense(transaction)).then((res) => {
      if (res.type === 'expenses/removeExpense/fulfilled') {
        setData((prevData) => prevData.filter((t) => t._id !== transaction));
        console.log('Deleting transaction:', transaction);
        toast({
          description: 'Transaction deleted successful',
          className: 'bg-green-500 text-white',
        });
      }
      if (res.type === 'expenses/deleteExpense/rejected') {
        console.log('Error deleting transaction:', transaction);
        toast({
          description: 'Failed to delete transaction',
          className: 'bg-rose-700 text-white',
        });
      }
    });
  }, []);

  // Define the columns and pass the edit and delete handlers
  const columns = Columns({ onEdit: handleEdit, setDialog });

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  return (
    <div className='space-y-4'>
      <DeleteTransactionDialog handleDelete={handleDelete} />
      <DataTableToolbar table={table} deleteSelectedRows={deleteSelectedRows} />
      <div className='rounded-md border'>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} colSpan={header.colSpan}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className='h-24 text-center'>
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} />
    </div>
  );
}
