import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import {
  SiTypescript,
  SiReact,
  SiNodeDotJs,
  SiExpo,
  SiJavascript,
  SiHtml5,
  SiCss3,
} from 'react-icons/si';

import hospitalscore from '../../assets/images/hospitalscore.png';
import covid19 from '../../assets/images/covid19.png';
import picpay from '../../assets/images/picpay.png';
import product from '../../assets/images/product.png';
import aircnc from '../../assets/images/aircnc.png';
import devradar from '../../assets/images/devradar.png';
import bethehero from '../../assets/images/be-the-hero.png';
import ecoleta from '../../assets/images/ecoleta.png';
import proffy from '../../assets/images/proffy.png';
import happy from '../../assets/images/happy.png';
import marvel from '../../assets/images/marvel.png';
import twitch from '../../assets/images/twitch.png';
import finances from '../../assets/images/finances.png';
import menuria from '../../assets/images/menuria.png';

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
          <div className="work__container bd-grid">
            <div className="work__img">
              <img src={menuria} alt="Projeto" />
              <p />

              <h3 className="work__text">Menuria</h3>
              <a
                href="https://github.com/ialexanderbrito/menuria"
                target="_blank"
                rel="noopener noreferrer"
              >
                <h4 className="work__description">
                  Visitar o projeto
                  <i className="bx bx-link-external space" />
                </h4>
              </a>
              <h4 className="work__description">
                <SiExpo size={18} alt="Expo" />
                <SiReact
                  size={18}
                  style={{ marginLeft: 6 }}
                  alt="React Native"
                />
                <SiTypescript
                  size={18}
                  style={{ marginLeft: 6 }}
                  alt="Typescript"
                />
                <SiNodeDotJs
                  size={18}
                  style={{ marginLeft: 6 }}
                  alt="Node.js"
                />
              </h4>
            </div>

            <div className="work__img">
              <img src={finances} alt="Projeto" />
              <p />
              <h3 className="work__text">Finanças App</h3>
              <a
                href="https://github.com/ialexanderbrito/finances"
                target="_blank"
                rel="noopener noreferrer"
              >
                <h4 className="work__description">
                  Visitar o projeto
                  <i className="bx bx-link-external space" />
                </h4>
              </a>
              <h4 className="work__description">
                <SiExpo size={18} alt="Expo" />
                <SiReact
                  size={18}
                  style={{ marginLeft: 6 }}
                  alt="React Native"
                />
                <SiTypescript
                  size={18}
                  style={{ marginLeft: 6 }}
                  alt="Typescript"
                />
              </h4>
            </div>

            <div className="work__img">
              <img src={twitch} alt="Projeto" />
              <p />
              <h3 className="work__text">Twitch · Clone</h3>
              <a
                href="https://github.com/ialexanderbrito/twitch-clone"
                target="_blank"
                rel="noopener noreferrer"
              >
                <h4 className="work__description">
                  Visitar o projeto
                  <i className="bx bx-link-external space" />
                </h4>
              </a>
              <h4 className="work__description">
                <SiExpo size={18} alt="Expo" />
                <SiReact
                  size={18}
                  style={{ marginLeft: 6 }}
                  alt="React Native"
                />
                <SiTypescript
                  size={18}
                  style={{ marginLeft: 6 }}
                  alt="Typescript"
                />
              </h4>
            </div>

            <div className="work__img">
              <img src={marvel} alt="Projeto" />
              <p />
              <h3 className="work__text">Marvel App</h3>
              <a
                href="https://github.com/ialexanderbrito/marvel-app"
                target="_blank"
                rel="noopener noreferrer"
              >
                <h4 className="work__description">
                  Visitar o projeto
                  <i className="bx bx-link-external space" />
                </h4>
              </a>
              <h4 className="work__description">
                <SiExpo size={18} alt="Expo" />
                <SiReact
                  size={18}
                  style={{ marginLeft: 6 }}
                  alt="React Native"
                />
                <SiTypescript
                  size={18}
                  style={{ marginLeft: 6 }}
                  alt="Typescript"
                />
              </h4>
            </div>

            <div className="work__img">
              <img src={happy} alt="Projeto" />
              <p />
              <h3 className="work__text">Happy · NLW#3</h3>
              <a
                href="https://github.com/ialexanderbrito/happy"
                target="_blank"
                rel="noopener noreferrer"
              >
                <h4 className="work__description">
                  Visitar o projeto
                  <i className="bx bx-link-external space" />
                </h4>
              </a>
              <h4 className="work__description">
                <SiExpo size={18} alt="Expo" />
                <SiReact
                  size={18}
                  style={{ marginLeft: 6 }}
                  alt="React Native"
                />
                <SiTypescript
                  size={18}
                  style={{ marginLeft: 6 }}
                  alt="Typescript"
                />
                <SiNodeDotJs
                  size={18}
                  style={{ marginLeft: 6 }}
                  alt="Node.js"
                />
              </h4>
            </div>

            <div className="work__img">
              <img src={proffy} alt="Projeto" />
              <p />
              <h3 className="work__text">Proffy · NLW#2</h3>
              <a
                href="https://github.com/ialexanderbrito/proffy"
                target="_blank"
                rel="noopener noreferrer"
              >
                <h4 className="work__description">
                  Visitar o projeto
                  <i className="bx bx-link-external space" />
                </h4>
              </a>
              <h4 className="work__description">
                <SiExpo size={18} alt="Expo" />
                <SiReact
                  size={18}
                  style={{ marginLeft: 6 }}
                  alt="React Native"
                />
                <SiTypescript
                  size={18}
                  style={{ marginLeft: 6 }}
                  alt="Typescript"
                />
                <SiNodeDotJs
                  size={18}
                  style={{ marginLeft: 6 }}
                  alt="Node.js"
                />
              </h4>
            </div>

            <div className="work__img">
              <img src={ecoleta} alt="Projeto" />
              <p />
              <h3 className="work__text">Ecoleta · NLW#1</h3>
              <a
                href="https://github.com/ialexanderbrito/ecoleta"
                target="_blank"
                rel="noopener noreferrer"
              >
                <h4 className="work__description">
                  Visitar o projeto
                  <i className="bx bx-link-external space" />
                </h4>
              </a>
              <h4 className="work__description">
                <SiExpo size={18} alt="Expo" />
                <SiReact
                  size={18}
                  style={{ marginLeft: 6 }}
                  alt="React Native"
                />
                <SiTypescript
                  size={18}
                  style={{ marginLeft: 6 }}
                  alt="Typescript"
                />
                <SiNodeDotJs
                  size={18}
                  style={{ marginLeft: 6 }}
                  alt="Node.js"
                />
              </h4>
            </div>

            <div className="work__img">
              <img src={hospitalscore} alt="Projeto" />
              <p />
              <h3 className="work__text">Hospital Score</h3>
              <a
                href="https://github.com/ialexanderbrito/hospital-score"
                target="_blank"
                rel="noopener noreferrer"
              >
                <h4 className="work__description">
                  Visitar o projeto
                  <i className="bx bx-link-external space" />
                  <i className="bx bx-code-alt space" />
                </h4>
              </a>
              <h4 className="work__description">
                <SiExpo size={18} alt="Expo" />
                <SiJavascript
                  size={18}
                  style={{ marginLeft: 6 }}
                  alt="Javascript"
                />
                <SiNodeDotJs
                  size={18}
                  style={{ marginLeft: 6 }}
                  alt="Node.js"
                />
              </h4>
            </div>

            <div className="work__img">
              <img src={covid19} alt="Projeto" />
              <p />
              <h3 className="work__text">Covid-19 App</h3>
              <a
                href="https://github.com/ialexanderbrito/covid19-app"
                target="_blank"
                rel="noopener noreferrer"
              >
                <h4 className="work__description">
                  Visitar o projeto <i className="bx bx-link-external space" />
                </h4>
              </a>
              <h4 className="work__description">
                <SiExpo size={18} alt="Expo" />
                <SiJavascript
                  size={18}
                  style={{ marginLeft: 6 }}
                  alt="Javascript"
                />
              </h4>
            </div>

            <div className="work__img">
              <img src={picpay} alt="Projeto" />
              <p />
              <h3 className="work__text">PicPay · Clone</h3>
              <a
                href="https://github.com/ialexanderbrito/picpay-clone"
                target="_blank"
                rel="noopener noreferrer"
              >
                <h4 className="work__description">
                  Visitar o projeto
                  <i className="bx bx-link-external space" />
                </h4>
              </a>
              <h4 className="work__description">
                <SiExpo size={18} alt="Expo" />
                <SiJavascript
                  size={18}
                  style={{ marginLeft: 6 }}
                  alt="Javascript"
                />
              </h4>
            </div>

            <div className="work__img">
              <img src={product} alt="Projeto" />
              <p />
              <h3 className="work__text">Carrinho de Loja</h3>
              <a
                href="https://github.com/ialexanderbrito/product"
                target="_blank"
                rel="noopener noreferrer"
              >
                <h4 className="work__description">
                  Visitar o projeto
                  <i className="bx bx-link-external space" />
                </h4>
              </a>
              <h4 className="work__description">
                <SiHtml5 size={18} alt="HTML" />
                <SiCss3 size={18} style={{ marginLeft: 6 }} alt="CSS" />
              </h4>
            </div>

            <div className="work__img">
              <img src={bethehero} alt="Projeto" />
              <p />
              <h3 className="work__text">Be The Hero · OmniStack#11</h3>
              <a
                href="https://github.com/ialexanderbrito/be-the-hero"
                target="_blank"
                rel="noopener noreferrer"
              >
                <h4 className="work__description">
                  Visitar o projeto
                  <i className="bx bx-link-external space" />
                </h4>
              </a>
              <h4 className="work__description">
                <SiExpo size={18} alt="Expo" />
                <SiReact
                  size={18}
                  style={{ marginLeft: 6 }}
                  alt="React Native"
                />
                <SiJavascript
                  size={18}
                  style={{ marginLeft: 6 }}
                  alt="Typescript"
                />
                <SiNodeDotJs
                  size={18}
                  style={{ marginLeft: 6 }}
                  alt="Node.js"
                />
              </h4>
            </div>

            <div className="work__img">
              <img src={devradar} alt="Projeto" />
              <p />
              <h3 className="work__text">DevRadar · OmniStack#10</h3>
              <a
                href="https://github.com/ialexanderbrito/dev-radar"
                target="_blank"
                rel="noopener noreferrer"
              >
                <h4 className="work__description">
                  Visitar o projeto
                  <i className="bx bx-link-external space" />
                </h4>
              </a>
              <h4 className="work__description">
                <SiExpo size={18} alt="Expo" />
                <SiReact
                  size={18}
                  style={{ marginLeft: 6 }}
                  alt="React Native"
                />
                <SiJavascript
                  size={18}
                  style={{ marginLeft: 6 }}
                  alt="Typescript"
                />
                <SiNodeDotJs
                  size={18}
                  style={{ marginLeft: 6 }}
                  alt="Node.js"
                />
              </h4>
            </div>

            <div className="work__img">
              <img src={aircnc} alt="Projeto" />
              <p />
              <h3 className="work__text">Aircnc · OmniStack#9</h3>
              <a
                href="https://github.com/ialexanderbrito/aircnc"
                target="_blank"
                rel="noopener noreferrer"
              >
                <h4 className="work__description">
                  Visitar o projeto
                  <i className="bx bx-link-external space" />
                </h4>
              </a>
              <h4 className="work__description">
                <SiExpo size={18} alt="Expo" />
                <SiReact
                  size={18}
                  style={{ marginLeft: 6 }}
                  alt="React Native"
                />
                <SiJavascript
                  size={18}
                  style={{ marginLeft: 6 }}
                  alt="Typescript"
                />
                <SiNodeDotJs
                  size={18}
                  style={{ marginLeft: 6 }}
                  alt="Node.js"
                />
              </h4>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
