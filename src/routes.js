import { Route, Routes } from 'react-router-dom';

import { About } from 'pages/About';
import { Bio } from 'pages/Bio';
import { Home } from 'pages/Home';
import { Live } from 'pages/Live';
import { NotFound } from 'pages/NotFound';
import { Projects } from 'pages/Projects';

export function MainRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/sobre" element={<About />} />
      <Route path="/projetos" element={<Projects />} />
      <Route path="/bio" element={<Bio />} />
      <Route path="/live" element={<Live />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
