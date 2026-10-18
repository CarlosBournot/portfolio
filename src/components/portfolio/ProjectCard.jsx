import React, { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { Github, ArrowUpRight } from 'lucide-react';

export default function ProjectCard({ project }) {
  const ref = useRef(null);
  const host = new URL(project.live).host;

  // Parallax: la captura se desplaza más lento que el scroll dentro del marco
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const imgY = useTransform(scrollYProgress, [0, 1], ['-5%', '5%']);

  // Inclinación 3D suave según la posición del cursor
  const rx = useSpring(0, { stiffness: 160, damping: 18 });
  const ry = useSpring(0, { stiffness: 160, damping: 18 });
  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    ry.set(((e.clientX - r.left) / r.width - 0.5) * 5);
    rx.set(-((e.clientY - r.top) / r.height - 0.5) * 5);
  };
  const onLeave = () => { rx.set(0); ry.set(0); };

  return (
    <article ref={ref}>
      <motion.a
        href={project.live}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Abrir ${project.title}`}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        style={{ rotateX: rx, rotateY: ry, transformPerspective: 1200 }}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="group relative block overflow-hidden rounded-2xl border border-line bg-surface transition-colors duration-500 hover:border-brand/50"
      >
        {/* Barra de navegador */}
        <div className="flex items-center gap-3 border-b border-line px-4 py-3">
          <span className="flex gap-1.5" aria-hidden>
            <span className="h-2.5 w-2.5 rounded-full bg-line" />
            <span className="h-2.5 w-2.5 rounded-full bg-line" />
            <span className="h-2.5 w-2.5 rounded-full bg-line" />
          </span>
          <span className="mx-auto max-w-[70%] truncate rounded-full bg-navy px-4 py-1 font-mono text-xs text-mist">{host}</span>
          <span className="w-10" aria-hidden />
        </div>

        <div className="relative aspect-[2/1] overflow-hidden">
          <motion.img
            src={project.image}
            alt={`Captura de ${project.title}`}
            loading="lazy"
            style={{ y: imgY, scale: 1.1 }}
            className="h-full w-full object-cover object-top"
          />
          <span className="absolute bottom-4 right-4 inline-flex translate-y-2 items-center gap-1.5 rounded-full bg-brand px-4 py-2 text-sm font-semibold text-navy opacity-0 shadow-lg transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            Abrir sitio <ArrowUpRight size={15} />
          </span>
        </div>
      </motion.a>

      <div className="mt-8 flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
        <div className="max-w-md">
          <div className="flex items-baseline gap-3">
            <h3 className="font-display text-2xl font-semibold tracking-tight text-snow md:text-3xl">{project.title}</h3>
            <span className="text-sm text-mist">{project.year}</span>
          </div>
          <p className="mt-3 leading-relaxed text-mist">{project.description}</p>
        </div>

        <div className="flex shrink-0 items-center gap-3">
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            className="group/btn inline-flex items-center gap-1.5 rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-navy transition-colors hover:bg-[#ffc56e]"
          >
            Ver sitio
            <ArrowUpRight size={15} className="transition-transform duration-300 group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5" />
          </a>
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full border border-line px-5 py-2.5 text-sm font-medium text-snow transition-colors hover:border-brand hover:text-brand"
          >
            <Github size={15} /> Código
          </a>
        </div>
      </div>

      <ul className="mt-6 flex flex-wrap gap-2" aria-label={`Tecnologías de ${project.title}`}>
        {project.stackDetails.map((s) => (
          <li key={s} className="rounded-full border border-line px-3 py-1 text-xs text-mist">{s}</li>
        ))}
      </ul>
    </article>
  );
}
