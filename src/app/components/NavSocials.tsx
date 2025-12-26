type Variant = "desktop" | "mobile";

type Props = {
  variant?: Variant;
  onNavigate?: () => void;
};

const links = [
  { label: "Twitter", href: "https://twitter.com/itkomissar" },
  { label: "Threads", href: "https://threads.net/@itkomissar" },
  { label: "LinkedIn", href: "https://linkedin.com/in/itkomissar/" },
  { label: "Telegram", href: "https://t.me/itkomissar" },
] as const;

export function NavSocials({ variant = "desktop", onNavigate }: Props) {
  const baseClassesByVariant: Record<Variant, string> = {
    desktop:
      "block w-fit text-[14px] leading-6 font-semibold text-[#6f6559] hover:underline underline-offset-6 transition-colors pb-1",
    mobile:
      "block w-fit text-[14px] leading-6 font-semibold text-[#6f6559] hover:underline underline-offset-6 transition-colors py-2",
  };

  return (
    <div className="space-y-3">
      {links.map((link) => (
        <a
          key={link.href}
          href={link.href}
          target="_blank"
          rel="noreferrer"
          className={baseClassesByVariant[variant]}
          onClick={onNavigate}
        >
          {link.label}
        </a>
      ))}
    </div>
  );
}
