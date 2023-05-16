import { createTheme, responsiveFontSizes } from '@mui/material/styles'
import { red } from '@mui/material/colors'

// Create a theme instance.
export const theme = createTheme({
  palette: {
    primary: {
      main: '#FF6464',
    },
    secondary: {
      light: '#EDF7FA',
      main: '#00A8CC',
    },
    error: {
      main: red.A400,
    },
    text: {
      primary: '#21243D'
    }
  },
  typography: {
    fontFamily: 'Heebo, sans-serif',
  },
  components: {
    MuiContainer: {
      styleOverrides: {
        maxWidthSm: {
          maxWidth: '680px',
          '@media (min-width: 600px)': { maxWidth: '680px' },
        },
        maxWidthMd: {
          maxWidth: '860px',
          '@media (min-width: 900px)': { maxWidth: '860px' },
        },
      },
      defaultProps: {
        maxWidth: 'md',
      },
      variants: [],
    },
    MuiLink: {
      styleOverrides: {
        root: {
          color: 'black',
          '&:hover': {
            color: '#FF6464',
          },
          '&.active': {
            fontWeight: '700',
            color: '#FF6464',
          },
        },
      },
      defaultProps: {
        underline: 'none',
      },
      variants: [],
    },
    MuiButton: {
      variants: [
        {
          props: { variant: 'contained', color: 'primary' },
          style: {
            color: 'white',
          },
        },
      ],
    },
    MuiChip: {
      styleOverrides: {
        root: {
          paddingInline: 2
        }
      },
      variants: [
        {
          props: {color: 'secondary'},
          style: {
            backgroundColor: '#142850',
            color: 'white',
            fontWeight: 'bold',
            fontSize: '16px'
          }
        }
      ]
    }
  },
})

//cach 1 để đổi fontsize cho h1->h6
theme.typography.h4 = {
  fontSize: '2rem',
  [theme.breakpoints.up('md')]: {
    fontSize: '3rem',
  },
}

//cách 2 để đổi fontsize cho h1->h6, và phải chỉnh const thành let
// theme = responsiveFontSizes(theme)
