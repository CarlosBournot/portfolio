import React, { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import Section from './Section';

const EDUCATION = [
  { title: 'Data Analytics', institution: 'Coderhouse', period: '2026', link:'https://app.coderhouse.com/certificates/CERT-MTWYUOGN-AD633527' },
  {
    title: 'React JS Developer',
    institution: 'Educación IT',
    period: '2024',
    link: 'https://www.educacionit.com/perfil/Carlos-Bournot-906225/certificado/71417',
  },
  {
    title: 'Técnico en Desarrollo de Software',
    institution: 'IESN7',
    period: '2021 - 2024',
    link: 'https://refe.educacion.gob.ar/v/402224qFJ_ENZLuc4Kq2AF',
  },
];

export default function EducationSection() {
  const ref = useRef(null);
  // La línea de la cronología se dibuja a medida que se hace scroll
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.7', 'end 0.6'] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <Section id="education" title="Educación" intro="Formación y certificaciones, de la más reciente a la más antigua.">
      <ol ref={ref} className="relative">
        <span aria-hidden className="absolute bottom-2 left-[7px] top-2 w-px bg-line" />
        <motion.span aria-hidden style={{ scaleY }} className="absolute bottom-2 left-[7px] top-2 w-px origin-top bg-brand" />

        {EDUCATION.map((item) => (
          <li key={item.title} className="relative pb-14 pl-10 last:pb-0">
            <motion.span
              aria-hidden
              initial={{ borderColor: '#1B2D48' }}
              whileInView={{ borderColor: '#FFB84D' }}
              viewport={{ once: true, margin: '-35% 0px -35% 0px' }}
              className="absolute left-0 top-2 h-[15px] w-[15px] rounded-full border-2 bg-navy"
            >
              {item.current && (
                <>
                  <span className="absolute inset-[2px] animate-ping rounded-full bg-brand/70" />
                  <span className="absolute inset-[2px] rounded-full bg-brand" />
                </>
              )}
            </motion.span>

            <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
              <h3 className="font-display text-xl font-semibold tracking-tight text-snow md:text-2xl">{item.title}</h3>
              <span className="whitespace-nowrap text-sm text-mist">{item.period}</span>
            </div>
            <p className="mt-1 text-mist">{item.institution}</p>
            {item.link && (
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-1.5 text-sm text-snow underline decoration-line underline-offset-4 transition-colors hover:text-brand hover:decoration-brand"
              >
                Ver certificado <ExternalLink size={13} />
              </a>
            )}
          </li>
        ))}
      </ol>
    </Section>
  );
}
