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
import { useDeleteStoreMutation } from '@/lib/features/Stores';
import { useParams, useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import Heading from '@/components/typography/heading';
import { Separator } from '@/components/ui/separator';
import { TrashIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ImageUpload from '@/components/image-upload';
import {
  useAddBillboardMutation,
  useGetBillboardsQuery,
  useUpdateBillboardMutation,
} from '@/lib/features/Billboards';
import SelectMenu from '@/components/select';
import {
  useAddCategoryMutation,
  useDeleteCategoryMutation,
  useUpdateCategoryMutation,
} from '@/lib/features/Categories';

const formSchema = z.object({
  name: z.string().min(4),
  billboardId: z.string().min(1),
});

const CategoryForm = ({ category }) => {
  const router = useRouter();
  const params = useParams();

  const { data, error, isLoading, isError, isSuccess } = useGetBillboardsQuery(
    params.storeId
  );
  const [
    deleteCategory,
    { data: delData, isError: delError, isSuccess: delSuccess },
  ] = useDeleteCategoryMutation();

  const [
    addCategory,
    {
      data: addData,
      isError: addError,
      isSuccess: addSuccess,
      isLoading: addLoading,
    },
  ] = useAddCategoryMutation();
  const [
    updateCategory,
    {
      data: updateData,
      isError: updateError,
      isSuccess: updateSuccess,
      isLoading: updateLoading,
    },
  ] = useUpdateCategoryMutation();

  const formatedData = data?.map((item) => ({
    value: item.id,
    label: item.label,
  }));

  const title = category ? 'Edit Category' : 'Create Category';
  const desc = category ? 'Edit a Category' : 'Create a new Category';
  const action = category ? 'Save Changes' : 'Create Category';

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: category || {
      name: '',
      billboardId: '',
    },
  });

  const onSubmit = async (data) => {
    const obj = {
      storeId: params.storeId,
      categoryId: params.categoryId,
      category: {
        name: data.name,
        billboardId: data.billboardId,
      },
    };

    if (category) {
      updateCategory(obj);
      console.log(obj);
    } else {
      addCategory(obj);
    }
  };

  const handleDeleteStore = () => {
    deleteCategory(category?.id);
  };

  useEffect(() => {
    if (addError) {
      toast.error('Something went wrong');
    }
    if (addSuccess && addData) {
      router.refresh();
      toast.success('Category successfully created');
      router.push(`/${params.storeId}/categories`);
    }
  }, [addError, addSuccess]);

  useEffect(() => {
    if (updateError) {
      toast.error('Something went wrong');
    }
    if (updateSuccess && updateData) {
      router.refresh();
      toast.success('Category successfully updated');
      router.push(`/${params.storeId}/categories`);
    }
  }, [updateError, updateSuccess]);

  useEffect(() => {
    if (delError) {
      toast.error('Something went wrong');
    }
    if (delSuccess) {
      router.refresh();
      toast.success('Category successfully deleted');
    }
  }, [delError, delSuccess]);

  return (
    <>
      <div className="flex w-full justify-between items-center">
        <Heading title={title} subtitle={desc} />
        {category && (
          <Button variant="destructive" size="icon" onClick={handleDeleteStore}>
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
                name="billboardId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Billboard</FormLabel>
                    <FormControl>
                      <SelectMenu
                        disabled={isLoading || addLoading}
                        onChange={field.onChange}
                        value={field.value}
                        placeholder="Select Billboard"
                        items={formatedData}
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

export default CategoryForm;
