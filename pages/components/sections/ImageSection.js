import React from 'react'
import imageUrlBuilder from '@sanity/image-url'
import styles from './ImageSection.module.css'
import client from '../../../lib/util/client'
import SimpleBlockContent from '../SimpleBlockContent'
import Cta from '../Cta'

const builder = imageUrlBuilder(client)

function ImageSection(props) {
  const {heading, label, text, image, cta} = props

  if (!image) {
    return null
  }

  return (
    <div className={styles.root}>
      <figure className={styles.content}>
        <img
          src={builder.image(image).auto('format').width(2000).url()}
          className={styles.image}
          alt={image.alt}
        />
        <figcaption>
          <div className={styles.caption}>
            <div className={styles.label}>{label}</div>
            <h2 className={styles.title}>{heading}</h2>
            {text && <SimpleBlockContent blocks={text} />}
            {cta && cta.route && <Cta {...cta} />}
          </div>
        </figcaption>
      </figure>
    </div>
  )
}

export default ImageSection
