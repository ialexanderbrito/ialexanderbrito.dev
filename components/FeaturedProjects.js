import { styled } from '../stitches.config';

export const FeaturedProjects = styled('div', {
  margin: '10px 0 0 -20px',
  display: 'flex',
  flexDirection: 'column',
  '@bp2': { flexDirection: 'row' },
});

export const ContainerProject = styled('div', {
  '@bp2': {
    display: 'grid',
    flexDirection: 'column',
    gridTemplateColumns: 'repeat(2, 1fr)',
  },
});
