import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react"
import tailwindStyles from "~/tailwind.css?url"
import vidstackStyles from "@vidstack/react/player/styles/base.css?url"
import { IntlProvider } from "react-intl"
import type { LinksFunction } from "@remix-run/node";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: tailwindStyles },
  { rel: "stylesheet", href: vidstackStyles },
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

export default function AppWithProviders() {
  return (
    <IntlProvider locale="vi" defaultLocale="vi">
      <App />
    </IntlProvider>
  )
}