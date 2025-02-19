import { HomeLayout } from "@/modules/home/ui/layouts/home-layout";

// ----------------------------------------------------------------------

// TODO: confirm this is needed or not
export const dynamic = "force-dynamic";

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return <HomeLayout>{children}</HomeLayout>;
}
