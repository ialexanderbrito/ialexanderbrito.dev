import { Helmet } from 'react-helmet';
import { IoArrowBackOutline } from 'react-icons/io5';
import { RiMedalLine, RiTrophyLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';

import profileImg from 'assets/images/profile.png';

import './styles.scss';

export function About() {
  return (
    <>
      <Helmet>
        <title>Sobre | Alexander - Front-end Developer</title>
      </Helmet>
      <main className="l-main">
        <section className="about section" id="about">
          <div className="about-back">
            <Link to="/">
              <IoArrowBackOutline color="#3F8C6A" />
            </Link>
          </div>
          <h2 className="section-title">Sobre</h2>

          <div className="about-container bd-grid">
            <div className="about-img">
              <img src={profileImg} alt="Alexander" />
            </div>

            <div className="about-container">
              <div className="about-container-subtitle">
                <h2 className="about-subtitle">Eu sou Alexander</h2>
              </div>
              <p className="about-text">
                Desenvolvedor front-end Web e Mobile, formado em Sistemas de
                Informação na Universidade Unigranrio. Atualmente trabalhando na{' '}
                <span className="home-description-color"> IK Solution</span>{' '}
                como desenvolvedor Front-end Jr e estudando UI Designer pelo{' '}
                <span className="home-description-color">curso uiBoost</span>.
                Nas horas vagas gosto de desenvolver aplicações, clonar apps que
                já estão no mercado para aperfeiçoar meus estudos e também
                focando os estudos na parte UI/UX Design.
              </p>
              <br />
              <h2 className="section-title">Premiação</h2>

              <span className="about-text">
                <div className="about-titles">
                  <RiMedalLine size={16} className="about-titles-icon" /> Ouro
                  MOBFOG - Foguete Virtual - 2020
                </div>
                <div className="about-titles">
                  <RiTrophyLine size={16} className="about-titles-icon" /> 5º
                  Lugar IoT Talks Unigranrio - 2019
                </div>
                <div className="about-titles">
                  <RiTrophyLine size={16} className="about-titles-icon" /> 2º
                  Lugar Hackathon Unigranrio - 2018
                </div>
              </span>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
