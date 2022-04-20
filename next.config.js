const { i18n } = require('./next-i18next.config')

module.exports = async (phase, { defaultConfig }) => {
  return {
    i18n,
  }
}
