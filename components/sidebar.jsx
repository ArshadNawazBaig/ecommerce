import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import React from 'react';

const Sidebar = ({ className }) => {
  const params = useParams();
  const pathname = usePathname();
  const routes = [
    {
      href: `/${params.storeId}/`,
      label: 'Home',
      active: pathname === `/${params.storeId}`,
    },
    {
      href: `/${params.storeId}/settings`,
      label: 'Settings',
      active: pathname === `/${params.storeId}/settings`,
    },
    {
      href: `/${params.storeId}/billboards`,
      label: 'Billboards',
      active:
        pathname === `/${params.storeId}/billboards` ||
        pathname === `/${params.storeId}/billboards/${params.billboardId}`,
    },
    {
      href: `/${params.storeId}/categories`,
      label: 'Categories',
      active: pathname === `/${params.storeId}/categories`,
    },
  ];
  return (
    <div
      className={cn('border-r p-4', className)}
      style={{ minHeight: 'calc(100vh - 60px)' }}
    >
      <div>
        {routes.map((route, index) => (
          <Link
            key={route.label}
            href={route.href}
            className={`${
              route.active && 'bg-primary text-primary-foreground'
            } block py-2 text-md rounded-sm px-3 hover:bg-primary hover:text-primary-foreground mb-2 transition ease-in-out delay-100`}
          >
            {route.label}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;