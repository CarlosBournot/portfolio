import React from 'react';
import { motion } from 'framer-motion';

const EASE = [0.22, 1, 0.36, 1];

// Estructura común: título fijo a la izquierda (en desktop) y contenido a la derecha.
export default function Section({ id, title, intro, children }) {
  return (
    <section id={id} className="relative scroll-mt-16 border-t border-line py-24 md:py-32">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-[18rem_minmax(0,1fr)] lg:gap-16">
        <header className="lg:sticky lg:top-28 lg:self-start">
          <h2 style={{ clipPath: 'inset(0 -2.5rem 0 0)' }} className="pb-1 font-display text-[clamp(2.1rem,4.4vw,3.25rem)] font-bold leading-[1.05] tracking-[-0.03em] text-snow">
            <motion.span
              className="block"
              initial={{ y: '105%' }}
              whileInView={{ y: 0 }}
              viewport={{ once: true, margin: '0px 0px -10% 0px' }}
              transition={{ duration: 0.9, ease: EASE }}
            >
              {title}
            </motion.span>
          </h2>
          {intro && <p className="mt-4 max-w-xs leading-relaxed text-mist">{intro}</p>}
        </header>
        <div className="min-w-0">{children}</div>
      </div>
    </section>
  );
}
