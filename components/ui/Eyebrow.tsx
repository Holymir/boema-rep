export default function Eyebrow({
  index,
  children,
  dark = false,
}: {
  index?: string;
  children: React.ReactNode;
  dark?: boolean;
}) {
  return (
    <div className="mb-4 flex items-center gap-3">
      {index && <span className="font-mono text-[13px] font-semibold text-red">{index}</span>}
      <span className="h-0.5 w-[30px] bg-red" />
      <span
        className={`text-xs font-bold uppercase tracking-[0.12em] ${
          dark ? 'text-steel-400' : 'text-steel-500'
        }`}
      >
        {children}
      </span>
    </div>
  );
}
