import { defineConfig } from 'sanity'
import { visionTool } from '@sanity/vision'
import { deskTool } from 'sanity/desk'
import { schemaTypes } from './schemas/schema'
import { withDocumentI18nPlugin } from '@sanity/document-internationalization'

export default defineConfig({
  name: 'marea',
  title: 'MAREA',
  projectId: 'w9ghqav9',
  dataset: 'production',

  plugins: [
    deskTool(),
    visionTool(),
    withDocumentI18nPlugin([], {
      languages: [
        { id: 'en', title: 'English' },
        { id: 'no', title: 'Norwegian' },
      ],
    }),
  ],
  schema: {
    types: schemaTypes,
  },
})
