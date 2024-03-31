import AlertModal from '@/components/modals/alert-modal';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useDeleteColorMutation } from '@/lib/features/Colors';
import { Copy, Edit, MoreHorizontal, Trash } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const CellAction = ({ data }) => {
  const router = useRouter();
  const { storeId } = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const [deleteColor, { data: delData, isLoading, isError, isSuccess }] =
    useDeleteColorMutation();
  const onDelete = () => {
    const obj = {
      storeId,
      colorId: data.id,
    };
    deleteColor(obj);
  };
  useEffect(() => {
    if (isError) {
      toast.error('Something went wrong');
    }
    if (isSuccess && delData) {
      toast.success('Color is successfully deleted');
      setIsOpen(false);
      router.refresh();
    }
  }, [isError, isSuccess]);
  return (
    <div>
      <AlertModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        loading={isLoading}
        onConfirm={onDelete}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem
            onClick={() => router.push(`/${storeId}/colors/${data.id}`)}
          >
            <Edit className="h-4 w-4 mr-3" /> Edit
          </DropdownMenuItem>
          {/* <DropdownMenuItem>
            <Copy className="h-4 w-4 mr-3" /> Copy
          </DropdownMenuItem> */}
          <DropdownMenuItem onClick={() => setIsOpen(true)}>
            <Trash className="h-4 w-4 mr-3" /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default CellAction;
