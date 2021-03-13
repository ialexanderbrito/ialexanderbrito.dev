import React from 'react';
import { Helmet } from 'react-helmet';

import './styles.css';

export default function Links() {
  return (
    <>
      <Helmet>
        <title>Alexander · Links</title>
      </Helmet>
      <body className="fadeIn">
        <div id="container_link">
          <a
            className="profile_links"
            href="https://github.com/ialexanderbrito.png"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              className="profile"
              src="https://github.com/ialexanderbrito.png"
              alt="Profile"
            />
          </a>

          <div className="links-container">
            <span className="description">
              Brota!{' '}
              <span role="img" aria-label="call-me-hand">
                🤙🏾
              </span>
            </span>

            <a
              className="links link-github"
              href="https://github.com/ialexanderbrito"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="bx bxl-github logo" />
              Github
            </a>
            <a
              className="links link-linkedin"
              href="https://www.linkedin.com/in/ialexanderbrito/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="bx bxl-linkedin logo" />
              Linkedin
            </a>
            <a
              className="links link-twitter"
              href="https://twitter.com/ialexanderbrito"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="bx bxl-twitter logo" />
              Twitter
            </a>
            <a
              className="links link-instagram"
              href="https://www.instagram.com/ialexanderbrito/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="bx bxl-instagram logo" />
              Instagram
            </a>
            <a
              className="links link-twitch"
              href="https://www.twitch.tv/ialexanderbrito/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="bx bxl-twitch logo" />
              Twitch
            </a>
            <a
              className="links link-discord"
              href="#"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="bx bxl-discord logo" />
              ialexanderbrito#3926
            </a>
            <a
              className="links link-gmail"
              href="mailto:ialexanderbrito@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="bx bx-mail-send logo" />
              Email
            </a>
          </div>

          <footer>
            <p>
              <a
                href="https://ialexanderbrito.com.br"
                target="_blank"
                rel="noopener noreferrer"
              >
                @ialexanderbrito
              </a>{' '}
              🤙🏾
            </p>
          </footer>
        </div>
      </body>
    </>
  );
}
