import React, { useState } from 'react';

import ScrollContainer from 'react-indiana-drag-scroll';

import { Link } from 'react-scroll';

import Head from 'next/head';

import { styled } from '@stitches/react';

import categories from '../data/setup';
import Base, { GradientTitle } from '../layouts/Base';
import stripHtml from '../lib/strip-html';
import { ButtonTopPage } from '../components/ButtonTop';

import Intl from '../i18n';

export async function getStaticProps() {
  const meta = {
    title: 'Setup | Alexander',
    description:
      'Sempre recebo muitas mensagens perguntando sobre meu setup e quais <strong>softwares e equipamentos utilizo em meu dia a dia</strong>. Então, resolvi listar tudo aqui em um só lugar. Conforme for atualizando meu setup, atualizarei a lista abaixo.',
    tagline: 'Equipamentos, apps e ferramentas.',
    image: '#',
    primaryColor: 'cyan',
    secondaryColor: 'green',
  };

  return { props: meta };
}

function Uses(props) {
  const { title, description, image, primaryColor, secondaryColor, tagline } =
    props;

  const [searchTerm, setSearchTerm] = useState('');

  const renderAll = () =>
    categories.map((category, index) => (
      <div key={index}>
        <h2 id={category.name}>{category.name}</h2>
        <ul>
          {category.items
            .filter((item) =>
              item.title.toLowerCase().includes(searchTerm.toLowerCase()),
            )
            .map((item, iIndex) => (
              <li key={iIndex}>
                <Items href={item.url} target="_blank" rel="noreferrer">
                  {item.title}
                </Items>
                <span dangerouslySetInnerHTML={{ __html: item.description }} />
              </li>
            ))}
        </ul>
      </div>
    ));

  const renderMenu = () =>
    categories.map((category, index) => (
      <SubMenu key={index}>
        <Title style={{ fontSize: '16px' }}>
          <Text
            to={`${category.name}`}
            spy={true}
            smooth={true}
            offset={1}
            duration={500}
          >
            {category.name}
          </Text>
        </Title>
      </SubMenu>
    ));

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta content={title} property="og:title" />
        <meta content={stripHtml(description)} name="description" />
        <meta content={stripHtml(description)} property="og:description" />
        <meta content="https://ialexanderbrito.dev/setup" property="og:url" />
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
          ? Intl.text('SETUP_TITLE')
          : 'Equipamentos, apps e ferramentas.'}
      </GradientTitle>

      <p>{Intl.text('SETUP_DESCRIPTION')}</p>

      <ScrollContainerMenu>
        <Menu>{renderMenu()}</Menu>
      </ScrollContainerMenu>

      <Form>
        <Label>{Intl.text('SETUP_LABEL')} 👇🏾</Label>
        <ContainerInput>
          <Input
            type="text"
            placeholder={Intl.text('SETUP_PLACEHOLDER')}
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
        </ContainerInput>
      </Form>

      <ButtonTopPage />

      {renderAll()}
    </>
  );
}

const Items = styled('a', {
  borderBottom: 'none',
});

const Menu = styled('div', {
  display: 'flex',
  gap: '1rem',
  maxWidth: '10rem',
});

const ScrollContainerMenu = styled(ScrollContainer, {
  width: '100%',
});

const Text = styled(Link, {
  color: '#FFF',
  textDecoration: 'none',
  borderBottom: 'none',
  fontWeight: 'bold',
  width: '8rem',
  cursor: 'pointer',
  '&:hover': {
    backgroundImage: 'linear-gradient(135deg, #80ffea 0%, #8aff80 100%)',
    backgroundClip: 'text',
    backgroundSize: '100%',
    '-webkit-text-fill-color': 'transparent',
    '-webkit-box-decoration-break': 'clone',
  },
});

const SubMenu = styled('div', {});

const Title = styled('h2', {
  margin: '20px 0',
});

const Form = styled('form', {
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
});

const ContainerInput = styled('div', {
  width: '100%',
  display: 'flex',
  marginBottom: '10px',
  gap: '2rem',
});

const Label = styled('label', {
  textTransform: 'uppercase',
  fontSize: '12px',
  fontWeight: '500',
  color: '$primary',
});

const Input = styled('input', {
  width: '100%',
  color: '$primary',
  background: 'none',
  border: '1px solid $primary',
  borderRadius: '8px',
  padding: '10px',
  fontSize: '16px',

  '&:focus': {
    outline: 'none',
    border: '1px solid $cyan',
  },
});

Uses.Layout = Base;

export default Uses;
