import React from 'react';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { BiMobileAlt, BiDesktop } from 'react-icons/bi';

import './styles.css';

export default function Home() {
  function handleInfo() {
    toast.success('🤙🏽 Abrindo seu app de email favorito!', {
      position: 'top-right',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }
  return (
    <>
      <Helmet>
        <title>Alexander</title>
      </Helmet>
      <body>
        <main className="l-main">
          <section className="home bd-grid" id="home">
            <div className="home__data">
              <h1 className="home__title">
                Oi, eu sou <span className="home__title-color">Alexander</span>
                <br />
                Desenvolvedor Front-end
                <br />
                <span className="home__description-color">
                  Web e Mobile · <BiDesktop size={16} color="#FFF" />{' '}
                  <BiMobileAlt size={16} color="#FFF" />{' '}
                </span>
              </h1>

              <div className="home__about">
                <span className="about__text">
                  Sou desenvolvedor front-end com foco em ReactJS e React
                  Native, atualmente moro no Rio de Janeiro e sou formado em
                  Sistemas de Informação pela Universidade Unigranrio. <br />
                  Tem alguns projetos desenvolvidos que podem ser visualizados
                  no meu{' '}
                  <a
                    href="https://github.com/ialexanderbrito"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Github
                  </a>{' '}
                  ou na aba <a href="/projects">Projetos</a>.
                </span>
              </div>
            </div>

            <div className="home__social">
              <a
                href="https://github.com/ialexanderbrito"
                target="_blank"
                rel="noopener noreferrer"
                className="home__social-icon"
              >
                <i className="bx bxl-github" />
              </a>
              <a
                href="https://www.linkedin.com/in/ialexanderbrito/"
                target="_blank"
                rel="noopener noreferrer"
                className="home__social-icon"
              >
                <i className="bx bxl-linkedin" />
              </a>
              <a
                href="https://twitter.com/ialexanderbrito"
                target="_blank"
                rel="noopener noreferrer"
                className="home__social-icon"
              >
                <i className="bx bxl-twitter" />
              </a>
              <a
                href="https://www.instagram.com/ialexanderbrito/"
                target="_blank"
                rel="noopener noreferrer"
                className="home__social-icon"
              >
                <i className="bx bxl-instagram" />
              </a>
            </div>

            <div className="home__links">
              <div>
                <Link className="link" to="/about">
                  <i className="bx bx-user logo" />
                  Sobre
                </Link>

                <Link className="link" to="/projects">
                  <i className="bx bx-rocket logo" />
                  Projetos
                </Link>

                <a
                  onClick={() => handleInfo()}
                  className="link"
                  href="mailto:ialexanderbrito@gmail.com"
                >
                  <i className="bx bx-mail-send logo" />
                  Contato
                </a>
              </div>
            </div>
          </section>
        </main>
      </body>
    </>
  );
}
