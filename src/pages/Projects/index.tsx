import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { IoArrowBackOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';

import { Portfolio } from 'components/Portfolio';
import { SkeletonComponent } from 'components/Skeleton';

export function Projects() {
  const [loading, setLoading] = useState(false);

  const delay = 800;

  useEffect(() => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, delay);
  }, []);

  return (
    <>
      <Helmet>
        <title>Projetos | Alexander - Front-end Developer</title>
      </Helmet>
      {loading ? (
        <main className="l-main">
          <section className="work section" id="work">
            <div className="about-back">
              <Link to="/">
                <IoArrowBackOutline color="#3F8C6A" />
              </Link>
            </div>
            <h2 className="section-title">Projetos</h2>
            <SkeletonComponent />
          </section>
        </main>
      ) : (
        <main className="l-main">
          <section className="work section" id="work">
            <div className="about-back">
              <Link to="/">
                <IoArrowBackOutline color="#3F8C6A" />
              </Link>
            </div>
            <h2 className="section-title">Projetos</h2>
            <Portfolio />
          </section>
        </main>
      )}
    </>
  );
}
