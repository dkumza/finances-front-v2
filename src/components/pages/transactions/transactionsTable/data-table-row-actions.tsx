import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import { Row } from '@tanstack/react-table';
import { setExpenseToDelete, Transaction } from '@/redux/slices/expensesSlice';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAppDispatch } from '@/redux/hooks';
import { useMainContext } from '@/context/mainCtx';

interface DataTableRowActionsProps {
  row: Row<Transaction>;
  onEdit: (transaction: Transaction) => void;
}

export function DataTableRowActions({ row }: DataTableRowActionsProps) {
  const dispatch = useAppDispatch();
  const transaction = row.original;

  const { setDialog } = useMainContext();

  const prepForDelete = (id: string) => {
    dispatch(setExpenseToDelete(id));
    // Open the dialog
    setDialog(true);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' className='flex h-8 w-8 p-0 data-[state=open]:bg-muted'>
          <DotsHorizontalIcon className='h-4 w-4' />
          <span className='sr-only'>Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' className='w-[160px]'>
        {/* <DropdownMenuItem onClick={() => onEdit(transaction)}>Edit</DropdownMenuItem> */}
        <DropdownMenuItem onClick={() => prepForDelete(transaction._id)}>Delete</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
