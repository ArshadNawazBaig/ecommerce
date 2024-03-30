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
  useUpdateStoreMutation,
} from '@/lib/features/Stores';
import { useParams, useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import Heading from '@/components/typography/heading';
import { Separator } from '@/components/ui/separator';
import { TrashIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ImageUpload from '@/components/image-upload';
import {
  useAddBillboardMutation,
  useUpdateBillboardMutation,
} from '@/lib/features/Billboards';

const formSchema = z.object({
  label: z.string().min(4),
  imageUrl: z.string().min(1),
});

const BillboardForm = ({ billboard }) => {
  const router = useRouter();
  const params = useParams();
  const [addBillboard, { data, error, isLoading, isError, isSuccess }] =
    useAddBillboardMutation();
  const [
    updateBillboard,
    {
      data: updateBillboardData,
      isSuccess: updateBillboardSuccess,
      isError: updateBillboardError,
      isLoading: updateBillboardLoading,
    },
  ] = useUpdateBillboardMutation();
  const [deleteStore, { isError: delError, isSuccess: delSuccess }] =
    useDeleteStoreMutation();

  const title = billboard ? 'Edit Billboard' : 'Create Billboard';
  const desc = billboard ? 'Edit a Billboard' : 'Create a new Billboard';
  const action = billboard ? 'Save Changes' : 'Create Billboard';

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: billboard || {
      label: '',
      imageUrl: '',
    },
  });

  const onSubmit = async (data) => {
    const obj = {
      storeId: params.storeId,
      billboardId: params.billboardId,
      billboard: {
        label: data.label,
        imageUrl: data.imageUrl,
      },
    };

    if (billboard) {
      updateBillboard(obj);
      console.log(obj);
    } else {
      addBillboard(obj);
    }
  };

  const handleDeleteStore = () => {
    deleteStore(billboard?.id);
  };

  useEffect(() => {
    if (isError) {
      toast.error('Something went wrong');
    }
    if (isSuccess && data) {
      router.refresh();
      toast.success('Billboard successfully updated');
    }
  }, [isError, isSuccess]);

  useEffect(() => {
    if (updateBillboardError) {
      toast.error('Something went wrong');
    }
    if (updateBillboardSuccess && updateBillboardData) {
      router.refresh();
      toast.success('Billboard successfully updated');
    }
  }, [updateBillboardError, updateBillboardSuccess]);

  useEffect(() => {
    if (delError) {
      toast.error('Something went wrong');
    }
    if (delSuccess) {
      router.refresh();
      toast.success('Billboard successfully deleted');
    }
  }, [delError, delSuccess]);

  return (
    <>
      <div className="flex w-full justify-between items-center">
        <Heading title={title} subtitle={desc} />
        {billboard && (
          <Button variant="destructive" size="icon" onClick={handleDeleteStore}>
            <TrashIcon />
          </Button>
        )}
      </div>
      <Separator className="mt-4 mb-4" />

      <div className="max-w-[300px]">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-2"
          >
            <FormField
              name="label"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Label</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder="Billboard Label"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              className="mt-2"
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Background image</FormLabel>
                  <FormControl>
                    <ImageUpload
                      value={field.value ? [field.value] : []}
                      //   disabled={loading}
                      onChange={(url) => field.onChange(url)}
                      onRemove={() => field.onChange('')}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="pt-4 gap-3 flex">
              <Button
                type="submit"
                disabled={isLoading || updateBillboardLoading}
              >
                {isLoading || updateBillboardLoading ? 'Loading' : action}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
};

export default BillboardForm;
