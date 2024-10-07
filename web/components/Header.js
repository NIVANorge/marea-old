import React, { Component } from 'react';
import Link from 'next/link';
import { withRouter } from 'next/router';
import SVG from 'react-inlinesvg';
import styles from './Header.module.css';
import HamburgerIcon from './icons/Hamburger';
import { getLocalizedPath, slugParamToPath } from '../utils/urls';
import imageUrlBuilder from '@sanity/image-url';
import client from '../client';

const builder = imageUrlBuilder(client);

class Header extends Component {
  state = { showNav: false };

  componentDidMount() {
    const { router } = this.props;
    router.events.on('routeChangeComplete', this.hideMenu);
  }

  componentWillUnmount() {
    const { router } = this.props;
    router.events.off('routeChangeComplete', this.hideMenu);
  }

  hideMenu = () => {
    this.setState({ showNav: false });
  };

  handleMenuToggle = () => {
    const { showNav } = this.state;
    this.setState({
      showNav: !showNav,
    });
  };

  renderLogo = (logo) => {
    if (!logo || !logo.asset) {
      return null;
    }

    if (logo.asset.extension === 'svg') {
      return <SVG src={builder.image(logo.asset).auto('format').width(2000).url()} />;
    }
    return (
      <img
        src={builder.image(logo.asset).auto('format').width(2000).url()}
        alt={logo.alt}
        title={logo.caption}
      />
    );
  };

  render() {
    const { title = 'Missing title', navItems, router, logos } = this.props;
    const { showNav } = this.state;
    const { locale } = router; // Get the current locale from the router
    //console.log(JSON.stringify(this.props, null, 2))
    return (
      <div className={styles.root} data-show-nav={showNav}>
        <h1 className={styles.partners}>
          <ul className={styles.logos}>
            {logos &&
              logos.map((logo) => (
                <li key={logo._key} className={styles.logo}>
                  <Link legacyBehavior href={logo.logoHyperlinkUrl || '/'}>
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
                const { slug, title, _id } = item;
                // Generate the localized path using the slug and current locale
                const localizedPath = slug.current === 'home' || slug.current === 'hjem' ? '/' : getLocalizedPath(slug.current, locale);

                // Determine if the current route matches the nav item
                const isActive = slugParamToPath(router.query.slug) === slug.current;

                return (
                  <li key={_id} className={styles.navItem}>
                    <Link legacyBehavior href={localizedPath}>
                      <a data-is-active={isActive ? 'true' : 'false'} aria-current={isActive ? 'page' : undefined}>
                        {title}
                      </a>
                    </Link>
                  </li>
                );
              })}
            <li className={styles.navItem}>
              {/* Language switcher button */}
              <span
                style={{ cursor: 'pointer' }}
                onClick={(e) => {
                  e.preventDefault();
                  // Determine the other language
                  const nextLocale = locale === 'no' ? 'en' : 'no';
                  const nextPath = navItems.find((item) => item.slug.current === router.asPath.substring(1));
                  console.log(router.asPath.substring(1))
                  console.log(JSON.stringify(navItems, null, 2))
                  console.log(nextPath)
                  // Preserve the current path but switch the locale
                  router.push(nextPath ? nextPath.otherSlug : '/', undefined, { locale: nextLocale });
                }}
              >
                {locale === 'no' ? '🇬🇧' : '🇳🇴'}
              </span>
            </li>
          </ul>
          <button className={styles.showNavButton} onClick={this.handleMenuToggle}>
            <HamburgerIcon className={styles.hamburgerIcon} />
          </button>
        </nav>
      </div>
    );
  }
}

export default withRouter(Header);
