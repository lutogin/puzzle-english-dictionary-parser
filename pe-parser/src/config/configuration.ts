const { COOKIE, BASE_API_PATH, SELECTOR_WORDS } = process.env;

export default () => ({
  cookie: COOKIE,
  baseApiPath: BASE_API_PATH,
  selectorWords: SELECTOR_WORDS,
});
