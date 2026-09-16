'use client'

import { motion } from 'framer-motion'
import { ExternalLink, Github, FolderGit2 } from 'lucide-react'
import { Badge } from './badge'
import { Card, CardDescription, CardTitle } from './card'
import type { Project } from '@/data/projects'

/** Glassmorphism project card. Links render disabled when the resume has none. */
export function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.025 }}
      className="h-full"
    >
      <Card className="group flex h-full flex-col hover:border-primary/40">
        <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[linear-gradient(135deg,hsl(var(--grad-1)/0.2),hsl(var(--grad-3)/0.2))] text-primary transition-transform duration-300 group-hover:scale-110">
          <FolderGit2 className="h-5 w-5" />
        </span>

        <CardTitle className="text-xl">{project.name}</CardTitle>
        <CardDescription className="mt-2 flex-1">{project.description}</CardDescription>

        <div className="mt-5 flex flex-wrap gap-2">
          {project.tech.map((tech) => (
            <Badge key={tech}>{tech}</Badge>
          ))}
        </div>

        <div className="mt-5 flex items-center gap-4 border-t border-border/60 pt-4">
          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
            >
              <ExternalLink className="h-4 w-4" /> Live Demo
            </a>
          ) : (
            <span className="inline-flex cursor-not-allowed items-center gap-1.5 text-sm text-muted-foreground/60">
              <ExternalLink className="h-4 w-4" /> Live Demo
            </span>
          )}

          {project.sourceUrl ? (
            <a
              href={project.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
            >
              <Github className="h-4 w-4" /> Source
            </a>
          ) : (
            <span className="inline-flex cursor-not-allowed items-center gap-1.5 text-sm text-muted-foreground/60">
              <Github className="h-4 w-4" /> Source
            </span>
          )}
        </div>
      </Card>
    </motion.article>
  )
}
