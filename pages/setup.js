import React from 'react'
import Head from 'next/head'
import Base from '../layouts/Base'
import stripHtml from '../lib/strip-html'
import categories from '../data/setup'

export async function getStaticProps() {
  const meta = {
    title: 'Setup | Alexander',
    description:
      "Sempre recebo muitas mensagens perguntando sobre meu setup e quais <strong>softwares e equipamentos utilizo em meu dia a dia</strong>. Então, resolvi listar tudo aqui em um só lugar. Conforme for atualizando meu setup, atualizarei a lista abaixo.",
    tagline: 'Equipamentos, apps e ferramentas.',
    image: '#',
    primaryColor: 'cyan',
    secondaryColor: 'green',
  }

  return { props: meta }
}

function Uses(props) {
  const { title, description, image } = props

  const renderAll = () => {
    return categories.map((category, index) => {
      return (
        <div key={index}>
          <h2>{category.name}</h2>
          <ul>
            {category.items.map((item, iIndex) => {
              return (
                <li key={iIndex}>
                  <a href={item.url} target="_blank">
                    {item.title}
                  </a>
                  <span
                    dangerouslySetInnerHTML={{ __html: item.description }}
                  />
                </li>
              )
            })}
          </ul>
        </div>
      )
    })
  }

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta content={title} property="og:title" />
        <meta content={stripHtml(description)} name="description" />
        <meta content={stripHtml(description)} property="og:description" />
        <meta content="https://ialexanderbrito.dev/setup" property="og:url" />
        <meta content={`https://ialexanderbrito.dev${image}`} property="og:image" />
      </Head>

      <p dangerouslySetInnerHTML={{ __html: description }} />

      {renderAll()}
    </>
  )
}

Uses.Layout = Base

export default Uses
