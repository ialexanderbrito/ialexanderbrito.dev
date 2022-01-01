import { useState, useEffect } from 'react';
import { FaCode, FaLock, FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { Slide } from 'react-slideshow-image';

import { portfolio } from 'database/portfolio';

import './styles.scss';

export function Portfolio() {
  const [filter, setFilter] = useState('all');
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    setProjects(portfolio);
  }, []);

  useEffect(() => {
    setProjects([]);
    const filtered = portfolio.map((p) => ({
      ...p,
      filtered: p.category.includes(filter),
    }));
    setProjects(filtered);
  }, [filter]);

  return (
    <>
      <div id="filters" className="filters">
        <a href="#" active={filter === 'all'} onClick={() => setFilter('all')}>
          Tudo
        </a>
        <a
          href="#"
          active={filter === 'frontend'}
          onClick={() => setFilter('frontend')}
        >
          Front-end
        </a>
        <a
          href="#"
          active={filter === 'mobile'}
          onClick={() => setFilter('mobile')}
        >
          Mobile
        </a>
        <a
          href="#"
          active={filter === 'ux-ui'}
          onClick={() => setFilter('ux-ui')}
        >
          UX/UI
        </a>
      </div>
      <div className="legend bd-grid">
        <h4 className="legeng-text">
          <FaLock className="space" />
          Projetos privados.
        </h4>
        <h4 className="legeng-text">
          <FaCode className="space" />
          Projetos desenvolvidos por mim dentro da empresa, ou que eu tenha
          participado de alguma forma.
        </h4>
        <h4 className="legeng-text">
          <FaGithub className="space" />
          Repositórios públicos para acesso aos projetos.
        </h4>
        <h4 className="legeng-text">
          <FaExternalLinkAlt className="space" />
          Links para acesso aos projetos.
        </h4>
      </div>
      <div className="work-container bd-grid">
        {projects.map((item) =>
          item.filtered === true ? (
            <div className="work-img">
              {item.image.length > 1 ? (
                <Slide autoplay={false}>
                  {item.image.map((img) => (
                    <img src={img} alt="Texto" />
                  ))}
                </Slide>
              ) : (
                <img src={item.image} alt="Texto" />
              )}
              <p />

              <h3 className="work-text">{item.name}</h3>
              {item.uri === '#' ? (
                <div className="work-description-links">
                  <h4 className="work-description">
                    <FaLock className="space" />
                    {item.empresa}
                  </h4>
                  <h4 className="work-description"> | </h4>

                  <h4 className="work-description">
                    IK Solution
                    <FaCode className="space" />
                  </h4>
                </div>
              ) : (
                <div className="work-description-links">
                  <a
                    href={`https://github.com/ialexanderbrito/${item.uri}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <h4 className="work-description">
                      <FaGithub className="space" />
                      Visitar o projeto
                    </h4>
                  </a>
                  {item.deploy && (
                    <>
                      <h4 className="work-description"> | </h4>
                      <a
                        href={`${item.deploy}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <h4 className="work-description">
                          Deploy
                          <FaExternalLinkAlt className="space" />
                        </h4>
                      </a>
                    </>
                  )}
                </div>
              )}
              <h4 className="work-description">
                <div className="tag-container">
                  <div classsName="projects-tag">
                    {item.item1 ? (
                      <div className="projects-tag">{item.item1}</div>
                    ) : (
                      <div className="projects-tagnull" />
                    )}
                  </div>

                  <div classsName="projects-tag">
                    {item.item2 ? (
                      <div className="projects-tag">{item.item2}</div>
                    ) : (
                      <div className="projects-tagnull" />
                    )}
                  </div>

                  <div classsName="projects-tag">
                    {item.item3 ? (
                      <div className="projects-tag">{item.item3}</div>
                    ) : (
                      <div className="projects-tagnull" />
                    )}
                  </div>

                  <div classsName="projects-tag">
                    {item.item4 ? (
                      <div className="projects-tag">{item.item4}</div>
                    ) : (
                      <div className="projects-tagnull" />
                    )}
                  </div>

                  <div classsName="projects-tag">
                    {item.item5 ? (
                      <div className="projects-tag">{item.item5}</div>
                    ) : (
                      <div className="projects-tagnull" />
                    )}
                  </div>
                </div>
              </h4>
            </div>
          ) : (
            ''
          )
        )}
      </div>
    </>
  );
}
