import { Menu, X } from "lucide-react";
import { Link } from "react-router";

type Props = {
  isMenuOpen?: boolean;
  onToggleMenu?: () => void;
};

export function Header({ isMenuOpen = false, onToggleMenu }: Props) {
  return (
    <header className="bg-white text-[#2b2a28]">
      <div className="max-w-[1500px] mx-auto px-4 sm:px-7 lg:px-12 pt-5 pb-2">
        <div className="flex items-center justify-between gap-4 md:hidden">
          <Link
            to="/"
            className="text-[16px] font-semibold tracking-tight hover:opacity-80 transition-opacity"
          >
            Андрей Комиссаренко
          </Link>

          <button
            type="button"
            className="w-10 h-10 -mr-2 flex items-center justify-center text-[#2b2a28] hover:opacity-70 transition-opacity"
            aria-label={isMenuOpen ? "Закрыть меню" : "Открыть меню"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu-panel"
            onClick={onToggleMenu}
            disabled={!onToggleMenu}
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <div className="hidden md:grid grid-cols-[200px_3rem_1fr] md:grid-cols-[200px_4rem_1fr] lg:grid-cols-[200px_5rem_1fr] items-center">
          <Link
            to="/"
            className="text-lg font-semibold tracking-tight hover:opacity-80 transition-opacity"
          >
            Андрей Комиссаренко
          </Link>

          <nav className="col-start-3 flex items-center gap-8 text-[15px]">
            <Link to="/" className="font-semibold text-[#6d28d9]">
              Блог
            </Link>
            <a
              href="https://example.com"
              target="_blank"
              rel="noreferrer"
              className="text-[#6f6559] hover:underline underline-offset-4"
            >
              Скоро тут что-то будет
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}
