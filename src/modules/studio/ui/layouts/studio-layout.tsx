import { SidebarProvider } from "@/components/ui/sidebar";

import { StudioNavbar } from "../components/studio-navbar";
import { StudioSidebar } from "../components/studio-sidebar";

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export function StudioLayout({ children }: Props) {
  return (
    <SidebarProvider>
      <div className="w-full">
        <StudioNavbar />
        <div className="flex min-h-screen pt-[4rem]">
          <StudioSidebar />
          <main className="flex-1 overflow-y-auto">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
