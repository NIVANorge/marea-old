export default {
  type: 'object',
  name: 'carouselSection',
  title: 'Carousel of Images',
  fields: [
    {
      name: 'heading',
      type: 'string',
      title: 'Heading',
    },
    {
      name: 'label',
      type: 'string',
      title: 'Label',
    },
    {
      name: 'text',
      type: 'simplePortableText',
      title: 'Text',
    },
    {
      name: 'carousel',
      type: 'array',
      of : [{type: 'imageSection'}],
      title: 'Carousel',
    },
    {
      name: 'cta',
      type: 'cta',
      title: 'Call to action',
    },
  ],
  preview: {
    select: {
      heading: 'heading',
      subtitle: 'label',
      media: 'image',
    },
    prepare({heading, media}) {
      return {
        title: `Carousel: ${heading}`,
        subtitle: 'Carousel section',
        media,
      }
    },
  },
}
