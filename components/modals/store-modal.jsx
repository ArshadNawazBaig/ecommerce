import React, { useEffect } from 'react';
import Modal from '../ui/modal';
import { useDispatch, useSelector } from 'react-redux';
import { onClose } from '@/lib/slices/ModalSlice';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '../ui/button';
import { useAddStoreMutation } from '@/lib/features/Stores';
import toast from 'react-hot-toast';
import { redirect } from 'next/navigation';

const formSchema = z.object({
  name: z.string().min(4),
});

const StoreModal = () => {
  const { isOpen } = useSelector((state) => state.modal);
  const [addStore, { data, error, isLoading, isError, isSuccess }] =
    useAddStoreMutation();
  const dispatch = useDispatch();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
    },
  });

  const onSubmit = async (data) => {
    console.log(data);
    addStore(data);
  };

  const handleClose = (e) => {
    e.preventDefault();
    console.log('first');
    dispatch(onClose());
  };

  useEffect(() => {
    if (isError) {
      toast.error(error.data);
    }
    if (isSuccess) {
      toast.success('Store is created successfully');
    }
    if (isSuccess && data) {
      window.location.assign(`/dashboard/${data.id}`);
    }
  }, [isError, isSuccess]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => dispatch(onClose())}
      title="Create new store"
      description="Create store descritption"
    >
      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder="Ecommerce"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex w-full justify-end pt-4 gap-3">
              <Button variant="outline" onClick={(e) => handleClose(e)}>
                Cancle
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? 'Loading' : 'Continue'}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </Modal>
  );
};

export default StoreModal;
