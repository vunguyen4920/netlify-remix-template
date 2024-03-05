import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react"
import tailwindStyles from "~/styles/tailwind.css?url"
import vidstackStyles from "@vidstack/react/player/styles/base.css?url"
import { IntlProvider } from "react-intl"
import type { LinksFunction } from "@remix-run/node";
import rdtStylesheet from "remix-development-tools/index.css"; 

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: tailwindStyles },
  { rel: "stylesheet", href: vidstackStyles },
  ...(process.env.NODE_ENV === "development" ? [{ rel: "stylesheet", href: rdtStylesheet }] : []),
];

function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}

function AppWithProviders() {
  return (
    <IntlProvider locale="vi" defaultLocale="vi">
      <App />
    </IntlProvider>
  )
}

let AppExport = AppWithProviders
if (process.env.NODE_ENV === 'development') { 
   const { withDevTools } = await import("remix-development-tools"); 
   AppExport = withDevTools(AppExport)
}

export default AppExport