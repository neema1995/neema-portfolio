import { skillTags } from '@/data/skills'

/** Quiet ticker of technologies, sitting between the hero and the content. */
export function Marquee() {
  // The list is rendered twice so the -50% translate loops seamlessly.
  const items = [...skillTags, ...skillTags]

  return (
    <div className="border-b border-border bg-background py-8">
      <p className="container-page mb-5 text-center text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
        Technologies I work with
      </p>
      <div
        aria-hidden="true"
        className="overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]"
      >
        <ul className="flex w-max animate-marquee items-center">
          {items.map((tag, i) => (
            <li key={`${tag}-${i}`} className="px-3">
              <span className="block whitespace-nowrap rounded-lg border border-border bg-subtle px-4 py-2 text-sm font-medium text-muted-foreground">
                {tag}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
