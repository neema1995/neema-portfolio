import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 px-6 text-center">
      <h1 className="gradient-text font-display text-6xl font-bold">404</h1>
      <p className="text-muted-foreground">This page doesn&apos;t exist.</p>
      <Link
        href="/"
        className="rounded-full bg-[linear-gradient(100deg,hsl(var(--grad-1)),hsl(var(--grad-3)))] px-6 py-2.5 text-sm font-medium text-white"
      >
        Back to portfolio
      </Link>
    </main>
  )
}
