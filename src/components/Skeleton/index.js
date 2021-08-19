// import ContentLoader from 'react-content-loader';

import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

import { portfolio } from 'components/Portfolio/portfolio';

import './styles.css';

export default function SkeletonComponent() {
  return (
    <>
      <div id="filters" className="filters">
        <a href="#">
          <SkeletonTheme color="#212325" highlightColor="#1D2021">
            <Skeleton width={60} />
          </SkeletonTheme>
        </a>
        <a href="#">
          <SkeletonTheme color="#212325" highlightColor="#1D2021">
            <Skeleton width={60} />
          </SkeletonTheme>
        </a>
        <a href="#">
          <SkeletonTheme color="#212325" highlightColor="#1D2021">
            <Skeleton width={60} />
          </SkeletonTheme>
        </a>
        <a href="#">
          <SkeletonTheme color="#212325" highlightColor="#1D2021">
            <Skeleton width={60} />
          </SkeletonTheme>
        </a>
      </div>
      <div className="work__container bd-grid">
        <>
          {portfolio.map((item) => (
            <>
              <div className="work__img" key={item}>
                <SkeletonTheme color="#212325" highlightColor="#1D2021">
                  <Skeleton width={320} height={216} />
                </SkeletonTheme>
                <p />

                <h3 className="work__text">
                  <SkeletonTheme color="#212325" highlightColor="#1D2021">
                    <Skeleton width={320} />
                  </SkeletonTheme>
                </h3>
                <div className="work__description_links">
                  <a
                    href="https://github.com/ialexanderbrito/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <h4 className="work__description-skeleton">
                      <SkeletonTheme color="#212325" highlightColor="#1D2021">
                        <Skeleton width={150} />
                      </SkeletonTheme>
                    </h4>
                  </a>
                  <>
                    <h4 className="work__description-skeleton"> | </h4>
                    <a href="#" target="_blank" rel="noopener noreferrer">
                      <h4 className="work__description-skeleton">
                        <SkeletonTheme color="#212325" highlightColor="#1D2021">
                          <Skeleton width={150} />
                        </SkeletonTheme>
                      </h4>
                    </a>
                  </>
                </div>
              </div>
            </>
          ))}
        </>
      </div>
    </>
  );
}
