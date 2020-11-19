import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

import './styles.css';

export default function About() {
  return (
    <>
      <Helmet>
        <title>Alexander · Sobre</title>
      </Helmet>
      <body>
        <main className="l-main">
          <section className="about section" id="about">
            <div className="about__back">
              <Link to="/">
                <i className="bx bx-arrow-back" />
              </Link>
            </div>
            <h2 className="section-title">Sobre</h2>

            <div className="about__container bd-grid">
              <div className="about__img">
                <img
                  src="https://github.com/ialexanderbrito.png"
                  alt="Alexander"
                />
              </div>

              <div className="about__container">
                <div className="about__containersubtitle">
                  <h2 className="about__subtitle">Eu sou Alexander</h2>
                </div>
                <p className="about__text">
                  Desenvolvedor front-end Web e Mobile, atualmente faço Sistemas
                  de Informação na Universidade Unigranrio, estou cursando o 8º
                  período. Nas horas vagas gosto de desenvolver aplicações e
                  clonar apps que já estão no mercado para aperfeiçoar meus
                  estudos.
                </p>
              </div>
            </div>
          </section>
        </main>
      </body>
    </>
  );
}
