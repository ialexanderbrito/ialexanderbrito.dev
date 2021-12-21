import { Helmet } from 'react-helmet';

import './styles.css';

export default function NotFound() {
  return (
    <>
      <Helmet>
        <title>Error!</title>
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
