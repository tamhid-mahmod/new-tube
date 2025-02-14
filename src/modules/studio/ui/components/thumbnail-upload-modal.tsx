import { UploadDropzone } from "@/lib/uploadthing";

import { ResponsiveModal } from "@/components/responsive-modal";
import { trpc } from "@/trpc/client";

// ----------------------------------------------------------------------

type Props = {
  videoId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function ThumbnailUploadModal({ videoId, open, onOpenChange }: Props) {
  const utils = trpc.useUtils();

  const onUploadComplete = () => {
    utils.studio.getOne.invalidate({ id: videoId });
    utils.studio.getMany.invalidate();
    onOpenChange(false);
  };

  return (
    <ResponsiveModal
      title="Upload a thumbnail"
      open={open}
      onOpenChange={onOpenChange}
    >
      <UploadDropzone
        endpoint="thumbnailUploader"
        input={{ videoId }}
        onClientUploadComplete={onUploadComplete}
      />
    </ResponsiveModal>
  );
}
