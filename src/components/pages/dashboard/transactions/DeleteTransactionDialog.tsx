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
import { useAppSelector } from '@/redux/hooks';
import { FC } from 'react';

interface DeleteTransactionDialogProps {
  dialog: boolean;
  setDialog: (value: boolean) => void;
  setData: (value: any) => void;
  handleDelete: (transaction: any) => void;
}

export const DeleteTransactionDialog: FC<DeleteTransactionDialogProps> = ({
  dialog,
  setDialog,
  handleDelete,
}) => {
  const { expense } = useAppSelector((state) => state.expenses);
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
