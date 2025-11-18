import { ReactNode } from "react";

type HeaderProps = {
  title: string;
  left?: ReactNode;
  right?: ReactNode;
};

export default function Header({ title, left, right }: HeaderProps) {
  return (
    <header className="sticky top-0 z-20 w-full h-16 flex items-center justify-between 
      px-4 backdrop-blur-md 
      bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20
      border-b border-white/10 shadow-sm">

      <div className="flex items-center gap-2">{left}</div>

      <h1 className="text-lg font-semibold text-primary-dark dark:text-secondary-light tracking-wide">
        {title}
      </h1>

      <div className="flex items-center gap-2">{right}</div>
    </header>
  );
}
