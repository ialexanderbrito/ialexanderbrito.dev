import { FaMoon, FaSun } from 'react-icons/fa';
import Toggle from 'react-toggle';

import { useTheme } from 'contexts/Theme';

import './styles.scss';

export function SwitchTheme() {
  const { handleChangeTheme, themeState } = useTheme();
  return (
    <>
      <div className="container-switch-theme">
        <Toggle
          checked={!themeState}
          onChange={() => {
            handleChangeTheme();
          }}
          className="toggle"
          icons={{
            unchecked: <FaMoon size={12} color="yellow" />,
            checked: <FaSun size={12} color="yellow" />,
          }}
        />
      </div>
    </>
  );
}
