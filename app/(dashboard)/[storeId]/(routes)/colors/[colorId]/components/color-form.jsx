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
  useAddColorMutation,
  useDeleteColorMutation,
  useUpdateColorMutation,
} from '@/lib/features/Colors';

const formSchema = z.object({
  name: z.string().min(1),
  value: z.string().min(1),
});

const ColorForm = ({ color }) => {
  const router = useRouter();
  const params = useParams();

  const [
    deleteColor,
    { data: delData, isError: delError, isSuccess: delSuccess },
  ] = useDeleteColorMutation();

  const [
    addColor,
    {
      data: addData,
      isError: addError,
      isSuccess: addSuccess,
      isLoading: addLoading,
    },
  ] = useAddColorMutation();
  const [
    updateColor,
    {
      data: updateData,
      isError: updateError,
      isSuccess: updateSuccess,
      isLoading: updateLoading,
    },
  ] = useUpdateColorMutation();

  const title = color ? 'Edit Color' : 'Create Color';
  const desc = color ? 'Edit a Color' : 'Create a new Color';
  const action = color ? 'Save Changes' : 'Create Color';

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: color || {
      name: '',
      value: '',
    },
  });

  const onSubmit = async (data) => {
    const obj = {
      storeId: params.storeId,
      colorId: params.colorId,
      color: {
        name: data.name,
        value: data.value,
      },
    };

    if (color) {
      updateColor(obj);
    } else {
      addColor(obj);
    }
  };

  const handleDelete = () => {
    deleteColor(color?.id);
  };

  useEffect(() => {
    if (addError) {
      toast.error('Something went wrong');
    }
    if (addSuccess && addData) {
      router.refresh();
      toast.success('Color successfully created');
      router.push(`/${params.storeId}/colors`);
    }
  }, [addError, addSuccess]);

  useEffect(() => {
    if (updateError) {
      toast.error('Something went wrong');
    }
    if (updateSuccess && updateData) {
      router.refresh();
      toast.success('Color successfully updated');
      router.push(`/${params.storeId}/colors`);
    }
  }, [updateError, updateSuccess]);

  useEffect(() => {
    if (delError) {
      toast.error('Something went wrong');
    }
    if (delSuccess) {
      router.refresh();
      toast.success('Color successfully deleted');
    }
  }, [delError, delSuccess]);

  return (
    <>
      <div className="flex w-full justify-between items-center">
        <Heading title={title} subtitle={desc} />
        {color && (
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
                        placeholder="Name"
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
                      <div className="relative">
                        <Input
                          disabled={addLoading}
                          placeholder="Value"
                          {...field}
                          className="min-w-[200px]"
                        />
                        <div
                          className="h-6 w-6 rounded-full border-gray-400 absolute top-2 right-2"
                          style={{ backgroundColor: field.value }}
                        />
                      </div>
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

export default ColorForm;
