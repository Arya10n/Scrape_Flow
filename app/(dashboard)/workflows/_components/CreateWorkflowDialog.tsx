'use client';

import CustomDialogHeader from '@/components/CustomDialogHeader';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import {
  createWorkflowSchema,
  createWorkflowSchemaType,
} from '@/schema/workflow';
import { Layers2, Loader2 } from 'lucide-react';
import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
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
import { Textarea } from '@/components/ui/textarea';
import { useMutation } from '@tanstack/react-query';
import { createWorkflow } from '@/actions/workflows/createWorkflow';
import { toast } from 'sonner';

function CreateWorkflowDialog({ triggerText }: { triggerText?: string }) {
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof createWorkflowSchema>>({
    resolver: zodResolver(createWorkflowSchema),
    defaultValues: {
      name: '',
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: createWorkflow,
    onSuccess: () => {
      toast.success('Workflow created', { id: 'create-workflow' });
    },
    onError: () => {
      toast.error('Failed to create workflow', { id: 'create-workflow' });
    },
  });

  const onSubmit = useCallback(
    (values: createWorkflowSchemaType) => {
      toast.loading('Creating workflow...', { id: 'create-workflow' });
      mutate(values);
    },
    [mutate]
  );

  return (
    <Dialog
      open={open}
      onOpenChange={open => {
        form.reset();
        setOpen(open);
      }}>
      <DialogTrigger asChild>
        <Button>{triggerText ?? 'Create Workflow'}</Button>
      </DialogTrigger>
      <DialogContent className='px-0'>
        <CustomDialogHeader
          icon={Layers2}
          title='Create workflow'
          subTitle='Start building your workflow'
        />
        <div className='p-6'>
          <Form {...form}>
            <form
              className='space-y-8 w-full'
              onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Name
                      <p className='text-xs text-primary'>(required)</p>
                    </FormLabel>
                    <FormControl>
                      <Input {...field} value={field.value ?? ''} />
                    </FormControl>
                    <FormDescription>
                      Choose a descriptive and unique name
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='description'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Description
                      <p className='text-xs text-muted-foreground '>
                        (optional)
                      </p>
                    </FormLabel>
                    <FormControl>
                      <Textarea {...field} />
                    </FormControl>
                    <FormDescription>
                      Provide a brief description of what your workflow does.
                      <br /> This is optional but can help you remember the
                      workflow&apos;s purpose
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type='submit' className='w-full' disabled={isPending}>
                {!isPending && 'Proceed'}
                {isPending && <Loader2 className='animate-spin' />}
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
export default CreateWorkflowDialog;
