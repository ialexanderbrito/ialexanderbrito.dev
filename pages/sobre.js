import React from 'react';

import { parseISO, format, intervalToDuration } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import Head from 'next/head';
import Image from 'next/image';

import items from '../data/about';
import Base from '../layouts/Base';
import stripHtml from '../lib/strip-html';
import { styled } from '../stitches.config';

import profileImage from '../public/static/images/alexander.jpg';

export async function getStaticProps() {
  const meta = {
    title: 'Sobre | Alexander',
    description:
      'Me chamo Alexander, desenvolvedor front-end e flamenguista! Nas redes sociais conhecido como @ialexanderbrito',
    tagline: 'Sobre mim.',
    image: '/static/images/alexander.jpg',
    primaryColor: 'cyan',
    secondaryColor: 'green',
  };

  return { props: meta };
}

const yearAnniversary = new Date('1997-03-31 00:00:00');

function calculateAge(birthday) {
  const ageDifMs = Date.now() - birthday.getTime();
  const ageDate = new Date(ageDifMs);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
}

function About(props) {
  const { title, description, image } = props;

  const renderIntro = () => (
    <Container>
      <Section>
        <Image
          alt="Alexander"
          src={profileImage}
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
          <strong>
            Oi, eu sou Alexander e tenho {calculateAge(yearAnniversary)} anos.
          </strong>
          <br />
          Sou Desenvolvedor front-end Web e Mobile, formado em Sistemas de
          Informação na Universidade Unigranrio .
        </Paragraph>
        <Paragraph>
          Atualmente trabalhando na <strong>Localiza</strong> como{' '}
          <strong>desenvolvedor Front-end Pleno</strong> e estudando UI Designer
          pelo curso <strong>uiBoost</strong>.
        </Paragraph>
        <Paragraph>
          Nas horas vagas gosto de desenvolver aplicações e clonar apps que já
          estão no mercado para aperfeiçoar meus estudos e também focando os
          estudos na parte <strong>UI/UX Design</strong>.
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
          <span>
            {format(parseISO(item.startDate), 'MMMM yyyy', {
              locale: ptBR,
            })}
          </span>
          <span> – </span>
          <span>
            {item.endDate
              ? format(parseISO(item.endDate), 'MMMM yyyy', {
                  locale: ptBR,
                })
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
