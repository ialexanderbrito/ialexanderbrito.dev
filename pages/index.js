import Head from 'next/head';

import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { PostMain, PostContent, PostContainer } from '../components/Post';
import ShortcutHome from '../components/ShortcutHome';
import { Wrapper } from '../components/Wrapper';
import { styled } from '../stitches.config';

export async function getStaticProps() {
  return {
    props: {
      title: 'Alexander de Brito',
      name: 'Alexander',
      description: 'Desenvolvedor Front-end Web e Mobile',
      image: '/static/images/home-bw.jpg',
      primaryColor: 'cyan',
      secondaryColor: 'green',
    },
  };
}

export default function Index(props) {
  const { title, name, description, image, primaryColor, secondaryColor } =
    props;

  return (
    <Wrapper>
      <Head>
        <title>{name}</title>
        <meta content={name} property="og:title" />
        <meta content={description} name="description" />
        <meta content={description} property="og:description" />
        <meta content="https://ialexanderbrito.dev" property="og:url" />
        <meta
          content={`https://ialexanderbrito.dev${image}`}
          property="og:image"
        />
      </Head>

      <Navbar />
      <Home>
        <PostContent>
          <PostContainer>
            <div>
              <GradientTitle
                css={{
                  backgroundImage: `linear-gradient(
                  135deg,
                  $${primaryColor} 0%,
                  $${secondaryColor} 100%
                );`,
                }}
              >
                <h1>{title}</h1>
              </GradientTitle>
              <p>
                <strong>Front-end Developer | Localiza</strong>.<br />
                {description}.
              </p>
              <ShortcutHome />
            </div>
          </PostContainer>
        </PostContent>
      </Home>
      <Footer />
    </Wrapper>
  );
}

const Home = styled(PostMain, {
  alignItems: 'center',
  display: 'flex',
  margin: '0 auto',
  '@bp2': { width: 800 },
});

const GradientTitle = styled('h1', {
  backgroundSize: '100%',
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  MozBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  MozTextFillColor: 'transparent',
  WebkitBoxDecorationBreak: 'clone',
});
