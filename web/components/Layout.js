import React from 'react'
import Head from 'next/head'
import Header from './Header'
import Footer from './Footer'

function Layout(props) {
  const {config, children} = props

  if (!config) {
    console.error('Missing config')
    return <div>Missing config</div>
  }

  const {title, mainNavigation, footerNavigation, footerText, logos, url} = config

  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width, viewport-fit=cover" />
      </Head>
      <div className="container">
        <Header title={title} navItems={mainNavigation} logos={logos} />
        <div className="content">{children}</div>
        <Footer navItems={footerNavigation} text={footerText} />
      </div>
    </>
  )
}

export default Layout
