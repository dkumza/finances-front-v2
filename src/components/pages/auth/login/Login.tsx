import { Header } from '@/components/Header';
import { LoginForm } from './LoginForm';

export const Login = () => {
  return (
    <div className=' flex justify-center align-middle  min-h-svh'>
      <div className='flex flex-col justify-center align-middle'>
        <div className=''>
          {/* // TODO add quote of the day, next to login form!  */}
          <Header
            title='Welcome back'
            message='Please enter your credentials'
          />
          <LoginForm />
        </div>
      </div>
    </div>
  );
};
