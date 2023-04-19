import { useState } from 'react';

import Intl from '../i18n';

import { motion, AnimateSharedLayout } from 'framer-motion';
import { useKBar } from 'kbar';
import Link from 'next/link';
import { useRouter } from 'next/router';

import brasilFlag from '../public/static/images/flags/brasil.png';
import euaFlag from '../public/static/images/flags/usa.png';

import { styled } from '../stitches.config';
import Image from 'next/image';

export default function Navbar() {
  const router = useRouter();
  const pages = [
    Intl.text('MENU_SOBRE'),
    Intl.text('MENU_PROJETOS'),
    Intl.text('MENU_SETUP'),
  ];
  const links = ['/sobre', '/projetos', '/setup'];
  const [hovered, setHovered] = useState('');
  const { query } = useKBar();

  return (
    <AnimateSharedLayout>
      <Header>
        <Link href="/" passHref>
          <ButtonLogo
            as="a"
            style={{
              background: `linear-gradient(
              135deg,
              var(--colors-cyan) 0%,
              var(--colors-green) 100%
            )`,
              'background-size': '100',
              '-webkit-background-clip': 'text',
              '-moz-background-clip': 'text',
              '-webkit-text-fill-color': 'transparent',
              '-moz-text-fill-color': 'transparent',
            }}
          >
            ab
          </ButtonLogo>
        </Link>

        <Nav>
          <List>
            {pages.map((page) => {
              const isHovered = hovered === links[pages.indexOf(page)];

              return (
                <li key={page}>
                  <Link href={links[pages.indexOf(page)]} passHref>
                    <Anchor>
                      <NavContainer
                        onHoverStart={() => setHovered(page)}
                        onHoverEnd={() => setHovered('')}
                        css={
                          router.pathname == links[pages.indexOf(page)]
                            ? {
                                color: '$primary',
                                '&::after': { opacity: 1 },
                              }
                            : ''
                        }
                      >
                        {isHovered && (
                          <NavHovered
                            layoutId="nav"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                          />
                        )}
                        {page}
                      </NavContainer>
                    </Anchor>
                  </Link>
                </li>
              );
            })}
          </List>
        </Nav>

        <Aside>
          <ButtonHeader
            as="button"
            type="button"
            aria-label="Command"
            onClick={query.toggle}
            css={{ padding: '0 8px' }}
          >
            <Icon className="ri-command-line" />
          </ButtonHeader>

          {Intl.getLanguage() === 'pt-BR' ? (
            <ButtonHeader
              style={{
                display: 'flex',
                alignItems: 'center',
              }}
              as="button"
              type="button"
              aria-label="English"
              onClick={() => Intl.setLanguage('en-US')}
            >
              <Image src={euaFlag} alt="EUA" width={24} height={24} />
            </ButtonHeader>
          ) : (
            <ButtonHeader
              style={{
                display: 'flex',
                alignItems: 'center',
              }}
              as="button"
              type="button"
              aria-label="Português"
              onClick={() => Intl.setLanguage('pt-BR')}
            >
              <Image src={brasilFlag} alt="Brasil" width={24} height={24} />
            </ButtonHeader>
          )}
        </Aside>
      </Header>
    </AnimateSharedLayout>
  );
}

const Header = styled('header', {
  display: 'flex',
  alignItems: 'center',
  color: 'white',
  fontSize: '12px',
  minHeight: '59px',
  width: '100%',
  flexWrap: 'wrap',
  position: 'fixed',
  top: '0',
  zIndex: 3,
  backdropFilter: 'saturate(180%) blur(5px)',
  marginTop: '13px',
  '@bp2': { marginTop: '0' },
});

const List = styled('ul', {
  margin: '0',
  padding: '0',
  listStyle: 'none',
  display: 'inline-flex',
  position: 'relative',
  top: '5px',
  '@bp1': { justifyContent: 'space-around' },
});

const ButtonHeader = styled('div', {
  appearance: 'none',
  background: 'transparent',
  border: 'none',
  borderRadius: '$borderRadius',
  color: 'white',
  cursor: 'pointer',
  cursor: 'pointer',
  height: '34px',
  padding: '0 10px',
  transition: 'background $duration ease-in-out',
  '&:hover': { background: '$hover' },
});

const Icon = styled('i', {
  fontSize: '24px',
  lineHeight: '32px',
});

const ButtonLogo = styled(ButtonHeader, {
  fontWeight: 700,
  fontSize: '32px',
  textDecoration: 'none',
  marginLeft: '12px',
  fontFamily: '$heading',
});

const Nav = styled('nav', {
  textAlign: 'center',
  flex: 1,
  order: 2,
  flexBasis: '100%',
  '@bp2': { order: 0, flexBasis: 'initial' },
});

const Aside = styled('div', {
  display: 'flex',
  alignItems: 'center',
  paddingRight: '12px',
  marginLeft: 'auto',
});

const Anchor = styled('a', {
  border: 0,
  position: 'relative',
  '&:hover, &:focus': { opacity: 1 },
});

const NavContainer = styled(motion.span, {
  color: '$secondary',
  cursor: 'pointer',
  display: 'inline-block',
  fontSize: '12px',
  fontWeight: 500,
  letterSpacing: '1.2px',
  padding: '20px',
  textDecoration: 'none',
  textTransform: 'uppercase',
  transition: 'color $duration ease-in-out',
  '&:hover': {
    color: '$primary',
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    margin: '0px auto',
    top: '18px',
    left: '0px',
    right: '0px',
    height: '1px',
    width: '20px',
    background: 'rgb(255, 255, 255)',
    opacity: 0,
    transition: 'opacity $duration ease-in-out',
  },
});

const NavHovered = styled(motion.span, {
  position: 'absolute',
  top: '-15px',
  left: '0',
  right: '0',
  background: '$hover',
  padding: 20,
  borderRadius: '$borderRadius',
  zIndex: -1,
});
