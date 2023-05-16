import '../styles/globals.css'
import { EmptyLayout } from '@/components/layout'
import { AppPropsWithLayout } from '../models'
import { SWRConfig } from 'swr'
import axiosClient from '@/api/axiosClient'

import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { CacheProvider } from '@emotion/react'
import { theme, createEmotionCache } from '@/utils/index'
import '../styles/prism.css'

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache()

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const Layout = Component.Layout ?? EmptyLayout

  return (
    <CacheProvider value={clientSideEmotionCache}>
      <ThemeProvider theme={theme}>
        {/* CssBaseline là style giữa các trình duyệt sẽ đồng nhất với nhau */}
        <CssBaseline />
        <SWRConfig value={{ fetcher: (url) => axiosClient.get(url), shouldRetryOnError: false }}>
          <Layout>
            <Component {...pageProps} >
              
            </Component>
          </Layout>
        </SWRConfig>
      </ThemeProvider>
    </CacheProvider>
  )
}
