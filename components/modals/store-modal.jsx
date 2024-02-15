import React from 'react';
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

const formSchema = z.object({
  name: z.string().min(4),
});

const StoreModal = () => {
  const { isOpen } = useSelector((state) => state.modal);
  const dispatch = useDispatch();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
    },
  });

  const onSubmit = (data) => {
    console.log(data);
  };
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
                    <Input placeholder="Ecommerce" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex w-full justify-end pt-4 gap-3">
              <Button variant="outline" onClick={() => dispatch(onClose())}>
                Cancle
              </Button>
              <Button type="submit">Continue</Button>
            </div>
          </form>
        </Form>
      </div>
    </Modal>
  );
};

export default StoreModal;
