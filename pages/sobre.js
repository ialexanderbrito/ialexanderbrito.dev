import React from 'react';

import { parseISO, format, intervalToDuration } from 'date-fns';
import Head from 'next/head';
import Image from 'next/image';

import items from '../data/about';
import Base from '../layouts/Base';
import stripHtml from '../lib/strip-html';
import { styled } from '../stitches.config';

export async function getStaticProps() {
  const meta = {
    title: 'Sobre | Alexander',
    description:
      'Desenvolvedor front-end Web e Mobile, formado em Sistemas de Informação na Universidade Unigranrio. Atualmente trabalhando na IK Solution como desenvolvedor Front-end Jr e estudando UI Designer pelo curso uiBoost. Nas horas vagas gosto de desenvolver aplicações, clonar apps que já estão no mercado para aperfeiçoar meus estudos e também focando os estudos na parte UI/UX Design.',
    tagline: 'Sobre mim.',
    image: '/static/images/about-bw.jpg',
    primaryColor: 'cyan',
    secondaryColor: 'green',
  };

  return { props: meta };
}

function About(props) {
  const { title, description, image } = props;

  const renderIntro = () => (
    <Container>
      <Section>
        <Image
          alt="Alexander"
          src="/static/images/alexander.jpg"
          width="336"
          height="336"
          priority
        />
      </Section>
      <Section>
        <Paragraph
          css={{
            marginTop: '16px',
            '@bp2': { marginTop: '-6px' },
          }}
        >
          <strong>Oi, eu sou Alexander</strong>
          Desenvolvedor front-end Web e Mobile, formado em Sistemas de
          Informação na Universidade Unigranrio.
        </Paragraph>
        <Paragraph>
          Atualmente trabalhando na{' '}
          <strong>IK Solution como desenvolvedor Front-end Pleno</strong> e
          estudando UI Designer pelo curso <strong>uiBoost</strong>.
        </Paragraph>
        <Paragraph>
          Nas horas vagas gosto de desenvolver aplicações, clonar apps que já
          estão no mercado para aperfeiçoar meus estudos e também focando os
          estudos na parte UI/UX Design.
        </Paragraph>
      </Section>
    </Container>
  );

  const renderBio = () => (
    <div>
      <blockquote>
        <p>{description}</p>
      </blockquote>
    </div>
  );

  const renderAll = () =>
    items.map((item, index) => (
      <div style={{ marginBottom: 40 }} key={index}>
        <h3>{item.jobTitle}</h3>
        <p style={{ margin: 0 }}>
          <a href={item.companyUrl} target="_blank" rel="noreferrer">
            {item.company}
          </a>
          <span> • {item.location}</span>
        </p>
        <p style={{ margin: 0 }}>
          <span>{format(parseISO(item.startDate), 'LLL yyyy')}</span>
          <span> – </span>
          <span>
            {item.endDate
              ? format(parseISO(item.endDate), 'LLL yyyy')
              : 'Presente'}
          </span>
          <span> • </span>
          <span>{getDuration(item.startDate, item.endDate)}</span>
        </p>
      </div>
    ));

  const getDuration = (startDate, endDate) => {
    const durationObj = intervalToDuration({
      start: parseISO(startDate),
      end: endDate ? parseISO(endDate) : new Date(),
    });

    let durationStr = '';

    if (durationObj.years > 1) {
      durationStr = `${durationObj.years} anos `;
    } else if (durationObj.years === 1) {
      durationStr = `${durationObj.years} ano `;
    }

    if (durationObj.months > 1) {
      durationStr += `${durationObj.months} meses `;
    } else if (durationObj.months === 1) {
      durationStr += `${durationObj.months} mês `;
    }

    return durationStr;
  };

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta content={title} property="og:title" />
        <meta content={stripHtml(description)} name="description" />
        <meta content={stripHtml(description)} property="og:description" />
        <meta content="https://ialexanderbrito.dev/about" property="og:url" />
        <meta
          content={`https://ialexanderbrito.dev${image}`}
          property="og:image"
        />
      </Head>

      {renderIntro()}

      <h2>Bio</h2>
      {renderBio()}

      <h2>Carreira</h2>
      {renderAll()}
    </>
  );
}

const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  '@bp2': { flexDirection: 'row' },
});

const Paragraph = styled('p', {
  '@bp2': { margin: '15px 0' },
});

const Section = styled('div', {
  marginTop: '0px',
  width: 'auto',
  '@bp2': { width: '48%' },
});

About.Layout = Base;

export default About;
