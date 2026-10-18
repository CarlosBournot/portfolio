import React from 'react';
import { STACK_FLAT } from '@/data/stack';

// Cinta continua con el stack. Es decorativa: el detalle está en la sección Stack.
export default function TechMarquee() {
  return (
    <div
      aria-hidden
      className="relative z-10 border-t border-line py-4"
      style={{ maskImage: 'linear-gradient(to right, transparent, black 12%, black 88%, transparent)', WebkitMaskImage: 'linear-gradient(to right, transparent, black 12%, black 88%, transparent)' }}
    >
      <div className="marquee-track flex w-max">
        {[0, 1].map((k) => (
          <ul key={k} className="flex shrink-0 items-center">
            {STACK_FLAT.map((t) => (
              <li key={t} className="flex items-center whitespace-nowrap pr-12 text-sm text-mist">
                <span className="mr-12 h-1 w-1 rounded-full bg-brand/60" />
                {t}
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
