import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useMainContext } from '@/context/mainCtx';
import { useAppSelector } from '@/redux/hooks';
import { FC } from 'react';

interface DeleteTransactionDialogProps {
  handleDelete: (transaction: any) => void;
}

export const DeleteTransactionDialog: FC<DeleteTransactionDialogProps> = ({ handleDelete }) => {
  const { expense } = useAppSelector((state) => state.expenses);
  const { dialog, setDialog } = useMainContext();

  return (
    <AlertDialog open={dialog}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the transaction.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setDialog(false)}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => handleDelete(expense)}>Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
