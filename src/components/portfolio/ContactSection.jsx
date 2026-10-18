import React, { useState } from 'react';
import { Github, Linkedin, ArrowUpRight, Copy, Check } from 'lucide-react';
import Section from './Section';
import { PROFILE } from '@/data/profile';

const ICONS = { GitHub: Github, LinkedIn: Linkedin };

export default function ContactSection() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* si el navegador bloquea el portapapeles, el mailto sigue funcionando */
    }
  };

  return (
    <Section id="contact" title="Contacto" intro="Estoy abierto a nuevas oportunidades como desarrollador fullstack.">
      <a
        href={`mailto:${PROFILE.email}`}
        className="group relative inline-block break-all font-display text-[clamp(1.5rem,4.2vw,3rem)] font-semibold leading-tight tracking-[-0.02em] text-snow"
      >
        {PROFILE.email}
        <span aria-hidden className="absolute -bottom-1 left-0 h-px w-full bg-line" />
        <span aria-hidden className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-brand transition-transform duration-500 group-hover:scale-x-100" />
      </a>

      <div className="mt-6" aria-live="polite">
        <button
          onClick={copy}
          className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-sm text-mist transition-colors hover:border-brand hover:text-snow"
        >
          {copied ? <Check size={15} className="text-brand" /> : <Copy size={15} />}
          {copied ? 'Correo copiado' : 'Copiar correo'}
        </button>
      </div>

      <ul className="mt-16 divide-y divide-line border-y border-line">
        {PROFILE.socials.filter((s) => s.inContact).map(({ label, handle, href }) => {
          const Icon = ICONS[label];
          return (
            <li key={label}>
              <a href={href} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-4 py-5">
                <Icon size={20} className="text-mist transition-colors group-hover:text-brand" />
                <span className="font-display text-lg font-medium text-snow">{label}</span>
                <span className="hidden text-sm text-mist sm:inline">{handle}</span>
                <ArrowUpRight size={18} className="ml-auto text-mist transition duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand" />
              </a>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
