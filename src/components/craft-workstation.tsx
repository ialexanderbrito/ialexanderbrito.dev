'use client';

import * as React from 'react';

import { CraftAboutView } from '@/components/craft-about-view';
import { CraftHomeView } from '@/components/craft-home-view';
import { CraftProjectsList } from '@/components/craft-projects-list';
import { About } from '@/interfaces/about';
import { Experience } from '@/interfaces/experience';
import { Project } from '@/interfaces/project';
import { AnimatePresence, motion } from 'framer-motion';
import { usePathname, useRouter } from 'next/navigation';

export type WorkstationTab = 'home' | 'projects' | 'about';

interface CraftWorkstationProps {
  initialTab?: WorkstationTab;
  projects: Project[];
  about?: About;
  experiences: Experience[];
}

export function CraftWorkstation({
  initialTab = 'home',
  projects,
  about,
  experiences,
}: CraftWorkstationProps) {
  const [activeTab, setActiveTab] = React.useState<WorkstationTab>(initialTab);
  const pathname = usePathname();
  const router = useRouter();

  // Synchronize route if accessed via /about, /projects, /craft, or /
  React.useEffect(() => {
    if (pathname === '/about') {
      setActiveTab('about');
    } else if (pathname === '/projects' || pathname === '/craft') {
      setActiveTab('projects');
    } else if (pathname === '/') {
      setActiveTab('home');
    }
  }, [pathname]);

  // Handle Tab Switch & update URL without full reload
  const handleSelectTab = (tab: WorkstationTab) => {
    setActiveTab(tab);
    const targetPath =
      tab === 'projects' ? '/projects' : tab === 'about' ? '/about' : '/';
    if (pathname !== targetPath) {
      router.push(targetPath);
    }
  };

  // Keyboard Shortcuts (1 for home, 2 for projects, 3 for about)
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if typing inside input or textarea
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      if (e.key === '1') {
        e.preventDefault();
        handleSelectTab('home');
      } else if (e.key === '2') {
        e.preventDefault();
        handleSelectTab('about');
      } else if (e.key === '3') {
        e.preventDefault();
        handleSelectTab('projects');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="flex-1 flex flex-col w-full">
      {/* Main Dynamic Viewport */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 w-full flex-1 flex flex-col">
        <AnimatePresence mode="wait">
          {activeTab === 'home' && (
            <motion.div
              key="home"
              className="flex-1 flex flex-col justify-center py-2 sm:py-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{
                duration: 0.2,
                ease: [0.23, 1, 0.32, 1],
              }}
            >
              <CraftHomeView onNavigateTab={handleSelectTab} />
            </motion.div>
          )}

          {activeTab === 'projects' && (
            <motion.div
              key="projects"
              className="py-4 sm:py-8"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{
                duration: 0.2,
                ease: [0.23, 1, 0.32, 1],
              }}
            >
              <CraftProjectsList projects={projects} />
            </motion.div>
          )}

          {activeTab === 'about' && (
            <motion.div
              key="about"
              className="py-4 sm:py-8"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{
                duration: 0.2,
                ease: [0.23, 1, 0.32, 1],
              }}
            >
              <CraftAboutView about={about} experiences={experiences} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
