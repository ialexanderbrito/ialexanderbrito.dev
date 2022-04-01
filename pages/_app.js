import '../public/static/css/prism.css';
import 'remixicon/fonts/remixicon.css';

import Router from 'next/router';

import CommandBar from '../components/CommandBar';
import * as gtag from '../lib/gtag';

Router.events.on('routeChangeComplete', (url) => gtag.pageview(url));

const Noop = ({ children }) => children;

export default function MyApp({ Component, pageProps }) {
  const Layout = Component.Layout || Noop;

  return (
    <CommandBar>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </CommandBar>
  );
}
