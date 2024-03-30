'use client';
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import React, { useEffect } from 'react';
import Dropdown from './dropdown';
import { useParams } from 'next/navigation';
import { StoreSwitcher } from './store-switcher';
import { useGetStoresQuery } from '@/lib/features/Stores';

const Navbar = () => {
  const { data: session } = useSession();
  const params = useParams();

  const { data, error, isLoading, refetch } = useGetStoresQuery();
  const menu = {
    header: 'My Account',
    items: [
      {
        label: 'Profile',
        href: '/profile',
      },
      {
        label: 'Settings',
        href: '/settings',
      },
    ],
    footer: {
      title: 'Logout',
      onClick: () => signOut(),
    },
  };

  return (
    <div className="min-h-[60px] flex items-center border-b px-4 justify-between">
      <div>
        <StoreSwitcher items={data || []} />
      </div>

      <Dropdown menu={menu}>
        <div className="flex items-center text-sm cursor-pointer">
          <Image
            src={session?.user?.image}
            width={35}
            height={35}
            alt={session?.user?.name || 'user'}
            className="object-fit rounded-full overflow-hidden"
          />
          <span className="ml-2">{session?.user?.name}</span>
        </div>
      </Dropdown>
    </div>
  );
};

export default Navbar;
