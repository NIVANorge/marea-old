import React from 'react'

function EmbedHTML({node}) {
  const {html} = node
  if (!html) {
    return undefined
  }
  return <div dangerouslySetInnerHTML={{__html: html}} />
}

export default EmbedHTML
