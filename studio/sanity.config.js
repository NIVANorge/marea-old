import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { schemaTypes } from './schemas/schema'

export default defineConfig({
  name: 'marea',
  title: 'MAREA',
  projectId: 'w9ghqav9',
  dataset: 'production',

  plugins: [deskTool()],
  schema: {
    types: schemaTypes,
  },
})
