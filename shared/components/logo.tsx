export function Logo() {
  return (
    <span className="flex items-center gap-2.5 text-[19px] font-extrabold tracking-tight">
      <span
        aria-hidden
        className="relative h-[22px] w-[30px] rounded-[5px] bg-primary before:absolute before:top-[7px] before:-left-1 before:size-2 before:rounded-full before:bg-background after:absolute after:top-[7px] after:-right-1 after:size-2 after:rounded-full after:bg-background"
      />
      Event Congo
    </span>
  );
}
