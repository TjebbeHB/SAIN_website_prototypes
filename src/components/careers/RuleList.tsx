/* A list of facts on a drawn rule rather than a dot.
   design.md reserves orange for joining, hiring and active state, so the
   marker here is a 16px navy hairline, the same device the landing's community
   list uses. The rule is decorative; the list semantics carry the count. */
export default function RuleList({
  items,
  className,
}: {
  items: string[];
  className?: string;
}) {
  return (
    <ul
      role="list"
      className={`flex flex-col gap-2.5 font-sans text-caption leading-[20px] text-navy/74${className ? ` ${className}` : ""}`}
    >
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3">
          <span
            className="mt-[9px] h-px w-4 shrink-0 bg-navy/30"
            aria-hidden="true"
          />
          <span className="min-w-0">{item}</span>
        </li>
      ))}
    </ul>
  );
}
