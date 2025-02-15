import { z as zod } from "zod";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { trpc } from "@/trpc/client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ResponsiveModal } from "@/components/responsive-modal";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

// ----------------------------------------------------------------------

type Props = {
  videoId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const formSchema = zod.object({
  prompt: zod.string().min(10),
});

export function ThumbnailGenerateModal({ videoId, open, onOpenChange }: Props) {
  const form = useForm<zod.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  const generateThumbnail = trpc.videos.generateThumbnail.useMutation({
    onSuccess: () => {
      toast.success("Background job started", {
        description: "This may take some time",
      });
      form.reset();
      onOpenChange(false);
    },
    onError: () => {
      toast.error("Something went wrong");
    },
  });

  const onSubmit = (data: zod.infer<typeof formSchema>) => {
    generateThumbnail.mutate({
      prompt: data.prompt,
      id: videoId,
    });
  };

  return (
    <ResponsiveModal
      title="Upload a thumbnail"
      open={open}
      onOpenChange={onOpenChange}
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
          <FormField
            control={form.control}
            name="prompt"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Prompt</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    className="resize-none"
                    cols={30}
                    rows={5}
                    placeholder="A description of wanted thumbnail"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end">
            <Button type="submit">Generate</Button>
          </div>
        </form>
      </Form>
    </ResponsiveModal>
  );
}
