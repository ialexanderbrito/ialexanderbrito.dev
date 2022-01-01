import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

import { portfolio } from 'database/portfolio';

import './styles.scss';

export function SkeletonComponent() {
  return (
    <>
      <div id="filters" className="filters">
        <a href="#">
          <SkeletonTheme baseColor="#212325" highlightColor="#1D2021">
            <Skeleton width={60} />
          </SkeletonTheme>
        </a>
        <a href="#">
          <SkeletonTheme baseColor="#212325" highlightColor="#1D2021">
            <Skeleton width={60} />
          </SkeletonTheme>
        </a>
        <a href="#">
          <SkeletonTheme baseColor="#212325" highlightColor="#1D2021">
            <Skeleton width={60} />
          </SkeletonTheme>
        </a>
        <a href="#">
          <SkeletonTheme baseColor="#212325" highlightColor="#1D2021">
            <Skeleton width={60} />
          </SkeletonTheme>
        </a>
      </div>
      <div className="legend bd-grid">
        <SkeletonTheme baseColor="#212325" highlightColor="#1D2021">
          <Skeleton width={120} />
        </SkeletonTheme>
        <SkeletonTheme baseColor="#212325" highlightColor="#1D2021">
          <Skeleton width={650} />
        </SkeletonTheme>
        <SkeletonTheme baseColor="#212325" highlightColor="#1D2021">
          <Skeleton width={300} />
        </SkeletonTheme>
        <SkeletonTheme baseColor="#212325" highlightColor="#1D2021">
          <Skeleton width={180} />
        </SkeletonTheme>
      </div>
      <div className="work-container bd-grid">
        {portfolio.map((item) => (
          <>
            <div className="work-img" key={item}>
              <SkeletonTheme baseColor="#212325" highlightColor="#1D2021">
                <Skeleton width={320} height={216} />
              </SkeletonTheme>
              <p />

              <h3 className="work-text">
                <SkeletonTheme baseColor="#212325" highlightColor="#1D2021">
                  <Skeleton width={320} />
                </SkeletonTheme>
              </h3>
              <div className="work-description-links">
                <a
                  href="https://github.com/ialexanderbrito/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <h4 className="work-description-skeleton">
                    <SkeletonTheme baseColor="#212325" highlightColor="#1D2021">
                      <Skeleton width={150} />
                    </SkeletonTheme>
                  </h4>
                </a>
                <h4 className="work-description-skeleton"> | </h4>
                <a href="#" target="_blank" rel="noopener noreferrer">
                  <h4 className="work-description-skeleton">
                    <SkeletonTheme baseColor="#212325" highlightColor="#1D2021">
                      <Skeleton width={150} />
                    </SkeletonTheme>
                  </h4>
                </a>
              </div>
            </div>
          </>
        ))}
      </div>
    </>
  );
}
