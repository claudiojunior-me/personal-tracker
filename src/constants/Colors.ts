const primary = '#4D6B30';
const secondary = '#FFBD59';
const tertiary = '#9ED747';
const tintColorDark = '#fff';

export default {
  light: {
    tabBarActiveBackground: primary,
    tabBarActiveTint: '#fff',
    text: '#000',
    background: '#fff',
    tint: primary,
    tabIconDefault: 'rgba(0,0,0,.2)',
    tabIconSelected: primary,
  },
  dark: {
    text: '#fff',
    background: '#000',
    tint: tintColorDark,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorDark,
  },
};
