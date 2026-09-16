'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useMemo, useState } from 'react'
import { ProjectCard } from '@/components/ui/ProjectCard'
import { SectionHeading } from '@/components/shared/SectionHeading'
import { cn } from '@/lib/utils'
import { projects, projectFilters } from '@/data/projects'
import { viewportOnce } from '@/lib/motion'

export function Projects() {
  const [filter, setFilter] = useState('All')

  const visible = useMemo(
    () => (filter === 'All' ? projects : projects.filter((p) => p.tech.includes(filter))),
    [filter]
  )

  return (
    <section id="projects" aria-labelledby="projects-heading" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div id="projects-heading">
          <SectionHeading
            eyebrow="Projects"
            title="Selected work"
            subtitle="Products I have designed and built as part of my professional work."
          />
        </div>

        {/* Technology filter chips */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          className="mb-10 flex flex-wrap justify-center gap-2"
          role="group"
          aria-label="Filter projects by technology"
        >
          {projectFilters.map((tech) => (
            <button
              key={tech}
              type="button"
              onClick={() => setFilter(tech)}
              aria-pressed={filter === tech}
              className={cn(
                'rounded-full border px-4 py-1.5 text-sm font-medium transition-all',
                filter === tech
                  ? 'border-transparent bg-[linear-gradient(100deg,hsl(var(--grad-1)),hsl(var(--grad-3)))] text-white shadow-lg shadow-primary/25'
                  : 'border-border text-muted-foreground hover:border-primary/50 hover:text-primary'
              )}
            >
              {tech}
            </button>
          ))}
        </motion.div>

        <motion.div layout className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {visible.map((project) => (
              <ProjectCard key={project.name} project={project} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
