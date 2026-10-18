import React from 'react';
import { ArrowUp } from 'lucide-react';
import { PROFILE } from '@/data/profile';

export default function Footer() {
  return (
    <footer className="border-t border-line py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 text-sm text-mist sm:flex-row">
        <p>© {new Date().getFullYear()} {PROFILE.name}</p>
        <a href="#hero" className="inline-flex items-center gap-2 transition-colors hover:text-brand">
          Volver arriba <ArrowUp size={14} />
        </a>
      </div>
    </footer>
  );
}
