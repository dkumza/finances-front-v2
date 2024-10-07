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
import { useCallback, useMemo, useState } from 'react';
import { Transaction } from '@/redux/slices/expensesSlice';
import { Columns } from './columns';

export interface DataTableProps {
  // columns: ColumnDef<Transaction>[];
  data: Transaction[];
}

export function TransactionsTable({ data: initialData }: DataTableProps) {
  const [data, setData] = useState(initialData);
  const [rowSelection, setRowSelection] = useState({});
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);

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

  const handleDelete = useCallback((transaction: Transaction) => {
    // Implement your delete logic here
    console.log('Deleting transaction:', transaction);
    setData((prevData) => prevData.filter((t) => t._id !== transaction._id));
  }, []);

  const columns = useMemo(
    () => Columns({ onEdit: handleEdit, onDelete: handleDelete }),
    [handleEdit, handleDelete]
  );

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
