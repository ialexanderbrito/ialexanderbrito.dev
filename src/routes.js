import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import About from 'pages/About';
import Bio from 'pages/Bio';
import Home from 'pages/Home';
import NotFound from 'pages/NotFound';
import Projects from 'pages/Projects';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/about" component={About} />
        <Route path="/projects" component={Projects} />
        <Route path="/bio" component={Bio} />
        <Route path="*" component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
}
