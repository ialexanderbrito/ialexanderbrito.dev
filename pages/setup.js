import React from 'react';

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
              <a href={item.url} target="_blank" rel="noreferrer">
                {item.title}
              </a>
              <span dangerouslySetInnerHTML={{ __html: item.description }} />
            </li>
          ))}
        </ul>
      </div>
    ));

    const renderMenu = () =>
      categories.map((category, index) => (
        <SubMenu key={index}>
          <Text  href={`#${category.name}`} >{category.name}</Text>
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

      <Menu>{renderMenu()}</Menu>

      <ButtonTopPage />

      {renderAll()}
    </>
  );
}

const Menu = styled('ul', {
  display: 'flex',
  justifyContent: 'space-around',
  listStyle: 'none',
  margin: 0,
  padding: 0,
});

const Text = styled('a', {
  color: '#FFF',
  textDecoration: 'none',
  borderBottom: 'none',
  fontWeight: 'bold',
});

const SubMenu = styled('li', {
  display: 'flex',
  flexDirection: 'column',
  marginBottom: '1rem',
  scrollBehavior: 'smooth',
});

Uses.Layout = Base;

export default Uses;
