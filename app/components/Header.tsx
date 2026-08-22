import Image from "next/image";

export default function Header() {
  return (
    <header className="w-full border-b border-outline-variant/30 bg-surface-container-lowest/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-[1200px] mx-auto px-5 h-16 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <Image
            src="/uxlogo.jpg"
            alt="UX Western Visayas logo"
            width={40}
            height={40}
            className="rounded-lg"
          />
          <span className="text-base font-bold text-primary tracking-tight">
            UX Western Visayas
          </span>
        </div>

        {/* Product badge */}
        <div className="hidden sm:flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-[0.05em] text-on-surface-variant bg-primary-fixed/40 px-3 py-1.5 rounded-full">
            This or That
          </span>
        </div>
      </div>
    </header>
  );
}
