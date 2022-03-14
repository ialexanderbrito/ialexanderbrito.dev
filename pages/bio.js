import React from 'react'
import Head from 'next/head'
import { AnimateSharedLayout } from 'framer-motion'
import Base from '../layouts/Base'
import stripHtml from '../lib/strip-html'
import items from '../data/social'
import Social, { SocialDiv } from '../components/Social'

export async function getStaticProps() {
  const meta = {
    title: 'Bio | Alexander',
    tagline: 'Links.',
    image: '#',
    primaryColor: 'cyan',
    secondaryColor: 'green',
  }

  return { props: meta }
}

function Projects(props) {
  const renderFeatured = () => {
    const featured = ['Github',
      'Twitter',
      'LinkedIn',
      'Instagram',
      'Discord',
      'Twitch',
    ]

    return items
      .map(item => {
        return item.social.filter(project => featured.includes(project.title))
      })
      .filter(item => {
        if (item.length > 0) {
          return item
        }
      })
      .flat()
      .map((item, index) => {
        return <Social key={index} project={item} />
      })
  }

  const { title, image } = props
  const description = `Brota.`

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta content={title} property="og:title" />
        <meta content={stripHtml(description)} name="description" />
        <meta content={stripHtml(description)} property="og:description" />
        <meta content="https://ialexanderbrito.dev/projects" property="og:url" />
        <meta content={`https://ialexanderbrito.dev${image}`} property="og:image" />
      </Head>

      <AnimateSharedLayout>
        <p dangerouslySetInnerHTML={{ __html: description }} />

        <SocialDiv>{renderFeatured()}</SocialDiv>
      </AnimateSharedLayout>
    </>
  )
}

Projects.Layout = Base

export default Projects
