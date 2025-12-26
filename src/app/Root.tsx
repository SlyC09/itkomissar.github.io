import { useEffect, useState } from "react";
import { Outlet } from "react-router";
import { Header } from "./components/Header";
import { MobileMenu } from "./components/MobileMenu";
import { Sidebar } from "./components/Sidebar";
import { useLocation } from "react-router";
import { Seo } from "./components/Seo";
import { Metrika } from "./components/Metrika";

export function Root() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-white text-[#2b2a28]">
      <Seo />
      <Metrika />
      <Header
        isMenuOpen={menuOpen}
        onToggleMenu={() => {
          setMenuOpen((open) => !open);
        }}
      />
      <MobileMenu
        open={menuOpen}
        onClose={() => {
          setMenuOpen(false);
        }}
      />
      <div className="max-w-[1500px] mx-auto px-4 sm:px-7 lg:px-12 pb-16">
        <div className="flex gap-12 md:gap-16 lg:gap-20">
          <Sidebar />
          <main className="flex-1 w-full min-w-0 max-w-[920px] pt-6 md:pt-10">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
