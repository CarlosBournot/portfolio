import React, { useEffect, useRef } from 'react';
import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowDown, Github, Linkedin, Instagram } from 'lucide-react';
import TechMarquee from './TechMarquee';
import Magnetic from './Magnetic';
import { PROFILE } from '@/data/profile';

const ICONS = { GitHub: Github, LinkedIn: Linkedin, Instagram };
const EASE = [0.22, 1, 0.36, 1];

const lineReveal = {
  hidden: { y: '105%' },
  show: (i) => ({ y: 0, transition: { duration: 1.05, ease: EASE, delay: 0.15 + i * 0.12 } }),
};
const fade = (delay) => ({
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: EASE, delay },
});

const GRID = 'linear-gradient(to right, rgba(143,163,192,.22) 1px, transparent 1px), linear-gradient(to bottom, rgba(143,163,192,.22) 1px, transparent 1px)';

export default function HeroSection({ photo }) {
  const ref = useRef(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 90, damping: 22, mass: 0.6 });
  const sy = useSpring(my, { stiffness: 90, damping: 22, mass: 0.6 });

  // Posición inicial del foco: visible aunque no haya mouse (celulares)
  useEffect(() => {
    const r = ref.current.getBoundingClientRect();
    mx.set(r.width * 0.66);
    my.set(r.height * 0.4);
  }, [mx, my]);

  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    mx.set(e.clientX - r.left);
    my.set(e.clientY - r.top);
  };

  const glow = useMotionTemplate`radial-gradient(560px circle at ${sx}px ${sy}px, rgba(255,184,77,0.11), transparent 65%)`;
  const gridMask = useMotionTemplate`radial-gradient(360px circle at ${sx}px ${sy}px, black, transparent 70%)`;
  const px = useTransform(sx, (v) => (v - 700) * -0.02);
  const py = useTransform(sy, (v) => (v - 400) * -0.02);

  return (
    <section
      id="hero"
      ref={ref}
      onPointerMove={onMove}
      className="relative flex min-h-[100svh] flex-col overflow-hidden bg-navy"
    >
      {/* Fondo: grilla que se revela cerca del cursor + manchas lentas */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="orb absolute -left-40 top-1/4 h-[28rem] w-[28rem] rounded-full blur-[110px]" style={{ background: 'rgba(62,92,138,.32)', animation: 'drift1 22s ease-in-out infinite' }} />
        <div className="orb absolute -right-24 bottom-1/4 h-[24rem] w-[24rem] rounded-full blur-[120px]" style={{ background: 'rgba(255,184,77,.10)', animation: 'drift2 28s ease-in-out infinite' }} />
        <div className="absolute inset-0 opacity-[0.22]" style={{ backgroundImage: GRID, backgroundSize: '56px 56px' }} />
        <motion.div className="absolute inset-0" style={{ backgroundImage: GRID, backgroundSize: '56px 56px', WebkitMaskImage: gridMask, maskImage: gridMask }} />
        <motion.div className="absolute inset-0" style={{ backgroundImage: glow }} />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-1 items-center px-6 pb-16 pt-32">
        <div className="grid w-full items-center gap-14 lg:grid-cols-[minmax(0,1fr)_19rem]">
          <div>
            <motion.div
              {...fade(0.05)}
              className="mb-8 inline-flex items-center gap-3 rounded-full border border-line bg-surface/60 py-1.5 pl-1.5 pr-4 text-sm text-mist backdrop-blur"
            >
              <img src={photo} alt="" className="h-8 w-8 rounded-full object-cover object-top lg:hidden" />
              <span className="relative ml-1 flex h-2 w-2 lg:ml-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              Disponible para trabajar
            </motion.div>

            <h1
              aria-label={PROFILE.name}
              className="font-display font-extrabold leading-[0.9] tracking-[-0.04em] text-snow"
              style={{ fontSize: 'clamp(3.5rem, 11vw, 8rem)' }}
            >
              {PROFILE.name.split(' ').map((word, i) => (
                <span key={word} aria-hidden className="block overflow-hidden pb-[0.1em]">
                  <motion.span className="block" variants={lineReveal} custom={i} initial="hidden" animate="show">
                    {word}
                  </motion.span>
                </span>
              ))}
            </h1>

            <motion.p {...fade(0.7)} className="mt-6 font-display text-xl font-medium text-snow md:text-2xl">
              {PROFILE.role} en {PROFILE.location}
            </motion.p>
            <motion.p {...fade(0.85)} className="mt-3 max-w-lg text-lg leading-relaxed text-mist">
              Desarrollo aplicaciones web de punta a punta: interfaces cuidadas en React y APIs con Node.js.
            </motion.p>

            <motion.div {...fade(1)} className="mt-10 flex flex-wrap items-center gap-4">
              <Magnetic>
                <a
                  href="#projects"
                  className="group inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-navy transition-colors hover:bg-[#ffc56e]"
                >
                  Ver proyectos
                  <ArrowDown size={16} className="transition-transform duration-300 group-hover:translate-y-0.5" />
                </a>
              </Magnetic>
              <a
                href="#contact"
                className="rounded-full border border-line px-6 py-3 text-sm font-medium text-snow transition-colors hover:border-brand hover:text-brand"
              >
                Contactar
              </a>
              <div className="flex items-center gap-1 sm:ml-2">
                {PROFILE.socials.map(({ label, href }) => {
                  const Icon = ICONS[label];
                  return (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="flex h-10 w-10 items-center justify-center rounded-full text-mist transition-colors hover:bg-surface hover:text-brand"
                    >
                      <Icon size={18} />
                    </a>
                  );
                })}
              </div>
            </motion.div>
          </div>

          {/* Retrato: duotono que vuelve a color al pasar el mouse */}
          <motion.figure
            style={{ x: px, y: py }}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: EASE, delay: 0.5 }}
            className="group relative hidden lg:block"
          >
            <div aria-hidden className="absolute -inset-3 rounded-t-[10.5rem] rounded-b-3xl border border-brand/25" />
            <div className="relative aspect-[4/5] overflow-hidden rounded-t-[10rem] rounded-b-2xl border border-line">
              <img
                src={photo}
                alt={`Retrato de ${PROFILE.name}`}
                className="h-full w-full object-cover grayscale brightness-110 contrast-[1.08] transition duration-700 group-hover:grayscale-0"
              />
              <div className="absolute inset-0 bg-[#6f8fc2] mix-blend-multiply transition-opacity duration-700 group-hover:opacity-0" />
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-navy/80 to-transparent" />
            </div>
          </motion.figure>
        </div>
      </div>

      <TechMarquee />
    </section>
  );
}
