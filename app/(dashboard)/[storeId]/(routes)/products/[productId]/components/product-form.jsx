'use client';
import React, { useEffect } from 'react';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormDescription,
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
import ImageUpload from '@/components/image-upload';
import { useGetCategoriesQuery } from '@/lib/features/Categories';
import SelectMenu from '@/components/select';
import { useGetColorsQuery } from '@/lib/features/Colors';
import { useGetSizesQuery } from '@/lib/features/Sizes';
import { Checkbox } from '@/components/ui/checkbox';
import {
  useAddProductMutation,
  useDeleteProductMutation,
  useUpdateProductMutation,
} from '@/lib/features/Products';

const formSchema = z.object({
  name: z.string().min(4),
  price: z.string().min(1),
  // desc: z.string().min(10),
  isFeatured: z.boolean().default(false).optional(),
  isArchived: z.boolean().default(false).optional(),
  categoryId: z.string().min(1),
  colorId: z.string().min(1),
  sizeId: z.string().min(1),
  images: z.object({ url: z.string() }).array().min(1),
});

const ProductForm = ({ product }) => {
  const router = useRouter();
  const params = useParams();
  const { data, error, isLoading, isError, isSuccess } = useGetCategoriesQuery(
    params.storeId
  );
  const {
    data: colorData,
    error: colorError,
    isLoading: colorLoading,
    isError: colorErr,
    isSuccess: colorSuccess,
  } = useGetColorsQuery(params.storeId);
  const {
    data: sizeData,
    error: sizeError,
    isLoading: sizeLoading,
    isError: sizeErr,
    isSuccess: sizeSuccess,
  } = useGetSizesQuery(params.storeId);
  const [
    addProduct,
    {
      data: addProductData,
      isSuccess: addProductSuccess,
      isError: addProductError,
      isLoading: addProductLoading,
    },
  ] = useAddProductMutation();
  const [
    updateProduct,
    {
      data: updateProductData,
      isSuccess: updateProductSuccess,
      isError: updateProductError,
      isLoading: updateProductLoading,
    },
  ] = useUpdateProductMutation();
  const [deleteProduct, { isError: delError, isSuccess: delSuccess }] =
    useDeleteProductMutation();

  const handleFormat = (data) => {
    return data?.map((item) => ({
      value: item.id,
      label: item.name,
    }));
  };

  const title = product ? 'Edit Product' : 'Create Product';
  const desc = product ? 'Edit a Product' : 'Create a new Product';
  const action = product ? 'Save Changes' : 'Create Product';

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: product || {
      name: '',
      price: '',
      // desc: '',
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
      productId: params.productId,
      product: {
        name: data.name,
        images: data.images,
        price: data.price,
        isFeatured: data.isFeatured,
        isArchived: data.isArchived,
        categoryId: data.categoryId,
        sizeId: data.sizeId,
        colorId: data.colorId,
      },
    };

    if (product) {
      updateProduct(obj);
      console.log(obj);
    } else {
      addProduct(obj);
    }
  };

  const handleDeleteStore = () => {
    deleteProduct(product?.id);
  };

  useEffect(() => {
    if (addProductError) {
      toast.error('Something went wrong');
    }
    if (addProductSuccess && addProductData) {
      router.refresh();
      toast.success('Product successfully created');
      router.push(`/${params.storeId}/products`);
    }
  }, [addProductError, addProductSuccess]);

  useEffect(() => {
    if (updateProductError) {
      toast.error('Something went wrong');
    }
    if (updateProductSuccess && updateProductData) {
      router.refresh();
      toast.success('Product successfully updated');
      router.push(`/${params.storeId}/products`);
    }
  }, [updateProductError, updateProductSuccess]);

  useEffect(() => {
    if (delError) {
      toast.error('Something went wrong');
    }
    if (delSuccess) {
      router.refresh();
      toast.success('Product successfully deleted');
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
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-2"
        >
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-12">
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
            </div>
            <div className="col-span-6">
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
            </div>
          </div>
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-3">
              <FormField
                name="price"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        placeholder="Product Price"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="col-span-3">
              <FormField
                className="mt-2"
                control={form.control}
                name="categoryId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <FormControl>
                      <SelectMenu
                        disabled={isLoading}
                        onChange={field.onChange}
                        value={field.value}
                        placeholder="Select Category"
                        items={handleFormat(data)}
                        className="min-w-[200px]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-3">
              <FormField
                className="mt-2"
                control={form.control}
                name="colorId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Color</FormLabel>
                    <FormControl>
                      <SelectMenu
                        disabled={isLoading}
                        onChange={field.onChange}
                        value={field.value}
                        placeholder="Select Color"
                        items={handleFormat(colorData)}
                        className="min-w-[200px]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="col-span-3">
              <FormField
                className="mt-2"
                control={form.control}
                name="sizeId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Size</FormLabel>
                    <FormControl>
                      <SelectMenu
                        disabled={isLoading}
                        onChange={field.onChange}
                        value={field.value}
                        placeholder="Select Size"
                        items={handleFormat(sizeData)}
                        className="min-w-[200px]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="grid grid-cols-12 gap-4 mt-2">
            <div className="col-span-3">
              <FormField
                className="mt-2"
                control={form.control}
                name="isFeatured"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 rounded-md border p-2">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="!-mt-[6px]">
                      <FormLabel>Featured</FormLabel>
                      <FormDescription>
                        product will appear on the homepage
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />
            </div>
            <div className="col-span-3">
              <FormField
                className="mt-2"
                control={form.control}
                name="isArchived"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 rounded-md border p-2">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="!-mt-[6px]">
                      <FormLabel>Archived</FormLabel>
                      <FormDescription>
                        product will not appear anywhere in the store
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />
            </div>

            <div className="col-span-12">
              <Button
                type="submit"
                disabled={addProductLoading || updateProductLoading}
              >
                {addProductLoading || updateProductLoading ? 'Loading' : action}
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </>
  );
};

export default ProductForm;
