'use client';
import React, { useEffect, useState } from 'react';
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
import AlertModal from './modals/alert-modal';

const formSchema = z.object({
  name: z.string().min(4),
});

const StoreSettingsForm = ({ initialData }) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const params = useParams();
  const [updateStore, { data, error, isLoading, isError, isSuccess }] =
    useUpdateStoreMutation();
  const [
    deleteStore,
    {
      isError: delError,
      isSuccess: delSuccess,
      error: delErr,
      isLoading: delLoading,
    },
  ] = useDeleteStoreMutation();

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
      // setTimeout(() => {
      //   window.location.reload();
      // }, 400);
    }
  }, [isError, isSuccess]);

  useEffect(() => {
    if ((delError, delErr)) {
      console.log(delErr);
      toast.error(delErr.data);
    }
    if (delSuccess) {
      router.refresh();
      toast.success('Store successfully deleted');
    }
  }, [delError, delSuccess]);

  return (
    <>
      <AlertModal
        isOpen={isOpen}
        loading={delLoading}
        onClose={() => setIsOpen(false)}
        onConfirm={handleDeleteStore}
      />
      <div className="flex w-full justify-between items-center">
        <Heading title="Settings" subtitle="Manage your store" />
        <Button
          variant="destructive"
          size="icon"
          onClick={() => setIsOpen(true)}
        >
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
