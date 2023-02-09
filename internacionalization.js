import Intl from './i18n';
import ptbr from './i18n/languages/pt-BR.json';
import enus from './i18n/languages/en-US.json';

Intl.config({
  default: 'pt-BR',
});

Intl.addLanguage('pt-BR', ptbr);
Intl.addLanguage('en-US', enus);

Intl.auto();

export default Intl;
