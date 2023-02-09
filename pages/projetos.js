import React from 'react';
import { useState } from 'react';

import { styled } from '@stitches/react';
import { AnimateSharedLayout } from 'framer-motion';
import { motion } from 'framer-motion';
import Head from 'next/head';

import FeaturedProject from '../components/FeaturedProject';
import {
  ContainerProject,
  FeaturedProjects,
} from '../components/FeaturedProjects';
import items from '../data/projects';
import Base, { GradientTitle } from '../layouts/Base';
import stripHtml from '../lib/strip-html';

import Intl from '../i18n';
import { ButtonTopPage } from '../components/ButtonTop';

export async function getStaticProps() {
  const meta = {
    title: 'Projetos | Alexander',
    tagline: Intl.text('PROJETOS_TITLE'),
    image: '#',
    primaryColor: 'cyan',
    secondaryColor: 'green',
  };

  return { props: meta };
}

function Projects(props) {
  const renderFeatured = () => {
    const featured = ['NV99 Badges', 'rastre.io', 'Pokédex', 'The Movies'];

    return items
      .map((item) =>
        item.projects.filter((project) => featured.includes(project.title)),
      )
      .filter((item) => {
        if (item.length > 0) {
          return item;
        }
      })
      .flat()
      .map((item, index) => <FeaturedProject key={index} project={item} />);
  };

  const pessoalProjects = () =>
    items.map((item) => (
      <>
        {item.company === 'Pessoal' && (
          <>
            {item.projects.map((project, pIndex) => (
              <>
                {project.title === '' ? (
                  <div key={pIndex} />
                ) : (
                  <Article href={project.url} target="_blank" key={pIndex}>
                    <Animation index={pIndex}>
                      <ImageContainer
                        css={{
                          backgroundImage: `url(${project.image})`,
                        }}
                      />
                      <Content>
                        <Title>{project.title}</Title>
                        <Description
                          dangerouslySetInnerHTML={{
                            __html: project.description,
                          }}
                        />
                      </Content>
                    </Animation>
                  </Article>
                )}
              </>
            ))}
          </>
        )}
      </>
    ));

  const mobileProjects = () =>
    items.map((item) => (
      <>
        {item.company === 'Mobile' && (
          <>
            {item.projects.map((project, pIndex) => (
              <>
                {project.title === '' ? (
                  <div key={pIndex} />
                ) : (
                  <Article href={project.url} target="_blank" key={pIndex}>
                    <Animation index={pIndex}>
                      <ImageContainer
                        css={{
                          backgroundImage: `url(${project.image})`,
                        }}
                      />
                      <Content>
                        <Title>{project.title}</Title>
                        <Description
                          dangerouslySetInnerHTML={{
                            __html: project.description,
                          }}
                        />
                      </Content>
                    </Animation>
                  </Article>
                )}
              </>
            ))}
          </>
        )}
      </>
    ));

  const rocketseatProjects = () =>
    items.map((item) => (
      <>
        {item.company === 'Rocketseat' && (
          <>
            {item.projects.map((project, pIndex) => (
              <>
                {project.title === '' ? (
                  <div key={pIndex} />
                ) : (
                  <Article href={project.url} target="_blank" key={pIndex}>
                    <h4></h4>
                    <Animation index={pIndex}>
                      <ImageContainer
                        css={{
                          backgroundImage: `url(${project.image})`,
                        }}
                      />
                      <Content>
                        <Title>{project.title}</Title>
                        <Description
                          dangerouslySetInnerHTML={{
                            __html: project.description,
                          }}
                        />
                      </Content>
                    </Animation>
                  </Article>
                )}
              </>
            ))}
          </>
        )}
      </>
    ));

  const IKProjects = () => {
    const featured = [
      'Petros',
      'Antecipa Fácil',
      'Faltas',
      'Imuniza',
      'Origem',
    ];

    return items
      .map((item) =>
        item.projects.filter((project) => featured.includes(project.title)),
      )
      .filter((item) => {
        if (item.length > 0) {
          return item;
        }
      })
      .flat()
      .map((item, index) => <FeaturedProject key={index} project={item} />);
  };

  const getTotalProjects = () => {
    let total = 0;

    for (let i = 0; i < items.length; i++) {
      total = total + items[i].projects.length;
    }

    return total;
  };

  const { title, image, tagline, primaryColor, secondaryColor } = props;
  const description = `${Intl.text(
    'PROJETOS_DESCRICAO_PT1',
  )} <strong>${getTotalProjects()}</strong> ${Intl.text(
    'PROJETOS_DESCRICAO_PT2',
  )}`;

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta content={title} property="og:title" />
        <meta content={stripHtml(description)} name="description" />
        <meta content={stripHtml(description)} property="og:description" />
        <meta
          content="https://ialexanderbrito.dev/projects"
          property="og:url"
        />
        <meta
          content={`https://ialexanderbrito.dev${image}`}
          property="og:image"
        />
      </Head>

      <GradientTitle
        css={{
          backgroundImage: `linear-gradient(
          135deg,
          $${primaryColor} 0%,
          $${secondaryColor} 100%
        );`,
        }}
      >
        {tagline
          ? Intl.text('PROJETOS_TITLE')
          : 'Trabalho, hobby & open source.'}
      </GradientTitle>

      <AnimateSharedLayout>
        <p dangerouslySetInnerHTML={{ __html: description }} />

        <h2>{Intl.text('PROJETO_TITLE_POPULAR')}</h2>
        <FeaturedProjects>{renderFeatured()}</FeaturedProjects>

        <h2>{Intl.text('PROJETO_TITLE_TODOS')}</h2>

        <h3>{Intl.text('PROJETO_TITLE_PESSOAL')}</h3>
        <ContainerProject>{pessoalProjects()}</ContainerProject>

        <h3>{Intl.text('PROJETO_TITLE_ROCKESEAT')}</h3>
        <ContainerProject>{rocketseatProjects()}</ContainerProject>

        <h3>{Intl.text('PROJETO_TITLE_MOBILE')}</h3>
        <ContainerProject>{mobileProjects()}</ContainerProject>

        <h3>{Intl.text('PROJETO_TITLE_IK')}</h3>
        <FeaturedProjects>{IKProjects()}</FeaturedProjects>

        <ButtonTopPage />
      </AnimateSharedLayout>
    </>
  );
}

const Article = styled('a', {
  border: '0',
  width: '330px',
  padding: '10px',
  textDecoration: 'none',
  '&:hover': { opacity: 1, filter: 'grayscale(0)' },
  '&:first-child': { marginLeft: 0 },
});

const ImageContainer = styled('div', {
  borderRadius: '8px',
  width: '330px',
  height: '180px',
  marginBottom: '20px',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center center',
});

const Content = styled('div', {
  maxWidth: '450px',
  marginRight: '20px',
  '@bp2': { maxWidth: '100%', marginRight: 0 },
});

const Title = styled('h3', {
  color: '$primary',
  margin: 0,
});

const Description = styled('p', {
  color: '$secondary',
  display: '-webkit-box',
  margin: 0,
  WebkitLineClamp: '2',
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
});

const AnimContainer = styled(motion.div, {
  position: 'relative',
  width: '100%',
  padding: '20px',
});

const AnimHovered = styled(motion.div, {
  position: 'absolute',
  top: '0',
  left: '0',
  right: '0',
  bottom: '0',
  background: '$hover',
  borderRadius: '$borderRadius',
  zIndex: -1,
});

function Animation(props) {
  const [hovered, setHovered] = useState('');
  const isHovered = hovered === props.index;

  return (
    <AnimContainer
      onHoverStart={() => setHovered(props.index)}
      onHoverEnd={() => setHovered('')}
      className="featured-article-anim"
    >
      {isHovered && (
        <AnimHovered
          layoutId="featuredArticles"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />
      )}

      {props.children}
    </AnimContainer>
  );
}

Projects.Layout = Base;

export default Projects;
