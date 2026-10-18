import React from 'react';
import { motion } from 'framer-motion';
import Section from './Section';
import { STACK } from '@/data/stack';

const list = { hidden: {}, show: { transition: { staggerChildren: 0.05 } } };
const chip = {
  hidden: { opacity: 0, scale: 0.85 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
};

export default function StackSection() {
  return (
    <Section id="stack" title="Stack" intro="Tecnologías y herramientas que uso para construir aplicaciones web.">
      <div className="divide-y divide-line border-y border-line">
        {STACK.map((group) => (
          <div key={group.title} className="grid gap-4 py-8 md:grid-cols-[9rem_1fr]">
            <h3 className="font-display text-lg font-semibold text-snow">{group.title}</h3>
            <motion.ul
              variants={list}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-60px' }}
              className="flex flex-wrap gap-2.5"
            >
              {group.items.map((item) => (
                <motion.li
                  key={item}
                  variants={chip}
                  whileHover={{ y: -3 }}
                  className="cursor-default rounded-full border border-line px-4 py-2 text-sm text-mist transition-colors duration-300 hover:border-brand hover:text-snow"
                >
                  {item}
                </motion.li>
              ))}
            </motion.ul>
          </div>
        ))}
      </div>
    </Section>
  );
}
