import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { redirect, useRouter } from 'next/navigation';

const Dropdown = ({ menu, children }) => {
  const { header, items, footer, onClick } = menu;
  const router = useRouter();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>{header}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {items?.map((item) => (
            <DropdownMenuItem
              className="cursor-pointer"
              key={item.label}
              onClick={() => router.push(`${item.href}`)}
            >
              {/* <User className="mr-2 h-4 w-4" /> */}
              <span>{item.label}</span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={footer?.onClick} className="cursor-pointer">
          {/* <LogOut className="mr-2 h-4 w-4" /> */}

          <span>{footer?.title}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Dropdown;
