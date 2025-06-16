import { createTheme, ThemeProvider } from '@mui/material/styles'

const theme = createTheme({
   palette: {
      primary: {
         main: '#FFFFFF',
         black: '#363636',
         white: '#F7F7F7',
      },

      secondary: {
         main: '#DD8A08',
         lightBrown: '#FFBE58',
         green: '#4F7755',
         blackGreen: '#1C2E20',
      },

      tertiary: {
         main: '#646464',
         lightGreen: '#97C69E',
         middleGray: '#828282',
         blue: '#266BD3',
         lightGrey: '#C4C4C4',
         lightestGrey: '#F3F3F3',
         yellow: '#F7D212',
         lightPink: '#FFF0F6',
         pink: '#FFCBE0',
      },
   },
})

const Themes = ({ children }) => (
   <ThemeProvider theme={theme}>{children}</ThemeProvider>
)

export default Themes
