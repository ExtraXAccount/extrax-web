import { darkTheme, lightTheme, Theme } from '@rainbow-me/rainbowkit'
import { theme } from 'antd/es'
import { ThemeConfig as AntdThemeConfig } from 'antd/es/config-provider/context'
import { useMemo } from 'react'

const fontFamily =
  'Roboto, -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", SimSun, sans-serif'

const rainbowDarkTheme = {
  ...darkTheme({
    // accentColor: 'linear-gradient(90deg, #14bc87 0%, #049fb0 112%)',
    accentColor: 'linear-gradient(0deg, #0066E3 0%, #008CF2 112%)',
    accentColorForeground: '#fff',
    borderRadius: 'large',
  }),
  fonts: {
    body: fontFamily,
  },
}
rainbowDarkTheme.colors.connectButtonBackground = 'rgba(21, 134, 255, 0.15)'
const customRainbowTheme: {
  [themeType: string]: Theme
} = {
  light: {
    ...lightTheme({
      // accentColor: 'linear-gradient(270deg, #000D18 0%, #0f0f4a 100%)',
      accentColor: 'linear-gradient(0deg, #0066E3 0%, #008CF2 112%)',
      accentColorForeground: '#fff',
      borderRadius: 'large',
    }),
    fonts: {
      body: fontFamily,
    },
  },
  dark: rainbowDarkTheme,
}

const customAntdTheme = {
  colorTextDark: 'rgba(255, 255, 255, .8)',
  colorTextDarkWeak: 'rgba(255, 255, 255, .4)',
  colorTextDisabled: 'rgba(255, 255, 255, .25)',
  colorBorder: 'rgba(255, 255, 255, .06)',
  colorPrimary: '#1586FF',
  colorTextBase: '#001E58',
  colorDarkBg: 'rgba(37, 40, 50, .6)',
  colorDarkFull: 'rgba(37, 40, 50, 1)',
}

const customAntdThemeConfig: {
  [themeType: string]: AntdThemeConfig
} = {
  light: {
    token: {
      ...theme.defaultAlgorithm({
        ...theme.defaultSeed,
        fontFamily,
        colorPrimary: customAntdTheme.colorPrimary,
        colorTextBase: customAntdTheme.colorTextBase,
      }),
    },
  },
  dark: {
    token: {
      fontFamily,
      colorPrimary: customAntdTheme.colorPrimary,
      colorTextBase: customAntdTheme.colorTextBase,
      colorBorder: customAntdTheme.colorBorder,
      colorBorderSecondary: customAntdTheme.colorBorder,
      colorInfoBorder: customAntdTheme.colorBorder,
      // colorsplit: customAntdTheme.colorBorder,
    },
    components: {
      // Dropdown: {
      //   popoverBg: '#000',
      // },
      Input: {
        colorBgContainer: customAntdTheme.colorDarkBg,
        colorText: customAntdTheme.colorTextDark,
      },
      Select: {
        colorBgElevated: customAntdTheme.colorDarkFull,
        colorText: customAntdTheme.colorTextDark,
      },
      Table: {
        colorIcon: customAntdTheme.colorTextDarkWeak,
        colorIconHover: customAntdTheme.colorTextDark,
      },
      DatePicker: {
        ...theme.darkAlgorithm({
          ...theme.defaultSeed,
          fontFamily,
          colorPrimary: customAntdTheme.colorPrimary,
          colorTextBase: customAntdTheme.colorTextDark,
        }),
        colorTextLabel: customAntdTheme.colorTextDark,
        colorTextHeading: customAntdTheme.colorTextDark,
        colorHighlight: customAntdTheme.colorPrimary,
        colorIcon: customAntdTheme.colorTextDark,
        colorIconHover: customAntdTheme.colorPrimary,
        colorTextDisabled: customAntdTheme.colorTextDisabled,
      },
      Checkbox: {
        colorText: customAntdTheme.colorTextDark,
      },
      Skeleton: {
        colorFill: 'rgba(255, 255, 255, 0.15)',
        colorFillContent: 'rgba(255, 255, 255, 0.06)',
      },
    },
  },
}

const themeConfig = {
  light: {
    mode: 'light',
    fontFamily,
    bgBox: '#fff',
    bgBoxHover: '#e8e8e8',
    // bgBoxHover: 'rgb(252, 250, 255)',
    // bgBox: '#fff',
    labelColor: 'rgba(0,30,88,0.45)',
    labelColorHighlight: '#008CF2',
    rainbow: customRainbowTheme.light,
    antd: customAntdThemeConfig.light,
    colorPrimary: customAntdTheme.colorPrimary,
  },
  dark: {
    mode: 'dark',
    fontFamily,
    bgBox: 'rgba(60, 64, 73, 1)',
    bgBoxHover: 'rgba(37, 40, 50, 1)',
    labelColor: '#fff',
    labelColorHighlight: '#0FEFA9',
    rainbow: customRainbowTheme.dark,
    antd: customAntdThemeConfig.dark,
    colorPrimary: customAntdTheme.colorPrimary,
  },
}

export default function useTheme() {
  const themeMode = '1'

  const theme = useMemo(() => {
    return themeMode === '1' ? themeConfig.light : themeConfig.dark
  }, [themeMode])

  return theme
}
