import React, {Component} from 'react'
import Link from 'next/link'
import {withRouter} from 'next/router'
import SVG from 'react-inlinesvg'
import styles from './Header.module.css'
import HamburgerIcon from './icons/Hamburger'
import {getPathFromSlug, slugParamToPath} from '../utils/urls'
import imageUrlBuilder from '@sanity/image-url'
import client from '../client'

const builder = imageUrlBuilder(client)
class Header extends Component {
  state = {showNav: false}

  componentDidMount() {
    const {router} = this.props
    router.events.on('routeChangeComplete', this.hideMenu)
  }

  componentWillUnmount() {
    const {router} = this.props
    router.events.off('routeChangeComplete', this.hideMenu)
  }

  hideMenu = () => {
    this.setState({showNav: false})
  }

  handleMenuToggle = () => {
    const {showNav} = this.state
    this.setState({
      showNav: !showNav,
    })
  }

  renderLogo = (logo) => {
    if (!logo || !logo.asset) {
      return null
    }

    if (logo.asset.extension === 'svg') {
      return <SVG src={builder.image(logo.asset).auto('format').width(2000).url()} />
    }

    return <img src={builder.image(logo.asset).auto('format').width(2000).url()} alt={logo.title} />
  }

  render() {
    const {title = 'Missing title', navItems, router, logos} = this.props
    const {showNav} = this.state

    return (
      <div className={styles.root} data-show-nav={showNav}>
        <h1 className={styles.partners}>
          <ul className={styles.logos}>
            {logos &&
              logos.map((logo) => (
                <li key={logo._key} className={styles.logo}>
                  <Link href={logo.logoHyperlinkUrl || '/'}>
                    <a title={title}>{this.renderLogo(logo)}</a>
                  </Link>
                </li>
              ))}
          </ul>
        </h1>
        <nav className={styles.nav}>
          <ul className={styles.navItems}>
            {navItems &&
              navItems.map((item) => {
                const {slug, title, _id} = item
                const isActive = slugParamToPath(router.query.slug) === slug.current
                return (
                  <li key={_id} className={styles.navItem}>
                    <Link href={getPathFromSlug(slug.current)}>
                      <a data-is-active={isActive ? 'true' : 'false'} aria-current={isActive}>
                        {title}
                      </a>
                    </Link>
                  </li>
                )
              })}
          </ul>
          <button className={styles.showNavButton} onClick={this.handleMenuToggle}>
            <HamburgerIcon className={styles.hamburgerIcon} />
          </button>
        </nav>
      </div>
    )
  }
}

export default withRouter(Header)
