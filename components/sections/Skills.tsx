'use client'

import { motion } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'
import { SkillCard } from '@/components/ui/SkillCard'
import { SectionHeading } from '@/components/shared/SectionHeading'
import { Badge } from '@/components/ui/badge'
import { skillCategories, skillTags } from '@/data/skills'
import { evidenceScore, levelLabel, skillUsage } from '@/lib/skill-usage'
import { fadeInUp, staggerContainer, viewportOnce } from '@/lib/motion'

/**
 * The core stack is not hand-picked: it is every skill that the resume data
 * actually attributes to a shipped project or a past employer, ranked by how
 * much of that evidence exists. Self-assessment decides nothing here.
 */
const coreStack = skillCategories
  .flatMap((category) => category.skills)
  .map((skill) => ({ ...skill, usage: skillUsage(skill.name) }))
  .filter((skill) => evidenceScore(skill.usage) > 0)
  .sort((a, b) => evidenceScore(b.usage) - evidenceScore(a.usage) || b.level - a.level)

export function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-heading" className="section bg-subtle">
      <div className="container-page">
        <SectionHeading
          id="skills-heading"
          eyebrow="Skills"
          title="Technical toolkit"
          subtitle="Frameworks, databases and tooling I work with day to day."
        />

        {/* Evidence first: what has actually gone to production. */}
        {coreStack.length > 0 && (
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="mb-14"
          >
            <motion.h3
              variants={fadeInUp}
              className="flex items-center justify-center gap-2 text-sm font-semibold"
            >
              <CheckCircle2 className="h-4 w-4 text-primary" aria-hidden="true" />
              Shipped to production
            </motion.h3>

            <motion.ul
              variants={fadeInUp}
              className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
            >
              {coreStack.map(({ name, level, usage }) => (
                <li
                  key={name}
                  className="rounded-xl border border-border bg-card p-5 shadow-card transition-all duration-200 hover:-translate-y-1 hover:border-primary/30 hover:shadow-card-hover"
                >
                  <div className="flex items-baseline justify-between gap-3">
                    <p className="text-lg font-semibold tracking-tight">{name}</p>
                    <span className="shrink-0 text-xs font-medium text-primary">
                      {levelLabel(level)}
                    </span>
                  </div>

                  <p className="mt-1 text-xs text-muted-foreground">
                    {usage.projects.length > 0 && (
                      <>
                        {usage.projects.length} project
                        {usage.projects.length > 1 ? 's' : ''}
                      </>
                    )}
                    {usage.projects.length > 0 && usage.companies.length > 0 && ' · '}
                    {usage.companies.length > 0 && (
                      <>
                        {usage.companies.length} employer
                        {usage.companies.length > 1 ? 's' : ''}
                      </>
                    )}
                  </p>

                  {usage.projects.length > 0 && (
                    <ul className="mt-3 flex flex-wrap gap-1.5">
                      {usage.projects.map((project) => (
                        <li key={project}>
                          <Badge variant="brand">{project}</Badge>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </motion.ul>
          </motion.div>
        )}

        {/* Full breakdown by category. */}
        <motion.h3
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mb-5 text-center text-sm font-semibold"
        >
          Full breakdown
        </motion.h3>

        <motion.ul
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid items-start gap-6 sm:grid-cols-2"
        >
          {skillCategories.map((category) => (
            <SkillCard key={category.title} category={category} />
          ))}
        </motion.ul>

        {/* Flat technology list */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-12 text-center"
        >
          <h3 className="text-sm font-semibold text-foreground">Also familiar with</h3>
          <ul className="mt-4 flex flex-wrap justify-center gap-2">
            {skillTags.map((tag) => (
              <li key={tag}>
                <Badge variant="outline" className="bg-background px-3 py-1.5 text-sm">
                  {tag}
                </Badge>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  )
}
