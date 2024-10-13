import { Cross2Icon, TrashIcon } from '@radix-ui/react-icons';
import { Table } from '@tanstack/react-table';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { DataTableFacetedFilter } from './data-table-faceted-filter';
import { statuses } from './data';
import { DataTableViewOptions } from './data-table-view-options';

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  deleteSelectedRows: () => void;
}

export function DataTableToolbar<TData>({
  table,
  deleteSelectedRows,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;
  const selectedRowsCount = Object.keys(table.getState().rowSelection).length;

  return (
    <div className='flex items-center justify-between'>
      <div className='flex flex-1 items-center space-x-2'>
        <Input
          placeholder='Filter tasks...'
          value={(table.getColumn('description')?.getFilterValue() as string) ?? ''}
          onChange={(event) => table.getColumn('title')?.setFilterValue(event.target.value)}
          className='h-8 w-[150px] lg:w-[250px]'
        />
        {table.getColumn('category') && (
          <DataTableFacetedFilter
            column={table.getColumn('category')}
            title='Category'
            options={statuses}
          />
        )}

        {isFiltered && (
          <Button
            variant='ghost'
            onClick={() => table.resetColumnFilters()}
            className='h-8 px-2 lg:px-3'
          >
            Reset
            <Cross2Icon className='ml-2 h-4 w-4' />
          </Button>
        )}
      </div>
      {selectedRowsCount > 0 && (
        <Button variant='outline' size='sm' className='mr-2' onClick={deleteSelectedRows}>
          <TrashIcon className=' h-4 w-4' />
          Delete Selected
        </Button>
      )}
      <DataTableViewOptions table={table} />
    </div>
  );
}
