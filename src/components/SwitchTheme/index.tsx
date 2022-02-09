import { FaMoon, FaSun } from 'react-icons/fa';

import { useTheme } from 'contexts/Theme';

import './styles.scss';

export function SwitchTheme() {
  const { handleChangeTheme } = useTheme();

  const theme = localStorage.getItem('@theme')
    ? localStorage.getItem('@theme')
    : 'dark';
  return (
    <>
      <div className="container-switch-theme">
        {theme === 'dark' ? (
          <FaSun
            size={20}
            color="yellow"
            className="toggle"
            style={{ cursor: 'pointer' }}
            onClick={() => {
              handleChangeTheme();
            }}
          />
        ) : (
          <FaMoon
            size={20}
            color="yellow"
            style={{ cursor: 'pointer' }}
            className="toggle"
            onClick={() => {
              handleChangeTheme();
            }}
          />
        )}
      </div>
    </>
  );
}
