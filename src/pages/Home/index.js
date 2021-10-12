import { Helmet } from 'react-helmet';
import { BiMobileAlt, BiDesktop } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import { tecnologias } from './tecnologias';

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
              <div className="home__tecnologies">
                {tecnologias.map((tecnologia) => (
                  <a
                    className="tecnologies__link"
                    href={tecnologia.uri}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src={tecnologia.image}
                      alt={tecnologia.name}
                      className="tecnologies__icons"
                    />
                  </a>
                ))}
              </div>
            </div>

            <div className="home__social">
              <div className="icons">
                <a
                  href="https://github.com/ialexanderbrito"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Github"
                >
                  <i className="bx bxl-github" style={{ fontSize: '24px' }} />
                </a>
              </div>
              <div className="icons">
                <a
                  href="https://www.linkedin.com/in/ialexanderbrito/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Linkedin"
                >
                  <i className="bx bxl-linkedin" style={{ fontSize: '24px' }} />
                </a>
              </div>
              <div className="icons">
                <a
                  href="https://twitter.com/ialexanderbrito"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Twitter"
                >
                  <i className="bx bxl-twitter" style={{ fontSize: '24px' }} />
                </a>
              </div>
              <div className="icons">
                <a
                  href="https://www.instagram.com/ialexanderbrito/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                >
                  <i className="bx bxl-instagram" style={{ fontSize: '24px' }} />
                </a>
              </div>
            </div>

            <div className="home__links">
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
          </section>
        </main>
      </body>
    </>
  );
}
