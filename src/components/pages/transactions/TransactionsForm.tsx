import { CustomFormSelect } from '@/components/customInputs/CustomFormSelect';
import { DatePicker } from '@/components/customInputs/DatePicker';
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

export const TransactionsForm = () => {
  // form state
  const form = useForm({
    // resolver: zodResolver(LoginSchema),
    defaultValues: {
      category: '',
      amount: '',
      description: '',
      date: '',
    },
  });

  const onSubmit = (values: any) => {
    console.log('data', values);
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='space-y-3 flex flex-col justify-center align-middle w-[350px]'
      >
        {/* <FormField
          control={form.control}
          name='category'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <CustomFormSelect placeholder='Select a category' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /> */}
        <FormField
          control={form.control}
          name='amount'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder='Amount'
                  type='number'
                  min={0.01}
                  {...field}
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
        {/* <FormField
          control={form.control}
          name='date'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <DatePicker {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /> */}
        <Button type='submit'>Login</Button>
      </form>
    </Form>
  );
};
