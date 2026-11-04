import { SiteFooter } from "@/shared/components/site-footer";
import { SiteHeader } from "@/shared/components/site-header";

export default function PublicLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </>
  );
}
