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
  useDeleteBillboardMutation,
  useUpdateBillboardMutation,
} from '@/lib/features/Billboards';

const formSchema = z.object({
  name: z.string().min(4),
  price: z.string().min(1),
  desc: z.string().min(10),
  isFeatured: z.boolean(),
  isArchived: z.boolean(),
  category: z.string().min(1),
  color: z.string().min(1),
  size: z.string().min(1),
  images: z.object({ url: z.string() }).array(),
});

const ProductForm = ({ product }) => {
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
  const [deleteBillboard, { isError: delError, isSuccess: delSuccess }] =
    useDeleteBillboardMutation();

  const title = product ? 'Edit Product' : 'Create Product';
  const desc = product ? 'Edit a Product' : 'Create a new Product';
  const action = product ? 'Save Changes' : 'Create Product';

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: product || {
      name: '',
      price: '',
      desc: '',
      isFeatured: false,
      isArchived: false,
      categoryId: '',
      sizeId: '',
      colorId: '',
      images: [],
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

    if (product) {
      updateBillboard(obj);
      console.log(obj);
    } else {
      addBillboard(obj);
    }
  };

  const handleDeleteStore = () => {
    deleteBillboard(product?.id);
  };

  useEffect(() => {
    if (isError) {
      toast.error('Something went wrong');
    }
    if (isSuccess && data) {
      router.refresh();
      toast.success('Billboard successfully created');
      router.push(`/${params.storeId}/billboards`);
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
        {product && (
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
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder="Product Name"
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
              name="images"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Images</FormLabel>
                  <FormControl>
                    <ImageUpload
                      placeholder="Upload product images"
                      value={field.value.map((image) => image.url)}
                      //   disabled={loading}
                      onChange={(url) =>
                        field.onChange([...field.value, { url }])
                      }
                      onRemove={(url) =>
                        field.onChange(
                          field.value.filter((value) => value.url !== url)
                        )
                      }
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

export default ProductForm;
