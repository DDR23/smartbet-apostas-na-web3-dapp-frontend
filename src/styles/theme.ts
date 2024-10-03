import { createTheme, rem } from '@mantine/core';

const theme = createTheme({
  primaryColor: 'green',
  fontFamily: 'Sans-serif',
  fontSizes: {
    xs: rem(12),
    sm: rem(14),
    md: rem(16),
    lg: rem(18),
    xl: rem(20),
  },
});

export default theme;
