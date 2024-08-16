import React, { ComponentType } from 'react'
import Head from 'next/head'

interface MetaData {
  title?: string
  description?: string
  keywords?: string[]
  [key: string]: any // For any other meta tags
}

const withMeta = <P extends object>(
  WrappedComponent: ComponentType<P>,
  metaData: MetaData
) => {
  const HOC: React.FC<P> = (props) => {
    return (
      <>
        <Head>
          {metaData.title && <title>{metaData.title}</title>}
          {metaData.description && (
            <meta name='description' content={metaData.description} />
          )}
          {metaData.keywords && (
            <meta name='keywords' content={metaData.keywords.join(', ')} />
          )}
          {Object.keys(metaData).map((key) => {
            if (!['title', 'description', 'keywords'].includes(key)) {
              return <meta key={key} name={key} content={metaData[key]} />
            }
          })}
        </Head>
        <WrappedComponent {...props} />
      </>
    )
  }

  return HOC
}

export default withMeta
