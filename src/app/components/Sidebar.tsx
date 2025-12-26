import { SidebarNav } from "./SidebarNav";
import { NavSocials } from "./NavSocials";

export function Sidebar() {
  return (
    <aside className="hidden md:flex w-[200px] shrink-0 text-[14px] leading-6">
      <div className="sticky top-0 flex flex-col h-screen pt-8 md:pt-10">
        <SidebarNav />
        <div className="mt-auto pb-10">
          <NavSocials />
        </div>
      </div>
    </aside>
  );
}
