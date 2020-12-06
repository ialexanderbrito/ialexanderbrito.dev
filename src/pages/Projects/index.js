import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

import Portfolio from '../../components/Portfolio';

import './styles.css';

export default function Projects() {
  return (
    <>
      <Helmet>
        <title>Alexander · Projetos</title>
      </Helmet>
      <main className="l-main">
        <section className="work section" id="work">
          <div className="about__back">
            <Link to="/">
              <i className="bx bx-arrow-back" />
            </Link>
          </div>
          <h2 className="section-title">Projetos</h2>
          <Portfolio />
        </section>
      </main>
    </>
  );
}
