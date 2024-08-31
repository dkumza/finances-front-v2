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
    <>
      <Select onValueChange={onChange} defaultValue={value}>
        <SelectTrigger>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value='category' disabled>
            Select a category
          </SelectItem>
          <SelectItem value='salary'>Salary</SelectItem>
        </SelectContent>
      </Select>
    </>
  );
};
