import React from 'react'
import BaseApp from 'next/app'
import client from '../lib/util/client'
import '../styles/shared.module.css'
import '../styles/layout.css'
import '../styles/custom-properties.css'

const noSiteConfigQuery = `
*[_id == "global-config__i18n_no"] {
  ...,
  logo {asset->{extension, url}},
  mainNavigation[] -> {
    ...,
    "title": page->title
  },
  footerNavigation[] -> {
    ...,
    "title": page->title
  }
}[0]
`
const baseSiteConfigQuery = `
  *[_id == "global-config"] {
    ...,
    logo {asset->{extension, url}},
    mainNavigation[] -> {
      ...,
      "title": page->title
    },
    footerNavigation[] -> {
      ...,
      "title": page->title
    }
  }[0]
  `

class App extends BaseApp {
  static async getInitialProps({Component, ctx, router}) {
    let pageProps = {}
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }
    const {locale} = router

    // Add site config from sanity
    return client
      .fetch(locale === 'no' ? noSiteConfigQuery : baseSiteConfigQuery)
      .then((config) => {
        if (!config) {
          return {pageProps}
        }
        if (config && pageProps) {
          pageProps.config = config
        }

        return {pageProps}
      })
  }

  render() {
    const {Component, pageProps} = this.props
    return <Component {...pageProps} />
  }
}

export default App
