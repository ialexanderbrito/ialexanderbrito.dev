import { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import {
  FaTwitter,
  FaGithub,
  FaInstagram,
  FaLinkedinIn,
  FaTwitch,
  FaMobileAlt,
  FaDesktop,
} from 'react-icons/fa';
import { MdOutlineMail } from 'react-icons/md';
import { RiRocket2Line } from 'react-icons/ri';
import { SiAboutdotme } from 'react-icons/si';
import { Link } from 'react-router-dom';
import Typist from 'react-text-typist';
import { toast } from 'react-toastify';

import { tecnologias } from 'database/tecnologias';

import { SwitchTheme } from 'components/SwitchTheme';

import { useTheme } from 'contexts/Theme';
import { useTwitch } from 'contexts/Twitch';

import './styles.scss';

export function Home() {
  const { stream, getTwitch } = useTwitch();
  const { themeState } = useTheme();

  function handleInfo() {
    toast.success('Abrindo seu app de email favorito!', {
      position: 'top-right',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      icon: '🤙🏽',
      theme: 'dark',
    });
  }

  useEffect(() => {
    getTwitch();
  }, []);

  return (
    <>
      <Helmet>
        <title>Portfólio | Alexander - Front-end Developer</title>
      </Helmet>
      <main className="l-main">
        <section className="home bd-grid">
          <div className="home-data">
            <h1 className="home-title">
              Oi, eu sou <span className="home-title-color">Alexander</span>
              <br />
              <SwitchTheme />
              <Typist sentences={['Desenvolvedor Front-end']} loop={false} />
              <br />
              <div className="home-description">
                {themeState ? (
                  <>
                    <span className="home-description-color">
                      Web e Mobile · <FaDesktop size={16} color="#FFF" />{' '}
                      <FaMobileAlt size={16} color="#FFF" />{' '}
                    </span>
                  </>
                ) : (
                  <>
                    <span className="home-description-color">
                      Web e Mobile · <FaDesktop size={16} color="#000" />{' '}
                      <FaMobileAlt size={16} color="#000" />{' '}
                    </span>
                  </>
                )}
              </div>
            </h1>

            <div className="home-about">
              <span className="about-text">
                Atualmente trabalho com desenvolvimento de sistemas web e mobile
                utilizando tecnologias como React, NextJS, Material UI e React
                Native. Sou Front-end Pleno na IK Solution, atualmente moro no
                Rio de Janeiro, sou formado em Sistemas de Informação pela
                Universidade Unigranrio.
                <br />
                Alguns de meus projetos podem ser visualizados no meu{' '}
                <a
                  href="https://github.com/ialexanderbrito"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Github
                </a>{' '}
                ou na aba de <a href="/projetos">Projetos</a>
              </span>
            </div>
            <div className="home-tecnologies">
              {tecnologias.map((tecnologia) => (
                <a
                  className="tecnologies-link"
                  href={tecnologia.uri}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {tecnologia.image}
                </a>
              ))}
            </div>
          </div>

          <div className="home-social">
            <div className="icons">
              <a
                href="https://github.com/ialexanderbrito"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Github"
              >
                {themeState ? (
                  <FaGithub size={24} color="#FFF" />
                ) : (
                  <FaGithub size={24} color="#000" />
                )}
              </a>
            </div>
            <div className="icons">
              <a
                href="https://www.linkedin.com/in/ialexanderbrito/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Linkedin"
              >
                {themeState ? (
                  <FaLinkedinIn size={24} color="#FFF" />
                ) : (
                  <FaLinkedinIn size={24} color="#000" />
                )}
              </a>
            </div>
            <div className="icons">
              <a
                href="https://twitter.com/ialexanderbrito"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
              >
                {themeState ? (
                  <FaTwitter size={24} color="#fff" />
                ) : (
                  <FaTwitter size={24} color="#000" />
                )}
              </a>
            </div>
            <div className="icons">
              <a
                href="https://www.instagram.com/ialexanderbrito/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                {themeState ? (
                  <FaInstagram size={24} color="#fff" />
                ) : (
                  <FaInstagram size={24} color="#000" />
                )}
              </a>
            </div>
            {stream && (
              <div className="icons-twitch">
                <a
                  href={`https://www.twitch.tv/${stream?.channel?.name}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Twitch"
                >
                  {themeState ? (
                    <FaTwitch size={24} color="#fff" />
                  ) : (
                    <FaTwitch size={24} color="#000" />
                  )}
                </a>
              </div>
            )}
          </div>

          <div className="home-links">
            <Link className="link" to="/sobre">
              <SiAboutdotme className="logo" />
              Sobre
            </Link>

            <Link className="link" to="/projetos">
              <RiRocket2Line className="logo" />
              Projetos
            </Link>

            <a
              onClick={() => handleInfo()}
              className="link"
              href="mailto:ialexanderbrito@gmail.com?subject=Vamos%20trabalhar%20juntos!"
            >
              <MdOutlineMail className="logo" />
              Contato
            </a>
          </div>
        </section>
      </main>
    </>
  );
}
