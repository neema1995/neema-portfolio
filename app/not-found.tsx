import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-20">
      <div className="text-center">
        <p className="eyebrow">Error 404</p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">Page not found</h1>
        <p className="lead mx-auto mt-4 max-w-md">
          The page you are looking for doesn&apos;t exist or may have been moved.
        </p>
        <Link href="/" className={cn(buttonVariants({ size: 'lg' }), 'mt-8')}>
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Back to portfolio
        </Link>
      </div>
    </main>
  )
}
