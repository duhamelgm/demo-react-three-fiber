import { createTheme, ThemeProvider } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import React from 'react';

import Main from './main/Main';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2F0A28'
    }
  },
  components: {
    MuiTypography: {
      variants: [
        {
          props: { variant: 'h2' }, /* component props */
          style: {
            fontSize: '2rem',
            fontWeight: 400,
          },
        },
        {
          props: { variant: 'h3' }, /* component props */
          style: {
            fontSize: '1.5rem',
            fontWeight: 400,
          },
        },
      ],
    },
  }
});

const App = () => {
  return (
    <CssBaseline>
      <ThemeProvider theme={theme}>
        <Main />
      </ThemeProvider>
    </CssBaseline>
  )
}

export default App;