import { UserNav } from './UserNav';
import { ThemeSwitcher } from '@/components/ThemeSwitcher';
import CustomPopoverSelect from '@/components/customInputs/CustomPopoverSelect';
import { DrawerComponent } from '@/components/pages/transactions/DrawerComponent';

export const Header = () => {
  return (
    <header className='sticky top-0 flex h-16 items-center gap-4 bg-background px-4 md:px-6'>
      <nav className='flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6'>
        <CustomPopoverSelect />
      </nav>
      <div className='flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4'>
        <form className='ml-auto flex-1 sm:flex-initial'>
          {/* <div className='relative'>
            <Search className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
            <Input
            type='search'
            placeholder='Search products...'
            className='pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]'
            />
            </div> */}
        </form>
        <div className='flex items-center space-x-2'>
          <DrawerComponent title='New Transaction' />
        </div>
        <ThemeSwitcher />
        <UserNav />
      </div>
    </header>
  );
};

// for future reference - how to use NavLink with isActive
{
  /* <NavLink
          to={'/'}
          className={({ isActive }) =>
            isActive ? 'text-foreground' : 'text-muted-foreground'
          }
        >
          Overview
        </NavLink> */
}
