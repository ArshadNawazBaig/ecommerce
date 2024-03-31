'use client';

import CellAction from './cell-action';

export const columns = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'price',
    header: 'Price',
  },
  {
    accessorKey: 'isFeatured',
    header: 'IsFeatured',
  },
  {
    accessorKey: 'isArchived',
    header: 'IsArchived',
  },
  {
    accessorKey: 'color',
    header: 'Color',
    cell: ({ row }) => (
      <div className="relative flex items-center">
        {row.original.value}
        <div
          className="h-4 w-4 ml-2 rounded-full border-gray-400"
          style={{ backgroundColor: row.original.value }}
        />
      </div>
    ),
  },
  {
    accessorKey: 'size',
    header: 'Size',
  },
  {
    accessorKey: 'category',
    header: 'Category',
  },
  {
    accessorKey: 'createdAt',
    header: 'Date',
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
