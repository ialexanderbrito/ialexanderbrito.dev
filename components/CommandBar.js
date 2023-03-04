import { styled } from '../stitches.config';
import { Box } from './Box';
import Toast from './Toast';
import { useRef, useState, forwardRef } from 'react';
import { useRouter } from 'next/router';
import {
  KBarAnimator,
  KBarProvider,
  KBarPortal,
  useDeepMatches,
  KBarPositioner,
  KBarSearch,
  KBarResults,
} from 'kbar';
import Lottie from 'lottie-react';
import copyLinkIcon from '../public/static/icons/copy-link.json';
import emailIcon from '../public/static/icons/email.json';
import aboutIcon from '../public/static/icons/about.json';
import homeIcon from '../public/static/icons/home.json';
import projectsIcon from '../public/static/icons/projects.json';
import usesIcon from '../public/static/icons/uses.json';

import Intl from '../i18n';

export default function CommandBar(props) {
  const copyLinkRef = useRef();
  const emailRef = useRef();
  const homeRef = useRef();
  const aboutRef = useRef();
  const projectsRef = useRef();
  const usesRef = useRef();

  const router = useRouter();

  const [showToast, setShowToast] = useState(false);

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setShowToast(true);
  };

  const iconSize = { width: 24, height: 24 };

  const actions = [
    {
      id: 'copy',
      name: Intl.text('COMMAND_COPIARURL'),
      shortcut: ['u'],
      keywords: 'copy-link',
      section: Intl.text('COMMAND_GERAL'),
      perform: copyLink,
      icon: (
        <Lottie
          lottieRef={copyLinkRef}
          style={iconSize}
          animationData={copyLinkIcon}
          loop={false}
          autoplay={false}
        />
      ),
    },
    {
      id: 'email',
      name: Intl.text('COMMAND_ENVIAREMAIL'),
      shortcut: ['e'],
      keywords: 'send-email',
      section: Intl.text('COMMAND_GERAL'),
      perform: () => window.open('mailto:eu@ialexanderbrito.dev', '_blank'),
      icon: (
        <Lottie
          lottieRef={emailRef}
          style={iconSize}
          animationData={emailIcon}
          loop={false}
          autoplay={false}
        />
      ),
    },
    {
      id: 'home',
      name: Intl.text('COMMAND_HOME'),
      shortcut: ['g', 'h'],
      keywords: 'go-home',
      section: Intl.text('COMMAND_IRPARA'),
      perform: () => router.push('/'),
      icon: (
        <Lottie
          lottieRef={homeRef}
          style={iconSize}
          animationData={homeIcon}
          loop={false}
          autoplay={false}
        />
      ),
    },
    {
      id: 'about',
      name: Intl.text('COMMAND_SOBRE'),
      shortcut: ['g', 'a'],
      keywords: 'go-about',
      section: Intl.text('COMMAND_IRPARA'),
      perform: () => router.push('/sobre'),
      icon: (
        <Lottie
          lottieRef={aboutRef}
          style={iconSize}
          animationData={aboutIcon}
          loop={false}
          autoplay={false}
        />
      ),
    },
    {
      id: 'projects',
      name: Intl.text('COMMAND_PROJETOS'),
      shortcut: ['g', 'p'],
      keywords: 'go-projects',
      section: Intl.text('COMMAND_IRPARA'),
      perform: () => router.push('/projetos'),
      icon: (
        <Lottie
          lottieRef={projectsRef}
          style={iconSize}
          animationData={projectsIcon}
          loop={false}
          autoplay={false}
        />
      ),
    },
    {
      id: 'uses',
      name: Intl.text('COMMAND_SETUP'),
      shortcut: ['g', 's'],
      keywords: 'go-uses',
      section: Intl.text('COMMAND_IRPARA'),
      perform: () => router.push('/setup'),
      icon: (
        <Lottie
          lottieRef={usesRef}
          style={iconSize}
          animationData={usesIcon}
          loop={false}
          autoplay={false}
        />
      ),
    },
  ];

  return (
    <>
      <KBarProvider actions={actions}>
        <KBarPortal>
          <Positioner>
            <Animator>
              <Search placeholder={Intl.text('COMMAND_PLACEHOLDER')} />
              <RenderResults />
            </Animator>
          </Positioner>
        </KBarPortal>

        {props.children}
      </KBarProvider>

      <Toast
        title={`${Intl.text('COMMAND_TOAST_TITLE')} 😀`}
        description={Intl.text('COMMAND_TOAST_DESCRIPTION')}
        isSuccess={true}
        showToast={showToast}
        setShowToast={setShowToast}
      />
    </>
  );
}

function RenderResults() {
  const { results } = useDeepMatches();

  return (
    <KBarResults
      items={results}
      onRender={({ item, active }) =>
        typeof item === 'string' ? (
          <GroupName>{item}</GroupName>
        ) : (
          <ResultItem action={item} active={active} />
        )
      }
    />
  );
}

const ResultItem = forwardRef(({ action, active }, ref) => {
  if (active) {
    action.icon.props.lottieRef.current?.play();
  } else {
    action.icon.props.lottieRef.current?.stop();
  }

  return (
    <Box
      ref={ref}
      css={getResultStyle(active)}
      onMouseEnter={() => action.icon.props.lottieRef.current?.play()}
      onMouseLeave={() => action.icon.props.lottieRef.current?.stop()}
    >
      <Action>
        {action.icon && action.icon}
        <ActionRow>
          <span>{action.name}</span>
        </ActionRow>
      </Action>
      {action.shortcut?.length ? (
        <Shortcut aria-hidden>
          {action.shortcut.map((shortcut) => (
            <Kbd key={shortcut}>{shortcut}</Kbd>
          ))}
        </Shortcut>
      ) : null}
    </Box>
  );
});

ResultItem.displayName = 'ResultItem';

const Positioner = styled(KBarPositioner, {
  position: 'fixed',
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'center',
  width: '100%',
  inset: '0px',
  padding: '14vh 16px 16px',
  background: 'rgba(0, 0, 0, .8)',
  boxSizing: 'border-box',
});

const Search = styled(KBarSearch, {
  padding: '12px 16px',
  fontSize: '16px',
  width: '100%',
  boxSizing: 'border-box',
  outline: 'none',
  border: 'none',
  margin: 0,
  background: '$command',
  color: '$primary',
});

const GroupName = styled('div', {
  padding: '8px 16px',
  fontSize: '10px',
  textTransform: 'uppercase',
  letterSpacing: '1px',
  background: '$command',
});

const Icon = styled('i', {
  fontSize: '20px',
  position: 'relative',
  top: '-2px',
});

const Kbd = styled('kbd', {
  background: 'rgba(255, 255, 255, .1)',
  color: '$secondary',
  padding: '4px 8px',
  textTransform: 'uppercase',
});

const Shortcut = styled('div', {
  display: 'grid',
  gridAutoFlow: 'column',
  gap: '4px',
});

const Action = styled('div', {
  display: 'flex',
  gap: '8px',
  alignItems: 'center',
});

const ActionRow = styled('div', {
  display: 'flex',
  flexDirection: 'column',
});

const Animator = styled(KBarAnimator, {
  backgroundColor: '#1a1c1e',
  maxWidth: '600px',
  width: '100%',
  color: '$primary',
  borderRadius: '8px',
  overflow: 'hidden',
  '@supports ((-webkit-backdrop-filter: none) or (backdrop-filter: none))': {
    backgroundColor: '$command',
    WebkitBackdropFilter: 'saturate(300%) blur(25px)',
    backdropFilter: 'saturate(300%) blur(25px)',
  },
});

const getResultStyle = (active) => {
  return {
    padding: '12px 16px',
    background: active ? 'rgba(255, 255, 255, 0.1)' : '$command',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: 0,
    cursor: 'pointer',
    color: active ? '$primary' : '$secondary',
  };
};
