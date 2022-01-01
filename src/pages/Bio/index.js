import { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import {
  FaGithub,
  FaTwitch,
  FaLinkedinIn,
  FaTwitter,
  FaInstagram,
  FaDiscord,
} from 'react-icons/fa';

import profileImg from 'assets/images/profile.png';
import { useTwitch } from 'contexts/Twitch';

import './styles.scss';

export function Bio() {
  const { stream, getLiveOn } = useTwitch();

  useEffect(() => {
    getLiveOn();
  }, []);

  return (
    <>
      <Helmet>
        <title>Bio | Alexander - Front-end Developer</title>
      </Helmet>
      <body className="fadeIn">
        <div id="container-link">
          <img
            className="profile profile_links"
            src={profileImg}
            alt="Alexander"
          />

          <div className="links-container">
            <span className="description">
              Brota! <span className="waving-hand">🤙🏾</span>
            </span>

            {stream && (
              <a
                className="links link-live-on"
                href="https://www.twitch.tv/ialexanderbrito/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaTwitch className="logo" />
                Live ON
              </a>
            )}

            <a
              className="links link-github"
              href="https://github.com/ialexanderbrito"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub className="logo" />
              Github
            </a>
            <a
              className="links link-linkedin"
              href="https://www.linkedin.com/in/ialexanderbrito/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedinIn className="logo" />
              Linkedin
            </a>
            <a
              className="links link-twitter"
              href="https://twitter.com/ialexanderbrito"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter className="logo" />
              Twitter
            </a>
            <a
              className="links link-instagram"
              href="https://www.instagram.com/ialexanderbrito/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram className="logo" />
              Instagram
            </a>
            {!stream && (
              <a
                className="links link-twitch"
                href="https://www.twitch.tv/ialexanderbrito/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaTwitch className="logo" />
                Twitch
              </a>
            )}
            <a
              className="links link-discord"
              href="https://discordapp.com/users/348275303400996864/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaDiscord className="logo" />
              ialexanderbrito#3926
            </a>
          </div>

          <footer>
            <p>
              <a href="/" rel="noopener noreferrer">
                @ialexanderbrito
              </a>
            </p>
          </footer>
        </div>
      </body>
    </>
  );
}
