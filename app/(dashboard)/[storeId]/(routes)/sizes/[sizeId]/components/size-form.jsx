'use client';
import React, { useEffect } from 'react';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useParams, useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import Heading from '@/components/typography/heading';
import { Separator } from '@/components/ui/separator';
import { TrashIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  useAddCategoryMutation,
  useDeleteCategoryMutation,
  useUpdateCategoryMutation,
} from '@/lib/features/Categories';
import {
  useAddSizeMutation,
  useDeleteSizeMutation,
  useUpdateSizeMutation,
} from '@/lib/features/Sizes';

const formSchema = z.object({
  name: z.string().min(4),
  value: z.string().min(1),
});

const SizeForm = ({ size }) => {
  const router = useRouter();
  const params = useParams();

  const [
    deleteSize,
    { data: delData, isError: delError, isSuccess: delSuccess },
  ] = useDeleteSizeMutation();

  const [
    addSize,
    {
      data: addData,
      isError: addError,
      isSuccess: addSuccess,
      isLoading: addLoading,
    },
  ] = useAddSizeMutation();
  const [
    updateSize,
    {
      data: updateData,
      isError: updateError,
      isSuccess: updateSuccess,
      isLoading: updateLoading,
    },
  ] = useUpdateSizeMutation();

  const title = size ? 'Edit Size' : 'Create Size';
  const desc = size ? 'Edit a Size' : 'Create a new Size';
  const action = size ? 'Save Changes' : 'Create Size';

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: size || {
      name: '',
      value: '',
    },
  });

  const onSubmit = async (data) => {
    const obj = {
      storeId: params.storeId,
      sizeId: params.sizeId,
      size: {
        name: data.name,
        value: data.value,
      },
    };

    if (size) {
      updateSize(obj);
    } else {
      addSize(obj);
    }
  };

  const handleDelete = () => {
    deleteSize(size?.id);
  };

  useEffect(() => {
    if (addError) {
      toast.error('Something went wrong');
    }
    if (addSuccess && addData) {
      router.refresh();
      toast.success('Size successfully created');
      router.push(`/${params.storeId}/sizes`);
    }
  }, [addError, addSuccess]);

  useEffect(() => {
    if (updateError) {
      toast.error('Something went wrong');
    }
    if (updateSuccess && updateData) {
      router.refresh();
      toast.success('Size successfully updated');
      router.push(`/${params.storeId}/sizes`);
    }
  }, [updateError, updateSuccess]);

  useEffect(() => {
    if (delError) {
      toast.error('Something went wrong');
    }
    if (delSuccess) {
      router.refresh();
      toast.success('Size successfully deleted');
    }
  }, [delError, delSuccess]);

  return (
    <>
      <div className="flex w-full justify-between items-center">
        <Heading title={title} subtitle={desc} />
        {size && (
          <Button variant="destructive" size="icon" onClick={handleDelete}>
            <TrashIcon />
          </Button>
        )}
      </div>
      <Separator className="mt-4 mb-4" />

      <div className="max-w-[600px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex gap-4">
              <FormField
                name="name"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        disabled={addLoading}
                        placeholder="Category Name"
                        {...field}
                        className="min-w-[200px]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                className="mt-2"
                control={form.control}
                name="value"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Value</FormLabel>
                    <FormControl>
                      <Input
                        disabled={addLoading}
                        placeholder="Value"
                        {...field}
                        className="min-w-[200px]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="pt-4 gap-3 flex">
              <Button type="submit" disabled={addLoading || updateLoading}>
                {addLoading || updateLoading ? 'Loading' : action}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
};

export default SizeForm;
