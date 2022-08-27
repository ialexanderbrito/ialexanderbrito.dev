import { useEffect, useState } from 'react';

import { styled } from '@stitches/react';

import ArrowUpIcon from './ArrowUpIcon';

export function ButtonTopPage() {
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY >= 400 && !isActive) {
        setIsActive(true);
      }

      if (window.scrollY <= 400 && isActive) {
        setIsActive(false);
      }
    });
  }, [isActive]);

  function handleScrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }

  return (
    <>
      {isActive && (
        <Button
          onClick={() => {
            handleScrollToTop();
          }}
        >
          <ArrowUpIcon />
        </Button>
      )}
    </>
  );
}

const Button = styled('div', {
  right: '60px',
  bottom: '60px',
  zIndex: '1001',
  display: 'flex',
  width: '40px',
  height: '40px',
  cursor: 'pointer',
  position: 'fixed',
  textAlign: 'center',
  borderradius: '10px',
  alignItems: 'center',
  justifyContent: 'center',

  '&:hover': {
    filter: 'brightness(0.8)',
    transition: '0.4s',
  },
});
