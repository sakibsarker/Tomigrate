import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";

import "../styles/globals.css";
import { store } from "@/redux/store";
import ThemeRegistry from "@/theme/themeRegistry";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <Provider store={store}>
      <ThemeRegistry>
        <SessionProvider session={session}>
          <Component {...pageProps} />
        </SessionProvider>
      </ThemeRegistry>
    </Provider>
  );
}
