'use client';

import * as React from 'react';
import { Check, ChevronsUpDown, PlusCircleIcon, StoreIcon } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useDispatch, useSelector } from 'react-redux';
import { onOpen } from '@/lib/slices/ModalSlice';
import { useParams, usePathname, useRouter } from 'next/navigation';

export const StoreSwitcher = ({ items }) => {
  const formatedItems = items?.map((item) => ({
    label: item.name,
    value: item.id,
  }));

  const router = useRouter();
  const params = useParams();

  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);

  const currentStore = formatedItems.filter(
    (item) => item.value === params.storeId
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[220px] justify-between capitalize"
        >
          <StoreIcon className="w-6 h-6" />
          {currentStore[0]?.label}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search store..." />
          <CommandEmpty>No stores found.</CommandEmpty>
          <CommandGroup>
            {formatedItems.map((store) => (
              <CommandItem
                key={store.value}
                value={store.value}
                onSelect={() => {
                  setOpen(false);
                  router.push(`/${store.value}`);
                }}
                className="capitalize flex items-center cursor-pointer justify-between"
              >
                <div className="flex items-center">
                  <StoreIcon className="w-4 h-4 mr-2" />
                  {store.label}
                </div>
                <Check
                  className={cn(
                    'h-4 w-4',
                    params?.storeId === store.value
                      ? 'opacity-100'
                      : 'opacity-0'
                  )}
                />
              </CommandItem>
            ))}
            <CommandItem
              onSelect={() => dispatch(onOpen())}
              className="cursor-pointer"
            >
              <PlusCircleIcon className="w-4 h-4 mr-3" />
              Create New Store
            </CommandItem>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
