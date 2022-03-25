import WebFont from 'webfontloader'

export const getGoogleFamily = (familyName) => {
  return `${familyName}:100,300,400,500,700,900&display=swap`
}

export const defaultFontFamily = 'Poppins'

export const avaliableFonts = [defaultFontFamily, 'Roboto', 'Noto Sans']

export default ({ store }) => {
  if (process.client) {
    const { themeConfig } = store.state.env || {}

    if (
      themeConfig &&
      themeConfig.font &&
      themeConfig.font.family &&
      themeConfig.font.family !== defaultFontFamily &&
      avaliableFonts.includes(themeConfig.font.family)
    ) {
      const options = {
        google: {
          families: [getGoogleFamily(themeConfig.font.family)],
        },
      }

      WebFont.load(options)
    }
  }
}
