import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const SelectMenu = ({
  placeholder,
  items,
  onChange,
  value,
  className,
  disabled,
}) => {
  return (
    <Select onValueChange={onChange} value={value} disabled={disabled}>
      <SelectTrigger className={className}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {items?.map((item, index) => (
          <SelectItem value={item.value} key={index}>
            {item.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SelectMenu;
