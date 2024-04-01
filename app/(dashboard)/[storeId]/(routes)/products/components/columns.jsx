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
    header: 'Featured',
  },
  {
    accessorKey: 'isArchived',
    header: 'Archived',
  },
  {
    accessorKey: 'color',
    header: 'Color',
    cell: ({ row }) => (
      <div className="relative flex items-center">
        {row.original.color}
        <div
          className="h-4 w-4 ml-2 rounded-full border-gray-400"
          style={{ backgroundColor: row.original.color }}
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
