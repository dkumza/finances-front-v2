import {
  deleteExpense,
  fetchExpenses,
  fetchUserExpenses,
} from '@/redux/actions/expensesActions';
import { logout } from '@/redux/slices/authSlice';
import { setExpenses } from '@/redux/slices/expensesSlice';
import store from '@/redux/store';

// Fetch only user expenses
export const handleUserExpenses = () => {
  store.dispatch(fetchUserExpenses()).then((res) => {
    console.log('single fetchUserExpenses res: ', res.payload);
    if (res.type === 'expenses/fetchUserExpenses/fulfilled') {
      store.dispatch(setExpenses(res.payload));
      return;
    }
    if (res.type === 'expenses/fetchUserExpenses/rejected') {
      const errorInfo = res.payload as { message: string; status: number };

      if (errorInfo && errorInfo.status === 401) {
        store.dispatch(logout());
        // toast.error('Session expired');
        throw new Error('Unauthorized');
      }

      if (errorInfo && errorInfo.status === undefined) {
        store.dispatch(logout());
        // toast.error('Something went wrong');
        throw new Error('Something went wrong');
      }
      return;
    }
    console.log('fetchUserExpenses Error: ', res);
  });
};

// Fetch all expenses
export const handleExpenses = () => {
  store.dispatch(fetchExpenses()).then((res) => {
    // console.log('all fetchExpenses res: ', res.payload);
    if (res.type === 'expenses/fetchExpenses/fulfilled') {
      store.dispatch(setExpenses(res.payload));
      return;
    }
    if (res.type === 'expenses/fetchExpenses/rejected') {
      const errorInfo = res.payload as { message: string; status: number };

      if (errorInfo && errorInfo.status === 401) {
        store.dispatch(logout());
        // toast.error('Session expired');
        throw new Error('Unauthorized');
      }

      if (errorInfo && errorInfo.status === undefined) {
        store.dispatch(logout());
        // toast.error('Something went wrong');
        throw new Error('Something went wrong');
      }
      return;
    }
    console.log('All fetchExpenses Error: ', res);
  });
};

export const handleDeleteTransaction = (id: string) => {
  store.dispatch(deleteExpense(id)).then((res) => {
    if (res.type === 'expenses/removeExpense/fulfilled') {
      // toast.success('Transaction deleted successfully');
      handleExpenses();
    }
    if (res.type !== 'expenses/removeExpense/fulfilled') {
      const errorMessage = `Failed to delete expense. Type: ${res.type}`;
      // toast.error('Failed to delete transaction');
      throw new Error(errorMessage);
    }
  });
};
