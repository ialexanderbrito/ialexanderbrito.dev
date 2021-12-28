import { BrowserRouter, Route, Routes as Switch } from 'react-router-dom';

import { About } from 'pages/About';
import { Bio } from 'pages/Bio';
import { Home } from 'pages/Home';
import { Live } from 'pages/Live';
import { NotFound } from 'pages/NotFound';
import { Projects } from 'pages/Projects';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact element={<Home />} />
        <Route path="/sobre" element={<About />} />
        <Route path="/projetos" element={<Projects />} />
        <Route path="/bio" element={<Bio />} />
        <Route path="/live" element={<Live />} />
        <Route path="*" element={<NotFound />} />
      </Switch>
    </BrowserRouter>
  );
}
