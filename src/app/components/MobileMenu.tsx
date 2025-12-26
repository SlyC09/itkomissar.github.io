import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { Link } from "react-router";
import { NavSocials } from "./NavSocials";
import { SidebarNav } from "./SidebarNav";

type Props = {
  open: boolean;
  onClose: () => void;
};

const EXTERNAL_LINK = {
  label: "Скоро тут что-то будет",
  href: "https://example.com",
};

export function MobileMenu({ open, onClose }: Props) {
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!open) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  useEffect(() => {
    if (!open) {
      return;
    }

    closeButtonRef.current?.focus();

    const body = document.body;
    const previousStyle = {
      position: body.style.position,
      top: body.style.top,
      left: body.style.left,
      right: body.style.right,
      width: body.style.width,
    };

    const scrollY = window.scrollY;
    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.left = "0";
    body.style.right = "0";
    body.style.width = "100%";

    return () => {
      body.style.position = previousStyle.position;
      body.style.top = previousStyle.top;
      body.style.left = previousStyle.left;
      body.style.right = previousStyle.right;
      body.style.width = previousStyle.width;
      window.scrollTo(0, scrollY);
    };
  }, [open]);

  return (
    <div
      className={`fixed inset-0 z-50 md:hidden ${open ? "" : "pointer-events-none"}`}
      aria-hidden={!open}
    >
      <div
        className={`absolute inset-0 bg-black/30 transition-opacity duration-200 motion-reduce:transition-none ${
          open ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
      />

      <div
        id="mobile-menu-panel"
        role="dialog"
        aria-modal="true"
        aria-label="Меню"
        className={`absolute right-0 top-0 h-full w-[86%] max-w-[340px] bg-white shadow-xl transition-transform duration-200 motion-reduce:transition-none ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        style={{
          paddingTop: "max(16px, env(safe-area-inset-top))",
          paddingBottom: "max(16px, env(safe-area-inset-bottom))",
        }}
      >
        <div className="flex flex-col h-full overflow-y-auto overscroll-contain px-6 pb-8">
          <div className="flex items-center justify-between pt-2 pb-8">
            <Link
              to="/"
              className="text-[16px] font-semibold tracking-tight hover:opacity-80 transition-opacity"
              onClick={onClose}
            >
              Андрей Комиссаренко
            </Link>

            <button
              ref={closeButtonRef}
              type="button"
              className="w-10 h-10 -mr-2 flex items-center justify-center text-[#2b2a28] hover:opacity-70 transition-opacity"
              aria-label="Закрыть меню"
              onClick={onClose}
            >
              <X size={20} />
            </button>
          </div>

          <SidebarNav variant="mobile" onNavigate={onClose} />

          <div className="mt-auto pt-10 pb-2">
            <a
              href={EXTERNAL_LINK.href}
              target="_blank"
              rel="noreferrer"
              className="block w-fit text-[14px] leading-6 font-semibold text-[#6f6559] hover:underline underline-offset-6 transition-colors py-2"
              onClick={onClose}
            >
              {EXTERNAL_LINK.label}
            </a>

            <div className="pt-6">
              <NavSocials variant="mobile" onNavigate={onClose} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
