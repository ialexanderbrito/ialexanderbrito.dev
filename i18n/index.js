import { setCookie, getCookie } from 'cookies-next';

let language = null;
let defaultLanguage = '';
let payloadLanguages = {};
let data = {};

function config(conf) {
  defaultLanguage = conf.default;
}

function addLanguage(key, payload) {
  if (!payloadLanguages[key]) payloadLanguages[key] = {};

  payloadLanguages[key] = {
    ...payloadLanguages[key],
    ...payload,
  };
}

function auto() {
  let savedLanguage = getCookie('language');
  if (savedLanguage) {
    setLanguage(savedLanguage);
    return;
  }

  const browserLanguage =
    typeof navigator !== 'undefined' && navigator.language;

  if (browserLanguage) {
    setLanguage(browserLanguage);
    return;
  }

  setLanguage(defaultLanguage);
}

function setLanguage(lang) {
  let reload = false;
  if (language && language !== lang) {
    reload = true;
  }

  language = lang;
  setCookie('language', lang);
  data = payloadLanguages[lang]
    ? payloadLanguages[lang]
    : payloadLanguages[defaultLanguage];

  if (reload) window.location.reload();
}

function getLanguage() {
  return language;
}

function text(key, params = {}) {
  let template = '';
  if (data && data[key]) template = data[key];
  else return key;

  Object.keys(params).forEach((i) => {
    template = template.replace(`\$${i}`, params[i]);
  });

  return template;
}

function span({ id, ...params }) {
  return <span>{text(id, params)}</span>;
}

function html({ id, ...params }) {
  return <span dangerouslySetInnerHTML={{ __html: text(id, params) }} />;
}

export default {
  config,
  addLanguage,
  auto,
  setLanguage,
  getLanguage,
  text,
  span,
  html,
};
