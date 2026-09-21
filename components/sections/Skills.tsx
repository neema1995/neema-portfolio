'use client'

import { motion } from 'framer-motion'
import { SkillCard } from '@/components/ui/SkillCard'
import { SectionHeading } from '@/components/shared/SectionHeading'
import { Badge } from '@/components/ui/badge'
import { skillCategories, skillTags } from '@/data/skills'
import { fadeInUp, staggerContainer, viewportOnce } from '@/lib/motion'

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

        {/* Full technology list */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-10 text-center"
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
