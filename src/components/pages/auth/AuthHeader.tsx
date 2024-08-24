import { FC } from 'react';

interface AuthHeaderProps {
  title: string;
  message: string;
}

export const AuthHeader: FC<AuthHeaderProps> = ({ title, message }) => {
  return (
    <div className='text-center w-96'>
      <h3 className='scroll-m-20 text-2xl font-semibold tracking-tight'>
        {title}
      </h3>
      <p className='leading-7 [&:not(:first-child)]:mt-2 text-muted-foreground'>
        {message}
      </p>
    </div>
  );
};
