// Document types
import page from './documents/page'
import route from './documents/route'
import siteConfig from './documents/siteConfig'

// Object types
import cta from './objects/cta'
import embedHTML from './objects/embedHTML'
import figure from './objects/figure'
import internalLink from './objects/internalLink'
import link from './objects/link'
import portableText from './objects/portableText'
import simplePortableText from './objects/simplePortableText'
import logo from './objects/logo'

// Landing page sections
import hero from './objects/hero'
import imageSection from './objects/imageSection'
import textSection from './objects/textSection'

// Then we give our schema to the builder and provide the result to Sanity
export const schemaTypes = [
  logo,
  cta,
  embedHTML,
  figure,
  hero,
  imageSection,
  internalLink,
  link,
  page,
  portableText,
  route,
  simplePortableText,
  siteConfig,
  textSection,
]
