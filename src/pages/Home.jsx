const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import React from 'react';
import { MotionConfig } from 'framer-motion';
import ScrollProgress from '../components/portfolio/ScrollProgress';
import Navbar from '../components/portfolio/Navbar';
import HeroSection from '../components/portfolio/HeroSection';
import ProjectsSection from '../components/portfolio/ProjectsSection';
import StackSection from '../components/portfolio/StackSection';
import AboutSection from '../components/portfolio/AboutSection';
import EducationSection from '../components/portfolio/EducationSection';
import ContactSection from '../components/portfolio/ContactSection';
import Footer from '../components/portfolio/Footer';

import Project1 from '../images/Project1.webp';
import Project2 from '../images/Project2.webp';
import profilePhoto from '../images/profile.webp';

const PROJECTS = [
  {
    id: 'app-restaurant',
    title: 'App Restaurant',
    description: 'Aplicación para gestión de un restaurante con menú digital y sistema de pedidos.',
    year: '2026',
    image: Project2,
    github: 'https://github.com/CarlosBournot/Restaurante-App',
    live: 'https://hcrestaurant-app.netlify.app/',
    stackDetails: ['HTML5', 'CSS3', 'JavaScript ES6', 'TypeScript', 'React.js v18', 'Vite', 'Tailwind CSS', 'Netlify'],
  },
  {
    id: 'interactive-board',
    title: 'Interactive Board',
    description: 'Pizarra interactiva con herramientas de dibujo y colaboración en tiempo real.',
    year: '2024',
    image: Project1,
    github: 'https://github.com/CarlosBournot/Pizarra_Interactiva',
    live: 'https://interactive-board.netlify.app/',
    stackDetails: ['HTML5', 'JavaScript', 'Netlify'],
  },
];

export default function Home() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen overflow-x-clip bg-navy text-snow">
        <ScrollProgress />
        <Navbar />
        <main>
          <HeroSection photo={profilePhoto} />
          <ProjectsSection projects={PROJECTS} />
          <StackSection />
          <AboutSection />
          <EducationSection />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </MotionConfig>
  );
}
