import '@/styles/globals.scss'
import type { AppProps } from 'next/app'
import { SessionProvider } from "next-auth/react";
import { store } from './../store/index'
import { Provider } from 'react-redux'

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <Provider store={store}>
      <SessionProvider session={session}>
          <Component {...pageProps} />
      </SessionProvider>
    </Provider>
  )
}
