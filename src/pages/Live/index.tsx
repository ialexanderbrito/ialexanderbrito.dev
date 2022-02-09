import { useEffect } from 'react';
import { Helmet } from 'react-helmet';

export function Live() {
  function handleLive() {
    window.location.href = 'https://www.twitch.tv/ialexanderbrito';
  }

  useEffect(() => {
    handleLive();
  }, []);

  return (
    <>
      <Helmet>
        <title>Live</title>
      </Helmet>
      <body />
    </>
  );
}
