import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
// import Skeleton from 'react-loading-skeleton';
import { Link } from 'react-router-dom';

import Portfolio from 'components/Portfolio';
import Skeleton from 'components/Skeleton';

import './styles.css';

export default function Projects() {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 800);
  }, []);

  return (
    <>
      <Helmet>
        <title>Alexander · Projetos</title>
      </Helmet>
      {loading ? (
        <>
          <main className="l-main">
            <section className="work section" id="work">
              <div className="about__back">
                <Link to="/">
                  <i className="bx bx-arrow-back" />
                </Link>
              </div>
              <h2 className="section-title">Projetos</h2>
              <Skeleton />
            </section>
          </main>
        </>
      ) : (
        <>
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
      )}
    </>
  );
}
