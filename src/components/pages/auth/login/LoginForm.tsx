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
import { LoginSchema } from '@/helpers/formSchemas';

export function LoginForm() {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  // form state
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: 'darius@home.lt',
      password: '123456',
    },
  });

  // form submission handler
  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    console.log('data', values);
    dispatch(login(values)).then((res) => {
      if (res.type === 'auth/loginUser/fulfilled') {
        navigate('/');
        toast({
          description: 'Login successful',
          className: 'bg-green-500 text-white',
        });
        return;
      }
      if (res.type === 'auth/loginUser/rejected') {
        toast({
          description: 'Failed to login',
          className: 'bg-rose-700 text-white',
        });
        return;
      }
      console.log('Login Error: ', res);
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
          name='email'
          render={({ field }) => (
            <FormItem>
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
}
