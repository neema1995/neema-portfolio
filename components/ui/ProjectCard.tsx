'use client'

import { motion } from 'framer-motion'
import { ExternalLink, Folder, Github } from 'lucide-react'
import { Badge } from './badge'
import { Card, CardDescription, CardTitle } from './card'
import type { Project } from '@/data/projects'

/** Project tile. Links are omitted entirely when the resume lists none. */
export function ProjectCard({ project }: { project: Project }) {
  const links = [
    { label: 'Live demo', href: project.liveUrl, icon: ExternalLink },
    { label: 'Source', href: project.sourceUrl, icon: Github },
  ].filter((link) => link.href)

  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
      <Card interactive className="flex h-full flex-col">
        <span
          aria-hidden="true"
          className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary-soft text-primary"
        >
          <Folder className="h-5 w-5" />
        </span>

        <CardTitle className="mt-4">{project.name}</CardTitle>
        <CardDescription className="mt-2 flex-1">{project.description}</CardDescription>

        <ul className="mt-5 flex flex-wrap gap-2">
          {project.tech.map((tech) => (
            <li key={tech}>
              <Badge>{tech}</Badge>
            </li>
          ))}
        </ul>

        {/*
          The resume lists no repository or live URL for any project, so the
          link row only renders once one is added to data/projects.ts.
        */}
        {links.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-4 border-t border-border pt-4">
            {links.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href as string}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded text-sm font-medium text-primary hover:underline"
              >
                <Icon className="h-4 w-4" aria-hidden="true" />
                {label}
              </a>
            ))}
          </div>
        )}
      </Card>
    </motion.li>
  )
}
