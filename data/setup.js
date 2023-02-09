import Intl from '../i18n';

const categories = [
  {
    name: Intl.text('SETUP_MENU_SISTEMAS'),
    items: [
      {
        title: Intl.text('SETUP_PLACAMAE'),
      },
      {
        title: Intl.text('SETUP_PROCESSADOR'),
      },
      {
        title: Intl.text('SETUP_MEMORIA'),
      },
      {
        title: Intl.text('SETUP_PLACADEVIDEO'),
      },
      {
        title: Intl.text('SETUP_WATERCOOLER'),
      },
      {
        title: Intl.text('SETUP_GABINETE'),
      },
    ],
  },
  {
    name: Intl.text('SETUP_MENU_EQUIPAMENTOS'),
    items: [
      {
        title: Intl.text('SETUP_MONITOR_LG'),
      },
      {
        title: Intl.text('SETUP_MONITOR_AOC'),
      },
      {
        title: Intl.text('SETUP_MOUSE_G603'),
      },
      {
        title: Intl.text('SETUP_MOUSE_G203'),
      },
      {
        title: Intl.text('SETUP_TECLADO_G213'),
      },
      {
        title: Intl.text('SETUP_HUB'),
      },
      {
        title: Intl.text('SETUP_WEBCAM'),
      },
      {
        title: Intl.text('SETUP_HEADSET'),
      },
      {
        title: Intl.text('SETUP_MICROFONE'),
      },
    ],
  },
  {
    name: Intl.text('SETUP_MENU_DESK'),
    items: [
      {
        title: Intl.text('SETUP_MESA'),
      },
      {
        title: Intl.text('SETUP_CADEIRA'),
      },
      {
        title: Intl.text('SETUP_DESKPAD'),
      },
      {
        title: Intl.text('SETUP_LUMINARIA'),
      },
    ],
  },
  {
    name: Intl.text('SETUP_MENU_AUTOMACAO'),
    items: [
      {
        title: Intl.text('SETUP_ECHODOT'),
      },
      {
        title: Intl.text('SETUP_LAMPADA'),
      },
    ],
  },
  {
    name: Intl.text('SETUP_MENU_CODIGO'),
    items: [
      {
        title: Intl.text('SETUP_EDITOR'),
        url: 'https://code.visualstudio.com',
      },
      {
        title: Intl.text('SETUP_TEMA'),
        url: 'https://marketplace.visualstudio.com/items?itemName=guilhermerodz.omni-owl',
      },
      {
        title: Intl.text('SETUP_FONTE'),
        url: 'https://www.jetbrains.com/pt-br/lp/mono/',
      },
    ],
  },
  {
    name: Intl.text('SETUP_MENU_TERMINAL'),
    items: [
      {
        title: Intl.text('SETUP_HYPER'),
        url: 'https://hyper.is',
      },
      {
        title: Intl.text('SETUP_HYPERCONFIG'),
        url: 'https://github.com/alxUI/dotfiles/blob/master/.hyper.js',
      },
      {
        title: Intl.text('SETUP_TEMA'),
        url: 'https://github.com/getomni/hyper',
      },
      {
        title: Intl.text('SETUP_OHMYZSH'),
        url: 'https://ohmyz.sh',
      },
      {
        title: Intl.text('SETUP_ZSHCONFIG'),
        url: 'https://github.com/alxUI/dotfiles/blob/master/.zshrc',
      },
      {
        title: Intl.text('SETUP_FIG'),
        url: 'http://fig.io',
      },
    ],
  },
  {
    name: Intl.text('SETUP_MENU_APPS'),
    items: [
      {
        title: 'Raycast',
        url: 'https://www.raycast.com/',
      },
      {
        title: 'Magnet',
        url: 'https://apps.apple.com/br/app/magnet/id441258766?mt=12',
      },
      {
        title: 'Figma',
        url: 'https://figma.com',
      },
      {
        title: 'Photoshop',
        url: 'https://www.adobe.com/br/products/photoshop.html',
      },
      {
        title: 'Insomnia',
        url: 'https://insomnia.rest/download',
      },
      {
        title: 'OBS',
        url: 'https://obsproject.com/pt-br/download',
      },
      {
        title: 'DBeaver',
        url: 'https://dbeaver.io/download/',
      },
      {
        title: 'Mini-video-me',
        url: 'https://github.com/maykbrito/mini-video-me/',
      },
      {
        title: 'Spotify',
        url: 'https://www.spotify.com/br/',
      },
      {
        title: 'GitKraken',
        url: 'https://www.gitkraken.com/download',
      },
      {
        title: 'CopyClip',
        url: 'https://apps.apple.com/br/app/copyclip-clipboard-history/id595191960?mt=12',
      },
      {
        title: 'Beekeeper Studio',
        url: 'https://www.beekeeperstudio.io/',
      },
      {
        title: 'Keka',
        url: 'https://www.keka.io/en/',
      },
      {
        title: 'Kap',
        url: 'https://getkap.co/',
      },
      {
        title: 'Stats',
        url: 'https://github.com/exelban/stats',
      },
    ],
  },
  {
    name: Intl.text('SETUP_MENU_SERVICOS'),
    items: [
      {
        title: 'Google Domains',
        url: 'https://domains.google',
      },
      {
        title: 'Netlify',
        url: 'https://netlify.com/',
      },
      {
        title: 'Render',
        url: 'https://render.com/',
      },
      {
        title: 'Zoho',
        url: 'https://www.zoho.com/pt-br/',
      },
    ],
  },
];

export default categories;
