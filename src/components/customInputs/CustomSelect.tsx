import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { SelectLabel } from '@radix-ui/react-select';

export function CustomSelect() {
  return (
    <Select defaultValue='personal'>
      <SelectTrigger className='w-[180px]'>
        <SelectValue />
      </SelectTrigger>
      <SelectContent className=''>
        <SelectGroup className='mx-1'>
          <SelectLabel className='text-muted-foreground text-xs py-1'>
            Personal Account
          </SelectLabel>
          <SelectItem className='text-sm' value='personal'>
            Darius Kumza
          </SelectItem>
          <SelectLabel className='text-muted-foreground text-xs py-1'>
            Teams Accounts
          </SelectLabel>
          <SelectItem className='text-sm' value='family'>
            Family
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
