// 定义 Electron 主题类型
export type ElectronTheme = {
  shouldUseDarkColors: boolean;
  shouldUseHighContrastColors: boolean;
  shouldUseInvertedColorScheme: boolean;
};

// 定义主题源，共支持三种主题：system、light、dark
export type ThemeSource = 'system' | 'light' | 'dark';
