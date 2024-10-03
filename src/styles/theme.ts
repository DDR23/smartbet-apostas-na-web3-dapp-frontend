import { createTheme, rem } from '@mantine/core';

const theme = createTheme({
  primaryColor: 'indigo',
  fontFamily: 'Afacad Flux, system-ui',
  fontFamilyMonospace: 'Space Mono, monospace',
  headings: {
    fontFamily: 'Bungee, sans-serif',
  },
  fontSizes: {
    xs: rem(14),
    sm: rem(16),
    md: rem(18),
    lg: rem(20),
    xl: rem(22),
  },
});

export default theme;
