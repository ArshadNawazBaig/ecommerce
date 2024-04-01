import { cn } from '@/lib/utils';
import {
  BarChart,
  BookMarked,
  GalleryHorizontal,
  HomeIcon,
  ListOrdered,
  LucideBarChartHorizontalBig,
  Menu,
  Settings,
} from 'lucide-react';
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
      icon: <HomeIcon className="w-5 h-5" />,
    },
    {
      href: `/${params.storeId}/settings`,
      label: 'Settings',
      active: pathname === `/${params.storeId}/settings`,
      icon: <Settings className="w-5 h-5" />,
    },
    {
      href: `/${params.storeId}/billboards`,
      label: 'Billboards',
      active:
        pathname === `/${params.storeId}/billboards` ||
        pathname === `/${params.storeId}/billboards/${params.billboardId}`,
      icon: <BookMarked className="w-5 h-5" />,
    },
    {
      href: `/${params.storeId}/categories`,
      label: 'Categories',
      active:
        pathname === `/${params.storeId}/categories` ||
        pathname === `/${params.storeId}/categories/${params.categoryId}`,
      icon: <LucideBarChartHorizontalBig className="w-5 h-5" />,
    },
    {
      href: `/${params.storeId}/sizes`,
      label: 'Sizes',
      active:
        pathname === `/${params.storeId}/sizes` ||
        pathname === `/${params.storeId}/sizes/${params.sizeId}`,
      icon: <BarChart className="w-5 h-5" />,
    },
    {
      href: `/${params.storeId}/colors`,
      label: 'Colors',
      active:
        pathname === `/${params.storeId}/colors` ||
        pathname === `/${params.storeId}/colors/${params.colorId}`,
      icon: <Menu className="w-5 h-5" />,
    },
    {
      href: `/${params.storeId}/products`,
      label: 'Products',
      active:
        pathname === `/${params.storeId}/products` ||
        pathname === `/${params.storeId}/products/${params.productId}`,
      icon: <GalleryHorizontal className="w-5 h-5" />,
    },
    {
      href: `/${params.storeId}/orders`,
      label: 'Orders',
      active: pathname === `/${params.storeId}/orders`,
      icon: <ListOrdered className="w-5 h-5" />,
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
            } py-2 text-md rounded-sm px-3 hover:bg-primary hover:text-primary-foreground mb-2 transition ease-in-out delay-100 flex items-center gap-2`}
          >
            {route.icon}
            {route.label}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
