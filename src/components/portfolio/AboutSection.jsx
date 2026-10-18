import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import Section from './Section';
import { PROFILE } from '@/data/profile';

const TEXT =
  'Durante mi proceso de aprendizaje desarrollé habilidades de trabajo en equipo, comunicación, liderazgo y resolución de problemas. Me apasiona la tecnología y la posibilidad de crear soluciones que aporten valor real a las personas y a las organizaciones.';

const textClass = 'font-display text-[clamp(1.5rem,3vw,2.25rem)] font-medium leading-[1.25] tracking-[-0.01em] text-snow';

function Word({ word, progress, range }) {
  const opacity = useTransform(progress, range, [0.18, 1]);
  return (
    <motion.span style={{ opacity }} className="mr-[0.28em] inline-block">
      {word}
    </motion.span>
  );
}

// El texto se "enciende" palabra por palabra a medida que se lee (scroll).
function ScrollLit({ text }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.8', 'end 0.55'] });
  const words = text.split(' ');

  if (reduce) return <p className={textClass}>{text}</p>;

  return (
    <p ref={ref} className={textClass} aria-label={text}>
      {words.map((w, i) => (
        <Word key={i} word={w} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]} />
      ))}
    </p>
  );
}

const FACTS = [
  { label: 'Ubicación', value: PROFILE.location },
  { label: 'Disponibilidad', value: 'Disponible para trabajar', live: true },
  { label: 'Formación', value: 'Técnico en Desarrollo de Software' },
];

export default function AboutSection() {
  return (
    <Section id="about" title="Sobre mí" intro="Desarrollador fullstack con foco en aprender y entregar.">
      <ScrollLit text={TEXT} />

      <dl className="mt-16 grid gap-x-10 border-t border-line sm:grid-cols-2">
        {FACTS.map((f) => (
          <div key={f.label} className="border-b border-line py-5">
            <dt className="text-sm text-mist">{f.label}</dt>
            <dd className="mt-1 flex items-center gap-2 font-display text-lg font-medium text-snow">
              {f.live && (
                <span className="relative flex h-2 w-2" aria-hidden>
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/70" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                </span>
              )}
              {f.value}
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
