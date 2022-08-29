import React from 'react';

import ScrollContainer from 'react-indiana-drag-scroll';

import { Link } from 'react-scroll';

import Head from 'next/head';

import { styled } from '@stitches/react';

import categories from '../data/setup';
import Base from '../layouts/Base';
import stripHtml from '../lib/strip-html';
import { ButtonTopPage } from '../components/ButtonTop';

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
  const { title, description, image } = props;

  const renderAll = () =>
    categories.map((category, index) => (
      <div key={index}>
        <h2 id={category.name}>{category.name}</h2>
        <ul>
          {category.items.map((item, iIndex) => (
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
          <Title style={{fontSize: '16px'}}>
            <Text to={`${category.name}`} spy={true} smooth={true} offset={1} duration={500}>{category.name}</Text>
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

      <p dangerouslySetInnerHTML={{ __html: description }} />

      <ScrollContainerMenu>
        <Menu>{renderMenu()}</Menu>
      </ScrollContainerMenu>

      <ButtonTopPage />

      {renderAll()}
    </>
  );
}

const Items = styled('a', {
  borderBottom: 'none',
})

const Menu = styled('div', {
  display: 'flex',
  gap: '1rem',
  maxWidth: '10rem',
});

const ScrollContainerMenu = styled(ScrollContainer, {
  width: '100%'
})

const Text = styled(Link, {
  color: '#FFF',
  textDecoration: 'none',
  borderBottom: 'none',
  fontWeight: 'bold',
  width: '8rem',
  cursor: 'pointer',
});

const SubMenu = styled('div', {});

const Title = styled('h2', {
  margin: '20px 0',
});

Uses.Layout = Base;

export default Uses;
