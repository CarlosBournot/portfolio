export const STACK = [
  { title: 'Frontend', items: ['React', 'HTML5', 'CSS3', 'JavaScript', 'TypeScript', 'Tailwind CSS', 'Angular', 'Vite'] },
  { title: 'Backend', items: ['Node.js', 'Express.js', 'SQL', 'NoSQL', 'APIs', 'REST', 'JWT'] },
  { title: 'Herramientas', items: ['Git', 'GitHub', 'Figma'] },
];

export const STACK_FLAT = STACK.flatMap((g) => g.items);
