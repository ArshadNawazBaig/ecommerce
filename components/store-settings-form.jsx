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
import {
  useDeleteStoreMutation,
  useGetStoreByIdQuery,
  useUpdateStoreMutation,
} from '@/lib/features/Stores';
import { useParams, useRouter } from 'next/navigation';
import { Button } from './ui/button';
import toast from 'react-hot-toast';
import Heading from './typography/heading';
import { Separator } from './ui/separator';
import { TrashIcon } from 'lucide-react';
import Loading from '@/app/loading';

const formSchema = z.object({
  name: z.string().min(4),
});

const StoreSettingsForm = ({ initialData }) => {
  const router = useRouter();
  const params = useParams();
  const [updateStore, { data, error, isLoading, isError, isSuccess }] =
    useUpdateStoreMutation();
  const [deleteStore, { isError: delError, isSuccess: delSuccess }] =
    useDeleteStoreMutation();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  });

  const onSubmit = async (data) => {
    const updatedStore = {
      storeId: params.storeId,
      name: data.name,
    };
    updateStore(updatedStore);
  };

  const handleDeleteStore = () => {
    deleteStore(initialData?.id);
  };

  useEffect(() => {
    if (isError) {
      toast.error('Something went wrong');
    }
    if (isSuccess && data) {
      router.refresh();
      toast.success('Store successfully updated');
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
  }, [isError, isSuccess]);

  useEffect(() => {
    if (delError) {
      toast.error('Something went wrong');
    }
    if (delSuccess) {
      router.refresh();
      toast.success('Store successfully deleted');
    }
  }, [delError, delSuccess]);

  return (
    <>
      <div className="flex w-full justify-between items-center">
        <Heading title="Settings" subtitle="Manage your store" />
        <Button variant="destructive" size="icon" onClick={handleDeleteStore}>
          <TrashIcon />
        </Button>
      </div>
      <Separator className="mt-4 mb-4" />

      <div className="max-w-[300px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Store Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder="Store Name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="pt-4 gap-3 flex">
              <Button type="submit" disabled={isLoading}>
                {isLoading ? 'Loading' : 'Update'}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
};

export default StoreSettingsForm;
