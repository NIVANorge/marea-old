import React from 'react'
import Link from 'next/link'
import {withRouter} from 'next/router'
import styles from './Footer.module.css'
import SimpleBlockContent from './SimpleBlockContent'
import {getPathFromSlug, slugParamToPath} from '../utils/urls'
import imageUrlBuilder from '@sanity/image-url'
import client from '../client'

const builder = imageUrlBuilder(client)

function Footer(props) {
  const {navItems, social, text, router} = props
  const renderLogo = (logo) => {
    if (!logo || !logo.asset) {
      return null
    }

    if (logo.asset.extension === 'svg') {
      return <SVG src={builder.image(logo.asset).auto('format').width(2000).url()} />
    }

    return (
      <img
        style={{height: '20px'}}
        src={builder.image(logo.asset).auto('format').width(2000).url()}
        alt={logo.title}
      />
    )
  }
  return (
    <div className={styles.root}>
      <nav>
        <ul className={styles.items}>
          {navItems &&
            navItems.map((item) => {
              const isActive = slugParamToPath(router.query.slug) === item.slug.current
              return (
                <li key={item._id} className={styles.item}>
                  <Link href={getPathFromSlug(item.slug.current)}>
                    <a data-is-active={isActive ? 'true' : 'false'} aria-current={isActive}>
                      {item.title}
                    </a>
                  </Link>
                </li>
              )
            })}
        </ul>
      </nav>
      <h1 className={styles.partners}>
        <ul className={styles.logos}>
          {social &&
            social.map((logo) => (
              <li key={logo._key} className={styles.logo}>
                <Link href={logo.logoHyperlinkUrl || '/'}>
                  <a title={logo.caption}>{renderLogo(logo)}</a>
                </Link>
              </li>
            ))}
        </ul>
      </h1>
      <div className={styles.text}>
        <SimpleBlockContent blocks={text} />
      </div>
    </div>
  )
}

export default withRouter(Footer)
