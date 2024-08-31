import { FormControl, FormItem, FormMessage } from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { FC } from 'react';
import { ControllerRenderProps } from 'react-hook-form';

interface CustomFormSelectProps extends ControllerRenderProps {
  placeholder: string;
}

export const CustomFormSelect: FC<CustomFormSelectProps> = ({
  onChange,
  value,
  placeholder,
}) => {
  return (
    <FormItem>
      <Select onValueChange={onChange} defaultValue={value}>
        <FormControl>
          <SelectTrigger>
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
        </FormControl>
        <SelectContent>
          <SelectItem value='category' disabled>
            Select a category
          </SelectItem>
          <SelectItem value='salary'>Salary</SelectItem>
        </SelectContent>
      </Select>
      <FormMessage />
    </FormItem>
  );
};
