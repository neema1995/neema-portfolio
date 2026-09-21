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
    <section id="projects" aria-labelledby="projects-heading" className="section bg-subtle">
      <div className="container-page">
        <SectionHeading
          id="projects-heading"
          eyebrow="Projects"
          title="Selected work"
          subtitle="Products I have designed and built as part of my professional work."
        />

        {/* Technology filter */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          className="mb-10 flex flex-wrap justify-center gap-2"
          role="group"
          aria-label="Filter projects by technology"
        >
          {projectFilters.map((tech) => {
            const count =
              tech === 'All' ? projects.length : projects.filter((p) => p.tech.includes(tech)).length
            return (
              <button
                key={tech}
                type="button"
                onClick={() => setFilter(tech)}
                aria-pressed={filter === tech}
                className={cn(
                  'rounded-full border px-4 py-1.5 text-sm font-medium transition-colors',
                  filter === tech
                    ? 'border-primary bg-primary text-primary-foreground'
                    : 'border-border bg-background text-muted-foreground hover:border-primary/40 hover:text-foreground'
                )}
              >
                {tech}
                <span
                  className={cn(
                    'ml-1.5 text-xs',
                    filter === tech ? 'text-primary-foreground/70' : 'text-muted-foreground/70'
                  )}
                >
                  {count}
                </span>
              </button>
            )
          })}
        </motion.div>

        <motion.ul layout className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {visible.map((project) => (
              <ProjectCard key={project.name} project={project} />
            ))}
          </AnimatePresence>
        </motion.ul>
      </div>
    </section>
  )
}
