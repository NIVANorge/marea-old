import React from 'react'

function EmbedHTML({value}) {
  if (!value) {
    return <div />
  }
  const {html} = value
  if (!html) {
    return undefined
  }
  return <div dangerouslySetInnerHTML={{__html: html}} />
}

export default EmbedHTML
