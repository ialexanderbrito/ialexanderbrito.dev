import { Helmet } from 'react-helmet';

import './styles.scss';

export function NotFound() {
  return (
    <>
      <Helmet>
        <title>Ops 404 | Alexander - Front-end Developer</title>
      </Helmet>
      <body>
        <div id="notfound">
          <div className="notfound">
            <div className="notfound-404">
              <h1>404</h1>
              <p>👀</p>
              <h4>não tem nada aqui!</h4>
            </div>
            <a href="/">Inicio</a>
          </div>
        </div>
      </body>
    </>
  );
}
