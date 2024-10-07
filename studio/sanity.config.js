import {defineConfig} from 'sanity'
import {visionTool} from '@sanity/vision' 
import {schemaTypes} from './schemas/schema'
import {withDocumentI18nPlugin} from '@sanity/document-internationalization'

export default defineConfig({
  name: 'marea',
  title: 'MAREA',
  projectId: 'w9ghqav9',
  dataset: 'production',

  plugins: withDocumentI18nPlugin([visionTool()], {
    languages: [
      {id: 'en', title: 'English'},
      {id: 'no', title: 'Norwegian'},
    ],
  }),
  schema: {
    types: schemaTypes,
  },
})
