import { FormSection } from "../sections/form-section";

// ----------------------------------------------------------------------

type Props = {
  videoId: string;
};

export function StudioVideoView({ videoId }: Props) {
  return (
    <div className="px-4 pt-2.5 max-w-screen-lg">
      <FormSection videoId={videoId} />
    </div>
  );
}
