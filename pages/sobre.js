import React from 'react';

import { parseISO, format, intervalToDuration } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import enUS from 'date-fns/locale/en-US';
import Head from 'next/head';
import Image from 'next/image';

import Intl from '../i18n';

import items from '../data/about';
import Base, { GradientTitle } from '../layouts/Base';
import stripHtml from '../lib/strip-html';
import { styled } from '../stitches.config';

import profileImage from '../public/static/images/alexander.jpg';

export async function getStaticProps() {
  const meta = {
    title: 'Sobre | Alexander',
    description: Intl.text('SOBRE_BIO'),
    tagline: Intl.text('SOBRE_TITLE'),
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
  const { title, description, image, tagline, primaryColor, secondaryColor } =
    props;

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
            {Intl.text('SOBRE_NOME')}
            {' '}
            {calculateAge(yearAnniversary)} {Intl.text('SOBRE_IDADE')}
          </strong>
          <br />
          {Intl.text('SOBRE_MIM')}
        </Paragraph>
        <Paragraph>
          {Intl.text('SOBRE_ATUALMENTE')}{' '}
          <strong>{Intl.text('SOBRE_LOCALIZA')}</strong>{' '}
          {Intl.text('SOBRE_COMO')} <strong>{Intl.text('SOBRE_CARGO')}</strong>{' '}
          {Intl.text('SOBRE_ESTUDOS')}{' '}
          <strong>{Intl.text('SOBRE_UIBOOST')}</strong>.
        </Paragraph>
        <Paragraph>
          {Intl.text('SOBRE_HORAS_VAGAS')} <strong>UI/UX Design</strong>.
        </Paragraph>
      </Section>
    </Container>
  );

  const renderBio = () => (
    <div>
      <blockquote>
        <p>{Intl.text('SOBRE_BIO')}</p>
      </blockquote>
    </div>
  );

  const pt = Intl.getLanguage() === 'pt-BR';

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
              locale: pt ? ptBR : enUS,
            })}
          </span>
          <span> – </span>
          <span>
            {item.endDate
              ? format(parseISO(item.endDate), 'MMMM yyyy', {
                  locale: pt ? ptBR : enUS,
                })
              : Intl.text('SOBRE_PRESENTE')}
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

    const pt = Intl.getLanguage() === 'pt-BR';
    const en = Intl.getLanguage() === 'en-US';

    if (pt) {
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
    }

    if (en) {
      if (durationObj.years > 1) {
        durationStr = `${durationObj.years} years `;
      } else if (durationObj.years === 1) {
        durationStr = `${durationObj.years} year `;
      }

      if (durationObj.months > 1) {
        durationStr += `${durationObj.months} months `;
      } else if (durationObj.months === 1) {
        durationStr += `${durationObj.months} month `;
      }

      return durationStr;
    }
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

      <GradientTitle
        css={{
          backgroundImage: `linear-gradient(
          135deg,
          $${primaryColor} 0%,
          $${secondaryColor} 100%
        );`,
        }}
      >
        {tagline ? Intl.text('SOBRE_TITLE') : 'Sobre mim'}
      </GradientTitle>

      {renderIntro()}

      <h2>Bio</h2>
      {renderBio()}

      <h2>{Intl.text('SOBRE_CARREIRA')}</h2>
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
