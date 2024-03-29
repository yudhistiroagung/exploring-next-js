'use client';

import { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

import TodoService from '@/services/todos-services';

const formSchema = z.object({
  name: z.string().min(3, { message: 'Min 3 chars' }),
});

type FormValuesType = z.infer<typeof formSchema>;

export default function Todos() {
  const { replace, refresh } = useRouter();
  const formHandlers = useForm<FormValuesType>({
    mode: 'all',
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });
  const {
    register,
    formState: { errors, isValid },
  } = formHandlers;

  const onSubmit = async ({ name }: FormValuesType) => {
    try {
      await TodoService.addTodo(name);

      replace('/');

      /**
       * NOTE this refresh() should be called so when we go back to home page,
       * it will reload the entire page, latest todos will be refetched
       */
      refresh();
    } catch (error) {
      toast.error('Something went wrong, please try again');
    }
  };

  return (
    <main className="container flex-col flex p-4 gap-4">
      <h1 className="self-center">Add New Todo</h1>
      <FormProvider {...formHandlers}>
        <form
          className="flex flex-col gap-4"
          onSubmit={formHandlers.handleSubmit(onSubmit)}
        >
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">New Todo</span>
            </div>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full"
              {...register('name')}
            />
            <div className="label">
              {errors['name'] && (
                <span className="label-text-alt text-red-600">
                  {`${errors['name']?.message}`}
                </span>
              )}
            </div>
          </label>
          <div className="flex justify-end gap-2">
            <Link href="/">
              <button className="btn btn-error btn-sm">Cancel</button>
            </Link>
            <button
              type="submit"
              className="btn btn-primary btn-sm self-end"
              disabled={!isValid}
            >
              Submit
            </button>
          </div>
        </form>
      </FormProvider>
    </main>
  );
}
