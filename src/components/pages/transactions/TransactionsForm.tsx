import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { FC, useEffect, useState } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { TransactionSchema } from '@/helpers/formSchemas';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import axios from 'axios';
import { createExpense } from '@/redux/actions/expensesActions';
import { handleExpenses, handleUserExpenses } from '@/helpers/handleExpenses';

const CATS_URL = 'http://127.0.0.1:3000/expenses/categories';
interface TransactionsFormProps {
  setDrawerOpen: (value: boolean) => void;
}

export const TransactionsForm: FC<TransactionsFormProps> = ({
  setDrawerOpen,
}) => {
  const dispatch = useAppDispatch();
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [categories, setCategories] = useState<string[]>([]);

  const token = useAppSelector((state) => state.login.token);

  useEffect(() => {
    axios
      .get(CATS_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setCategories(Object.values(response.data));
      })
      .catch((error) => {
        console.log('error: ', error);
      });
  }, [token]);

  // Get the current date to set as the default value for the date field
  const nowDate = format(new Date(), 'yyyy-MM-dd');

  const form = useForm({
    resolver: zodResolver(TransactionSchema),
    defaultValues: {
      category: '',
      amount: 0,
      description: '',
      date: nowDate,
    },
  });

  const onSubmit = (values: z.infer<typeof TransactionSchema>) => {
    console.log('value', values);

    // fix the date format

    dispatch(createExpense(values)).then((res) => {
      // The createExpense action has been fulfilled
      if (res.type === 'expenses/createExpense/fulfilled') {
        // toast.success('Transaction added successfully');
        // formik.resetForm();
        handleUserExpenses();
        handleExpenses();
        setDrawerOpen(false);
      }
      // The createExpense action has been rejected
      if (res.type !== 'expenses/createExpense/fulfilled') {
        const errorMessage = `Failed to create expense. Type: ${res.type}`;
        // toast.error('Failed to create expense');
        throw new Error(errorMessage);
      }
    });
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='space-y-3 flex flex-col justify-center align-middle w-[350px]'
      >
        <FormField
          control={form.control}
          name='category'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={'Select Category'} />
                  </SelectTrigger>
                  <SelectContent>
                    {categories &&
                      categories.map((cat, index) => (
                        <SelectItem key={index} value={cat}>
                          {cat}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='amount'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder='Amount'
                  type='number'
                  min={0}
                  step={0.01}
                  {...field}
                  onFocus={(e) => e.target.select()}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='description'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder='Description' type='text' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='date'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={'outline'}
                        className={cn(
                          'w-full pl-3 text-left font-normal',
                          !field.value && 'text-muted-foreground'
                        )}
                      >
                        {field.value ? (
                          format(field.value, 'yyyy-MM-dd')
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className='w-auto p-0' align='start'>
                    <Calendar
                      mode='single'
                      onSelect={(e) => {
                        if (e) {
                          const formattedDate = format(e, 'yyyy-MM-dd'); // Format the selected date
                          console.log('formattedDate', formattedDate);
                          field.onChange(formattedDate); // Send formatted date to form state
                          setIsCalendarOpen(false);
                        }
                      }}
                      disabled={(date) =>
                        date > new Date() || date < new Date('1900-01-01')
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit' className=''>
          Add Transaction
        </Button>
      </form>
    </Form>
  );
};
