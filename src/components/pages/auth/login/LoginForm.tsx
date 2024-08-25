import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import { useNavigate } from 'react-router-dom';
import { login } from '@/redux/actions/authActions';

const FormSchema = z.object({
  email: z.string().email({ message: 'Email must be valid' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters' }),
});

export function LoginForm() {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  // form state
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: 'darius@home.lt',
      password: '123456',
    },
  });

  // form submission handler
  const onSubmit = (values: z.infer<typeof FormSchema>) => {
    console.log('data', values);
    dispatch(login(values)).then((res) => {
      if (res.type === 'auth/loginUser/fulfilled') {
        navigate('/');
        toast({
          description: 'Your login is successful...',
          className: 'bg-green-500 text-white',
        });
        //  toaster ?
        return;
      }
      if (res.type === 'auth/loginUser/rejected') {
        //  toaster ?
        toast({
          description: 'Your login failed...',
          className: 'bg-rose-700 text-white',
        });
        return;
      }
      console.log('Login Error: ', res);
    });

    // toast({
    //   title: 'You submitted the following values:',
    //   description: (
    //     <pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
    //       <code className='text-white'>{JSON.stringify(values, null, 2)}</code>
    //     </pre>
    //   ),
    // });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='space-y-2 flex flex-col justify-center align-middle w-[350px]'
      >
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              {/* <FormLabel>Email</FormLabel> */}
              <FormControl>
                <Input placeholder='Email' type='email' {...field} />
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
              {/* <FormLabel>Password</FormLabel> */}
              <FormControl>
                <Input placeholder='Password' type='password' {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit'>Login </Button>
      </form>
    </Form>
  );
}
