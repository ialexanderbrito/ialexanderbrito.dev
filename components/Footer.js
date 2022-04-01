import { styled } from '../stitches.config';

export default function Footer() {
  const links = [
    {
      title: 'Instagram',
      url: 'https://instagram.com/ialexanderbrito',
      icon: 'ri-instagram-line',
      color: '#e1306c',
    },
    {
      title: 'Twitter',
      url: 'https://twitter.com/ialexanderbrito',
      icon: 'ri-twitter-line',
      color: '#00ACEE',
    },
    {
      title: 'GitHub',
      url: 'https://github.com/ialexanderbrito',
      icon: 'ri-github-line',
      color: '#777',
    },
    {
      title: 'linkedin',
      url: 'https://linkedin.com/in/ialexanderbrito',
      icon: 'ri-linkedin-line',
      color: '#0077b5',
    },
    {
      title: 'twitch',
      url: 'https://twitch.com/ialexanderbrito',
      icon: 'ri-twitch-line',
      color: '#9146ff',
    },
    {
      title: 'discord',
      url: 'https://discord.com/users/348275303400996864/',
      icon: 'ri-discord-line',
      color: '#7289da',
    },
    {
      title: 'Source',
      url: 'https://github.com/ialexanderbrito/ialexanderbrito.dev',
      icon: 'ri-braces-line',
      color: '#f1f1f1',
    },
  ];

  return (
    <Container>
      {links.map((link, index) => (
        <Anchor
          key={index}
          href={link.url}
          target="_blank"
          css={{
            '&:hover': {
              color: link.color,
              'i::before': {
                color: link.color,
              },
            },
          }}
        >
          <Title>{link.title}</Title>
          <Icon className={link.icon} />
        </Anchor>
      ))}
    </Container>
  );
}

const Container = styled('footer', {
  background: '$background',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '20px 0',
  zIndex: '1',
});

const Icon = styled('i', {
  color: '$primary',
  opacity: 1,
  marginLeft: '5px',
  marginTop: '1px',
  fontSize: '24px',
  '@bp2': { opacity: 0, fontSize: '16px' },
});

const Anchor = styled('a', {
  color: '$secondary',
  display: 'flex',
  fontSize: '15px',
  border: 0,
  marginLeft: '20px',
  textDecoration: 'none',
  textTransform: 'lowercase',
  transition: 'color $duration ease-in-out',
  '&:hover, &:focus': {
    color: '$primary',
    opacity: 1,
  },
  [`&:hover ${Icon}`]: {
    transition: 'opacity $duration ease-in-out',
    opacity: 1,
  },
  '&:first-child': { margin: '0' },
});

const Title = styled('span', {
  display: 'none',
  '@bp2': { display: 'block' },
});
