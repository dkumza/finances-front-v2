import { CustomFormSelect } from '@/components/customInputs/CustomFormSelect';
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
      email: 'darius@home.lt',
      password: '123456',
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
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                {/* <Input placeholder='Email' type='email' {...field} /> */}
                <CustomFormSelect
                  placeholder='Select a category'
                  type='category'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder='Password' type='password' {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit'>Login</Button>
      </form>
    </Form>
  );
};
