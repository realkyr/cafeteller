import React from 'react'
import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext
} from 'next/document'

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx)
    // Step 4: Pass styleTags as a prop
    let manifest = {}
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_CORE_MF}/static/assets-manifest.json`
      ) // adjust the URL accordingly
      manifest = await res.json()
    } catch (error) {
      console.error('Error fetching manifest:', error)
    }
    return { ...initialProps, manifest }
  }

  render() {
    const { manifest } = this.props as any

    const cssLinks = Object.keys(manifest)
      .filter((key) => key.endsWith('.css'))
      .map((key) => (
        <link
          key={key}
          rel='stylesheet'
          href={`${process.env.NEXT_PUBLIC_CORE_MF}/${manifest[key]}`}
        />
      ))

    return (
      <Html>
        <Head>{cssLinks}</Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
