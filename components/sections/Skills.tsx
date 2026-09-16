'use client'

import { motion } from 'framer-motion'
import { Card, CardTitle } from '@/components/ui/card'
import { SkillCard } from '@/components/ui/SkillCard'
import { SectionHeading } from '@/components/shared/SectionHeading'
import { skillCategories, skillTags } from '@/data/skills'
import { fadeInUp, staggerContainer, viewportOnce } from '@/lib/motion'

export function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-heading" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div id="skills-heading">
          <SectionHeading
            eyebrow="Skills"
            title="Technical toolkit"
            subtitle="Frameworks, databases and tooling I work with day to day."
          />
        </div>

        {/* Bento grid of categorized skill cards */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {skillCategories.map((category) => (
            <SkillCard key={category.title} category={category} />
          ))}
        </motion.div>

        {/* Full technology tag cloud */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-5"
        >
          <motion.div variants={fadeInUp}>
            <Card>
              <CardTitle className="mb-4">Technologies</CardTitle>
              <ul className="flex flex-wrap gap-2.5">
                {skillTags.map((tag) => (
                  <li
                    key={tag}
                    className="cursor-default rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-foreground transition-all hover:-translate-y-0.5 hover:border-primary/50 hover:bg-primary/10 hover:text-primary"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
