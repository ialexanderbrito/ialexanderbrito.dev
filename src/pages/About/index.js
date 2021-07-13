import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { BiTrophy, BiMedal } from 'react-icons/bi';

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
                  Desenvolvedor front-end Web e Mobile, formado em Sistemas de
                  Informação na Universidade Unigranrio. Atualmente trabalhando
                  na{' '}
                  <span className="home__description-color"> IK Solution</span>{' '}
                  como desenvolvedor Front-end Jr e estudando UI Designer pelo{' '}
                  <span className="home__description-color">curso uiBoost</span>
                  . Nas horas vagas gosto de desenvolver aplicações, clonar apps
                  que já estão no mercado para aperfeiçoar meus estudos e também
                  focando os estudos na parte UI/UX Design.
                </p>
                <br />
                <h2 className="section-title">Premiação</h2>

                <span className="about__text">
                  <BiMedal size={16} color="#FFF" /> · Ouro MOBFOG - Foguete
                  Virtual - 2020
                  <br />
                  <BiTrophy size={16} color="#FFF" /> · 5º Lugar IoT Talks
                  Unigranrio - 2019
                  <br />
                  <BiTrophy size={16} color="#FFF" /> · 2º Lugar Hackathon
                  Unigranrio - 2018
                </span>
              </div>
            </div>
          </section>
        </main>
      </body>
    </>
  );
}
