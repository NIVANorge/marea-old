import React from 'react'
import imageUrlBuilder from '@sanity/image-url'
import styles from './ImageSection.module.css'
import client from '../../client'
import SimpleBlockContent from '../SimpleBlockContent'
import Cta from '../Cta'
import {Swiper, SwiperSlide} from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import {Navigation} from 'swiper/modules'

const builder = imageUrlBuilder(client)

function CarouselSection(props) {
  const {heading, label, text, carousel, cta} = props
  console.log(carousel)

  if (!carousel) {
    return null
  }

  return (
    <div className={styles.root}>
      <figure className={styles.content}>
        <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
          {carousel.map((image) => {
            console.log(image.image)
            return (
              <SwiperSlide>
                <div className={styles.root}>
                  <figure className={styles.content}>
                    <img
                      src={builder.image(image.image).auto('format').width(2000).url()}
                      className={styles.image}
                      alt={image.alt}
                    />
                    <figcaption>
                      <div className={styles.caption}>
                        <div className={styles.label}>{image.label}</div>
                        <h2 className={styles.title}>{image.heading}</h2>
                        {image.text && <SimpleBlockContent blocks={image.text} />}
                        {image.cta && image.cta.route && <Cta {...image.cta} />}
                      </div>
                    </figcaption>
                  </figure>
                </div>
              </SwiperSlide>
            )
          })}
        </Swiper>
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

export default CarouselSection
