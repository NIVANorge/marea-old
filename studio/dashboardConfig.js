export default {
  widgets: [
    // {
    //   name: 'sanity-tutorials',
    //   options: {
    //     templateRepoId: 'sanity-io/sanity-template-nextjs-landing-pages'
    //   }
    // },
    { name: 'structure-menu' },
    {
      name: 'project-info',
      options: {
        __experimental_before: [
          {
            name: 'netlify',
            options: {
              description:
                'NOTE: Because these sites are static builds, they need to be re-deployed to see the changes when documents are published.',
              sites: [
                {
                  buildHookId: '6294abfc0bc61820497d9f91',
                  title: 'Sanity Studio',
                  name: 'marea-studio',
                  apiId: 'd6a22bf5-80b4-4481-8f3b-bafea2dbb703'
                },
                {
                  buildHookId: '6294abfdf27d90236736d478',
                  title: 'Landing pages Website',
                  name: 'marea-web',
                  apiId: '493243a8-73b0-409e-b6c8-c022a198b998'
                }
              ]
            }
          }
        ],
        data: [
          {
            title: 'GitHub repo',
            value: 'https://github.com/jemmima/marea',
            category: 'Code'
          },
          { title: 'Frontend', value: 'https://marea-web.netlify.app', category: 'apps' }
        ]
      }
    },
    {
      name: 'document-list',
      options: { title: 'Recently edited', order: '_updatedAt desc', limit: 10, types: ['page'] },
      layout: { width: 'medium' }
    },
    { name: 'project-users', layout: { height: 'auto' } }
  ]
}
