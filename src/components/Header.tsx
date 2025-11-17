import { ReactNode } from "react";

type HeaderProps = {
  title: string;
  left?: ReactNode;
  right?: ReactNode;
};

export default function Header({ title, left, right }: HeaderProps) {
  return (
    <header className="sticky top-0 z-10 flex h-16 w-full items-center justify-between border-b border-white/10 bg-background-light/80 px-4 backdrop-blur-sm dark:bg-background-dark/80">
      <div className="flex items-center gap-2">{left}</div>
      <h1 className="text-xl font-bold text-black dark:text-white">{title}</h1>
      <div className="flex items-center gap-2">{right}</div>
    </header>
  );
}
