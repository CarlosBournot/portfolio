import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const NAV = [
  { label: 'Proyectos', id: 'projects' },
  { label: 'Stack', id: 'stack' },
  { label: 'Sobre mí', id: 'about' },
  { label: 'Educación', id: 'education' },
  { label: 'Contacto', id: 'contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Resalta la sección que está en el centro de la pantalla
  useEffect(() => {
    const ids = ['hero', ...NAV.map((n) => n.id)];
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id === 'hero' ? '' : e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' }
    );
    ids.map((id) => document.getElementById(id)).filter(Boolean).forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', onKey); };
  }, [open]);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-500 ${
          scrolled || open ? 'border-line bg-navy/80 backdrop-blur-xl' : 'border-transparent'
        }`}
      >
        <nav aria-label="Principal" className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <a href="#hero" aria-label="Inicio" className="font-display text-xl font-bold tracking-tight text-snow">
            CB<span className="text-brand">.</span>
          </a>

          <div className="hidden items-center gap-1 md:flex">
            {NAV.map(({ label, id }) => (
              <a
                key={id}
                href={`#${id}`}
                aria-current={active === id ? 'true' : undefined}
                className={`relative px-3 py-2 text-sm transition-colors duration-300 ${active === id ? 'text-snow' : 'text-mist hover:text-snow'}`}
              >
                {label}
                {active === id && (
                  <motion.span layoutId="nav-active" className="absolute inset-x-3 -bottom-px h-px bg-brand" transition={{ type: 'spring', stiffness: 400, damping: 34 }} />
                )}
              </a>
            ))}
          </div>

          <button
            onClick={() => setOpen(!open)}
            aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={open}
            className="rounded-full p-2 text-snow transition-colors hover:text-brand md:hidden"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 flex flex-col justify-center gap-6 bg-navy/98 px-8 backdrop-blur-xl md:hidden"
          >
            {NAV.map(({ label, id }, i) => (
              <motion.a
                key={id}
                href={`#${id}`}
                onClick={() => setOpen(false)}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 + i * 0.07 }}
                className="font-display text-4xl font-bold tracking-tight text-snow transition-colors hover:text-brand"
              >
                {label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
