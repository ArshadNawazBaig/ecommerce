'use client';

export const columns = [
  {
    accessorKey: 'id',
    header: 'Order ID',
  },
  {
    accessorKey: 'products',
    header: 'Products',
  },
  {
    accessorKey: 'totalPrice',
    header: 'Total Price',
  },
  {
    accessorKey: 'isPaid',
    header: 'Paid',
  },
  {
    accessorKey: 'phone',
    header: 'Phone',
  },
  {
    accessorKey: 'address',
    header: 'Address',
  },
  {
    accessorKey: 'createdAt',
    header: 'Date',
  },
  // {
  //   id: 'actions',
  //   cell: ({ row }) => <CellAction data={row.original} />,
  // },
];
